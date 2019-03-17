from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields.jsonb import JSONField
from django.db import models


class PaymentGateway(models.Model):
    """
    Stores readable information of payment gateway. Primarily created to maintain consistency across various
    model relations.

    meta -> stores information for monetary validations and checks while creating a Fee model,
    can be used to store other information. The following structure may change based on implementation.
    Expected structure -
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
    code = models.CharField(max_length=10, help_text="Internal Identifier", unique=True)
    meta = JSONField(
        help_text="For internal data and financial assessment only. This should not be used "
                  "to store any data required for or by the payment gateway for monetary transactions.")
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.name


class PaymentGatewayLocationManager(models.Manager):  # TODO
    def get_location_default(self, bank_location, house_location):
        """
        `house_location` requires nested evaluation (geo_point is useless since, we don't have polygon information)
        :param bank_location:
        :param house_location:
        :return:
        """
        ...
        return self.get()


class PaymentGatewayLocation(models.Model):
    """
    Maps available payment gateways ('admin_custom.PaymentGateway') to locations it is active
    in or default to.

    Each payment gateway will have specific requirements depending on the country it is being
    used in. The dependence is on the basis of home owner's account creation since payouts
    require certain legal restrictions; while payments from a customer (tenant) can be made
    from anywhere.

    `meta` is used to resolve such purpose and store necessary information required by the
    system / payment gateway to make the payments system work correctly. Whilst it is expected
    that (or at least the model facilitates) payment gateway will have the same behaviour
    irrespective of the country of operation.

    meta -> JSON object
    Expected structure -
        {
            'home_owner': {'required_fields': {'field_name": {'verbose': '', 'type': 'string', 'regex': ''}},
            'tenant': {...}
        }
    
    `home_owner_billing_location` - Stores illing location for home owner duh
    """
    payment_gateway = models.ForeignKey('payment_gateway.PaymentGateway', on_delete=models.PROTECT)

    home_owner_billing_location = models.ForeignKey(
        'cities.Country', on_delete=models.PROTECT,
        help_text="Select country for this Payment Gateway used in reference to the Home Owner's Bank account location."
    )
    meta = JSONField(help_text="Holds information required by the payment gateway to work in the selected country.")

    LOCATION_TYPE_LIMIT = models.Q(
        app_label='cities', model='country') | models.Q(
        app_label='cities', model='region') | models.Q(
        app_label='cities', model='city')
    house_location_type = models.ForeignKey(
        ContentType, on_delete=models.PROTECT, limit_choices_to=LOCATION_TYPE_LIMIT, null=True, blank=True
    )
    house_location_id = models.PositiveIntegerField(null=True, blank=True)
    house_location = GenericForeignKey('house_location_type', 'house_location_id')

    active = models.BooleanField(default=False)
    default = models.BooleanField(default=False)

    objects = PaymentGatewayLocationManager()

    def __str__(self):
        return "%s" % self.payment_gateway

    def get_required_home_owner_fields(self):
        return self.meta['home_owner']['required_fields']


class CountryBankAccountConfiguration(models.Model):
    """
    Maps a country to fields required to save a bank account.

    `meta` is used to resolve such purpose and store necessary information required by the
    system / payment gateway to store bank account fields required in that country. The data filled
    by the user will be passed directly to the payment gateway for PCI compliance.

    Currently bank Account of Home owner required only.

    meta -> JSON object
    Expected structure -
        {
            'home_owner': {'fields': {'field_name": {'verbose': '', 'type': 'string', 'regex': '', order:''}},
            'tenant': {...}
        }
    """
    country = models.OneToOneField('cities.Country')
    meta = JSONField(help_text="Holds information required to create a bank account in the selected country.")