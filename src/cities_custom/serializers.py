from cities.models import City
from rest_framework import serializers


class LocationCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['name', ]


# FIXME: Attach to model
class PostalCodeSerializer(serializers.RelatedField):

    def to_representation(self, value):
        return "{}".format(value.name_full)
