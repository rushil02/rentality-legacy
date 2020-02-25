from rest_framework import serializers
from house.models import House


class HouseShortInfoSerializer(serializers.ModelSerializer):
    """
    Serializes minimal information of the house
    """
    home_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    location = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name_full'
    )
    cancellation_policy = serializers.SlugRelatedField(
        read_only=True,
        slug_field='verbose'
    )
    status = serializers.CharField(source='get_status_display')

    class Meta:
        model = House
        fields = (
            'uuid', 'title', 'address_hidden', 'address', 'location', 'home_type',
            'rent', 'cancellation_policy', 'status', 
        )
