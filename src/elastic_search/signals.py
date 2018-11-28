from django.dispatch import receiver
from django.db.models.signals import post_save

from elastic_search.models import House
from house.models import House
from house.utils import index_to_es


@receiver(post_save, sender=House)
def create_house_entry(sender, **kwargs):
    obj = kwargs.get('instance')
    if obj.is_public():
        try:
            index_to_es(obj)
        except Exception as e:
            # TODO: need a logger/ Error logging system
            print(e)
