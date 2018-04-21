from rest_framework import serializers

from tenant.models import HousePreference


class HousePreferenceSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = HousePreference
        exclude = ['tenant', ]

    def get_thumbnail(self, obj):
        return obj.get_thumbnail_2()
