from rest_framework import serializers

from promotions.models import PromotionalCode


class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionalCode
        fields = ('code', 'verbose', 'description', 'tnc')
