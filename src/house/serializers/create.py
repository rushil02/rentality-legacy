from rest_framework import serializers

from house.models import House, Availability, Image, Facility
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


class FacilitySerializer(serializers.Serializer):
    verbose = serializers.CharField()
    id = serializers.IntegerField(required=False)
    checked = serializers.BooleanField()

    def validate(self, data):
        if data.get('id', None) is not None:
            try:
                self.facility = Facility.objects.get(id=data['id'], verbose=data['verbose'])
            except Facility.DoesNotExist:
                raise serializers.ValidationError("No Facility with id and verbose.")
        else:
            self.facility = None
        return data


    def create(self, validated_data):
        """
        Create and return a new `Facility` instance, given the validated data.
        """
        if not self.facility:
            if validated_data["checked"] is False:
                try:
                    obj = Facility.objects.get(verbose=validated_data['verbose'])
                except Facility.DoesNotExist:
                    return None, False
            else:
                obj, created = Facility.objects.get_or_create(verbose=validated_data['verbose'])

        else:
            obj = self.facility

        return obj, validated_data["checked"]