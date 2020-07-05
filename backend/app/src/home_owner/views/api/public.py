from django.db.models import Subquery
from rest_framework.views import APIView, Response
from rest_framework import status

from house.models import House
from user_custom.models import UserProfile
from user_custom.serializers.profile import UserProfilePublicSerializer


class HomeOwnerInfoPublicView(APIView):
    serializer = UserProfilePublicSerializer

    def get(self, request, house_uuid):
        qs = UserProfile.objects.get(user=Subquery(House.objects.select_related('home_owner').filter(uuid=house_uuid).values('home_owner__user')))
        serializer = self.serializer(qs)
        return Response(serializer.data, status=status.HTTP_200_OK)
