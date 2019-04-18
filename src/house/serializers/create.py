from rest_framework import serializers

from house.models import House, Availability
from utils.serializer_fields import DateRangeField


class AvailabilityAuthSerializer(serializers.ModelSerializer):
    date_range = DateRangeField(source='dates')

    class Meta:
        model = Availability
        fields = ('id', 'date_range',)


class HouseAuthSerializer(serializers.ModelSerializer):
    """
    Used to create/Edit information of the house, therefore only authenticated views with
    relevant permission should have access to this (like relevant home-owner, admin and/or
    staff).
    """

    availabilities = AvailabilityAuthSerializer(many=True, source='availability_set')

    class Meta:
        model = House
        fields = (
            'title', 'address_hidden', 'address', 'location', 'home_type', 'furnished', 'bedrooms', 'bathrooms',
            'parking', 'rent', 'min_stay', 'max_stay', 'max_people_allowed', 'availabilities'
        )
