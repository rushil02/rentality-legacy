from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField
from django.db import models


class Location(models.Model):
    """
    Depends on external data source
    """
    # FIXME: needs modification for internationalization
    suburb = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.suburb


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
