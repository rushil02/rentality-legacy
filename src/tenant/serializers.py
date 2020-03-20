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
    user_info = UserInfoSerializer(source="user")
    user_profile = UserProfileSerializer(source="user.userprofile")
    class Meta:
        model = TenantProfile
        fields = ('user_info', 'user_profile')
