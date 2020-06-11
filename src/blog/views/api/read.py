from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from blog.models import Article
from blog.serializers import ArticlePublicSerializer


class ArticleListReadView(APIView):
    def get(self):
        articles = Article.objects.filter(active=True)
        return Response(ArticleListReadView(articles, many=True), status=status.HTTP_200_OK)


class ArticlePublicReadView(APIView):
    def get(self, slug):
        try:
            article = Article.objects.get(active=True, slug=slug)
        except Article.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            article = ArticlePublicSerializer(article)
            return Response(article, status=status.HTTP_200_OK)