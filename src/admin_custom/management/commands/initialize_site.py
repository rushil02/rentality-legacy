import os
import traceback

from allauth.socialaccount.models import SocialApp
from django.contrib.flatpages.models import FlatPage
from django.core.management.base import BaseCommand, CommandError
from django.contrib.sites.models import Site
from django.db.utils import IntegrityError

from elastic_search.core.utils import get_index, create_mappings
from house.models import Tag, RoomType
from django.conf import settings


def create_site():
    Site.objects.exclude(id=1, domain='rentality.com').delete()
    site_obj, s_created = Site.objects.get_or_create(id=1, domain='rentality.com', name='Rentality')
    return site_obj


def social_apps_info(site_obj):
    """ Creates OAuth api token information for django-allauth """

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
    Tag.objects.get_or_create(verbose="Gym", tag_type='F')
    Tag.objects.get_or_create(verbose="Pool", tag_type='F')
    Tag.objects.get_or_create(verbose="Amenities Available", tag_type='F')
    Tag.objects.get_or_create(verbose="Furnished", tag_type='F')
    Tag.objects.get_or_create(verbose="Pet Friendly", tag_type='R')
    Tag.objects.get_or_create(verbose="BackPacker Friendly", tag_type='R')
    Tag.objects.get_or_create(verbose="Children Friendly", tag_type='R')
    Tag.objects.get_or_create(verbose="LGBT+ Friendly", tag_type='R')
    Tag.objects.get_or_create(verbose="Family OK", tag_type='R')
    Tag.objects.get_or_create(verbose="Females Only", tag_type='R')


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


def register_flat_pages(site_obj):

    def get_text(file_name):
        if file_name:
            with open(os.path.join(settings.FLAT_PAGE_DOCS_DIR, file_name), 'r') as content_file:
                content = content_file.read()
            return content
        else:
            return ''

    def get_template(file_name):
        if file_name:
            return os.path.join(settings.FLAT_PAGE_TEMPLATES_FOLDER, file_name)
        else:
            return ''

    for flatpage in settings.FLAT_PAGE_TEMPLATES:
        obj, cr = FlatPage.objects.get_or_create(
            url=flatpage[0],
            title=flatpage[1],
            template_name=get_template(flatpage[2]),
            content=get_text(flatpage[3]),
            registration_required=flatpage[4]
        )
        obj.sites.add(site_obj)


# def initialze_es():
#     get_index()
#     create_mappings()


class Command(BaseCommand):
    """ Initialize website db with data """

    help = 'Initialize website with settings and details data'

    web_init_func = {
        'Integrate OAuth info': (social_apps_info, True),
        'Create tags': (create_tags, False),
        'Add flat pages': (register_flat_pages, True),
        'Create Property Type (room_type) choices': (create_room__types, False),
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
            site_obj = create_site()
            for verbose, func in self.web_init_func.items():
                if self.ask_user_input(verbose):
                    if func[1]:
                        func[0](site_obj)
                    else:
                        func[0]()
        except KeyError as e:
            print(e)
            traceback.print_stack()
            raise CommandError("Some problem occurred. Rolling back changes.")
        # except IntegrityError:
        #     raise CommandError("Problem with sites module")
        else:
            self.stdout.write("Website initialized with data")
