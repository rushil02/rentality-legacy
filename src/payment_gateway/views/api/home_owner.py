from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from cities_custom.models import CountryCharacteristics
from house.models import House
from payment_gateway.adapters import PGTransactionError
from user_custom.models import Account
from utils.serializers import DynamicFieldsSerializer
from payment_gateway.utils import PaymentGateway


class AddHomeOwnerView(APIView):
    """
    API to create new PG account link and add identity details of a user.
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request, pg_code, house_uuid):
        location = request.user.get_billing_location()
        house = get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

        if not request.user.has_billing_information():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        payment_gateway = PaymentGateway.load_location_default(
            billing_location=location,
            house_location=house.location,
        )

        if pg_code != payment_gateway.db.code:
            return Response({'details': 'invalid PG code'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = DynamicFieldsSerializer(
            data=request.data, fields=payment_gateway.profile.get_required_home_owner_fields()
        )
        if serializer.is_valid(raise_exception=True):
            if not request.user.account_set.filter(payment_gateway=payment_gateway.db).exists():
                Account.objects.create(
                    user=request.user,
                    payment_gateway=payment_gateway.db,
                    details={'details': 'Not set'}
                )
            payment_gateway.set_homeowner_user(
                user=request.user,
                user_request=serializer.validated_data,
                request=request
            )
            try:
                pgt = payment_gateway.create_payout_account()
            except PGTransactionError as e:
                return Response({'details': e.user_message}, status=status.HTTP_400_BAD_REQUEST)
            except AssertionError as e:
                # Shouldn't happen
                # FIXME: Log in db
                return Response({'details': "Invalid Request"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'pg': pgt.user_response}, status=status.HTTP_200_OK)


class UpdateHomeOwnerView(APIView):
    """
    API to update identity details of a user.
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request, pg_code):
        try:
            user_account = request.user.account_set.get(payment_gateway__code=pg_code)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            payment_gateway = PaymentGateway.init_for_homeowner(user=request.user, pg_code=pg_code)

        serializer = DynamicFieldsSerializer(
            data=request.data, fields=payment_gateway.profile.get_required_home_owner_fields()
        )
        if serializer.is_valid(raise_exception=True):
            payment_gateway.set_homeowner_user(
                user=request.user,
                user_request=serializer.validated_data,
                request=request
            )
            try:
                pgt = payment_gateway.update_payout_account()
            except PGTransactionError as e:
                return Response({'details': e.user_message}, status=status.HTTP_400_BAD_REQUEST)
            except AssertionError as e:
                # Shouldn't happen
                # FIXME: Log in db
                return Response({'details': "Invalid Request"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'pg': pgt.user_response}, status=status.HTTP_200_OK)


class GetPGDetails(APIView):
    """
    API to fetch the relevant Payment Gateway and list of required attributes
    to create an Account on the same.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request, pg_code):
        payment_gateway = PaymentGateway.init_for_homeowner(user=request.user, pg_code=pg_code)
        return Response(payment_gateway.profile.get_required_home_owner_fields(), status=status.HTTP_200_OK)


class AddUpdateBankAccountView(APIView):
    """
    API to view and attach external bank account to payment gateway
    """
    permission_classes = (IsAuthenticated, )

    def get(self, request, pg_code):
        try:
            user_account = request.user.account_set.get(payment_gateway__code=pg_code)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            pg = PaymentGateway.init_for_homeowner(request.user, pg_code)
            pg.set_homeowner_user(
                user=request.user,
                request=request
            )

            try:
                pgt = pg.get_bank_account()
            except PGTransactionError as e:
                return Response({'details': e.user_message}, status=status.HTTP_400_BAD_REQUEST)
            except AssertionError as e:
                # Shouldn't happen
                # FIXME: Log in db
                return Response({'details': "Invalid Request"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'pg': pgt.user_response}, status=status.HTTP_200_OK)

    def post(self, request, pg_code):
        try:
            user_account = request.user.account_set.get(payment_gateway__code=pg_code)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            pg = PaymentGateway.init_for_homeowner(request.user, pg_code)

            serializer = DynamicFieldsSerializer(
                data=request.data, fields=pg.profile.get_bank_account_creation_fields()
            )
            if serializer.is_valid(raise_exception=True):
                pg.set_homeowner_user(
                    user=request.user,
                    user_request=serializer.validated_data,
                    request=request
                )
                try:
                    pgt = pg.add_update_bank_account()
                except PGTransactionError as e:
                    return Response({'details': e.user_message}, status=status.HTTP_400_BAD_REQUEST)
                except AssertionError as e:
                    # Shouldn't happen
                    # FIXME: Log in db
                    return Response({'details': "Invalid Request"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'pg': pgt.user_response}, status=status.HTTP_200_OK)


class GetBankAccountDetailsFieldsForCountry(APIView):  # FIXME: Test
    """
    API to fetch fields needed to display to a user to fill bank account details.
    """

    permission_classes = (IsAuthenticated,)

    def get(self, request, country):
        fields = CountryCharacteristics.objects.get(country=country).bank_account_info
        return Response(fields, status=status.HTTP_200_OK)
