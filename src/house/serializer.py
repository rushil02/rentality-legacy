from rest_framework import serializers

from house.models import House, Image


class HouseSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    location_name = serializers.CharField(source='get_location', read_only=True)

    class Meta:
        model = House
        exclude = ['home_owner', 'location']

    def get_thumbnail(self, obj):
        return obj.get_thumbnail_2()


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'is_thumbnail']
