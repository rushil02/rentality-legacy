from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from .models import HomeOwnerProfile


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def extend_home_owner_profile(sender, **kwargs):
    if kwargs.get('created', True):
        user = kwargs.get('instance')
        try:
            HomeOwnerProfile.objects.create(user=user)
        except Exception as e:
            raise e
