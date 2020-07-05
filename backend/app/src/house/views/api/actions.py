from django.core.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from business_core.utils import Listing
from house.models import House
from house.permissions import IsOwnerOfHouse


class ActivateHouseListing(APIView):
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)

    def get_object(self, house_uuid):
        return get_object_or_404(House.objects.filter(status='I'), uuid=house_uuid)

    def post(self, request, house_uuid):
        house_db = self.get_object(house_uuid)
        self.check_object_permissions(request, house_db)

        try:
            house_db.verify_data_for_publishing()
        except ValidationError as e:
            return Response({'msg': e, 'code': 'HIM'}, status=status.HTTP_400_BAD_REQUEST)

        listing = Listing.load(house_db, 'homeowner')

        try:
            listing.validate()
        except ValidationError as e:
            return Response({'msg': e, 'code': 'HIM'}, status=status.HTTP_400_BAD_REQUEST)

        if not listing.has_publishable_account():
            return Response({'msg': "Payment information is missing", 'code': 'PIM'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            listing.activate()
            return Response(status=status.HTTP_200_OK)


class DeactivateHouseListing(APIView):
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)

    def get_object(self, house_uuid):
        return get_object_or_404(House.active_objects.all(), uuid=house_uuid)

    def post(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        listing = Listing.load(house_obj=house, actor='homeowner')
        listing.deactivate()
        return Response(status=status.HTTP_200_OK)

