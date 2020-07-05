from django.utils import timezone
from rest_framework.views import APIView

from business_core.utils import Application
from house.models import House
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from application.serializers import BookingInfoSerializer


class BookingAmountView(APIView):

    def get(self, request, house_uuid):
        try:
            house = House.active_objects.get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            booking_info = BookingInfoSerializer(data=request.GET)
            if booking_info.is_valid(raise_exception=True):
                application = Application.create(
                    house_db=house,
                    booking_info=booking_info.validated_data
                )
                application.set_prospective_booking_date(timezone.localdate())

                errors = application.validate()
                if errors:
                    return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

                response = application.tenant_account.to_json_dict()
                return Response(response, status=status.HTTP_200_OK)
