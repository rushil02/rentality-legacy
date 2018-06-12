from cities.models import City
from rest_framework import serializers


class LocationCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['name', ]
