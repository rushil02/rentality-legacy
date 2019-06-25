from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
from django.db.models import Q, Exists, OuterRef

from user_custom.models import UserProfile, PersonalityTag
from user_custom.serializers.common import PersonalityTagSerializer
from user_custom.serializers.profile import UserProfileSerializer, UserInfoSerializer, ProfileImageUploadSerializer
from rest_framework.exceptions import ParseError

from utils.api_thumbnailer import resize_image


class GetEditUserProfileView(APIView):
    """
    Used to display/edit User Profile
    """
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        profile_serializer = UserProfileSerializer(user.userprofile)
        info_serializer = UserInfoSerializer(user)
        return Response(dict(**info_serializer.data, **profile_serializer.data), status=status.HTTP_200_OK)
    
    def patch(self, request):
        user = request.user
        profile_serializer = UserProfileSerializer(user.userprofile, data=request.data)
        info_serializer = UserInfoSerializer(user, data=request.data)
        profile_valid = profile_serializer.is_valid()
        info_valid = info_serializer.is_valid()
        if profile_valid and info_valid:
            # TODO: Validate what PII can be changed
            profile_serializer.save()
            info_serializer.save()
            return Response(dict(**profile_serializer.data, **info_serializer.data), status=status.HTTP_200_OK)
        return Response(dict(**profile_serializer.errors, **info_serializer.errors), status=status.HTTP_400_BAD_REQUEST)


class BillingCountryView(APIView):
    """
    Get and Post country
    Accepts post only if country can be changed - based on whether an account exists
    """
    permission_classes = (IsAuthenticated, )

    def get(self, request):

        return Response(status=status.HTTP_200_OK)



class ProfilePicUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileImageUploadSerializer

    def get(self, request):
        image = request.user.userprofile.profile_pic
        if image:
            response = {
                'profile_pic': resize_image(image, 'th_col_3'),
            }
        else:
            response = {'profile_pic': None}

        return Response(response, status=status.HTTP_200_OK)

    def post(self, request):
        file_serializer = self.serializer_class(request.user.userprofile, data=request.data)
        if file_serializer.is_valid():
            profile = file_serializer.save()
            response = {
                'profile_pic': resize_image(profile.profile_pic, 'th_col_3'),
            }
            return Response(response, status=status.HTTP_201_CREATED)

    def delete(self, request):
        UserProfile.objects.filter(user=request.user).update(profile_pic=None)
        return Response(status=status.HTTP_200_OK)


class PersonalityTagView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer = PersonalityTagSerializer

    def get_tags(self, user_profile):
        return list(PersonalityTag.objects.filter(
            Q(system_default=True) | Q(userprofile=user_profile)
        ).values('verbose', 'id').annotate(
            checked=Exists(PersonalityTag.objects.filter(userprofile=user_profile, pk=OuterRef('pk')))))

    def get(self, request, *args, **kwargs):
        qs = self.get_tags(request.user.userprofile)
        serializer = self.serializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer(data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            user_profile = request.user.userprofile
            objs_set = serializer.save()
            user_profile.personality_tags.add(*[obj[0] for obj in objs_set if obj[1] is True])
            user_profile.personality_tags.remove(*[obj[0] for obj in objs_set if obj[1] is False])
            qs = self.get_tags(request.user.userprofile)
            serializer = self.serializer(qs, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
