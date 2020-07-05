
from elasticsearch_dsl import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from elastic_search.core.utils import connect
from elastic_search.models import Location


@api_view(['GET'])
def suggestions(request):
    q = request.GET.get('location', None)
    if q:
        connect()
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
