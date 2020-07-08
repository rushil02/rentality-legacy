from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from elastic_search.core.utils import connect

from elastic_search.models import BlogArticle


class BlogSearchView(APIView):
    def get(self, request, *args, **kwargs):
        connect()
        s = BlogArticle.search()
        query = request.GET.get('q', '')
        slice_start = int(request.GET.get('pagination-start', 0))
        slice_end = int(request.GET.get('pagination-end', 10))
        # s = s.query(
        #     Q("multi_match", query=query, fields=['content', 'title', 'tags'], fuzziness="AUTO")
        # )
        s.query("match_all")
        s = s.sort('_score')[slice_start:slice_end]
        results = s.execute().to_dict()
        return Response(results['hits']['hits'], status=status.HTTP_200_OK)
