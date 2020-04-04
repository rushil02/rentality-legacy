from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields.jsonb import JSONField
from django.core.exceptions import ValidationError
from django.db import models

from cities.models import City, Region, Country


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


class Profile(models.Model):
    """
    Maps stored payment gateways ('payment_gateway.PaymentGateway') to countries it is available in
    wrt billing location of homeowner.

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

    """

    payment_gateway = models.ForeignKey('payment_gateway.PaymentGateway', on_delete=models.PROTECT)

    country = models.ForeignKey(
        'cities.Country', on_delete=models.PROTECT,
        help_text="Select country for this Payment Gateway used in "
                  "reference to the Home Owner's Billing account location."
    )

    REQ_META_STRUCTURE = {
        'home_owner': {
            'bank_account': {
                'support': [],
                'required_fields': {}
            },
            'required_fields': {}
        }
    }

    meta = JSONField(help_text="Holds information required by the payment gateway to work in the selected country.")

    class Meta:
        unique_together = [['payment_gateway', 'country']]

    def get_required_home_owner_fields(self):
        try:
            return self.meta['home_owner']['required_fields']
        except KeyError:
            return {}

    def get_bank_account_creation_fields(self):
        return self.meta['home_owner']['bank_account']['required_fields']

    def get_supported_bank_account_list(self):
        """
        :return: [{'currency': 'AUD', 'country': 'AU'}, ... ]
        """
        try:
            return self.meta['home_owner']['bank_account']['support']
        except KeyError:
            return []

    def clean_fields(self, exclude=None):

        super().clean_fields(exclude=exclude)

        def check_nesting(_key, source, req):
            if _key in source:
                for __key in req[_key]:
                    try:
                        check_nesting(__key, source[_key], req[_key])
                    except ValueError as e:
                        raise ValueError('{}.{}'.format(_key, str(e)))
            else:
                raise ValueError(_key)

        for key in self.REQ_META_STRUCTURE:
            try:
                check_nesting(key, self.meta, self.REQ_META_STRUCTURE)
            except ValueError as e:
                raise ValidationError("Malformed `meta` : {} is missing".format(str(e)))


class LocationRestriction(models.Model):
    """
    Maps available payment gateways for each country ('payment_gateway.PaymentGatewayProfile') to locations it is active
    in or default to.

    """
    payment_gateway_profile = models.ForeignKey('payment_gateway.Profile', on_delete=models.PROTECT)

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

    def __str__(self):
        return "%s" % self.payment_gateway_profile
