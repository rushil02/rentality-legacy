from django.dispatch import receiver
from django.db.models.signals import post_save

from blog.models import Article
from elastic_search.models import House as HouseES, BlogArticle as BlogArticleES
from house.models import House


@receiver(post_save, sender=House)
def update_house_entry(sender, **kwargs):
    obj = kwargs.get('instance')
    if obj.is_public():
        try:
            HouseES.create(obj)
        except Exception as e:
            # TODO: need a logger/ Error logging system
            print(e)
    else:
        try:
            HouseES.delete_by_ref(obj.pk)
        except Exception as e:
            # TODO: need a logger/ Error logging system
            print(e)


@receiver(post_save, sender=Article)
def update_blog_entry(sender, **kwargs):
    obj = kwargs.get('instance')
    if obj.is_public():
        try:
            BlogArticleES.create(obj)
        except Exception as e:
            # TODO: need a logger/ Error logging system
            print(e)
    else:
        try:
            BlogArticleES.delete_by_ref(obj.pk)
        except Exception as e:
            # TODO: need a logger/ Error logging system
            print(e)
