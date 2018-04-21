import os
import traceback
import urllib.request
import zipfile

from allauth.socialaccount.models import SocialApp
from django.core.management.base import BaseCommand, CommandError
from django.contrib.sites.models import Site

from elastic_search.core.utils import get_index, create_mappings
from house.models import Tag
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


# TODO: populate table, scrapper complete, merge with es
def collect_location_data():
    """ Gets and stores all the location data (cities, suburbs, countries, towns) in DB. """

    data_key = (
        (1, 'name'),
        (3, 'alternate_name'),
        (8, 'country_code'),
        (9, 'country_code2'),
    )

    lib_path = os.path.join(settings.LIB_PATH, 'geo_data')
    zip_file = os.path.join(lib_path, 'loc.zip')
    ex_data_folder = os.path.join(lib_path, 'data')

    opt = int(input("Enter 1 to download or else to extract from already defined [unzipped] lib.\n"))

    if opt == 1:
        def show_progress(block_num, block_size, total_size):
            print("%s bytes of %s bytes downloaded\r" % ((block_num * block_size), total_size))

        os.makedirs(os.path.dirname(zip_file), exist_ok=True)
        url = 'http://download.geonames.org/export/dump/allCountries.zip'
        urllib.request.urlretrieve(url, zip_file, show_progress)
        print("Download Complete")

        with zipfile.ZipFile(zip_file, 'r') as f:
            f.extractall(ex_data_folder)

    data_files = [os.path.join(ex_data_folder, f) for f in os.listdir(ex_data_folder) if
                  os.path.isfile(os.path.join(ex_data_folder, f))]

    for data_file in data_files:
        with open(data_file, 'r') as f:
            while True:
                line = f.readline()
                if not line:
                    break
                datum = line.split('\t')
                for attr in data_key:
                    print("%s: %s" % (attr[1], datum[attr[0]]))


# TODO
def add_flat_pages():
    pass


def initialze_es():
    get_index()
    create_mappings()


class Command(BaseCommand):
    """ Initialize website db with data """

    help = 'Initialize website with settings and details data'

    web_init_func = {
        # 'Integrate OAuth info': social_apps_info,
        # 'Create tags': create_tags,
        # 'Integrate world location data': collect_location_data,
        # 'Add flat pages': add_flat_pages,
        'Initialize ElasticSearch Mappings': initialze_es,
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
