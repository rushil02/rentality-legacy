from rest_framework import serializers

from house.models import House


class HouseAllDetailsSerializer(serializers.ModelSerializer):
    """
    Serializes all fields with depth - '1' (all related data)
    """

    class Meta:
        model = House
        fields = '__all__'
        depth = 1
