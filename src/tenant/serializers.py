from rest_framework import serializers

from cities_custom.serializers import LocationCitySerializer
from tenant.models import HousePreference, TenantProfile
from user_custom.serializers.common import UserInfoSerializer, UserProfileSerializer


class HousePreferenceSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    locations = LocationCitySerializer(many=True, read_only=True)

    class Meta:
        model = HousePreference
        exclude = ['tenant', ]

    def get_thumbnail(self, obj):
        return obj.get_thumbnail_2()

    def get_first_name(self, obj):
        return obj.get_owner().first_name


class TenantInfoSerializer(serializers.ModelSerializer):
    first_name = serializers.ReadOnlyField(source="user.first_name")
    last_name = serializers.ReadOnlyField(source="user.last_name")
    email = serializers.ReadOnlyField(source="user.email")
    sex = serializers.ReadOnlyField(source="user.userprofile.get_sex_display")
    contact_num = serializers.ReadOnlyField(source="user.userprofile.contact_num")

    class Meta:
        model = TenantProfile
        fields = ('first_name', 'last_name', 'email', 'sex', 'contact_num')
