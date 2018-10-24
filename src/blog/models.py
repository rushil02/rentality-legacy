import os
import time
import uuid

from django.db import models


def get_article_thumbnail_path(instance, filename):
    path = 'blog/thumbnails/' + time.strftime('/%Y/%m/%d/')
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join(path, filename)


class ArticleActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(active=True)


class Article(models.Model):
    title = models.CharField(max_length=250)
    keywords = models.TextField(help_text="Separate the keywords using comma")
    description = models.CharField(help_text="Page Meta Description for SEO", max_length=160)
    abstract = models.CharField(help_text="Used for preview", max_length=250)
    content = models.TextField()
    slug = models.SlugField(unique=True)
    priority = models.PositiveSmallIntegerField(default=0, help_text="Higher number sets higher priority")
    thumbnail = models.ImageField(upload_to=get_article_thumbnail_path)
    tags = models.TextField(help_text="Verbose Tags to find similar articles [Separate the tags using comma]")

    active = models.BooleanField(default=False, help_text="Set to True to publish the article")
    update_time = models.DateTimeField(auto_now=True)
    create_time = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()
    active_objects = ArticleActiveManager()

    def __str__(self):
        return "%s" % self.title
