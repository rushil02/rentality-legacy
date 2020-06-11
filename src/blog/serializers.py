from rest_framework import serializers

from blog.models import Article


class ArticlePublicSerializer(serializers.Serializer):
    class Meta:
        model = Article
        fields = '__all__'
        # read_only_fields = ('id', 'verbose', 'description', 'official_policy')


class ArticleShortInfoSerializer(serializers.Serializer):
    class Meta:
        model = Article
        fields = ('title', 'abstract')
        # read_only_fields = ('id', 'verbose', 'description', 'official_policy')