import os
import time
import uuid
from datetime import date, timedelta
from decimal import Decimal
from itertools import chain

from django.utils import timezone
from psycopg2.extras import DateRange
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

from house.helpers import check_house_availability, filter_past_dates, filter_small_date_ranges, get_available_dates, \
    filter_dates_wrt_lower
from house.utils import get_timezone_for_postal_code


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
    Minimum home_owner, title, location are required to create a house object.

    tags -> contain many-to-many relation with model 'Tags' containing 'who-is-welcomed [rules]' or facility

    status description ->
    STATUS = (
        ('I', 'Inactive'),      Not Visible to Public, 1st state of any listing
        ('P', 'Published'),     Visible to Public
        ('D', 'Deleted'),       Deleted from user's account visibility, still in Database
        ('B', 'Blocked')        Blocked from any user action
    )
    """

    # These fields are required to make the listing public [Published]
    REQUIRED_FIELDS = (
        'home_owner', 'title', 'furnished', 'address_hidden', 'address', 'location', 'home_type', 'bedrooms',
        'bathrooms', 'parking', 'rent', 'min_stay', 'facilities', 'rules', 'cancellation_policy', 'max_people_allowed',
        'neighbourhood_facilities', 'neighbourhood_description', 'welcome_tags', 'availability', 'image', 'description'
    )

    # region Fields

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
    )

    home_type = models.ForeignKey('house.HomeType', on_delete=models.PROTECT, null=True, verbose_name="Home Type")
    bedrooms = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Number of Bedrooms")
    bathrooms = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Number of Bathrooms")
    parking = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="Number of parking spaces")

    rent = models.PositiveSmallIntegerField(blank=True, null=True, help_text="Per Week in AUD")
    promo_codes = models.ManyToManyField('promotions.PromotionalCode', blank=True)

    business_config = models.ForeignKey('business_core.BusinessModelConfiguration', on_delete=models.PROTECT)
    payment_gateway = models.ForeignKey('payment_gateway.PaymentGateway', on_delete=models.PROTECT, null=True,
                                        blank=True)

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
    other_rules = models.TextField(blank=True, null=True)

    # FIXME: [URGENT] validate related cancellation_policy exists in the related business model configuration.
    cancellation_policy = models.ForeignKey('business_core.CancellationPolicy', on_delete=models.PROTECT, null=True,
                                            blank=True)

    other_people_description = models.TextField(blank=True, null=True)

    access_restrictions = models.TextField(blank=True, null=True)

    neighbourhood_description = models.TextField(blank=True, null=True)
    neighbourhood_facilities = models.ManyToManyField('house.NeighbourhoodDescriptor', blank=True)

    welcome_tags = models.ManyToManyField('house.WelcomeTag', blank=True)

    STATUS = (
        ('I', 'Inactive'),
        ('P', 'Published'),
        ('D', 'Deleted'),
        ('B', 'Blocked')
    )
    status = models.CharField(max_length=1, choices=STATUS, default='I')

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    local_timezone = models.CharField(max_length=50)

    objects = DeleteManager()
    active_objects = ActiveHouseManager()
    all_objects = HouseManager()

    # endregion

    def __str__(self):
        return "%s [%s]" % (self.title, self.address)

    # region Attribute getters
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

    def get_rent_per_day(self):
        return Decimal(self.rent) / 7

    # FIXME: needs to be removed
    def get_thumbnail_2(self):
        if self.is_thumbnail_available():
            thumbnailer = get_thumbnailer(self.get_thumbnail())
            url = thumbnailer.get_thumbnail({'crop': 'smart', 'size': (540, 360)})
            return '/media/' + str(url)
        return self.get_thumbnail()

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

    def get_facilities(self):
        return self.facilities.all()

    def get_welcome_tags(self):
        return self.welcome_tags.all()

    def get_neighbourhood_facilities(self):
        return self.neighbourhood_facilities.all()

    def get_rules(self):
        return self.houserule_set.all().select_related('rule')

    def get_availability(self, from_year=None, till_year=None):
        return get_available_dates(self, from_year, till_year)

    def get_complete_address(self):
        if self.address_hidden:
            return "%s, %s, %s" % (self.address_hidden, self.address, self.get_location() or "")
        else:
            return ""

    # endregion

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

    def save(self, *args, **kwargs):
        self.full_clean()
        object_is_new = not self.pk

        if object_is_new and not self.local_timezone:
            self.local_timezone = get_timezone_for_postal_code(self.location)

        super(House, self).save(*args, **kwargs)

        if object_is_new:
            HouseProfile.objects.create(house=self)
            rules = []
            for rule in Rule.objects.all():
                rules.append(HouseRule(house=self, rule=rule, value=rule.options[0]))
            HouseRule.objects.bulk_create(rules)

    def is_marked_leased(self):
        # FIXME: Connect to dynamic business model
        MAX_ESCROW_BUFFER = 90  # days
        constraint_range = DateRange(lower=timezone.now().date(),
                                     upper=(timezone.now() + timedelta(days=MAX_ESCROW_BUFFER)).date())
        if self.application_set.filter(date__overlap=constraint_range).exists():
            if len(filter_dates_wrt_lower(get_available_dates(
                    self, from_year=constraint_range.lower.year, till_year=constraint_range.upper.year
            ), constraint_range)) > 0:
                return False
            else:
                return True
        else:
            return False

    def update_status(self, status):
        self.status = status
        self.save()

    # FIXME: Write tests for this
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
                value = getattr(self, field_name)
                if (not value) and value != 0:  # Explicit check to pass if provided value is '0'
                    errors[field_name] = ValidationError('This field is required', code='required')

        if bool(errors):
            raise ValidationError(errors)

    def clean(self):
        super(House, self).clean()
        if self.max_stay and self.min_stay:
            if self.max_stay < self.min_stay:
                raise ValidationError(
                    {'max_stay': "Maximum length of stay cannot be less than Minimum length of stay"},
                    code='invalid'
                )

    def check_availability(self, lower, upper):
        """
        :param upper: datetime.date object
        :param lower: datetime.date object
        :return: Boolean
        """
        return check_house_availability(house=self, date_range=DateRange(lower=lower, upper=upper))


class AvailabilityManager(models.Manager):

    def add_date_ranges(self, house, date_list):
        """
        Validates and adds dates in reference to house. Automatically merges with other dates if required.
        :param house: House model object
        :param date_list: list of dict - [{'dates': psycopg2.extras.DateRange object, 'periodic': boolean}, ... ]
        """
        availabilities = self.get_queryset().filter(house=house)

        delete_rows = []
        create_rows = []
        new_date_ranges = [self.model(house=house, dates=x['dates'], periodic=x['periodic']) for x in date_list]
        for new_dates in new_date_ranges:
            create = True
            create_rows_remove_indexes = []

            for availability in chain(availabilities, create_rows):
                # Original Dates are equal to the new date information
                if (availability.dates.lower == new_dates.dates.lower) and (
                        availability.dates.upper == new_dates.dates.upper):
                    if (not availability.periodic) and new_dates.periodic:
                        if availability.pk:
                            delete_rows.append(availability.id)
                        else:
                            create_rows_remove_indexes.append(create_rows.index(availability))
                    else:
                        create = False
                        break

                # Original Dates already contain this date information
                elif (availability.dates.lower < new_dates.dates.lower) and (
                        availability.dates.upper > new_dates.dates.upper):
                    if (not availability.periodic) and new_dates.periodic:
                        continue
                    else:
                        create = False
                        break

                # Dates don't need to be merged
                elif (availability.dates.upper < new_dates.dates.lower) or (
                        availability.dates.lower > new_dates.dates.upper):
                    continue

                else:
                    if availability.periodic:
                        if new_dates.periodic:
                            new_dates.dates = DateRange(
                                lower=min(availability.dates.lower, new_dates.dates.lower),
                                upper=max(availability.dates.upper, new_dates.dates.upper)
                            )
                            if availability.pk:
                                delete_rows.append(availability.id)
                            else:
                                create_rows_remove_indexes.append(create_rows.index(availability))
                        else:
                            new_dates.dates = DateRange(
                                lower=min(availability.dates.lower, new_dates.dates.lower),
                                upper=max(availability.dates.upper, new_dates.dates.upper)
                            )
                    else:
                        if new_dates.periodic:
                            availability.dates = DateRange(
                                lower=min(availability.dates.lower, new_dates.dates.lower),
                                upper=max(availability.dates.upper, new_dates.dates.upper)
                            )
                            availability.save()
                        else:
                            new_dates.dates = DateRange(
                                lower=min(availability.dates.lower, new_dates.dates.lower),
                                upper=max(availability.dates.upper, new_dates.dates.upper)
                            )
                            if availability.pk:
                                delete_rows.append(availability.id)
                            else:
                                create_rows_remove_indexes.append(create_rows.index(availability))

            if create:
                create_rows_remove_indexes.sort(reverse=True)
                for i in create_rows_remove_indexes:
                    del create_rows[i]

                if new_dates.periodic and ((new_dates.dates.upper - new_dates.dates.lower).days >= 365):
                    curr_year = timezone.now().year
                    new_dates.dates = DateRange(lower=date(curr_year, 1, 1), upper=date(curr_year, 12, 31))

                new_dates.full_clean()  # raises ValidationErrors
                create_rows.append(new_dates)

        self.get_queryset().filter(id__in=delete_rows).delete()
        self.bulk_create(create_rows)


class Availability(models.Model):
    """
    Note: All round availability can be marked by full year with periodic.
    """
    house = models.ForeignKey('house.House', on_delete=models.CASCADE)
    dates = DateRangeField()
    periodic = models.BooleanField(default=False, verbose_name="Make the selected dates available every year")
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    objects = AvailabilityManager()

    def __str__(self):
        return "%s" % self.house

    def clean(self):
        if None not in [self.periodic, self.dates]:
            if self.periodic and ((self.dates.upper - self.dates.lower).days > 365):
                curr_year = timezone.now().year
                self.dates = DateRange(lower=date(curr_year, 1, 1), upper=date(curr_year, 12, 31))
            if not self.periodic:
                try:
                    self.dates = filter_past_dates(date_range=self.dates)
                except AssertionError:
                    raise ValidationError(
                        {'dates': ValidationError('The selected dates are not valid.', code='expired')})
            try:
                self.dates = filter_small_date_ranges(self.dates)
            except AssertionError:
                raise ValidationError(
                    {'dates': ValidationError('The selected dates are not valid.', code='invalid_small')})


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
                return data
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
