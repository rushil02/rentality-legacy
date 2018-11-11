from rest_framework import serializers

from home_owner.models import HomeOwnerProfile
from tenant.serializers import HousePreferenceSerializer


class ShortListSerializer(serializers.ModelSerializer):
    shortlist = HousePreferenceSerializer(many=True)

    class Meta:
        model = HomeOwnerProfile
        exclude = ['user', ]
