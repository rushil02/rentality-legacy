from rest_framework import serializers

from blog.models import Article, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('verbose', )


class ArticleShortInfoSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='verbose')

    class Meta:
        model = Article
        fields = ('title', 'abstract', 'priority', 'thumbnail', 'update_time', 'create_time', 'tags', 'slug')


class TagAndArticleSerializer(serializers.ModelSerializer):
    article_set = ArticleShortInfoSerializer(many=True, read_only=True)

    class Meta:
        model = Tag
        fields = ('verbose', 'article_set')


class ArticlePublicSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='verbose')

    class Meta:
        model = Article
        exclude = ('priority', 'active', 'id')






