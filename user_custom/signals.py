from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings

from user_custom.models import UserProfile


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def extend_tenant_profile(sender, **kwargs):
    if kwargs.get('created', True):
        user = kwargs.get('instance')
        try:
            UserProfile.objects.create(user=user)
        except Exception as e:
            raise e
