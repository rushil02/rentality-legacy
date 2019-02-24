import uuid

from cities.models import PostalCode
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.postgres.fields import DateRangeField
from django.utils.translation import gettext_lazy as _
from django.conf import settings

from cities_custom.serializers import PostalCodeSerializer, PostalCodeAllDetailSerializer
from house.models import House, HomeType
from house.serializers import HouseAllDetailsSerializer, HomeTypeSerializer
from utils.model_utils import next_ref_code

STATUS_CHOICES = (
    ('P', 'Pending'),
    ('A', 'Accepted'),
    ('D', 'Declined'),
    ('T', 'Timeout'),
    ('E', 'Transaction Error'),
    ('B', 'Booked')
)


class Application(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    house = models.ForeignKey('house.House', on_delete=models.PROTECT)
    ref_code = models.CharField(unique=True, max_length=20, blank=True)
    house_meta = JSONField(null=True, blank=True)
    tenant = models.ForeignKey('tenant.TenantProfile', on_delete=models.PROTECT)
    tenant_meta = JSONField(null=True, blank=True)
    rent = models.PositiveIntegerField()
    meta = JSONField(null=True, blank=True)

    # FIXME: need to change this variable to date_range or stay_date_range
    date = DateRangeField(verbose_name=_('stay dates'))
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    promotional_code = models.ManyToManyField('promotions.PromotionalCode', blank=True)  # FIXME: Needs to be plural
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s: '%s' applied for %s" % (self.ref_code, self.tenant, self.house)

    def __init__(self, *args, **kwargs):
        super(Application, self).__init__(*args, **kwargs)
        self._house_native_obj = None

    @property
    def house_native_obj(self):
        # FIXME: Make Complete Wrapper
        if self._house_native_obj is None:
            house_serializer = HouseAllDetailsSerializer(data=self.house_meta)
            house_serializer.is_valid()
            _house_native_obj = House(**house_serializer.validated_data)

            del self.house_meta['location']['alt_names']
            location_serializer = PostalCodeAllDetailSerializer(data=self.house_meta['location'])
            location_serializer.is_valid(raise_exception=True)
            _house_native_obj.location = PostalCode(**location_serializer.validated_data)

            home_type_serializer = HomeTypeSerializer(data=self.house_meta['home_type'])
            home_type_serializer.is_valid()
            _house_native_obj.home_type = HomeType(**home_type_serializer.validated_data)

            self._house_native_obj = _house_native_obj
        return self._house_native_obj

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
        if self.house_meta is None:
            self.house_meta = HouseAllDetailsSerializer(self.house).data
        super(Application, self).save(force_insert=False, force_update=False, using=None,
                                      update_fields=None)


class ApplicationState(models.Model):
    application = models.ForeignKey('application.Application', on_delete=models.PROTECT)
    old_state = models.CharField(max_length=1, null=True, blank=True, choices=STATUS_CHOICES)
    new_state = models.CharField(max_length=1, choices=STATUS_CHOICES)
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
    )
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.application


class AccountDetail(models.Model):
    application = models.OneToOneField('application.Application', on_delete=models.PROTECT)
    transaction_config = models.ForeignKey('admin_custom.TransactionConfiguration', on_delete=models.PROTECT)
    tenant = JSONField()
    home_owner = JSONField()
    meta = JSONField()

    def __str__(self):
        return "%s" % self.application

    @property
    def tenant_amount(self):
        return float(self.meta['source_amount'])/100

    @property
    def home_owner_amount(self):
        return float(self.meta['destination_amount'])/100
