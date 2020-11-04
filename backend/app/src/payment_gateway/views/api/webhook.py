from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from rest_framework.exceptions import PermissionDenied

from payment_gateway.adapters import get_adaptor_class, PGTransactionError
from django.conf import settings
from business_core.utils import Booking
from application.models import Application
from payment_gateway.utils import PaymentGateway as PaymentGatewayController


@method_decorator(csrf_exempt, name='dispatch')
class EventWebHook(APIView):
    """
    Generic event webHook - select apt PG and load info using wrapper
    """
    # register webhook URL payment gateway extensions here
    PG_CODE_MAP = {
        'st': 'stripe_v2'
    }

    def post(self, request, pg_code, external_access_key):
        if external_access_key != settings.EXTERNAL_ACCESS_API_KEY:
            raise PermissionDenied

        try:
            ext_pg, application_identifier_info = PaymentGatewayController.process_webhook(request, self.PG_CODE_MAP[pg_code])
        except KeyError:
            return Response({'details': "Not Found"}, status=HTTP_404_NOT_FOUND)
        except PGTransactionError as e:
            # FIXME: !!IMPORTANT!! Log errors
            return Response({'details': "Bad Request"}, status=HTTP_400_BAD_REQUEST)
        except NotImplementedError as e:
            # FIXME: !!IMPORTANT!! Log errors
            return Response({'details': "Bad Request"}, status=HTTP_400_BAD_REQUEST)

        # Untracked event
        if not ext_pg.event:
            return Response({'details': "OK"}, status=HTTP_200_OK)

        try:
            application = Application.objects.find_application(identifiers=application_identifier_info)
        except (Application.DoesNotExist, Application.MultipleObjectsReturned, AssertionError):
            return Response({'details': "Bad Request"}, status=HTTP_400_BAD_REQUEST)

        booking = Booking.load(
            application_obj=application,
            actor='system',
        )

        booking.payment_gateway.set_system_actor(sys_actor=ext_pg)

        try:
            if ext_pg.event == 'execute_intent':
                booking.execute_intent()
            elif ext_pg.event == 'cancel':
                booking.execute_error()
        except PGTransactionError as e:
            return Response({'details': e.user_message}, status=HTTP_400_BAD_REQUEST)
        except AssertionError as e:
            return Response({'details': str(e)}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({'details': "OK"}, status=HTTP_200_OK)
