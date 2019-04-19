from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import FileUploadParser

from user_custom.serializers.profile import UserProfileSerializer, UserInfoSerializer
from rest_framework.exceptions import ParseError


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
    
    def put(self, request):
        user = request.user
        profile_serializer = UserProfileSerializer(user.userprofile, data=request.data)
        info_serializer = UserInfoSerializer(user, data=request.data)
        if profile_serializer.is_valid() and info_serializer.is_valid():
            profile_serializer.save()
            info_serializer.save()
            return Response(dict(**profile_serializer.data, **info_serializer.data), status=status.HTTP_200_OK)
        return Response(dict(**profile_serializer.errors, **info_serializer.errors), status=status.HTTP_400_BAD_REQUEST)


class ImageUploadParser(FileUploadParser):
    media_type = 'image/*'


class ProfilePicUploadView(APIView):
    #FIXME: To be tested
    parser_class = (ImageUploadParser,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response({"status": True})

    def put(self, request, format=None):
        if 'file' not in request.data:
            raise ParseError("Empty content")
        f = request.data['file']

        request.user.userprofile.profile_pic.save(f.name, f, save=True)
        return Response(status=status.HTTP_201_CREATED)