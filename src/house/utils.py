from easy_thumbnails.files import get_thumbnailer

from elastic_search.models import House


def index_to_es(obj):
    image = obj.get_owner().userprofile.get_profile_pic()
    if image:
        image = get_thumbnailer(image)['profile_search_page'].url
    else:
        image = '/static/image/placeholders/user/search-page.png'

    thumbnail = obj.get_thumbnail()
    if thumbnail:
        thumbnail = get_thumbnailer(thumbnail)['house_search_page'].url
    else:
        # FIXME: set defaults at a generic location with generic get method to avoid static path cahnge problems
        thumbnail = '/static/image/placeholders/property/search-page.png'

    es_obj = House(
        obj_pk=obj.pk, address=obj.address, location=obj.get_location(), home_type=obj.home_type.name, uuid=obj.uuid,
        user_image=image, rent=obj.rent, min_stay=obj.min_stay, title=obj.title, thumbnail=thumbnail,
        geo_point={"lat": obj.location.location.y, "lon": obj.location.location.x}, create_time=obj.updated_on
    )
    es_obj.find_delete_duplicates()
    es_obj.save()


class HouseAvailability(object):
    def __init__(self, house, date_range):
        """

        :param house:
        :param date_range:
        """
        self.house = house
        self.date_range = date_range

        self._is_valid = None

    def is_valid(self):
        if self._is_valid is None:
            self._is_valid = self.check_dates()
        return self._is_valid

    def check_dates(self):
        # FIXME: URGENT
        house_dates = self.house.availability_set.filter()
        booked_dates = self.house.application_set.all()

        if self.house.availability_set.filter(dates__contains=self.date_range).count() > 0:
            return True
        else:
            return False