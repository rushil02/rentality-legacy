from rest_framework import serializers

from house.models import House, Availability, Image
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

    class Meta:
        model = House
        fields = (
            'title', 'address_hidden', 'address', 'location', 'home_type', 'furnished', 'bedrooms', 'bathrooms', 'facilities',
            'parking', 'rent', 'min_stay', 'max_stay', 'max_people_allowed', 'description', 'rules', 'other_rules',
            'cancellation_policy', 'other_people_description', 'access_restrictions', 'neighbourhood_description',
            'neighbourhood_facilities', 'welcome_tags', 'id', 'uuid', 'created_on', 'updated_on', 'status', 'promo_codes'
        )
        read_only_fields = (
            'id', 'uuid', 'created_on', 'updated_on', 'status', 'promo_codes'
        )


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'is_thumbnail']