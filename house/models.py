import os
import time
import uuid

from django.contrib.postgres.fields import DateRangeField
from django.db import models
from django.utils.translation import gettext_lazy as _
from easy_thumbnails.files import get_thumbnailer


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

    STATUS = (
        ('I', 'Incomplete'),
        ('P', 'Published'),
    )
    status = models.CharField(max_length=1, choices=STATUS, default='I')

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    # FIXME: get_thumbnail and is_thumbnail_available merge methods

    def get_thumbnail(self):
        try:
            image = Image.objects.get(house=self, is_thumbnail=True)
        except Image.DoesNotExist:
            return "/static/img/placeholders/apartment/default.png"
        else:
            return image.image

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

    def get_owner_username(self):
        return self.get_owner().email

    def get_owner_pic(self):
        foo = self.get_owner().userprofile.get_profile_pic()
        print(foo)
        return foo


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
