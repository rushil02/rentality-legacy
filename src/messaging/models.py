import uuid
from django.conf import settings
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class ThreadManager(models.Manager):

    def get_by_obj(self, obj, creator):
        return self.get_queryset().get(
            content_type=ContentType.objects.get_for_model(obj),
            object_id=obj.id, creator=creator
        )

    @staticmethod
    def create_new_thread(entity, user_list, creator):
        thread = Thread.objects.create(entity=entity, creator=creator)
        obj_li = []
        for user in user_list:
            obj = ThreadUser(thread=thread, user=user)
            obj_li.append(obj)
        ThreadUser.objects.bulk_create(obj_li)
        return thread


class Thread(models.Model):
    limit = models.Q(app_label='house', model='house') | models.Q(app_label='tenant', model='house_preference')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, limit_choices_to=limit)
    object_id = models.PositiveIntegerField()
    entity = GenericForeignKey('content_type', 'object_id')
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True)

    objects = ThreadManager()

    class Meta:
        unique_together = ('content_type', 'object_id', 'creator')


class ThreadUser(models.Model):
    thread = models.ForeignKey('messaging.Thread', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    class Meta:
        unique_together = ('thread', 'user')


class Message(models.Model):
    thread = models.ForeignKey('messaging.Thread', on_delete=models.CASCADE)
    content = models.TextField()
    send_time = models.DateTimeField(auto_now_add=True)


class ThreadUserMessage(models.Model):
    user = models.ForeignKey('messaging.ThreadUser', on_delete=models.CASCADE)
    message = models.ForeignKey('messaging.Message', on_delete=models.CASCADE)
    read_at = models.DateTimeField(null=True, blank=True)
    sender = models.BooleanField(default=False)
