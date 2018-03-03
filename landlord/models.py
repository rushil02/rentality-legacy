from django.conf import settings
from django.db import models

# Create your models here.


class LandlordProfile(models.Model):
    """
    Information particular to Landlord
    """

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.user
