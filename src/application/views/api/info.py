from rest_framework.views import APIView
from house.models import House
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from application.serializers import BookingAmountDetailsSerializer, BookingInfoSerializer, \
    ApplicationCreateSerializer


class BookingAmountView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            house = House.active_objects.get(uuid=self.kwargs['house_uuid'])
        except (KeyError, House.DoesNotExist):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            booking_info = BookingInfoSerializer(data=request.GET)
            if booking_info.is_valid(raise_exception=True):
                promo_codes = booking_info.validated_data.get('promo_codes', [])
                try:
                    promo_objs = PromotionalCode.objects.validate_list(
                        codes=promo_codes, user=request.user,
                        applied_on_content_type=ContentType.objects.get(app_label='application', model='application'),
                        applier_type='T'
                    )
                except ValueError as e:
                    return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

                amount_details = BillingFee.init(
                    house=house,
                    date_range=[booking_info.validated_data['start_date'], booking_info.validated_data['end_date']],
                    guests_num=booking_info.validated_data['guests'], promotional_codes=promo_objs
                ).tenant_account.to_dict()
                serializer = BookingAmountDetailsSerializer(amount_details)
                return Response(serializer.data)
