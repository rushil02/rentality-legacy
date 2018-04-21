from django.conf import settings
from django.db import models


# Create your models here.


class Threads(models.Model):
    pass


class ThreadUser(models.Model):
    thread = models.ForeignKey('messaging.Threads', on_delete=models.PROTECT)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class Message(models.Model):
    thread = models.ForeignKey('messaging.Threads', on_delete=models.CASCADE)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    send_time = models.DateTimeField(auto_now_add=True)
