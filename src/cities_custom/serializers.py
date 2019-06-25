from cities.models import City, PostalCode, Country
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from .models import PostalCodeCustom


class LocationCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['name', ]


class PostalCodeSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = PostalCodeCustom
        geo_field = "location"
        exclude = ['slug', ]


class PostalCodeVerboseOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = PostalCodeCustom
        fields = ['id', 'code', 'name_full']


class PostalCodeAllDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostalCode
        exclude = ['alt_names', ]

    def __init__(self, *args, **kwargs):
        super(PostalCodeAllDetailSerializer, self).__init__(*args, **kwargs)
        for field in self.fields:
            if isinstance(self.fields[field], serializers.CharField):
                self.fields[field].allow_blank = True
            elif isinstance(self.fields[field], serializers.ManyRelatedField):
                self.fields[field].allow_empty = True


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['name', 'id', 'postal_code_regex', 'phone']
