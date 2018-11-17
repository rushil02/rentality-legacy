import os
import time
import uuid

from django.contrib.postgres.fields import DateRangeField, ArrayField
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import FileField
from django.db.models.fields.files import ImageFieldFile
from django.contrib.postgres.fields import JSONField
from django.utils.translation import gettext_lazy as _
from easy_thumbnails.files import get_thumbnailer


def get_file_path(instance, filename):
    path = 'house_images/' + time.strftime('/%Y/%m/%d/')
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (instance.uuid, ext)
    return os.path.join(path, filename)


class HomeType(models.Model):
    name = models.TextField()
    SPACE_STYLES = (
        ('S', 'Shared'),
        ('F', 'Unshared')
    )
    space_style = models.CharField(max_length=1)

    def __str__(self):
        return "%s" % self.name


class ActiveHouseManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status='P')


class House(models.Model):
    """
    tags -> contain many-to-many relation with model 'Tags' containing 'who-is-welcomed [rules]' or facility

    status description ->
    STATUS = (
        ('I', 'Inactive'),      Not Visible to Public, 1st state of any listing
        ('P', 'Published'),     Visible to Public
        ('R', 'Removed'),       Not Visible to Public
        ('D', 'Deleted')        Deleted from user's account visibility, still in Database
    )
    """

    REQUIRED_FIELDS = (
        'home_owner', 'title', 'furnished', 'address_hidden', 'address', 'location', 'home_type', 'bedrooms',
        'bathrooms', 'parking', 'rent', 'facilities', 'cancellation_policy'
    )

    home_owner = models.ForeignKey(
        'home_owner.HomeOwnerProfile',
        on_delete=models.CASCADE,
        related_name='houses',
        verbose_name=_('property owner')
    )

    title = models.CharField(max_length=250, verbose_name='Property Name')
    furnished = models.BooleanField(default=False)

    address_hidden = models.TextField(blank=True, verbose_name="Unit Number or House Number",
                                      help_text="This is not visible to others unless a booking is made.")
    address = models.TextField(blank=True, verbose_name='Building name, Street Name')
    location = models.ForeignKey(
        'cities.PostalCode',
        on_delete=models.PROTECT,
        verbose_name=_('location'),
        null=True, blank=True  # FIXME: remove blank after migrating geo data
    )

    home_type = models.ForeignKey('house.HomeType', on_delete=models.PROTECT, null=True, verbose_name="Home Type")
    bedrooms = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Number of Bedrooms")
    bathrooms = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Number of Bathrooms")
    parking = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Number of parking spaces")

    rent = models.PositiveSmallIntegerField(default=0, blank=True, help_text="Per Week in AUD")
    min_stay = models.PositiveSmallIntegerField(
        verbose_name=_('Minimum length of stay'),
        help_text=_('In days. Minimum and Default is 4 weeks (28 days).'), null=True, blank=True, default=28,
        validators=[MinValueValidator(28)]
    )
    max_stay = models.PositiveSmallIntegerField(
        verbose_name=_('Maximum length of stay'),
        help_text=_('in days. 0 signifies no limit.'), null=True, blank=True
    )

    facilities = models.ManyToManyField('house.Facility', blank=True)
    rules = models.ManyToManyField('house.Rule', through='house.HouseRule', blank=True)
    other_rules = models.TextField(blank=True)

    cancellation_policy = models.ForeignKey('house.CancellationPolicy', on_delete=models.PROTECT, null=True, blank=True)

    other_people_description = models.TextField(blank=True)

    access_restrictions = models.TextField(blank=True)

    neighbourhood_description = models.TextField(blank=True)
    neighbourhood_facility = models.ManyToManyField('house.NeighbourhoodDescriptor', blank=True)

    STATUS = (
        ('I', 'Inactive'),
        ('P', 'Published'),
        ('D', 'Deleted')
    )
    status = models.CharField(max_length=1, choices=STATUS, default='I')

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    active_objects = ActiveHouseManager()

    # FIXME: get_thumbnail and is_thumbnail_available merge methods

    def get_thumbnail(self):
        try:
            image = Image.objects.filter(house=self, is_thumbnail=True)[0]
        except (Image.DoesNotExist, IndexError):
            return None
        else:
            return image.image

    def get_home_type_display(self):
        return "%s" % self.home_type.name

    # FIXME: needs to be removed
    def get_thumbnail_2(self):
        if self.is_thumbnail_available():
            thumbnailer = get_thumbnailer(self.get_thumbnail())
            url = thumbnailer.get_thumbnail({'crop': 'smart', 'size': (540, 360)})
            return '/media/' + str(url)
        return self.get_thumbnail()

    def is_thumbnail_available(self):
        try:
            Image.objects.get(house=self, is_thumbnail=True)
        except Image.DoesNotExist:
            return False
        else:
            return True

    def is_public(self):
        if self.status == 'P':
            return True
        return False

    def __str__(self):
        return "%s - %s [%s]" % (self.home_owner, self.location, self.address)

    def get_images(self):
        return self.image_set.all()

    def get_owner(self):
        return self.home_owner.user

    def get_owner_username(self):  # FIXME: FIX method name
        return self.get_owner().first_name

    def get_owner_pic(self):
        foo = self.get_owner().userprofile.get_profile_pic()
        return foo

    def get_location(self):
        if self.location:
            return self.location.name_full
        else:
            return None

    def save(self, *args, **kwargs):
        object_is_new = not self.pk
        super(House, self).save(*args, **kwargs)
        if object_is_new:
            HouseProfile.objects.create(house=self)
            rules = []
            for rule in Rule.objects.all():
                rules.append(HouseRule(house=self, rule=rule, value=rule.options[0]))
            HouseRule.objects.bulk_create(rules)

    def get_facilities(self):
        return self.facilities.all()

    def get_rules(self):
        return self.rules.all()

    def set_status(self, status):
        self.status = status


class Availability(models.Model):
    """
    All round availability can be marked by full year with periodic.
    """
    house = models.ForeignKey('house.House', on_delete=models.CASCADE)
    dates = DateRangeField()
    periodic = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.house


class Image(models.Model):
    house = models.ForeignKey('house.House', on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    image = models.ImageField(upload_to=get_file_path)
    is_thumbnail = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.house

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        qs = Image.objects.filter(house=self.house, is_thumbnail=True)
        if self.is_thumbnail:
            qs.update(is_thumbnail=False)
        else:
            if not qs:
                self.is_thumbnail = True
        return super(Image, self).save(force_insert=False, force_update=False, using=None,
                                       update_fields=None)

    def delete(self, *args, **kwargs):
        need_new_thumbnail = self.is_thumbnail
        data = super(Image, self).delete(*args, **kwargs)
        if need_new_thumbnail:
            try:
                obj = Image.objects.filter(house=self.house, is_thumbnail=False)[0]
            except IndexError:
                pass
            else:
                obj.is_thumbnail = True
                obj.save()
        return data


class HouseProfile(models.Model):
    """
    priority : Lower number represents higher priority (is particularly used in building frontend)
    """
    house = models.OneToOneField(House, on_delete=models.CASCADE)
    priority = models.PositiveSmallIntegerField(default=100)


class Facility(models.Model):
    """
    Facilities should have coherence across multiple properties, the current data relation of M2M facilitates user
    created as well as default system created facilities.
    """
    verbose = models.CharField(max_length=50)
    system_default = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.verbose


class NeighbourhoodDescriptor(models.Model):
    """
    Tags to describe the nearby area.
    """
    verbose = models.CharField(max_length=50)
    system_default = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


class HouseRule(models.Model):
    house = models.ForeignKey('house.House', on_delete=models.PROTECT)
    rule = models.ForeignKey('house.Rule', on_delete=models.PROTECT)
    value = models.CharField(max_length=50)
    comment = models.TextField(blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('house', 'rule')

    def __str__(self):
        return "%s for %s" % (self.rule, self.house)


class Rule(models.Model):
    """
    options = ["verbose option", ...]
    first element in option list is taken as default
    """
    verbose = models.CharField(max_length=50)
    options = ArrayField(models.CharField(max_length=50))
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.verbose


class Application(models.Model):
    house = models.OneToOneField('house.House', on_delete=models.PROTECT)
    tenant = models.OneToOneField('tenant.TenantProfile', on_delete=models.PROTECT)
    rent = models.PositiveIntegerField()
    date = DateRangeField(verbose_name=_('stay dates'))
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "'%s' applied for %s" % (self.tenant, self.house)

    class Meta:
        unique_together = ('house', 'tenant')


class CancellationPolicy(models.Model):
    verbose = models.TextField(verbose_name='Policy Name')
    description = models.TextField()
    properties = JSONField()
    official_policy = models.ForeignKey('essentials.Policy', on_delete=models.PROTECT, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.verbose
