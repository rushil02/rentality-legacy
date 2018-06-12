from rest_framework import serializers

from landlord.models import LandlordProfile
from tenant.serializers import HousePreferenceSerializer


class ShortListSerializer(serializers.ModelSerializer):
    shortlist = HousePreferenceSerializer(many=True)

    class Meta:
        model = LandlordProfile
        exclude = ['user', ]
