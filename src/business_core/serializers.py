from rest_framework import serializers

from business_core.models import CancellationPolicy


class CancellationPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = CancellationPolicy
        fields = ('id', 'verbose', 'description', 'official_policy')
        read_only_fields = ('id', 'verbose', 'description', 'official_policy')
