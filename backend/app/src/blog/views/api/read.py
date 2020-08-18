from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from blog.models import Article, Tag
from blog.serializers import ArticlePublicSerializer, ArticleShortInfoSerializer, TagSerializer, \
    TagAndArticleSerializer, PopularArticleShortInfoSerializer, LatestArticleShortInfoSerializer
from utils.api_utils import InternalAccessAPIView


class ArticlePublicReadView(APIView):
    def get(self, request, slug):
        try:
            article = Article.objects.get(active=True, slug=slug)
        except Article.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            article = ArticlePublicSerializer(article)
            return Response(article.data, status=status.HTTP_200_OK)


class AllArticlesPublicReadView(InternalAccessAPIView):
    def get(self, request, internal_access_key, *args, **kwargs):
        super(AllArticlesPublicReadView, self).get(request, internal_access_key)
        articles = Article.objects.filter(active=True)
        article_serializer = ArticlePublicSerializer(articles, many=True)
        return Response(article_serializer.data, status=status.HTTP_200_OK)


class PopularArticlesListView(APIView):
    def get(self, request):
        try:
            slice_start = int(request.GET.get('pagination-start', 0))
            slice_end = int(request.GET.get('pagination-end', slice_start + 10))
        except ValueError:
            slice_start = 0
            slice_end = 10
        total = Article.objects.filter(active=True).count()
        articles = Article.objects.filter(active=True).order_by('-priority')[slice_start:slice_end]
        return Response({"data": PopularArticleShortInfoSerializer(articles, many=True).data, "total": total}, status=status.HTTP_200_OK)


class LatestArticlesListView(APIView):
    def get(self, request):
        articles = Article.objects.filter(active=True).order_by('-update_time')
        return Response(LatestArticleShortInfoSerializer(articles, many=True).data, status=status.HTTP_200_OK)


class PopularTagsListView(APIView):
    def get(self, request):
        tags = Tag.objects.all().order_by('-priority')[0:20]
        return Response(TagSerializer(tags, many=True).data, status=status.HTTP_200_OK)


class AllTagsAndArticlesListView(InternalAccessAPIView):
    def get(self, request, internal_access_key, *args, **kwargs):
        super(AllTagsAndArticlesListView, self).get(request, internal_access_key)
        tags = Tag.objects.all().prefetch_related('article_set')
        return Response(TagAndArticleSerializer(tags, many=True).data, status=status.HTTP_200_OK)


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
        return Response(PopularArticleShortInfoSerializer(articles, many=True).data, status=status.HTTP_200_OK)
