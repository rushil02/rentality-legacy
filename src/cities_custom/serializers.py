from cities.models import City, PostalCode
from rest_framework import serializers


class LocationCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['name', ]


class PostalCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostalCode
        fields = '__all__'
