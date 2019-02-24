from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields.jsonb import JSONField
from django.db import models, transaction

from .business_utils import get_available_models as get_available_billing_models
from .business_utils import get_available_models as get_available_business_models  # FIXME


class ActivityLogManager(models.Manager):
    """
    Manager for Activity Log. 'actor' is none in the case of Anonymous user.
    """

    def create_log(self, request, actor=None, entity=None, level='I', **kwargs):
        try:
            info = {
                'ip': self.get_ip(request),
                'browser_fingerprint': self.get_fingerprint(request),
                'view_name': str(kwargs.pop('view', "")),
                'arguments': kwargs.pop('arguments', {}),
                'message': str(kwargs.pop('message', "")),
                'act_type': kwargs.pop('act_type', ""),
                'extra': kwargs
            }
            self.create(actor=actor, entity=entity, level=level, meta_info=info)
        except Exception as e:
            self.create_log(
                request=None, level='C', message=str(e), act_type="Error in creating activity Log",
                kw_details=str(kwargs), actor_details=str(actor), entity_details=str(entity)
            )
            return False
        else:
            return True

    @staticmethod
    def get_ip(request):
        if request:
            return ""  # TODO
        return "No request data"

    @staticmethod
    def get_fingerprint(request):
        if request:
            return ""  # TODO
        return "No request data"


class ActivityLog(models.Model):
    """
    Logs all acts by a Publication
    meta_info data -> view method, arguments of view, message, extra, ip,
                      browser fingerprint, act_type

    Required arguments for creating a log entry ->
        request(send 'None' for system level logging), act_type
    Can send extra any key based arguments, they'll be stored in the JSON field.
    """

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True
    )

    content_type = models.ForeignKey(
        ContentType,
        null=True, blank=True,
        related_name='entity',
        on_delete=models.SET_NULL
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)
    entity = GenericForeignKey('content_type', 'object_id')

    CHOICES = (
        ('I', 'INFO'),
        ('E', 'ERROR'),
        ('C', 'CRITICAL'),
        ('D', 'DEBUG'),
        ('W', 'WARNING'),
    )
    level = models.CharField(max_length=1, choices=CHOICES)

    meta_info = JSONField(null=True, blank=True)
    create_time = models.DateTimeField(auto_now_add=True)

    objects = ActivityLogManager()

    def __unicode__(self):
        return self.actor


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
    active = models.BooleanField(default=False)

    def __str__(self):
        return "%s" % self.name


class BusinessConfiguration(models.Model):
    """
    All business related details are stored in meta, which is recognized to be flexible as one model can
    constraint on the basis of length of booking while another on amount.
    """

    code = models.CharField(max_length=10, help_text="Verbose identifier used internally", unique=True)
    verbose = models.CharField(max_length=50)

    meta = JSONField()

    CONSTRAINTS_MODELS = get_available_business_models()  # FIXME
    constraints_model = models.CharField(max_length=1, choices=CONSTRAINTS_MODELS,
                                         help_text="Defines constraints unique to business model")

    # Independent constraints required by the behaviour model should be static and not stored in the database
    BEHAVIOUR_MODELS = get_available_business_models()
    behaviour_model = models.CharField(max_length=1, choices=BEHAVIOUR_MODELS,
                                       help_text="Defines behaviour unique to business model")
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.code


class FeeConfigurationManager(models.Manager):
    def get_default(self):
        return self.get(active=True)


class FeeConfiguration(models.Model):
    """
    Stored information for the fess to be charged at the time of application.
    Once a fee object is created, it should not be deletable or editable
    """
    verbose = models.CharField(max_length=50)
    tenant_charge = models.DecimalField(max_digits=5, decimal_places=2)
    home_owner_charge = models.DecimalField(max_digits=5, decimal_places=2)
    tax = models.DecimalField(max_digits=5, decimal_places=2)  # FIXME: cannot internationalize with this model

    BILLING_MODELS = get_available_billing_models()

    billing_model = models.CharField(max_length=1, choices=BILLING_MODELS)
    created_on = models.DateTimeField(auto_now_add=True)

    objects = FeeConfigurationManager()

    def __str__(self):
        return "T - %s; H - %s" % (self.tenant_charge, self.home_owner_charge)


class TransactionConfigurationManager(models.Manager):
    def update_default(self, new_default):  # FIXME: this isn't required since this behaviour shouldn't be automated?
        """
        Updates default transaction model for a location
        :param new_default: existing (saved) TransactionModel object
        :return:
        """
        with transaction.atomic():
            self.get_queryset().filter(
                location_type=new_default.location_type, location_id=new_default.location_id
            ).update(default=False)
            new_default.default = True
            new_default.save()


class TransactionConfiguration(models.Model):
    """
    Maps all Business Constraints and Financial Services together.
    Connected directly to an Application and House.
    Each such configuration can be limited to location of home owner (in
    reference to bank account) o location of house. In case of null value,
    the model will not be constrained and will be available to all
    geographical locations.
    """
    verbose = models.CharField(max_length=50)
    code = models.CharField(max_length=10, help_text="Verbose identifier used internally", unique=True)

    payment_gateway = models.ForeignKey('admin_custom.PaymentGateway', on_delete=models.PROTECT)
    business_model = models.ForeignKey('admin_custom.BusinessConfiguration', on_delete=models.PROTECT)
    fee_model = models.ForeignKey('admin_custom.Fee', on_delete=models.PROTECT)

    home_owner_location = models.ForeignKey(
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

    objects = TransactionConfigurationManager()

    def __str__(self):
        return "%s" % self.code
