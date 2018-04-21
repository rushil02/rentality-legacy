import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.postgres.fields import JSONField, DateRangeField
from django.utils.translation import gettext_lazy as _
from easy_thumbnails.files import get_thumbnailer


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
    max_budget = models.PositiveIntegerField()
    locations = models.ManyToManyField('essentials.Location')
    move_in_date = DateRangeField(null=True, blank=True)
    move_out_date = DateRangeField(null=True, blank=True)
    uuid = models.UUIDField(default=uuid.uuid4(), editable=False, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField('house.Tag')

    PROPERTY_TYPE = (
        ('A', 'Whole Apartment'),
        ('B', 'Whole House'),
        ('C', 'Room in Share-house with Private bathroom'),
        ('D', 'Room in Share-house with Shared bathroom'),
        ('E', 'Student Accommodation'),
        ('F', 'Home Stay'),
        ('G', 'Granny Flat'),
        ('O', 'Other'),
    )

    property_type = models.CharField(max_length=1, default='A', choices=PROPERTY_TYPE)
    description = models.TextField(blank=True)

    def __str__(self):
        return "%s" % self.tenant

    # FIXME: get_thumbnail and is_thumbnail_available merge methods

    def preferred_suburbs(self):  # FIXME
        return self.locations.all()[0]

    def get_locations_display(self):
        return str(self.locations).join(', ')

    def get_thumbnail(self):
        return self.tenant.user.userprofile.get_profile_pic()

    def get_thumbnail_2(self):
        if self.is_thumbnail_available():
            thumbnailer = get_thumbnailer(self.get_thumbnail())
            url = thumbnailer.get_thumbnail({'crop': 'smart', 'size': (360, 360)})
            return '/media/' + str(url)
        return self.get_thumbnail()

    def is_thumbnail_available(self):
        if self.tenant.user.userprofile.profile_pic:
            return True
        else:
            return False


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
