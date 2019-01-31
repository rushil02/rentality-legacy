from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from application.models import Application
from promotions.models import PromotionalCode


class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = (
            'house', 'house_meta', 'tenant_meta', 'rent', 'fee', 'meta', 'status', 'tenant', 'date', 'ref_code'
        )


class BookingInfoSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    guests = serializers.IntegerField()
    promo_codes = serializers.ListField(child=serializers.CharField(required=False), required=False)


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
    agree_to_pay = serializers.BooleanField()
    tenant_details = GuestDetailsSerializer()
    stripe_token = serializers.CharField()
    agree_to_tnc = serializers.BooleanField()
    agree_to_house_rules = serializers.BooleanField()
