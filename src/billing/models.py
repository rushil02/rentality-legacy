from django.db import models

# Create your models here.


class Order(models.Model):
    application = models.ForeignKey('house.Application', on_delete=models.PROTECT)
    charge_id = models.CharField(max_length=64)


class Fee(models.Model):
    tenant_charge = models.DecimalField(max_digits=5, decimal_places=2)
    home_owner_charge = models.DecimalField(max_digits=5, decimal_places=2)
    GST = models.DecimalField(max_digits=5, decimal_places=2)
    active = models.BooleanField(default=False)
