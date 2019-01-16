from rest_framework import serializers

from promotions.models import PromotionalCode


class PromoCodeSerializer(serializers.Serializer):
    promo_code = serializers.CharField()
