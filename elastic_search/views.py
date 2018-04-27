from django.http import JsonResponse
from elasticsearch_dsl import Search
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from elastic_search.core.utils import create_connection, get_index_name
from elastic_search.models import House


@api_view(['GET'])
def suggestions(request):
    location = request.GET.get('location', None)

    if location:
        client = create_connection()
        s = Search(using=client, index=get_index_name(House))
        s = s.source(False)
        s = s.suggest(
            'suburb_suggestions',
            location,
            completion={
                'field': 'suburb.suggester',  # FIXME
                "fuzzy": {},
                'size': 20
            }
        )
        return Response(s.execute())
    else:
        return Response({"status": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def search_house(request, text):
    s = House.search().query('match', address='a')
    results = s.execute()
    return JsonResponse(results.to_dict())
