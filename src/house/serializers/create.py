from rest_framework import serializers
from utils.serializer_fields import DateRangeField
from house.models import House, Availability, Image, Facility, HouseRule, Rule, NeighbourhoodDescriptor, WelcomeTag


class AvailabilityAuthSerializer(serializers.ModelSerializer):
    date_range = DateRangeField(source='dates')

    class Meta:
        model = Availability
        fields = ('id', 'date_range',)


class HouseAuthSerializer(serializers.ModelSerializer):
    """
    Used to create/Edit information of the house, therefore only authenticated views with
    relevant permission should have access to this (like relevant home-owner, admin and/or
    staff).
    """

    class Meta:
        model = House
        fields = (
            'title', 'address_hidden', 'address', 'location', 'home_type', 'furnished', 'bedrooms', 'bathrooms',
            'facilities',
            'parking', 'rent', 'min_stay', 'max_stay', 'max_people_allowed', 'description', 'rules', 'other_rules',
            'cancellation_policy', 'other_people_description', 'access_restrictions', 'neighbourhood_description',
            'neighbourhood_facilities', 'welcome_tags', 'id', 'uuid', 'created_on', 'updated_on', 'status',
            'promo_codes'
        )
        read_only_fields = (
            'id', 'uuid', 'created_on', 'updated_on', 'status', 'promo_codes'
        )


class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'is_thumbnail', 'uuid']
        read_only_fields = ('uuid',)


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'is_thumbnail', 'uuid']
        read_only_fields = ('uuid', 'image')


class FacilitySerializer(serializers.Serializer):
    """
    Read Create
    """
    verbose = serializers.CharField()
    id = serializers.IntegerField(required=False, allow_null=True)
    checked = serializers.BooleanField()

    def validate(self, data):
        """ Checks for given id and verbose match"""
        if data.get('id', None) is not None:
            try:
                Facility.objects.get(id=data['id'], verbose=data['verbose'])
            except Facility.DoesNotExist:
                raise serializers.ValidationError("No Facility with id and verbose.")
        return data

    def create(self, validated_data):
        """
        Find/Create and return a new `Facility` instance, given the validated data.

        If facility does not exist, Create a new one, else fetch existing object.
        """
        try:
            obj = Facility.objects.get(id=validated_data['id'], verbose=validated_data['verbose'])
        except Facility.DoesNotExist:
            if validated_data["checked"] is False:
                obj = None
            else:
                obj, created = Facility.objects.get_or_create(verbose=validated_data['verbose'])

        return obj, validated_data["checked"]

    def update(self, instance, validated_data):
        """ Update is not allowed """
        raise NotImplementedError


class NeighbourhoodDescriptorSerializer(serializers.Serializer):
    """
    Read Create
    """
    verbose = serializers.CharField()
    id = serializers.IntegerField(required=False, allow_null=True)
    checked = serializers.BooleanField()

    def validate(self, data):
        """ Checks for given id and verbose match"""
        if data.get('id', None) is not None:
            try:
                NeighbourhoodDescriptor.objects.get(id=data['id'], verbose=data['verbose'])
            except NeighbourhoodDescriptor.DoesNotExist:
                raise serializers.ValidationError("No NeighbourhoodDescriptor with id and verbose.")
        return data

    def create(self, validated_data):
        """
        Find/Create and return a new `NeighbourhoodDescriptor` instance, given the validated data.

        If NeighbourhoodDescriptor does not exist, Create a new one, else fetch existing object.
        """
        try:
            obj = NeighbourhoodDescriptor.objects.get(id=validated_data['id'], verbose=validated_data['verbose'])
        except NeighbourhoodDescriptor.DoesNotExist:
            if validated_data["checked"] is False:
                obj = None
            else:
                obj, created = NeighbourhoodDescriptor.objects.get_or_create(verbose=validated_data['verbose'])

        return obj, validated_data["checked"]

    def update(self, instance, validated_data):
        """ Update is not allowed """
        raise NotImplementedError


class WelcomeTagSerializer(serializers.Serializer):
    """
    Read Create
    """
    verbose = serializers.CharField()
    id = serializers.IntegerField(required=False, allow_null=True)
    checked = serializers.BooleanField()

    def validate(self, data):
        """ Checks for given id and verbose match"""
        if data.get('id', None) is not None:
            try:
                WelcomeTag.objects.get(id=data['id'], verbose=data['verbose'])
            except WelcomeTag.DoesNotExist:
                raise serializers.ValidationError("No NeighbourhoodDescriptor with id and verbose.")
        return data

    def create(self, validated_data):
        """
        Find/Create and return a new `NeighbourhoodDescriptor` instance, given the validated data.

        If NeighbourhoodDescriptor does not exist, Create a new one, else fetch existing object.
        """
        try:
            obj = WelcomeTag.objects.get(id=validated_data['id'], verbose=validated_data['verbose'])
        except WelcomeTag.DoesNotExist:
            if validated_data["checked"] is False:
                obj = None
            else:
                obj, created = WelcomeTag.objects.get_or_create(verbose=validated_data['verbose'])

        return obj, validated_data["checked"]

    def update(self, instance, validated_data):
        """ Update is not allowed """
        raise NotImplementedError


class HouseRuleReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = HouseRule
        fields = ('value', 'comment')


class RuleReadSerializer(serializers.ModelSerializer):
    """ Used when fetching rules for a house. """
    house_rule = HouseRuleReadSerializer(many=True)

    class Meta:
        model = Rule
        fields = ('id', 'verbose', 'options', 'house_rule')


class HouseRuleCreateSerializer(serializers.ModelSerializer):
    rule_id = serializers.IntegerField(required=True)

    class Meta:
        model = HouseRule
        fields = ('value', 'comment', 'rule_id')

    def validate(self, data):
        """
        Check that rule id exists in the system and value is one of the choices in list.
        """
        try:
            Rule.objects.get(id=data['rule_id'], options__contains=[data['value']])
        except Rule.DoesNotExist:
            raise serializers.ValidationError("Invalid Rule Parameters")
        else:
            return data

    def create(self, validated_data):
        """
        Create/Update and return a `HouseRule` instance, given the validated data.

        If HouseRule does not exist, Create a new one, else fetch existing object.
        """
        obj, created = HouseRule.objects.update_or_create(
            rule__id=validated_data['rule_id'], house=validated_data['house'],
            defaults={'value': validated_data['value'], 'comment': validated_data['comment']}
        )

        return obj

    def update(self, instance, validated_data):
        """ Update is not allowed; Handled by Create """
        raise NotImplementedError


