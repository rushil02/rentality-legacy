from rest_framework import serializers

from blog.models import Article, Tag
from utils.api_thumbnailer import resize_image


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('verbose',)


class ArticleShortInfoSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='verbose')

    class Meta:
        model = Article
        fields = ('title', 'abstract', 'priority', 'thumbnail', 'update_time', 'create_time', 'tags', 'slug')


class LatestArticleShortInfoSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='verbose')
    thumbnail = serializers.SerializerMethodField(method_name='get_resized_image')

    class Meta:
        model = Article
        fields = ('title', 'abstract', 'priority', 'thumbnail', 'update_time', 'create_time', 'tags', 'slug')

    def get_resized_image(self, obj):
        return resize_image(obj.thumbnail, preset='latest_blog_articles')


class PopularArticleShortInfoSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='verbose')
    thumbnail_small = serializers.SerializerMethodField(method_name='get_resized_image_small')
    thumbnail_large = serializers.SerializerMethodField(method_name='get_resized_image_large')

    class Meta:
        model = Article
        fields = (
            'title', 'abstract', 'priority', 'thumbnail_small', 'thumbnail_large',
            'update_time', 'create_time', 'tags', 'slug'
        )

    def get_resized_image_small(self, obj):
        return resize_image(obj.thumbnail, preset='popular_blog_articles_small')

    def get_resized_image_large(self, obj):
        return resize_image(obj.thumbnail, preset='popular_blog_articles_large')


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
