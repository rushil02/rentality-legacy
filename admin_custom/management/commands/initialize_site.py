import os
import urllib.request
import zipfile

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
                    print("%s: %s" % (attr[1],datum[attr[0]] ))


class Command(BaseCommand):
    """ Initialize website db with data """

    help = 'Initialize website with settings and details data'

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                social_apps_info()
                create_tags()
                collect_location_data()
        except Exception as e:
            print(e)
            raise CommandError("Some problem occurred. Rolling back changes.")
        else:
            self.stdout.write("Website initialized with data")
