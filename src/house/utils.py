from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance

from django.utils import timezone
from easy_thumbnails.exceptions import InvalidImageFormatError
from easy_thumbnails.files import get_thumbnailer

from cities_custom.models import CityCustom
from elastic_search.models import House


def index_to_es(obj):
    image = obj.get_owner().userprofile.get_profile_pic()
    if image:
        try:
            image = get_thumbnailer(image)['profile_search_page'].url
        except InvalidImageFormatError:
            image = '/static/image/placeholders/user/search-page.png'
    else:
        image = '/static/image/placeholders/user/search-page.png'

    thumbnail = obj.get_thumbnail()
    if thumbnail:
        try:
            thumbnail = get_thumbnailer(thumbnail)['house_search_page'].url
        except InvalidImageFormatError:
            thumbnail = '/static/image/placeholders/property/search-page.png'
    else:
        # FIXME: set defaults at a generic location with generic get method to avoid static path change problems
        thumbnail = '/static/image/placeholders/property/search-page.png'

    es_obj = House(
        obj_pk=obj.pk, address=obj.address, location=obj.get_location(), home_type=obj.home_type.name, uuid=obj.uuid,
        user_image=image, rent=obj.rent, min_stay=obj.min_stay, title=obj.title, thumbnail=thumbnail,
        geo_point={"lat": obj.location.location.y, "lon": obj.location.location.x}, create_time=obj.updated_on,
        leased=obj.is_marked_leased()
    )

    for availability in obj.get_availability(from_year=timezone.now().year, till_year=timezone.now().year):
        es_obj.add_availability(availability.lower, availability.upper)

    es_obj.find_delete_duplicates()
    es_obj.save()


def get_timezone_for_postal_code(postal_code_obj):
    """
    :param postal_code_obj: 'cities.models.PostalCode'
    :return: pytz timezone string
    """
    radian_dist = 1
    km_dist = 100

    ref_location = postal_code_obj.location

    while True:
        try:
            city_obj = CityCustom.objects.filter(
                country=postal_code_obj.country
            ).filter(
                location__dwithin=(ref_location, radian_dist)
            ).filter(
                location__distance_lte=(ref_location, D(km=km_dist))
            ).annotate(
                distance=Distance('location', ref_location)
            ).order_by('distance')[0]
        except IndexError:
            radian_dist = 2 * radian_dist
            km_dist = 2 * km_dist
        else:
            return city_obj.timezone


def check_user_can_change_house(house):
    """
    :param house: 'house.models.House' object
    :return: ...
    """
    ...
