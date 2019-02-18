from django.utils import timezone
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

    for availability in obj.get_availability(from_year=timezone.now().year, till_year=timezone.now().year):
        es_obj.add_availability(availability.lower, availability.upper)

    es_obj.find_delete_duplicates()
    es_obj.save()
