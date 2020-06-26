from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance

from cities_custom.models import CityCustom


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
