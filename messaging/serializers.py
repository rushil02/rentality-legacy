from rest_framework import serializers

from messaging.models import Message, Thread


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        exclude = ['thread', ]


class CreateMessageSerializer(serializers.Serializer):
    thread_uuid = serializers.UUIDField(format='hex_verbose')
    content = serializers.CharField()


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ['uuid', 'initiator']
