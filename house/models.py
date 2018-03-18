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
    address = models.TextField()
    location = models.ForeignKey(
        'essentials.Location',
        on_delete=models.PROTECT,
        verbose_name=_('location')
    )

    ROOM_TYPE = (
        ('A', 'Some room A'),
    )
    room_type = models.CharField(max_length=1, choices=ROOM_TYPE)

    BEDROOMS = (
        ('1', '1'),
        ('2', '2'),
        ('3', '3+')
    )
    bedrooms = models.CharField(max_length=1, choices=BEDROOMS)

    BATHROOMS = (
        ('1', '1'),
        ('2', '2'),
        ('3', '3+')
    )
    bathrooms = models.CharField(max_length=1, choices=BEDROOMS)

    PARKING = (
        ('1', '1'),
        ('2', '2'),
        ('3', '3+')
    )
    parking = models.CharField(max_length=1, choices=BEDROOMS)

    other_people = models.PositiveSmallIntegerField(default=0)
    rent = models.PositiveSmallIntegerField(default=0)
    tags = models.ManyToManyField('house.Tag')
    availability = DateRangeField()
    description = models.TextField(blank=True)
    uuid = models.UUIDField(default=uuid.uuid4(), editable=False, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s - %s [%s]" % (self.landlord, self.location, self.address)


class Image(models.Model):
    house = models.ForeignKey('house.House', on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    image = models.ImageField(upload_to=get_file_path)
    description = models.CharField(max_length=250, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.image.name


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
