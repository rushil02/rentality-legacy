import uuid
from django.conf import settings
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class ThreadManager(models.Manager):

    def get_by_obj(self, obj, sender):
        return self.get_queryset().get(
            content_type=ContentType.objects.get_for_model(obj),
            object_id=obj.id, sender=sender
        )


class Thread(models.Model):
    limit = models.Q(app_label='house', model='house') | models.Q(app_label='tenant', model='house_preference')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, limit_choices_to=limit)
    object_id = models.PositiveIntegerField()
    entity = GenericForeignKey('content_type', 'object_id')
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    initiator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    objects = ThreadManager()

    class Meta:
        unique_together = ('content_type', 'object_id', 'initiator')


class ThreadUser(models.Model):
    thread = models.ForeignKey('messaging.Thread', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('thread', 'user')


class Message(models.Model):
    thread = models.ForeignKey('messaging.Thread', on_delete=models.CASCADE)
    content = models.TextField()
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='message_sender')
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='message_recipient')
    send_time = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
