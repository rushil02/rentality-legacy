from django.conf import settings
from django.db import models

# Create your models here.


class LandlordProfile(models.Model):
    """
    Information particular to Landlord
    """

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='landlord')
    shortlist = models.ManyToManyField('tenant.HousePreference', blank=True)

    def __str__(self):
        return "%s" % self.user
