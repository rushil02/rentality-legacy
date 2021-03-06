import uuid

from django.conf import settings
from django.db import models
from django.contrib.postgres.fields import DateRangeField
from django.utils.translation import gettext_lazy as _

from utils.privacy import ModelWithPrivacy


class TenantProfile(models.Model):
    """
        Information particular to Tenant
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tenant')
    shortlist = models.ManyToManyField('house.House', blank=True)

    def __str__(self):
        return "%s" % self.user


class ActiveHousePreferenceManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status__in=['P', 'S'])


class HousePreference(ModelWithPrivacy):
    tenant = models.ForeignKey('tenant.TenantProfile', on_delete=models.CASCADE)
    max_budget = models.PositiveIntegerField(default=0)
    locations = models.ManyToManyField('cities.City', blank=True)
    move_in_date = DateRangeField(null=True, blank=True, verbose_name='Move-in date range')
    move_out_date = DateRangeField(null=True, blank=True, verbose_name='Move-out date range')
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    # tags = models.ManyToManyField('house.Tag')

    home_type = models.ForeignKey('house.HomeType', on_delete=models.PROTECT, null=True, verbose_name="Home Type")
    description = models.TextField(blank=True)

    STATUS = (
        ('I', 'Incomplete'),
        ('S', 'Selected'),
        ('P', 'Published'),
    )
    status = models.CharField(max_length=1, choices=STATUS, default='I')

    objects = models.Manager()
    active_objects = ActiveHousePreferenceManager()

    class PrivacySetting(ModelWithPrivacy.PrivacySetting):
        options_list = [
            (
                ('A', 'All'),
                ('B', 'Application and Host'),
                ('H', 'Host only'),
                ('P', 'Private')
            ),
        ]

        fields = {
            'tags': {
                'default': options_list[0][0],
                'options': options_list[0],
                'help_text': "Privacy options for tags"
            },
            'description': {
                'default': options_list[0][0],
                'options': options_list[0]
            }
        }

    def __str__(self):
        return "%s" % self.tenant

    def preferred_suburbs(self):
        return self.get_locations_display_short()

    def get_locations_display_short(self):
        return ", ".join([str(location.name) for location in self.locations.all()])

    def get_locations_display(self):
        return ", ".join([str(location.full_name) for location in self.locations.all()])

    def get_owner(self):
        return self.tenant.user


class AdditionalTenant(models.Model):
    house_pref = models.ForeignKey('tenant.HousePreference', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    contact_num = models.CharField(
        _('contact number'),
        blank=True,
        max_length=15,
        # validators=[contact_num_validator]  FIXME: No validator. Need custom validator
    )
    SEX_TYPE = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    sex = models.CharField(_('sex'), blank=True, max_length=1, choices=SEX_TYPE, default='F')
    dob = models.DateField(_('Date of Birth'), blank=True, null=True)
