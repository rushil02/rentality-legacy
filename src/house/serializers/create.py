from rest_framework import serializers

from house.models import House


class HouseAuthSerializer(serializers.ModelSerializer):
    """
    Used to create/Edit information of the house, therefore only authenticated views with
    relevant permission should have access to this (like relevant home-owner, admin and/or
    staff).
    """
    class Meta:
        model = House
        fields = '__all__'
