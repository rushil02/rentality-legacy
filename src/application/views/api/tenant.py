from django.contrib.auth import get_user_model
from django.utils import timezone

from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from application.models import Application, AccountDetail
from application.serializers import ApplicationCreateSerializer, ApplicationInfoSerializer
from business_core.utils import Booking
from house.models import House
from user_custom.views import create_user_for_anon
from application.permissions import IsTenantOfApplication


class ExecuteIntentBookingView(APIView):
    """
    Execute Intent by Tenant
    """

    def post(self, request, house_uuid, app_uuid):
        try:
            house = House.objects.get(uuid=house_uuid)
            application = Application.objects.get(uuid=app_uuid)
        except (House.DoesNotExist, Application.DoesNotExist):
            return Response(status=HTTP_404_NOT_FOUND)

        response = {}

        # booking = Booking.load(
        #     application_obj=application,
        #     actor='tenant',
        #     payment_gateway=()
        # )

        # booking.execute_intent()
        # booking.record_to_db(application_db=application)
        # booking.inform_entities(application_db=application)

        # payment_gateway = StripePaymentGateway()
        # intent = payment_gateway.get_intent()

        # response['booking'] = booking.get_response()
        # response['client_secret'] = "pi_1GNH9ZAQ89qRjn0aB9tXQTPE_secret_W7o1624kqPYoA8N6TuSEvigaC"
        # response['client_secret'] = intent['client_secret']

        return Response(response, status=HTTP_200_OK)


class InitiateBookingView(APIView):
    """
    Initiate Application by Tenant
    """

    def post(self, request, house_uuid):
        try:
            house = House.objects.get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        user = request.user
        application = ApplicationCreateSerializer(data=request.data)

        response = {}

        if application.is_valid(raise_exception=False):

            booking = Booking.create(
                house_db=house,
                booking_info=application.validated_data['booking_info'],
                actor='tenant',
                booking_date=timezone.localdate()
            )

            # Validate Application
            errors = booking.validate()
            if errors:
                return Response({'code': 'AB', 'errors': errors}, status=HTTP_400_BAD_REQUEST)

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

            application_db = Application(
                house=house,
                tenant=tenant_user.tenant,
                rent=house.get_rent(),
                date=(
                    application.validated_data['booking_info']['start_date'],
                    application.validated_data['booking_info']['end_date']
                ),
                tenant_meta={}
            )
            application_db.save()

            try:
                response['res'] = booking.initialize()
            except Exception as e:
                print(e)
            # booking.execute_payment_gateway()
            #
            # booking.record_to_db(application_db)
            # booking.inform_entities(application_db)

        else:
            return Response({'code': 'AA', 'errors': application.errors}, status=HTTP_400_BAD_REQUEST)
        return Response(response, status=HTTP_200_OK)


class GetApplicationDetails(APIView):
    """
    Used to get all information about an application if the tenant owns it
    """
    permission_classes = (IsAuthenticated, IsTenantOfApplication)

    def get_object(self, application_uuid):
        return get_object_or_404(Application.objects.all(), uuid=application_uuid)

    def get(self, request, application_uuid):
        application = self.get_object(application_uuid)
        serializer = ApplicationInfoSerializer(application)
        return Response(serializer.data)
