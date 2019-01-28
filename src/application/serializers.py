from rest_framework import serializers
from application.models import Application


class ApplicationPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('house_meta', 'tenant_meta', 'rent', 'fee', 'meta', 'status', 'tenant', 'date')