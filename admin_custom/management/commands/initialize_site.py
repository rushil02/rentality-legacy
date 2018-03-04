from allauth.socialaccount.models import SocialApp
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.contrib.sites.models import Site

from house.models import Tag


def socail_apps_info():  # TODO: Update method with actual keys
    """ Creates OAuth api token information for django-allauth """

    site_obj, s_created = Site.objects.get_or_create(domain='rentality.com', name='Opuslog')
    fb_obj, fb_created = SocialApp.objects.get_or_create(provider='facebook', name='Facebook',
                                                         secret='some-key', client_id='some-id')
    fb_obj.sites.add(site_obj)

    gg_obj, gg_created = SocialApp.objects.get_or_create(provider='google', name='Google',
                                                         secret='some-key', client_id='some-id')
    gg_obj.sites.add(site_obj)


def create_tags():  # TODO: Set all tags here
    """ Creates all house tags here """

    Tag.objects.get_or_create(verbose="No Smoking", tag_type='R')
    Tag.objects.get_or_create(verbose="Wifi included", tag_type='F')


class Command(BaseCommand):
    """ Initialize website db with data """

    help = 'Initialize website with settings and details data'

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                socail_apps_info()
                create_tags()
        except Exception as e:
            print(e)
            raise CommandError("Some problem occurred. Rolling back changes.")
        else:
            self.stdout.write("Website initialized with data")
