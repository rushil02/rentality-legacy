import uuid

from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.postgres.fields import DateRangeField
from django.utils.translation import gettext_lazy as _
from django.conf import settings


STATUS_CHOICES = (
    ('P', 'Pending'),
    ('A', 'Accepted'),
    ('D', 'Declined'),
    ('T', 'Timeout'),
    ('E', 'Transaction Error')
)


class Application(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    house = models.ForeignKey('house.House', on_delete=models.PROTECT)
    house_meta = JSONField(null=True, blank=True)
    tenant = models.ForeignKey('tenant.TenantProfile', on_delete=models.PROTECT)
    tenant_meta = JSONField(null=True, blank=True)
    rent = models.PositiveIntegerField()
    fee = models.ForeignKey('billing.Fee', on_delete=models.PROTECT)
    meta = JSONField(null=True, blank=True)
    date = DateRangeField(verbose_name=_('stay dates'))
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    promotional_code = models.ManyToManyField('promotions.PromotionalCode', blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "'%s' applied for %s" % (self.tenant, self.house)

    class Meta:
        unique_together = ('house', 'tenant')


class ApplicationState(models.Model):
    application = models.ForeignKey('application.Application', on_delete=models.PROTECT)
    old_state = models.CharField(max_length=1, choices=STATUS_CHOICES)
    new_state = models.CharField(max_length=1, choices=STATUS_CHOICES)
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
    )
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.application
