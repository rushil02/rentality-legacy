from django.utils import timezone

from elastic_search.models import Location


def index_to_es(verbose, parent_verbose, geo_point, identifier, keywords=None, commit=True):
    """
    Index location information to ElasticSearch
    :param commit: option to save in ES DB ot return an unsaved object
    :param identifier: unique identifier of object
    :param verbose: Text to display to user
    :param geo_point: django.contrib.gis.geos.Point object or None
    :param keywords: list of all keywords in address [suggesters are used on these words]
    :return:
    """
    if geo_point is not None:
        geo_point = {"lat": geo_point.y, "lon": geo_point.x}

    es_obj = Location(
        verbose=verbose,
        parent_verbose=parent_verbose,
        geo_point=geo_point,
        extra=keywords,
        obj_pk=identifier,
        create_time=timezone.now()
    )

    if not commit:
        return es_obj
    else:
        es_obj.find_delete_duplicates()
        es_obj.save()
        return es_obj
