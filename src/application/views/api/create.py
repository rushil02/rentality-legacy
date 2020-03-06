import datetime
from django.contrib.auth import get_user_model

from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from rest_framework.views import APIView
from rest_framework.response import Response

from application.models import Application
from application.serializers import ApplicationCreateSerializer
from business_core.utils import Booking
from house.models import House
from user_custom.views import create_user_for_anon


class InitiateBookingView(APIView):
    """
    Initiate Application by Tenant for executing intent
    """

    def post(self, request, house_uuid):
        try:
            house = House.objects.get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        user = request.user
        application = ApplicationCreateSerializer(data=request.data)

        response = {}

        if application.is_valid(raise_exception=True):
            print(application.validated_data)

            # Validate Application
            booking = Booking.create(
                house_db=house,
                booking_info=application.validated_data['booking_info'],
                actor='tenant',
                booking_date=datetime.date.today()
            )

            errors = booking.validate()
            if errors:
                return Response({'data': 'booking validation failed', 'errors': errors}, status=HTTP_400_BAD_REQUEST)

            if not user.is_authenticated:
                # Check is user with email exists
                try:
                    tenant_user = get_user_model().objects.get(
                        email=application.validated_data['tenant_details']['email']
                    )
                    response['inform'] = ['Login to dashboard']
                except get_user_model().DoesNotExist:
                    tenant_user = create_user_for_anon(**application.validated_data['tenant_details'], send_mail=True)
                    response['inform'] = ['Email check and Login to dashboard']
            else:
                tenant_user = user

            payment_gateway = ()

            booking.use_payment_gateway(payment_gateway)

            application_db = Application(
                house=house,
                tenant=tenant_user.tenant,
                rent=house.get_rent(),
                date=(
                    application.validated_data['booking_info']['start_date'],
                    application.validated_data['booking_info']['end_date']
                ),
            )
            application_db.save()

            booking.initialize()

            booking.record_to_db(application_db)
            booking.inform_entities(application_db)

            response['booking'] = booking.get_response()
            #FIXME: CHECK method  ^^^

        return Response(response, status=HTTP_200_OK)
