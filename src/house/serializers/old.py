from rest_framework import serializers

from business_core.models import CancellationPolicy
from cities_custom.serializers import LocationCitySerializer, PostalCodeSerializer
from essentials.serializers import PolicyPublicSerializer
from house.models import House, Image, Facility, NeighbourhoodDescriptor, WelcomeTag, HouseRule, Rule, \
    Availability, HomeType


class HouseSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    location_name = serializers.CharField(source='get_location', read_only=True)

    class Meta:
        model = House
        exclude = ['home_owner', 'location']

    def get_thumbnail(self, obj):
        return obj.get_thumbnail_2()


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


class AmountSerializer(serializers.Serializer):
    move_in_date = serializers.DateField(required=False)
    move_out_date = serializers.DateField(required=False)
    guests_num = serializers.IntegerField()


class HomeOwnerRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        return "{} {}".format(value.user.first_name, value.user.last_name).strip()


class HouseRulesPublicSerializer(serializers.ModelSerializer):
    rule = serializers.SlugRelatedField(read_only=True, slug_field='verbose')

    class Meta:
        model = HouseRule
        fields = ('rule', 'value', 'comment')


class CancellationPolicyPublicSerializer(serializers.ModelSerializer):
    official_policy = PolicyPublicSerializer()

    class Meta:
        model = CancellationPolicy
        fields = ('verbose', 'description', 'official_policy')


class AvailabilityPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ('dates', 'periodic')

    def create(self, validated_data):  # TODO: Check working
        return self.Meta.model.objects.add_date_ranges(**validated_data)

    def update(self, *args, **kwargs):
        """ Update is not supposed to be used with current structure and validations """
        raise NotImplementedError


class NetAvailableDatesSerailizer(serializers.Serializer):
    start_date = serializers.SerializerMethodField()
    end_date = serializers.SerializerMethodField()

    def get_start_date(self, obj):
        return obj.lower

    def get_end_date(self, obj):
        return obj.upper


class HouseDetailsPublicSerializer(serializers.ModelSerializer):
    """
    No Secured information of the house or home owner is passed
    """
    location = PostalCodeSerializer()
    home_type = serializers.SlugRelatedField(read_only=True, slug_field='name')
    facilities = serializers.SlugRelatedField(many=True, read_only=True, slug_field='verbose')
    rules = HouseRulesPublicSerializer(many=True, read_only=True, source='houserule_set')
    cancellation_policy = CancellationPolicyPublicSerializer()
    neighbourhood_facilities = serializers.SlugRelatedField(many=True, read_only=True, slug_field='verbose')
    welcome_tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='verbose')
    home_owner = serializers.StringRelatedField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = House
        exclude = ('address_hidden', 'promo_codes', 'status', 'created_on', 'updated_on', 'id')

    def get_thumbnail(self, obj):
        return obj.get_thumbnail_2()


class HouseAllDetailsSerializer(serializers.ModelSerializer):
    """
    Serializes all fields with depth - '1' (all related data)
    """

    class Meta:
        model = House
        fields = '__all__'
        depth = 1


class ImagePublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'is_thumbnail', 'uuid']


class HomeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeType
        fields = ['name', 'space_style']
