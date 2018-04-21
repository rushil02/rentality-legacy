from rest_framework import serializers

from house.models import House


class HouseSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = House
        exclude = ['landlord', ]

    def get_thumbnail(self, obj):
        return obj.get_thumbnail_2()
