from rest_framework import serializers

from essentials.models import Notification, Policy


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('notification_type', 'data', 'create_time')


class PolicyPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = '__all__'
