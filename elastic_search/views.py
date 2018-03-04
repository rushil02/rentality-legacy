from elasticsearch_dsl import Search
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from elastic_search.settings import INDEX_NAME
from elastic_search.utils import create_connection


@api_view(['GET'])
def suggestions(request):
    location = request.GET.get('location', None)

    if location:
        client = create_connection()
        s = Search(using=client, index=INDEX_NAME)
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
