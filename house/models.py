import os
import time
import uuid

from django.contrib.postgres.fields import DateRangeField
from django.db import models
from django.utils.translation import gettext_lazy as _


def get_file_path(instance, filename):
    path = 'house_images/' + time.strftime('/%Y/%m/%d/')
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (instance.uuid, ext)
    return os.path.join(path, filename)


class House(models.Model):
    """
    tags -> contain many-to-many relation with model 'Tags' containing 'who-is-welcomed [rules]' or facility
    """
    # TODO: add lazy verbose
    landlord = models.ForeignKey(
        'landlord.LandlordProfile',
        on_delete=models.CASCADE,
        related_name='houses',
        verbose_name=_('property owner')
    )
    address = models.TextField(blank=True)
    location = models.ForeignKey(
        'essentials.Location',
        on_delete=models.PROTECT,
        verbose_name=_('location'),
        null=True, blank=True
    )

    ROOM_TYPE = (
        ('A', 'Whole Apartment'),
        ('B', 'Whole House'),
        ('C', 'Room in Share-house with Private bathroom'),
        ('D', 'Room in Share-house with Shared bathroom'),
        ('E', 'Student Accommodation'),
        ('F', 'Home Stay'),
        ('G', 'Granny Flat'),
        ('O', 'Other'),
    )
    room_type = models.CharField(max_length=1, choices=ROOM_TYPE, blank=True)
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
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def get_thumbnail(self):
        try:
            image = Image.objects.get(house=self, is_thumbnail=True)
        except Image.DoesNotExist:
            return "/static/img/placeholders/apartment/default.png"
        else:
            return image.image.url

    def __str__(self):
        return "%s - %s [%s]" % (self.landlord, self.location, self.address)


class Image(models.Model):
    house = models.ForeignKey('house.House', on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    image = models.ImageField(upload_to=get_file_path)
    is_thumbnail = models.BooleanField(default=False)
    description = models.CharField(max_length=250, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.image.name

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.is_thumbnail:
            Image.objects.filter(house=self.house).update(is_thumbnail=False)
        return super(Image, self).save(force_insert=False, force_update=False, using=None,
                                       update_fields=None)


class Tag(models.Model):
    verbose = models.CharField(max_length=50)

    TAG_TYPE = (
        ('R', 'Rule'),
        ('F', 'Facility')
    )

    tag_type = models.CharField(max_length=1, choices=TAG_TYPE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.verbose


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
