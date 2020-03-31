from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from cities_custom.models import CountryCharacteristics
from house.models import House
from payment_gateway.adapters import PGTransactionError
from payment_gateway.models import PaymentGatewayLocation
from user_custom.models import Account
from utils.serializers import DynamicFieldsSerializer
from payment_gateway.utils import PaymentGateway


class AddHomeOwnerView(APIView):
    """
    API to add identity / bank account details of a user.
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request, pg_code, house_uuid=None):
        location = request.user.get_billing_location()
        if house_uuid:
            house_location = get_object_or_404(House, uuid=house_uuid).location
        else:
            house_location = None
        payment_gateway_location = PaymentGatewayLocation.objects.get_location_default(
            billing_location=location, house_location=house_location
        )

        if pg_code != payment_gateway_location.payment_gateway.code:
            return Response({'details': 'invalid PG code'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = DynamicFieldsSerializer(
            data=request.data, fields=payment_gateway_location.get_required_home_owner_fields()
        )
        if serializer.is_valid(raise_exception=True):
            if not request.user.account_set.filter(payment_gateway=payment_gateway_location.payment_gateway).exists():
                Account.objects.create(
                    user=request.user,
                    payment_gateway=payment_gateway_location.payment_gateway,
                    details={'details': 'Not set'}
                )
            pg = PaymentGateway(payment_gateway_location)
            pg.set_homeowner_user(
                user=request.user,
                user_response=serializer.validated_data,
                request=request
            )
            try:
                pgt = pg.create_payout_account()
            except PGTransactionError as e:
                return Response({'details': e.user_message}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'pg': pgt.user_response}, status=status.HTTP_200_OK)


class UpdateHomeOwnerView(APIView):
    """
    API to update identity / bank account details of a user.
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request, pg_code):
        try:
            user_account = request.user.account_set.get(payment_gateway__code=pg_code)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            payment_gateway_location = PaymentGatewayLocation.objects.get(
                payment_gateway=user_account.payment_gateway,
                home_owner_billing_location=request.user.get_billing_location(),
                active=True
            )

        serializer = DynamicFieldsSerializer(
            data=request.data, fields=payment_gateway_location.get_required_home_owner_fields()
        )
        if serializer.is_valid(raise_exception=True):
            pg = PaymentGateway(payment_gateway_location)
            pg.set_homeowner_user(
                user=request.user,
                user_response=serializer.validated_data,
                request=request
            )
            try:
                pgt = pg.update_payout_account()
            except PGTransactionError as e:
                return Response({'details': e.user_message}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'pg': pgt.user_response}, status=status.HTTP_200_OK)


class GetPGDetails(APIView):
    """
    API to fetch the relevant Payment Gateway and list of required attributes
    to create an Account on the same.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request, pg_code, house_uuid=None):
        location = request.user.get_billing_location()
        if house_uuid:
            house_location = get_object_or_404(House, uuid=house_uuid).location
        else:
            house_location = None
        payment_gateway_location = PaymentGatewayLocation.objects.get_location_default(
            billing_location=location, house_location=house_location
        )
        if pg_code != payment_gateway_location.payment_gateway.code:
            return Response({'details': 'invalid PG code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(payment_gateway_location.get_required_home_owner_fields(), status=status.HTTP_200_OK)


class GetBankAccountDetailsFieldsForCountry(APIView):  # FIXME: Test
    """
    API to fetch fields needed to display to a user to fill bank account details.
    """

    permission_classes = (IsAuthenticated,)

    def get(self, request, country):
        fields = CountryCharacteristics.objects.get(country=country).bank_account_info
        return Response(fields, status=status.HTTP_200_OK)
