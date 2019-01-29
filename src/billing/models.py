from django.db import models

from billing.utils import get_available_models


class Order(models.Model):
    """
    payment_gateway -> whether it is 'stripe' or 'assembly'
    """
    application = models.ForeignKey('application.Application', on_delete=models.PROTECT)
    charge_id = models.CharField(max_length=64)
    payment_gateway = models.CharField(max_length=50)

    def __str__(self):
        return "%s" % self.application


# FIXME: Add checks for default and model update/delete
class Fee(models.Model):
    """
    Once a fee object is created, it should not be deletable or editable
    """
    tenant_charge = models.DecimalField(max_digits=5, decimal_places=2)
    home_owner_charge = models.DecimalField(max_digits=5, decimal_places=2)
    GST = models.DecimalField(max_digits=5, decimal_places=2)
    # FIXME: change to default later
    active = models.BooleanField(
        verbose_name="Default",
        default=False,
        help_text="A house/application can have different Fee objects attached. You can set it as the default."
    )

    BILLING_MODELS = get_available_models()

    billing_model = models.CharField(max_length=1, choices=BILLING_MODELS)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "T - %s; H - %s" % (self.tenant_charge, self.home_owner_charge)
