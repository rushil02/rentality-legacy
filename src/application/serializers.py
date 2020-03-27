from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from application.models import Application
from promotions.models import PromotionalCode
from tenant.serializers import TenantInfoSerializer
from utils.serializer_fields import DateRangeField


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:

        model = Application
        fields = '__all__'
        read_only_fields = (
            'house', 'house_meta', 'tenant_meta', 'rent', 'fee', 'meta', 'status', 'tenant', 'date', 'ref_code'
        )


class ApplicationInfoSerializer(serializers.ModelSerializer):
    booking_amount = serializers.SlugRelatedField(
        read_only=True,
        slug_field='tenant_amount',
        source='accountdetail'
    )
    tenant = TenantInfoSerializer()
    booking_dates = DateRangeField(source='date')
    status = serializers.CharField(source='get_status_display')
    # FIXME: change house_meta to specific information

    class Meta:
        model = Application
        fields = ('uuid', 'house_meta', 'tenant', 'rent',
                  'status', 'booking_dates', 'booking_amount')


class BookingInfoSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    guests = serializers.IntegerField()
    promo_codes = serializers.ListField(
        child=serializers.CharField(required=False), required=False)


class BookingAmountDetailsSerializer(serializers.Serializer):
    weekly_rent = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_rent = serializers.DecimalField(max_digits=10, decimal_places=2)
    payable_rent = serializers.DecimalField(max_digits=10, decimal_places=2)
    service_fee = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    discount = serializers.DecimalField(max_digits=10, decimal_places=2)
    tax = serializers.DecimalField(max_digits=10, decimal_places=2)
    payable_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    stay_duration = serializers.DecimalField(max_digits=5, decimal_places=1)


class GuestDetailsSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    contact_num = serializers.CharField()
    sex = serializers.CharField()


class ApplicationCreateSerializer(serializers.Serializer):
    booking_info = BookingInfoSerializer()
    tenant_message = serializers.CharField()
    tenant_details = GuestDetailsSerializer()
    agree_to_tnc = serializers.BooleanField()
    agree_to_pay = serializers.BooleanField()
    agree_to_house_rules = serializers.BooleanField()
