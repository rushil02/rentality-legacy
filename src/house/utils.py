from elastic_search.models import House


def index_to_es(obj):
    if obj.get_owner().userprofile.get_profile_pic():
        image = obj.get_owner().userprofile.get_profile_pic().url
    else:
        image = None

    es_obj = House(
        obj_pk=obj.pk, address=obj.address, location=obj.get_location(), home_type=obj.home_type.name, uuid=obj.uuid,
        user_image=image, rent=obj.rent, min_stay=obj.min_stay, title=obj.title
    )
    es_obj.find_delete_duplicates()
    es_obj.save()
