from rest_framework import serializers

from blog.models import Article, Tag


class ArticlePublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        exclude = ('priority', 'active', 'id')


class ArticleShortInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'abstract', 'priority', 'thumbnail', 'update_time', 'create_time', 'tags', 'slug')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('verbose', )
