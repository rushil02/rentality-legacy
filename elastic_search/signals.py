from django.dispatch import receiver
from django.db.models.signals import post_save

from elastic_search.models import House
from house.models import House


@receiver(post_save, sender=House)
def create_house_entry(sender, **kwargs):
    obj = kwargs.get('instance')
    print("*" * 200)
    if obj.is_public():
        try:
            es_obj = House(
                obj_pk=obj.id, address=obj.address,
            )
            es_obj.find_delete_duplicates()
            es_obj.save()

        except Exception as e:
            # TODO: need a logger/ Error logging system
            print(e)