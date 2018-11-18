from rest_framework import serializers

from house.models import House, Image, Facility, NeighbourhoodDescriptor, WelcomeTag


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
    checked = serializers.BooleanField()

    def create(self, validated_data):
        """
        Create and return a new `Facility` instance, given the validated data.
        """
        if not validated_data.get('id', None):
            if validated_data["checked"] is False:
                try:
                    obj = Facility.objects.get(verbose=validated_data['verbose'])
                except Facility.DoesNotExist:
                    return None, False
            else:
                obj, created = Facility.objects.get_or_create(verbose=validated_data['verbose'])

        else:
            try:
                obj = Facility.objects.get(id=validated_data['id'], verbose=validated_data['verbose'])
            except Facility.DoesNotExist as e:
                raise e  # TODO: test this exception

        return obj, validated_data["checked"]


class NearbyFacilitySerializer(serializers.Serializer):
    verbose = serializers.CharField()
    id = serializers.IntegerField(required=False)
    checked = serializers.BooleanField()

    def create(self, validated_data):
        """
        Create and return a new `Facility` instance, given the validated data.
        """
        if not validated_data.get('id', None):
            if validated_data["checked"] is False:
                try:
                    obj = NeighbourhoodDescriptor.objects.get(verbose=validated_data['verbose'])
                except NeighbourhoodDescriptor.DoesNotExist:
                    return None, False
            else:
                obj, created = NeighbourhoodDescriptor.objects.get_or_create(verbose=validated_data['verbose'])

        else:
            try:
                obj = NeighbourhoodDescriptor.objects.get(id=validated_data['id'], verbose=validated_data['verbose'])
            except NeighbourhoodDescriptor.DoesNotExist as e:
                raise e  # TODO: test this exception

        return obj, validated_data["checked"]


class WelcomeTagSerializer(serializers.Serializer):
    verbose = serializers.CharField()
    id = serializers.IntegerField(required=False)
    checked = serializers.BooleanField()

    def create(self, validated_data):
        """
        Create and return a new `Facility` instance, given the validated data.
        """
        if not validated_data.get('id', None):
            if validated_data["checked"] is False:
                try:
                    obj = WelcomeTag.objects.get(verbose=validated_data['verbose'])
                except WelcomeTag.DoesNotExist:
                    return None, False
            else:
                obj, created = WelcomeTag.objects.get_or_create(verbose=validated_data['verbose'])

        else:
            try:
                obj = WelcomeTag.objects.get(id=validated_data['id'], verbose=validated_data['verbose'])
            except WelcomeTag.DoesNotExist as e:
                raise e  # TODO: test this exception

        return obj, validated_data["checked"]
