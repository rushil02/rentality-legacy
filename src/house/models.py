import os
import time
import uuid

from django.contrib.postgres.fields import DateRangeField, ArrayField
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import FileField
from django.db.models.fields.files import ImageFieldFile
from django.utils.translation import gettext_lazy as _
from easy_thumbnails.files import get_thumbnailer
from django.contrib.postgres.fields import JSONField
from django.conf import settings


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


class HouseManager(models.Manager):
    def objects_from_owner(self, user):
        return super().get_queryset().filter(home_owner__user=user)


class DeleteManager(HouseManager):
    def get_queryset(self):
        return super().get_queryset().exclude(status='D')


class ActiveHouseManager(HouseManager):
    def get_queryset(self):
        return super().get_queryset().filter(status='P')


class House(models.Model):
    """
    tags -> contain many-to-many relation with model 'Tags' containing 'who-is-welcomed [rules]' or facility

    status description ->
    STATUS = (
        ('I', 'Inactive'),      Not Visible to Public, 1st state of any listing
        ('P', 'Published'),     Visible to Public
        ('D', 'Deleted')        Deleted from user's account visibility, still in Database
    )
    """

    # These fields are required to make the listing public [Published]
    REQUIRED_FIELDS = (
        'home_owner', 'title', 'furnished', 'address_hidden', 'address', 'location', 'home_type', 'bedrooms',
        'bathrooms', 'parking', 'rent', 'min_stay', 'facilities', 'rules', 'cancellation_policy', 'max_people_allowed',
        'neighbourhood_facilities', 'neighbourhood_description', 'welcome_tags', 'availability', 'image', 'description'
    )

    home_owner = models.ForeignKey(
        'home_owner.HomeOwnerProfile',
        on_delete=models.CASCADE,
        related_name='houses',
        verbose_name=_('property owner')
    )

    title = models.CharField(max_length=250, verbose_name='Property Name')

    FURNISHED_OPTIONS = (
        ('Y', 'Yes'),
        ('N', 'No')
    )
    furnished = models.CharField(max_length=1, blank=True, verbose_name='Furnished')

    address_hidden = models.TextField(blank=True, verbose_name="Unit Number or House Number",
                                      help_text="This is not visible to others unless a booking is made.")
    address = models.TextField(blank=True, verbose_name='Street Name')
    location = models.ForeignKey(
        'cities.PostalCode',
        on_delete=models.PROTECT,
        verbose_name=_('location'),
        null=True, blank=True
    )

    home_type = models.ForeignKey('house.HomeType', on_delete=models.PROTECT, null=True, verbose_name="Home Type")
    bedrooms = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Number of Bedrooms")
    bathrooms = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Number of Bathrooms")
    parking = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Number of parking spaces")

    rent = models.PositiveSmallIntegerField(blank=True, null=True, help_text="Per Week in AUD")
    promo_codes = models.ManyToManyField('promotions.PromotionalCode', blank=True)

    min_stay = models.PositiveSmallIntegerField(
        verbose_name=_('Minimum length of stay'),
        help_text=_('In days. Minimum and Default is 4 weeks (28 days).'), null=True, blank=True, default=28,
        validators=[MinValueValidator(28)]
    )
    max_stay = models.PositiveSmallIntegerField(
        verbose_name=_('Maximum length of stay'),
        help_text=_('in days. 0 signifies no limit.'), null=True, blank=True
    )

    max_people_allowed = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Maximum people allowed")

    description = models.TextField(blank=True, null=True, verbose_name="House Description")

    facilities = models.ManyToManyField('house.Facility', blank=True)
    rules = models.ManyToManyField('house.Rule', through='house.HouseRule', blank=True)
    other_rules = models.TextField(blank=True)

    cancellation_policy = models.ForeignKey('house.CancellationPolicy', on_delete=models.PROTECT, null=True, blank=True)

    other_people_description = models.TextField(blank=True)

    access_restrictions = models.TextField(blank=True)

    neighbourhood_description = models.TextField(blank=True)
    neighbourhood_facilities = models.ManyToManyField('house.NeighbourhoodDescriptor', blank=True)

    welcome_tags = models.ManyToManyField('house.WelcomeTag', blank=True)

    STATUS = (
        ('I', 'Inactive'),
        ('P', 'Published'),
        ('D', 'Deleted')
    )
    status = models.CharField(max_length=1, choices=STATUS, default='I')

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    objects = DeleteManager()
    active_objects = ActiveHouseManager()
    all_objects = HouseManager()

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
        return "%s - %s [%s]" % (self.home_owner, self.title, self.address_hidden)

    def get_images(self):
        return self.image_set.all()

    def get_owner(self):
        return self.home_owner.user

    def get_location(self):
        if self.location:
            return self.location.name_full
        else:
            return None

    def get_city(self):
        if self.location:
            return self.location.subregion_name
        else:
            return None

    def get_address(self):
        if self.address:
            return "%s, %s" % (self.address, self.get_location() or "")
        else:
            return None

    def get_rent(self, **kwargs):
        # TODO: Expand rent information on the basis of time, number of guests, etc.
        return self.rent

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

    def get_welcome_tags(self):
        return self.welcome_tags.all()

    def get_neighbourhood_facilities(self):
        return self.neighbourhood_facilities.all()

    def get_rules(self):
        return self.houserule_set.all().select_related('rule')

    def get_availability(self):
        return self.availability_set.all()

    def set_status(self, status):
        if status == 'P':
            self.verify_data_for_publishing()
        self.status = status

    def verify_data_for_publishing(self):
        """
        Tests if all required fields are present in the object
        :return: None [or will raise error]
        """
        errors = dict()

        for field_name in self.REQUIRED_FIELDS:
            field = self._meta.get_field(field_name)
            if isinstance(field, models.ManyToManyField):
                if field.related_model.objects.filter(house=self).count() == 0:
                    errors[field_name] = ValidationError('This field is required', code='required')
            elif (field.one_to_many or field.one_to_one) and field.auto_created and not field.concrete:
                if field.related_model.objects.filter(house=self).count() == 0:
                    errors[field_name] = ValidationError('This field is required', code='required')
            else:
                if getattr(self, field_name) in (None, '', ' '):
                    errors[field_name] = ValidationError('This field is required', code='required')

        if bool(errors):
            raise ValidationError(errors)

    def clean(self):
        super(House, self).clean()
        if self.max_stay and self.min_stay:
            if self.max_stay < self.min_stay:
                raise ValidationError("Maximum length of stay cannot be less than Minimum length of stay", code='invalid')


# FIXME: validate overlapping dates
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

    def __str__(self):
        return "%s" % self.verbose


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


class WelcomeTag(models.Model):
    """
    Tags to describe who is welcomed by the homeowner in particular to a house.
    """
    verbose = models.CharField(max_length=50)
    system_default = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.verbose


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


class CancellationPolicy(models.Model):
    verbose = models.TextField(verbose_name='Policy Name')
    description = models.TextField()
    properties = JSONField()
    official_policy = models.ForeignKey('essentials.Policy', on_delete=models.PROTECT, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.verbose
