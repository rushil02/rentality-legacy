from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from house.models import House
from payment_gateway.models import PaymentGatewayLocation
from payment_gateway.utils import PaymentGateway


class AddHomeOwnerView(APIView):
    """
    API to add bank account details of a user.
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request, pg_code, house_uuid=None):
        location = self.request.user.get_bank_location()
        if house_uuid:
            house_location = get_object_or_404(House, uuid=house_uuid)
        else:
            house_location = None
        payment_gateway_location = PaymentGatewayLocation.objects.get_location_default(
            bank_location=location, house_location=house_location
        )
        if pg_code != payment_gateway_location.payment_gateway.code:
            return Response({'details': 'invalid PG code'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data, fields=payment_gateway_location.get_required_home_owner_fields())




    def get(self, house_uuid=None):
        location = self.request.user.get_bank_location()
        if house_uuid:
            house_location = get_object_or_404(House, uuid=house_uuid)
        else:
            house_location = None
        payment_gateway_location = PaymentGatewayLocation.objects.get_location_default(
            bank_location=location, house_location=house_location
        )
        return Response(payment_gateway_location.get_required_home_owner_fields(), status=status.HTTP_200_OK)
