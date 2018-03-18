import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.postgres.fields import JSONField, DateRangeField
from django.utils.translation import gettext_lazy as _


class TenantProfile(models.Model):
    """
        Information particular to Tenant
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tenant')
    shortlist = models.ManyToManyField('house.House', blank=True)

    def __str__(self):
        return "%s" % self.user


class HousePreference(models.Model):
    tenant = models.ForeignKey('tenant.TenantProfile', on_delete=models.CASCADE)

    ADDITIONAL_TENANTS_INFORMATION = ['Name', 'Contact', 'Gender', 'Age']
    additional_tenants = JSONField(null=True, blank=True)

    max_budget = models.PositiveIntegerField()
    locations = models.ManyToManyField('essentials.Location')
    move_in_date = DateRangeField(null=True, blank=True)
    move_out_date = DateRangeField(null=True, blank=True)
    uuid = models.UUIDField(default=uuid.uuid4(), editable=False, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField('house.Tag')

    PROPERTY_TYPE = (
        ('R', 'Room'),
        ('F', 'Full House'),
        ('A', 'Any')
    )

    property_type = models.CharField(max_length=1, default='A', choices=PROPERTY_TYPE)
    description = models.TextField(blank=True)

    # TODO: use for additional_tenants
    def add_tenants(self, tenant_list):  # FIXME: Add data with validation
        keys = self.ADDITIONAL_TENANTS_INFORMATION
        for tenant in tenant_list:
            if set(tenant.keys()) == set(keys) and len(tenant.keys()) == len(keys):
                continue
            else:
                raise ValidationError(
                    _('Invalid value: %(value)s'),
                    code='invalid',
                    params={'value': tenant},
                )

    def __str__(self):
        return "%s" % self.tenant

    def preferred_suburbs(self):  # FIXME
        return self.locations.all()[0]

    def get_locations_display(self):
        print(self.locations)
        return str(self.locations).join(', ')
