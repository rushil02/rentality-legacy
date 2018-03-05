from allauth.socialaccount.models import SocialApp
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.contrib.sites.models import Site

from house.models import Tag
from django.conf import settings


def social_apps_info():  # TODO: Update method with actual keys
    """ Creates OAuth api token information for django-allauth """

    site_obj, s_created = Site.objects.get_or_create(domain='rentality.com', name='Rentality')

    providers = settings.OAUTH_DETAILS

    for provider in providers:
        obj, created = SocialApp.objects.get_or_create(
            provider=provider,
            name=providers[provider]['verbose'],
            secret=providers[provider]['secret'],
            client_id=providers[provider]['client_id']
        )

        obj.sites.add(site_obj)


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
                social_apps_info()
                create_tags()
        except Exception as e:
            print(e)
            raise CommandError("Some problem occurred. Rolling back changes.")
        else:
            self.stdout.write("Website initialized with data")
