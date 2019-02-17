from django.contrib.postgres.fields import JSONField
from django.db import models

from billing.utils import get_available_models as get_available_billing_models
from .utils.business_models import get_available_models as get_available_business_models


class Order(models.Model):
    """
    payment_gateway -> whether it is 'stripe' or 'assembly'
    """
    application = models.ForeignKey('application.Application', on_delete=models.PROTECT)
    charge_id = models.CharField(max_length=64)
    payment_gateway = models.CharField(max_length=50)

    def __str__(self):
        return "%s" % self.application


class FeeManager(models.Manager):
    def get_default(self):
        return self.get(active=True)


# FIXME: Add checks for default and model delete
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

    BILLING_MODELS = get_available_billing_models()

    billing_model = models.CharField(max_length=1, choices=BILLING_MODELS)
    created_on = models.DateTimeField(auto_now_add=True)

    objects = FeeManager()

    def __str__(self):
        return "T - %s; H - %s" % (self.tenant_charge, self.home_owner_charge)


# FIXME: join this model and write validations
class PaymentGateway(models.Model):
    """
    Stores readable information of payment gateway. Primarily created to maintain consistency across various
    model relations.

    meta -> stores information for monetary validations and checks while creating a Fee model,
    can be used to store other information. Expected structure -
    {
        'expenses': {
            'payout': {
                'breakdown': [
                    {
                        'verbose': string,
                        'fee': {
                            'percentage': {
                                'principal': string - 'verbose of any other breakdown or `principal`'
                                'value': float/integer,
                            },
                            'fixed': float/integer
                        },
                        'description': string,
                        'tax': {
                            'inclusive': boolean,
                            'fee': {
                                'percentage': float/integer,
                                'fixed': float/integer
                            }
                        },
                    },
                    ...
                ]
            },
            'payin': {
                'breakdown': [
                    {
                        'verbose': string,
                        'fee': {
                            'percentage': {
                                'principal': string - 'verbose of any other breakdown or `principal`'
                                'value': float/integer,
                            },
                            'fixed': float/integer
                        },
                        'description': string,
                        'tax': {
                            'inclusive': boolean,
                            'fee': {
                                'percentage': float/integer,
                                'fixed': float/integer
                            }
                        },
                    },
                    ...
                ]
            },
        }
    }

    """
    name = models.CharField(max_length=50)
    meta = JSONField()
    created_on = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return "%s" % self.name


# class TransactionModel(models.Model):
#     """
#     Maps all Business Constraints and Financial Services together
#     To be Mapped Directly to an Application and/or Order FIXME
#     """
#     gateway = models.ForeignKey()


# class BusinessModel(models.Model):
#     """
#     All business related details are stored in meta, which is recognized to be flexible as one model can
#     constraint on the basis of length of booking while another on amount.
#     Each Transaction model should state its required constants.
#     """
#     meta = JSONField()
#     verbose = models.CharField(max_length=50)
#     BEHAVIOUR_MODELS = get_available_business_models()
#     behaviour_model = models.CharField(max_length=1, choices=BEHAVIOUR_MODELS,
#                                        help_text="Defines behaviour and constraints unique to business model")
#     created_on = models.DateTimeField(auto_now_add=True)
