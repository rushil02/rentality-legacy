from rest_framework import serializers

from messaging.models import Message, Thread, ThreadUserMessage


class ThreadUserMessageSerializer(serializers.ModelSerializer):
    user_sym = serializers.ReadOnlyField(source='user.user.id')

    class Meta:
        model = ThreadUserMessage
        fields = ['read_at', 'user_sym', 'sender']


class ReadAtUpdateSerializer(serializers.Serializer):
    thread_uuid = serializers.UUIDField(format='hex_verbose')
    messages = serializers.ListField(child=serializers.IntegerField())


class MessageSerializer(serializers.ModelSerializer):
    current_user = serializers.SerializerMethodField()
    threadusermessage_set = ThreadUserMessageSerializer(many=True, read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'content', 'send_time', 'current_user', 'threadusermessage_set')

    def get_current_user(self, obj):
        return self.context['request'].user.id


class CreateMessageSerializer(serializers.Serializer):
    thread_uuid = serializers.UUIDField(format='hex_verbose')
    content = serializers.CharField()


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ['uuid', 'initiator']
