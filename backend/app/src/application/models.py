import uuid
from decimal import Decimal

from cities.models import PostalCode
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.postgres.fields import DateRangeField
from django.utils.translation import gettext_lazy as _
from django.core.serializers.json import DjangoJSONEncoder

from house.serializers import HouseAllDetailsSerializer
from utils.helpers import merge_dicts
from utils.model_utils import next_ref_code, get_nested_info
from .utils import STATUS_CHOICES, ACTOR_CHOICES


class ApplicationManager(models.Manager):
    def find_application(self, identifiers):
        """
        Look up an application based on given identifiers
        # TODO: Expand on identifiers as needed
        :param identifiers: {
                'meta': { id_key: id_value} # Lookup via `AccountDetail.meta`
            }
        :return: application object
        """
        lookup_parameters = dict()
        if 'meta' in identifiers:
            for meta_key in identifiers['meta']:
                lookup_parameters["accountdetail__meta__%s" % meta_key] = identifiers['meta'][meta_key]

        if not lookup_parameters:
            raise AssertionError("Could not process identifiers")

        return self.get_queryset().get(**lookup_parameters)


class Application(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    house = models.ForeignKey('house.House', on_delete=models.PROTECT)
    ref_code = models.CharField(unique=True, max_length=20, blank=True)
    house_meta = JSONField(null=True, blank=True, help_text="Frozen information of house")
    tenant = models.ForeignKey('tenant.TenantProfile', on_delete=models.PROTECT)
    tenant_meta = JSONField(null=True, blank=True, help_text="Additional details provided by the tenant")
    rent = models.PositiveIntegerField()
    meta = JSONField(null=True, blank=True, help_text="Additional details provided in regards to the application")

    # FIXME: need to change this variable to date_range or stay_date_range
    date = DateRangeField(verbose_name=_('stay dates'))
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    promotional_code = models.ManyToManyField('promotions.PromotionalCode', blank=True)  # FIXME: Needs to be plural
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    objects = ApplicationManager()

    def __str__(self):
        return "%s: '%s' applied for %s" % (self.ref_code, self.tenant, self.house)

    def __init__(self, *args, **kwargs):
        super(Application, self).__init__(*args, **kwargs)
        self._house_native_obj = None

    def get_stay_date_range(self):
        return [self.date.lower, self.date.upper]

    def get_rent_per_day(self):
        return Decimal(self.rent) / 7

    def get_all_promo_codes(self):
        return self.promotional_code.all()

    def get_house_meta_info(self, key):
        """
        Gets value from house meta. `__` [double-underscore] can be used for nested keys.
        :param key: str
        :return: value
        """
        return get_nested_info(self.house_meta, key)

    def get_tenant_meta_info(self, key):
        """
        Gets value from house meta. `__` [double-underscore] can be used for nested keys.
        :param key: str
        :return: value
        """
        return get_nested_info(self.tenant_meta, key)

    def get_meta_info(self, key):
        """
        Gets value from house meta. `__` [double-underscore] can be used for nested keys.
        :param key: str
        :return: value
        """
        return get_nested_info(self.meta, key)

    def get_business_model_config(self):
        return self.accountdetail.business_config

    @staticmethod
    def _create_ref_code():
        try:
            obj = Application.objects.latest('created_on')
        except Application.DoesNotExist:
            return 'AA0001'
        else:
            return next_ref_code(obj.ref_code)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.pk is None:
            self.ref_code = self._create_ref_code()
            self.house_meta = HouseAllDetailsSerializer(self.house).data
        super(Application, self).save(force_insert=False, force_update=False, using=None,
                                      update_fields=None)

    def update_status(self, new_state, actor):
        self.status = new_state
        self.save()
        ApplicationState.objects.update_status(self, new_state, actor)

    def create_account(self, business_model_config, cancellation_policy, payment_gateway, tenant_info, homeowner_info, meta_info):
        AccountDetail.objects.create(
            application=self,
            business_config=business_model_config,
            payment_gateway=payment_gateway,
            cancellation_policy=cancellation_policy,
            tenant=tenant_info,
            home_owner=homeowner_info,
            meta=meta_info
        )

    def update_account(self, **kwargs):
        try:
            AccountDetail.objects.get(application=self)
        except AccountDetail.DoesNotExist:
            raise AssertionError
        else:
            self.accountdetail.update_account(**kwargs)


class ApplicationStateManager(models.Manager):
    def update_status(self, app, state, actor):
        try:
            old_state = self.get_queryset().filter(application=app).latest('created_on')
        except self.model.DoesNotExist:
            old_state = None
        new_state = self.model(application=app, old_state=old_state, new_state=state, actor=actor)
        new_state.save()


class ApplicationState(models.Model):
    application = models.ForeignKey('application.Application', on_delete=models.PROTECT)
    old_state = models.OneToOneField('self', on_delete=models.PROTECT, null=True, blank=True)
    new_state = models.CharField(max_length=2, choices=STATUS_CHOICES)
    actor = models.CharField(max_length=1, choices=ACTOR_CHOICES)
    created_on = models.DateTimeField(auto_now_add=True)

    objects = ApplicationStateManager()

    def __str__(self):
        return "%s" % self.application


class AccountDetail(models.Model):
    """
    Stores information required to process the behaviour of an application and stores
    consequent financial information.

    `tenant` - Freeze tenant information for an application

    `home_owner` - Freeze home_owner information for an application

    `meta` - Other details required to process an application
    """
    application = models.OneToOneField('application.Application', on_delete=models.PROTECT)

    business_config = models.ForeignKey('business_core.BusinessModelConfiguration', on_delete=models.PROTECT)
    cancellation_policy = models.ForeignKey('business_core.CancellationPolicy', on_delete=models.PROTECT)

    # payment_gateway can mutate over the life of an Application, though unlikely,
    # special protocols need to be followed in such scenario, to check information
    # stored in meta
    payment_gateway = models.ForeignKey('payment_gateway.PaymentGateway', on_delete=models.PROTECT)

    tenant = JSONField(default=dict)

    home_owner = JSONField(default=dict)

    meta = JSONField(default=dict, encoder=DjangoJSONEncoder)

    def __str__(self):
        return "%s" % self.application

    @property
    def tenant_amount(self):
        return float(self.tenant['payable_amount'])

    @property
    def home_owner_amount(self):
        return float(self.home_owner['payable_amount'])

    def update_account(self, tenant_info=None, homeowner_info=None, meta_info=None):
        if tenant_info:
            self.tenant = merge_dicts(self.tenant, tenant_info)
        if homeowner_info:
            self.home_owner = merge_dicts(self.home_owner, homeowner_info)
        if meta_info:
            self.meta = merge_dicts(self.meta, meta_info)
        self.save()

    def get_meta_info(self, key):
        return get_nested_info(self.meta, key)
