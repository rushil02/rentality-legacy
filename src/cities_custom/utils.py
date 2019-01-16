from elastic_search.models import Location


# def index_to_es(obj):
#     es_obj = House(
#         obj_pk=obj.pk, address=obj.address, location=obj.get_location(), home_type=obj.home_type.name, uuid=obj.uuid,
#         user_image=image, rent=obj.rent, min_stay=obj.min_stay, title=obj.title, thumbnail=thumbnail,
#         geo_point={"lat": obj.location.location.y, "lon": obj.location.location.x}
#     )
#     es_obj.find_delete_duplicates()
#     es_obj.save()
