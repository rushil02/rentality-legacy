from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields.jsonb import JSONField
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


class PaymentGatewayLocationManager(models.Manager):
    # FIXME: city level is nesting is never tested, and region data is not consistent for each postal code
    # location_priority = ['city', 'region', 'country']
    location_priority = ['country']

    def __get_postal_code_attrs(self, postal_code):
        postal_code_attrs = []
        for location_type in self.location_priority:
            location = getattr(postal_code, location_type)
            if location:
                postal_code_attrs.append(location)
        return postal_code_attrs

    def __construct_query_filter(self, billing_location, house_location):
        house_location_attrs = self.__get_postal_code_attrs(house_location)

        query_filter = models.Q()

        home_owner_billing_location_kwargs = [
            {
                'home_owner_billing_location': billing_location,
            },
            {
                'home_owner_billing_location__isnull': True
            }
        ]

        for house_location_attr in house_location_attrs:
            location_content_type = ContentType.objects.get_for_model(house_location_attr)
            house_location_kwargs = [
                {
                    'house_location_type': location_content_type,
                    'house_location_id': house_location_attr.id,
                },
                {
                    'house_location_type__isnull': True,
                    'house_location_id__isnull': True,
                }
            ]
            for hl_kwargs in house_location_kwargs:
                for bl_kwargs in home_owner_billing_location_kwargs:
                    query_filter = query_filter | models.Q(
                        active=True,
                        default=True,
                        **hl_kwargs,
                        **bl_kwargs
                    )
        return query_filter

    def get_valid_configs(self, billing_location, house_location):
        """
        `house_location` requires nested evaluation (geo_point is useless since, we don't have polygon information)
        :param billing_location - Country
        :param house_location - Postal Code
        :return:
        """
        query_filter = self.__construct_query_filter(billing_location, house_location)
        return self.filter(query_filter)

    def get_location_default(self, billing_location, house_location):
        """
        `house_location` requires nested evaluation (geo_point is useless since, we don't have polygon information)
        :param billing_location: 'cities.models.Country'
        :param house_location: 'cities.models.PostalCode'
        :return:
        """
        filtered_configs = self.get_valid_configs(billing_location, house_location)
        selection_priority = [
            (True, City),
            (True, Region),
            (True, Country),
            (True, type(None)),
            (False, City),
            (False, Region),
            (False, Country),
            (False, type(None))
        ]
        for home_owner_billing_location_not_null, house_location_type in selection_priority:
            for conf in filtered_configs:
                if bool(conf.home_owner_billing_location) == home_owner_billing_location_not_null \
                        and type(conf.house_location) == house_location_type:
                    return conf


class PaymentGatewayLocation(models.Model):
    """
    Maps available payment gateways ('payment_gateway.PaymentGateway') to locations it is active
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
    
    """
    payment_gateway = models.ForeignKey('payment_gateway.PaymentGateway', on_delete=models.PROTECT)

    home_owner_billing_location = models.ForeignKey(
        'cities.Country', on_delete=models.PROTECT,
        help_text="Select country for this Payment Gateway used in "
                  "reference to the Home Owner's Billing account location."
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

    class Meta:
        unique_together = [['payment_gateway', 'home_owner_billing_location']]

    def __str__(self):
        return "%s" % self.payment_gateway

    def get_required_home_owner_fields(self):
        try:
            return self.meta['home_owner']['required_fields']
        except KeyError:
            return {}
