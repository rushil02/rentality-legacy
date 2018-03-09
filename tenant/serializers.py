from rest_framework import serializers

from tenant.models import HousePreference


class HousePreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HousePreference
        fields = '__all__'
