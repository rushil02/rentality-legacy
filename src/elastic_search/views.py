from datetime import datetime
from django.http import JsonResponse
from elasticsearch import NotFoundError
from elasticsearch_dsl import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from elastic_search.core.utils import create_connection, get_index_name
from elastic_search.models import House, Location


@api_view(['GET'])
def suggestions(request):
    q = request.GET.get('location', None)
    if q:
        create_connection()
        s = Location.search()
        s = s.source(fields=['verbose', 'parent_verbose', 'geo_point'])
        # FIXME: Temp filter, remove "australia" later
        s = s.filter('term', extra="australia").query(
            Q("multi_match", query=q, fields=['verbose', 'extra'], fuzziness="AUTO")
        )  # .sort({"_score": {"order": "desc", "mode": "max"}})

        resp = s.execute().to_dict()['hits']['hits']
        return Response(resp, status=status.HTTP_200_OK)
    else:
        return Response({"status": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def search_house(request):
    in_loc_id = request.GET.get('loc_sugg', None)
    location = request.GET.get('location', '')
    start_date = request.GET.get('start-date', '')
    end_date = request.GET.get('end-date', '')
    slice_start = int(request.GET.get('pagination-start', 0))
    slice_end = int(request.GET.get('pagination-end', 10))

    if location and location == 'null':
        return JsonResponse({'details': "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

    in_loc = None
    if in_loc_id:
        try:
            in_loc = Location.get(id=in_loc_id)
        except NotFoundError:
            pass
        else:
            if in_loc.geo_point:
                in_loc = in_loc.geo_point
            else:
                in_loc = None

    if in_loc:
        s = House.search().filter(
            'geo_distance', distance='50km', geo_point=in_loc, distance_type='plane'
        )
    else:
        s = House.search().query(
            Q("multi_match", query=location, fields=['address', 'location'], fuzziness="AUTO")
        )

    try:
        if start_date and end_date and "null" not in [start_date, end_date]:
            start_date = datetime.strptime(start_date, "%d-%m-%Y").date()
            print(start_date)

            end_date = datetime.strptime(end_date, "%d-%m-%Y").date()
            print(end_date)
            # FIXME: Implement this
            # s = s.filter('range', availabilities={'gte': start_date, 'lte': end_date, 'relation': "contains"})
    except Exception:
        pass

    s = s.sort('-create_time', 'rent')[slice_start:slice_end]
    results = s.execute().to_dict()
    return JsonResponse(results['hits']['hits'], safe=False, status=status.HTTP_200_OK)
