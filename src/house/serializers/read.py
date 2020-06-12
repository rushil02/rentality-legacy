from rest_framework import serializers

from business_core.models import CancellationPolicy
from cities_custom.serializers import PostalCodeSerializer
from essentials.serializers import PolicyPublicSerializer
from house.models import HouseRule, House, Image, HomeType


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


class HouseShortInfoSerializer(serializers.ModelSerializer):
    """
    Serializes minimal information of the house
    """
    home_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    location = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name_full'
    )
    cancellation_policy = serializers.SlugRelatedField(
        read_only=True,
        slug_field='verbose'
    )
    status = serializers.CharField(source='get_status_display')
    thumbnail = serializers.SerializerMethodField()

    def get_thumbnail(self, obj):
        thumbnail = obj.get_thumbnail()
        if thumbnail:
            return thumbnail.url
        else:
            return None

    class Meta:
        model = House
        fields = (
            'uuid', 'title', 'address_hidden', 'address', 'location', 'home_type',
            'rent', 'min_stay', 'cancellation_policy', 'status', 'thumbnail'
        )


class HomeTypeDeserializer(serializers.ModelSerializer):
    class Meta:
        model = HomeType
        fields = ('name',)
