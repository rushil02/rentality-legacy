from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from application.models import Application
from house.models import House
from promotions.models import PromotionalCode
from tenant.serializers import TenantInfoSerializer
from utils.serializer_fields import DateRangeField
from cities_custom.serializers import PostalCodeVerboseOnlySerializer
from house.serializers.read import HomeTypeDeserializer, CancellationPolicyPublicSerializer
from user_custom.serializers.common import UserContactInfoSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    date = DateRangeField()
    cancellation_policy = CancellationPolicyPublicSerializer(
        read_only=True,
        source='accountdetail.cancellation_policy'
    )
    booking_amount = serializers.SlugRelatedField(
        read_only=True,
        slug_field='tenant_amount',
        source='accountdetail'
    )
    home_owner = UserContactInfoSerializer(source='house.home_owner.user.userprofile')

    class Meta:
        model = Application
        fields = (
            'house_meta', 'home_owner', 'cancellation_policy', 'rent', 'booking_amount', 'meta', 'status', 'date',
            'ref_code'
        )
        read_only_fields = (
            'house_meta', 'home_owner', 'cancellation_policy', 'rent', 'booking_amount', 'meta', 'status', 'date',
            'ref_code'
        )


class HouseMetaDeserializer(serializers.ModelSerializer):
    location = PostalCodeVerboseOnlySerializer()
    home_type = HomeTypeDeserializer()

    class Meta:
        model = House
        fields = (
            'uuid', 'title', 'address_hidden', 'address', 'location', 'home_type',
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
        fields = ('uuid', 'house_meta', 'tenant', 'rent', 'status', 'booking_dates', 'booking_amount')


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

    def validate_agree_to_tnc(self, value):
        if value is False:
            raise serializers.ValidationError("Please agree to proceed.")
        return value

    def validate_agree_to_pay(self, value):
        if value is False:
            raise serializers.ValidationError("Please agree to proceed.")
        return value

    def validate_agree_to_house_rules(self, value):
        if value is False:
            raise serializers.ValidationError("Please agree to proceed.")
        return value
