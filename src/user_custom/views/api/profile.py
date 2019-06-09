from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser

from user_custom.models import UserProfile
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
            profile_serializer.save()
            info_serializer.save()
            return Response(dict(**profile_serializer.data, **info_serializer.data), status=status.HTTP_200_OK)
        return Response(dict(**profile_serializer.errors, **info_serializer.errors), status=status.HTTP_400_BAD_REQUEST)


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
