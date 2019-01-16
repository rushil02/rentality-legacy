from django.db import models


class Order(models.Model):
    """
    payment_gateway -> whether it is 'stripe' or 'assembly'
    """
    application = models.ForeignKey('application.Application', on_delete=models.PROTECT)
    charge_id = models.CharField(max_length=64)
    payment_gateway = models.CharField(max_length=50)

    def __str__(self):
        return "%s" % self.application


class Fee(models.Model):
    tenant_charge = models.DecimalField(max_digits=5, decimal_places=2)
    home_owner_charge = models.DecimalField(max_digits=5, decimal_places=2)
    GST = models.DecimalField(max_digits=5, decimal_places=2)
    active = models.BooleanField(default=False)

    def __str__(self):
        return "T - %s; H - %s" % (self.tenant_charge, self.home_owner_charge)
