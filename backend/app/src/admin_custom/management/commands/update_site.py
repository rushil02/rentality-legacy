import os
import traceback

from django.contrib.flatpages.models import FlatPage
from django.core.management.base import BaseCommand, CommandError
from django.contrib.sites.models import Site

from house.models import HomeType, Facility, Rule, NeighbourhoodDescriptor, WelcomeTag
from django.conf import settings

from user_custom.models import PersonalityTag


def get_create_site(**kwargs):
    Site.objects.exclude(id=1, domain='rentality.com.au').delete()
    site_obj, s_created = Site.objects.get_or_create(id=1, domain='rentality.com.au', name='Rentality')
    return site_obj


# def social_apps_info(site_obj):
#     """ Creates OAuth api token information for django-allauth """
#
#     providers = settings.OAUTH_DETAILS
#
#     for provider in providers:
#         obj, created = SocialApp.objects.update_or_create(
#             provider=provider,
#             defaults=dict(name=providers[provider]['verbose'],
#                           secret=providers[provider]['secret'],
#                           client_id=providers[provider]['client_id'])
#         )
#
#         obj.sites.add(site_obj)


def create_facilities(**kwargs):
    FACILITIES = [
        'Wifi included', 'Gym', 'Balcony', 'Heater', 'Laundry', 'Garden', 'Swimming pool', 'Indoor Secured Carpark',
        'TV', 'Wheel Chair Accessible', 'Amenities Available', 'Smoke alarm', 'Lift', 'Air Condition', 'Fire place',
        'Barbecue Facilities'
    ]

    for facility_verbose in FACILITIES:
        Facility.objects.update_or_create(verbose=facility_verbose, defaults={'system_default': True})


def create_nearby_facilities(**kwargs):
    FACILITIES = [
        '24 Hours Convenience Store', 'Convenience Store', 'Pharmacy', 'University', 'Train Station', 'Bus Stop',
        'Grocery Store', 'Mall', 'CBD', 'City Centre', 'Sports Centre', 'Beach', 'Bar', 'Restaurants', 'Pub'
    ]

    for verbose in FACILITIES:
        NeighbourhoodDescriptor.objects.update_or_create(verbose=verbose, defaults={'system_default': True})


def create_personality_tags(**kwargs):
    TAGS = [
        'Hiker', 'Professional', 'Accountant', 'Vegan', 'Doglover', 'Blogger', 'TravelAddict', 'Introvert',
        'CoffeeAddict', 'GymCrazy', 'Nurse', 'HarryPotterFan'
    ]

    for verbose in TAGS:
        PersonalityTag.objects.update_or_create(verbose=verbose, defaults={'system_default': True})


def create_welcome_tags(**kwargs):
    TAGS = [
        'Pet Owners', 'Students', 'Smokers', '40+', 'Retiree', 'Parents with children', 'Backpackers',
        'LGBTQ+ Friendly',
        'Female Only', 'Everyone'
    ]

    for verbose in TAGS:
        WelcomeTag.objects.update_or_create(verbose=verbose, defaults={'system_default': True})


def create_house_rule(**kwargs):
    RULES = {
        'Smoking': ('Acceptable', 'Not Acceptable', 'Other'),
        'Pets': ('Acceptable', 'Not Acceptable', 'Other'),
        'Parties & Events': ('Acceptable', 'Not Acceptable', 'Other'),
        'Suitable for Children': ('Yes', 'No', 'Other'),
        'Arrival Time': ('Flexible', 'Other')
    }

    for rule in RULES:
        Rule.objects.update_or_create(verbose=rule, defaults={'options': RULES[rule]})


def create_home_types(**kwargs):
    """ Creates all property types here """
    HomeType.objects.update_or_create(name="Whole Apartment", defaults={'space_style': 'F'})
    HomeType.objects.update_or_create(name="Whole House", defaults={'space_style': 'F'})
    HomeType.objects.update_or_create(name="Room in Share-house with Private bathroom", defaults={'space_style': 'S'})
    HomeType.objects.update_or_create(name="Room in Share-house with Shared bathroom", defaults={'space_style': 'S'})
    HomeType.objects.update_or_create(name="Student Accommodation", defaults={'space_style': 'S'})
    HomeType.objects.update_or_create(name="Home Stay", defaults={'space_style': 'S'})
    HomeType.objects.update_or_create(name="Granny Flat", defaults={'space_style': 'S'})


def register_flat_pages(site_obj, **kwargs):
    """ Register Flat Pages """

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
        obj, cr = FlatPage.objects.update_or_create(
            url=flatpage[0],
            defaults={
                'title': flatpage[1],
                'template_name': get_template(flatpage[2]),
                'content': get_text(flatpage[3]),
                'registration_required': flatpage[4]
            }
        )
        obj.sites.add(site_obj)



class Command(BaseCommand):
    """ Initialize website db with data """

    help = 'Initialize website with settings and details data'

    web_init_func = {
        # 'Integrate OAuth info': (social_apps_info, True),
        'Add house data': [
            create_house_rule,
            create_facilities,
            create_home_types,
            create_nearby_facilities,
            create_welcome_tags
        ],
        'Add flat pages': register_flat_pages,
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
            site_obj = get_create_site()
            for verbose, func in self.web_init_func.items():
                if self.ask_user_input(verbose):
                    if isinstance(func, list):
                        for _func in func:
                            _func(site_obj=site_obj)
                    else:
                        func(site_obj=site_obj)
        except KeyError as e:
            print(e)
            traceback.print_stack()
            raise CommandError("Some problem occurred. Rolling back changes.")
        else:
            self.stdout.write("Website initialized with data")
