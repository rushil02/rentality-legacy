from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields.jsonb import JSONField
from django.db import models

from .adapters.behaviours import get_behaviours
from .adapters.constraints_models import get_constraints_models
from .adapters.cancellation_behaviours import get_cancellation_behaviours


class CancellationPolicy(models.Model):
    verbose = models.TextField(verbose_name='Policy Name')
    description = models.TextField()
    properties = JSONField()
    official_policy = models.ForeignKey('essentials.Policy', on_delete=models.PROTECT, null=True, blank=True)

    BEHAVIOURS = get_cancellation_behaviours()
    behaviour = models.CharField(max_length=1, choices=BEHAVIOURS)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.verbose


class BusinessModelConfigurationManager(models.Manager):  # TODO
    def get_location_default(self, bank_location, house_location):
        """
        `house_location` requires nested evaluation (geo_point is useless since, we don't have polygon information)
        :param bank_location:
        :param house_location:
        :return:
        """
        ...
        return self.get()


class BusinessModelConfiguration(models.Model):
    """
    Maps all Business Constraints and Financial Services together.
    Connected directly to an Application and House.
    Each such configuration can be limited to location of home owner (in
    reference to bank account) and/or location of house. In case of null value,
    the model will not be constrained and will be available to all
    geographical locations.
    """
    verbose = models.CharField(max_length=50)
    code = models.CharField(max_length=10, help_text="Verbose identifier used internally", unique=True)

    meta = JSONField()

    CONSTRAINTS_MODELS = get_constraints_models()
    constraints_model = models.CharField(max_length=1, choices=CONSTRAINTS_MODELS,
                                         help_text="Defines constraints unique to business model")
    constraints_description = models.TextField(help_text="This will be shown to the user.")

    cancellation_policies = models.ManyToManyField('business_core.CancellationPolicy')

    BEHAVIOURS = get_behaviours()
    behaviour = models.CharField(max_length=1, choices=BEHAVIOURS,
                                 help_text="Defines behaviours unique to business model")
    behaviour_description = models.TextField(help_text="This will be shown to the user.")

    home_owner_bank_location = models.ForeignKey(
        'cities.Country', on_delete=models.PROTECT, null=True, blank=True,
        help_text="Select country to constraint this configuration to the Home Owner's Bank account location."
    )

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

    objects = BusinessModelConfigurationManager()

    def __str__(self):
        return "%s" % self.code

    def get_description(self):
        return {'constraints': self.constraints_description, 'behaviour': self.behaviour_description}
