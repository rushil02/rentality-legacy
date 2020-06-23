from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from blog.models import Article, Tag
from blog.serializers import ArticlePublicSerializer, ArticleShortInfoSerializer, TagSerializer


class ArticlePublicReadView(APIView):
    def get(self, request, slug):
        try:
            article = Article.objects.get(active=True, slug=slug)
        except Article.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            article = ArticlePublicSerializer(article)
            return Response(article.data, status=status.HTTP_200_OK)


class PopularArticlesListView(APIView):
    def get(self, request):
        try:
            slice_start = int(request.GET.get('pagination-start', 0))
            slice_end = int(request.GET.get('pagination-end', slice_start + 10))
        except ValueError:
            slice_start = 0
            slice_end = 10
        articles = Article.objects.all().order_by('-priority')[slice_start:slice_end]
        return Response(ArticleShortInfoSerializer(articles, many=True).data, status=status.HTTP_200_OK)


class LatestArticlesListView(APIView):
    def get(self, request):
        articles = Article.objects.filter(active=True).order_by('-update_time')
        return Response(ArticleShortInfoSerializer(articles, many=True).data, status=status.HTTP_200_OK)


class PopularTagsListView(APIView):
    def get(self, request):
        tags = Tag.objects.all().order_by('-priority')[0:20]
        return Response(TagSerializer(tags, many=True).data, status=status.HTTP_200_OK)


class TagsRelatedArticlesListView(APIView):
    def get(self, request):
        try:
            tag = request.GET['tag']
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            slice_start = int(request.GET.get('pagination-start', 0))
            slice_end = int(request.GET.get('pagination-end', slice_start + 10))
        except ValueError:
            slice_start = 0
            slice_end = 10
        articles = Article.objects.filter(tags__verbose=tag).order_by('-update_time')[slice_start:slice_end]
        return Response(ArticleShortInfoSerializer(articles, many=True).data, status=status.HTTP_200_OK)
