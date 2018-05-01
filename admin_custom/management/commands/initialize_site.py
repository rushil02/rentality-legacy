import traceback


from allauth.socialaccount.models import SocialApp
from django.core.management.base import BaseCommand, CommandError
from django.contrib.sites.models import Site

from elastic_search.core.utils import get_index, create_mappings
from house.models import Tag, RoomType
from django.conf import settings


def social_apps_info():
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


def create_room__types():
    """ Creates all property types here """
    RoomType.objects.get_or_create(name="Whole Apartment")
    RoomType.objects.get_or_create(name="Whole House")
    RoomType.objects.get_or_create(name="Room in Share-house with Private bathroom")
    RoomType.objects.get_or_create(name="Room in Share-house with Shared bathroom")
    RoomType.objects.get_or_create(name="Student Accommodation")
    RoomType.objects.get_or_create(name="Home Stay")
    RoomType.objects.get_or_create(name="Granny Flat")
    RoomType.objects.get_or_create(name="Other")


# TODO
def add_flat_pages():
    pass


# def initialze_es():
#     get_index()
#     create_mappings()


class Command(BaseCommand):
    """ Initialize website db with data """

    help = 'Initialize website with settings and details data'

    web_init_func = {
        'Integrate OAuth info': social_apps_info,
        'Create tags': create_tags,
        'Add flat pages': add_flat_pages,
        'Create Property Type (room_type) choices': create_room__types,
        # 'Initialize ElasticSearch Mappings': initialze_es,
    }

    def ask_user_input(self, verbose):
        opt = input(verbose + " ? [y/n]\n")
        if opt in ['y', 'Y']:
            return True
        elif opt in ['n', 'N']:
            return False
        else:
            print("Invalid option.\n")
            return self.ask_user_input(verbose)

    def handle(self, *args, **options):
        try:
            for verbose, func in self.web_init_func.items():
                if self.ask_user_input(verbose):
                    func()
        except KeyError as e:
            print(e)
            traceback.print_stack()
            raise CommandError("Some problem occurred. Rolling back changes.")
        else:
            self.stdout.write("Website initialized with data")
