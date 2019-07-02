from django.core.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from house.models import House
from house.permissions import IsOwnerOfHouse


class ActivateHouseListing(APIView):
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)

    def get_object(self, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid)

    def post(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        try:
            house.set_status('P')
        except ValidationError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
        else:
            house.save()
            return Response(status=status.HTTP_200_OK)


class DeactivateHouseListing(APIView):
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)

    def get_object(self, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid)

    def post(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        house.set_status('I')
        house.save()
        return Response(status=status.HTTP_200_OK)

