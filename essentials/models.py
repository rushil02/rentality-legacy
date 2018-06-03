from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField
from django.db import models


class Review(models.Model):
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET(get_user_model().objects.get_sentinel_user)
    )
    description = models.TextField()

    class Meta:
        abstract = True


class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    CHOICE = (
        ('NM', 'New Message'),
        ('RL', 'Requests'),
        ('OF', 'Offers')
    )

    notification_type = models.CharField(max_length=3, choices=CHOICE)

    data = JSONField()
    deleted = models.DateTimeField(null=True, blank=True)
    notified = models.BooleanField(default=False)
    update_time = models.DateTimeField(auto_now=True)
    create_time = models.DateTimeField(auto_now_add=True)
