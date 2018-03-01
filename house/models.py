from django.contrib.postgres.fields import DateRangeField
from django.db import models


class House(models.Model):
    # TODO: add lazy verbose
    landlord = models.ForeignKey('landlord.LandlordProfile', on_delete=models.CASCADE)
    address = models.TextField()
    location = models.ForeignKey('essentials.Location', on_delete=models.PROTECT)

    ROOM_TYPE = (
        ('A', 'Some room A')
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
    facilities = models.ManyToManyField('house.Tags')  # TODO: Django level DB check on tag
    availability = DateRangeField()
    description = models.TextField(blank=True)
    who_is_welcomed = models.ManyToManyField('house.Tags')


class Image(models.Model):
    house = models.ForeignKey('house.House', on_delete=models.CASCADE)
    image = models.ImageField()  # FIXME: upload_to
    description = models.CharField(max_length=250, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


class Tags(models.Model):
    verbose = models.CharField(max_length=50)

    TAG_TYPE = (
        ('R', 'Rule'),
        ('F', 'Facility')
    )

    tag_type = models.CharField(max_length=1, choices=TAG_TYPE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
