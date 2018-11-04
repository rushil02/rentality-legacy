import os
import time
import uuid

from django.contrib.postgres.fields import DateRangeField
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import FileField
from django.db.models.fields.files import ImageFieldFile
from django.utils.translation import gettext_lazy as _
from easy_thumbnails.files import get_thumbnailer


def get_file_path(instance, filename):
    path = 'house_images/' + time.strftime('/%Y/%m/%d/')
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (instance.uuid, ext)
    return os.path.join(path, filename)


class RoomType(models.Model):
    name = models.TextField()

    def __str__(self):
        return "%s" % self.name


class ActiveHouseManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status__in=['P', 'L'])


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
    # TODO: add lazy verbose
    landlord = models.ForeignKey(
        'landlord.LandlordProfile',
        on_delete=models.CASCADE,
        related_name='houses',
        verbose_name=_('property owner')
    )
    address_hidden = models.TextField(blank=True)
    address = models.TextField(blank=True)
    location = models.ForeignKey(
        'cities.PostalCode',
        on_delete=models.PROTECT,
        verbose_name=_('location'),
        null=True, blank=True
    )

    room_type = models.ForeignKey('house.RoomType', on_delete=models.PROTECT, null=True, verbose_name="Home Type")
    other_room_type = models.TextField(blank=True)
    bedrooms = models.PositiveSmallIntegerField(blank=True, null=True)
    bathrooms = models.PositiveSmallIntegerField(blank=True, null=True)
    parking = models.PositiveSmallIntegerField(blank=True, null=True)

    other_people = models.PositiveSmallIntegerField(default=0)
    rent = models.PositiveSmallIntegerField(default=0)
    tags = models.ManyToManyField('house.Tag', blank=True)
    availability = DateRangeField(null=True, blank=True)
    min_stay = models.PositiveSmallIntegerField(help_text=_('in days'), null=True, blank=True)
    description = models.TextField(blank=True)

    STATUS = (
        ('I', 'Inactive'),
        ('P', 'Published'),
        ('L', 'Leased'),
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
            image = Image.objects.get(house=self, is_thumbnail=True)
        except Image.DoesNotExist:
            return None
        else:
            return image.image

    def get_room_type_display(self):
        return "%s" % self.room_type.name

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
        return "%s - %s [%s]" % (self.landlord, self.location, self.address)

    def get_images(self):
        return self.image_set.all()

    def get_owner(self):
        return self.landlord.user

    def get_owner_username(self):  # FIXME: FIX method name
        return self.get_owner().first_name

    def get_owner_pic(self):
        foo = self.get_owner().userprofile.get_profile_pic()
        print(foo)
        return foo

    def get_location(self):
        if self.location:
            return self.location.name_full
        else:
            return None

    def has_tags(self):
        return bool(self.tags.all())

    def save(self, *args, **kwargs):
        super(House, self).save(*args, **kwargs)
        house_profile = HouseProfile(house=self)
        house_profile.save()

    def get_facilities(self):
        return self.tags.filter(tag_type='F')

    def get_rules(self):
        return self.tags.filter(tag_type='R')


class Image(models.Model):
    house = models.ForeignKey('house.House', on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    image = models.ImageField(upload_to=get_file_path)
    is_thumbnail = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.image.name

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


class HouseProfile(models.Model):
    """
    priority : Lower number represents higher priority (is particularly used in building frontend)
    """
    house = models.OneToOneField(House, on_delete=models.CASCADE)
    priority = models.PositiveSmallIntegerField(default=100)


class Tag(models.Model):
    verbose = models.CharField(max_length=50)

    TAG_TYPE = (
        ('R', 'Preferences'),
        ('F', 'Facility'),
    )

    tag_type = models.CharField(max_length=1, choices=TAG_TYPE)
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
