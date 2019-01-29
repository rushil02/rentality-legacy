from cities.models import City, PostalCode
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer



class LocationCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['name', ]


class PostalCodeSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = PostalCode
        geo_field = "location"
        exclude = ['slug', ]
