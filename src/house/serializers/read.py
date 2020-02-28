from rest_framework import serializers

from business_core.models import CancellationPolicy
from cities_custom.serializers import PostalCodeSerializer
from essentials.serializers import PolicyPublicSerializer
from house.models import HouseRule, House, Image
from user_custom.serializers.profile import UserPublicSerializer


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


class ImagePublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image', 'is_thumbnail', 'uuid')


class AllHouseDetailsPublicSerializer(serializers.ModelSerializer):
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
    images = ImagePublicSerializer(many=True, source='image_set')

    class Meta:
        model = House
        exclude = ('address_hidden', 'promo_codes', 'status', 'created_on', 'updated_on', 'id')


class DateRangeSerializer(serializers.Serializer):
    start_date = serializers.SerializerMethodField()
    end_date = serializers.SerializerMethodField()

    def get_start_date(self, obj):
        return obj.lower

    def get_end_date(self, obj):
        return obj.upper
