from rest_framework import serializers

from promotions.models import PromotionalCode


class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionalCode
        fields = ('id', 'code', 'verbose', 'description', 'tnc')
