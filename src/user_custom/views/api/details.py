from rest_framework import status
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from easy_thumbnails.files import get_thumbnailer


class UserDetailsView(APIView):
    """
    Display common details of the user if logged in.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        user_profile = user.userprofile
        image = user_profile.get_profile_pic()
        if image:
            image_url = get_thumbnailer(user_profile.get_profile_pic())['profile_navbar'].url
        else:
            image_url = None

        response = {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'profile_picture': image_url,
            'account_type': user_profile.account_type
        }
        return Response(response, status=status.HTTP_200_OK)
