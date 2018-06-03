from rest_framework import serializers

from tenant.models import HousePreference


class HousePreferenceSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()

    class Meta:
        model = HousePreference
        exclude = ['tenant', ]

    def get_thumbnail(self, obj):
        return obj.get_thumbnail_2()

    def get_first_name(self, obj):
        return obj.get_owner().first_name
