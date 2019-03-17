from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from house.models import House
from payment_gateway.models import PaymentGatewayLocation, CountryBankAccountConfiguration
from payment_gateway.serializers import HomeOwnerInfoSerializer
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

        serializer = HomeOwnerInfoSerializer(
            data=request.data, fields=payment_gateway_location.get_required_home_owner_fields()
        )
        if serializer.is_valid(raise_exception=True):
            pg = PaymentGateway(payment_gateway_location)
            pg.account_creator()

        return Response(status=status.HTTP_200_OK)


class GetPGDetails(APIView):
    """
    API to fetch the relevant Payment Gateway and list of required attributes
    to create an Account on the same.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request, house_uuid=None):
        location = request.user.get_billing_location()
        if house_uuid:
            house_location = get_object_or_404(House, uuid=house_uuid)
        else:
            house_location = None
        payment_gateway_location = PaymentGatewayLocation.objects.get_location_default(
            bank_location=location, house_location=house_location
        )
        return Response(payment_gateway_location.get_required_home_owner_fields(), status=status.HTTP_200_OK)


class GetBankAccountDetailsFieldsForCountry(APIView):
    """
    API to fetch fields needed to displayed to a user at his onboarding to fill bank account
    details. This data will not get captured in the system. It will be directly passed to Payment Gateway.
    The system will recieve a source token from front end. 
    """

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        fields = CountryBankAccountConfiguration.objects.get(country__postal_codes__userprofile__user=request.user).meta
        return Response(fields, status=status.HTTP_200_OK)
