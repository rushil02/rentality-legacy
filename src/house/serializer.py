from rest_framework import serializers

from house.models import House, Image, Facility


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


class FacilitySerializer(serializers.Serializer):
    verbose = serializers.CharField()
    id = serializers.IntegerField(required=False)
    checked = serializers.BooleanField(required=False)

    def create(self, validated_data):
        """
        Create and return a new `Facility` instance, given the validated data.
        """
        if not validated_data.get('id', None):
            obj, created = Facility.objects.get_or_create(verbose=validated_data['verbose'])

        else:
            try:
                obj = Facility.objects.get(id=validated_data['id'], verbose=validated_data['verbose'])
            except Facility.DoesNotExist as e:
                raise e  # TODO: test this exception

        return obj
