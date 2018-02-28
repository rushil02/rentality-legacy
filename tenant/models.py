from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils.translation import gettext_lazy as _


class Tenant(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    ADDITIONAL_TENANTS_INFORMATION = ['Name', 'Contact', 'Gender', 'Age']
    additional_tenants = JSONField()

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
