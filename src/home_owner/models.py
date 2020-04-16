from django.conf import settings
from django.db import models

# Create your models here.


class HomeOwnerProfile(models.Model):
    """
    Information particular to Home Owner
    """

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='home_owner')
    shortlist = models.ManyToManyField('tenant.HousePreference', blank=True)

    def __str__(self):
        return "%s" % self.user
