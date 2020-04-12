from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields.jsonb import JSONField
from django.db import models

from django.db.models import Q

from .adapters.business_model.behaviours import get_behaviours
from .adapters.business_model.financials import get_financial_models
from .adapters.business_model.validations import get_constraints_models
from .adapters.cancellation import get_cancellation_behaviours
from cities.models import City, Region, Country


class CancellationPolicyManager(models.Manager):
    def get_applicable_cancellation_policies(self, house):
        return self.get_queryset().filter(businessmodelconfiguration=house.business_config)


class CancellationPolicy(models.Model):
    verbose = models.TextField(verbose_name='Policy Name')
    code = models.CharField(max_length=10, help_text="Verbose identifier used internally", unique=True)

    description = models.TextField()
    properties = JSONField()
    official_policy = models.ForeignKey(
        'essentials.Policy', on_delete=models.PROTECT, null=True, blank=True,
        related_name='cancellation_policies'
    )

    BEHAVIOURS = get_cancellation_behaviours()
    behaviour = models.CharField(max_length=1, choices=BEHAVIOURS)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    objects = CancellationPolicyManager()

    def __str__(self):
        return "%s" % self.verbose


class BusinessModelConfigurationManager(models.Manager):
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

        query_filter = Q()

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
                    query_filter = query_filter | Q(
                        active=True,
                        default=True,
                        **hl_kwargs,
                        **bl_kwargs
                    )
        return query_filter

    def get_valid_business_configs(self, billing_location, house_location):
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
        :param billing_location: 'cities.models.Country'
        :param house_location: 'cities.models.PostalCode'
        :return:
        """
        filtered_business_confs = self.get_valid_business_configs(billing_location, house_location)
        priority = [
            (True, City),
            (True, Region),
            (True, Country),
            (True, type(None)),
            (False, City),
            (False, Region),
            (False, Country),
            (False, type(None))
        ]
        for home_owner_billing_location_not_null, house_location_type in priority:
            for filtered_business_conf in filtered_business_confs:
                if bool(filtered_business_conf.home_owner_billing_location) == home_owner_billing_location_not_null \
                        and type(filtered_business_conf.house_location) == house_location_type:
                    return filtered_business_conf


class BusinessModelConfiguration(models.Model):
    """
    -   Maps all Business Constraints and Financial Services together.
    -   Connected directly to an Application and House.
    -   Each such configuration can be limited to location of home owner (in
        reference to bank account) and/or location of house. In case of null
        value, the model will not be constrained and will be available to all
        geographical locations.
    """
    verbose = models.CharField(max_length=50)
    code = models.CharField(max_length=10, help_text="Verbose identifier used internally", unique=True)

    meta = JSONField()

    description = models.TextField(help_text="This will be shown to the user.")

    CONSTRAINTS_MODELS = get_constraints_models()
    constraints_model = models.CharField(
        max_length=1, choices=CONSTRAINTS_MODELS,
        help_text="Defines constraints unique to business model",
        verbose_name='Validation constraints model'
    )

    cancellation_policies = models.ManyToManyField('business_core.CancellationPolicy')

    BEHAVIOURS = get_behaviours()
    behaviour = models.CharField(
        max_length=1, choices=BEHAVIOURS,
        help_text="Defines behaviours unique to business model"
    )

    FINANCIAL_MODELS = get_financial_models()
    financial_model = models.CharField(
        max_length=1, choices=FINANCIAL_MODELS,
        help_text="Defines attributes for financial handling unique to business model",
        verbose_name='Financial constraints model'
    )

    # TODO: Add compatible_payment_gateways field (many to many)
    # ^ Required while creating business model and checking compatibility with available
    # models and geographical coverage

    created_on = models.DateTimeField(auto_now_add=True)

    objects = BusinessModelConfigurationManager()

    def __str__(self):
        return "%s" % self.code

    def get_description(self):
        return self.description

    def get_constraints_meta(self):
        return self.meta.get('constraints', {})

    def get_behaviour_meta(self):
        return self.meta.get('behaviour', {})

    def get_financial_meta(self):
        return self.meta.get('financial', {})


class ConfigProfile(models.Model):
    config = models.ForeignKey('business_core.BusinessModelConfiguration', on_delete=models.PROTECT)
    meta = JSONField()
    country = models.ForeignKey(
        'cities.Country', on_delete=models.PROTECT, null=True, blank=True,
        help_text="Select country to constraint this configuration to the Home Owner's Bank account location."
    )
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


class LocationRestriction(models.Model):
    """
    Maps available Configs for each country ('business_core.ConfigProfile') to locations it is active
    in or default to.

    """
    config_profile = models.ForeignKey('business_core.ConfigProfile', on_delete=models.PROTECT)

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

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.config_profile
