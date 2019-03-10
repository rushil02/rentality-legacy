import traceback

from django.core.exceptions import ValidationError
from django.core.management import BaseCommand, CommandError

from cities_custom.models import PostalCodeCustom, CityCustom, DistrictCustom, RegionCustom, SubRegionCustom
from elastic_search.core.settings import BULK_CHUNK_SIZE
from elastic_search.models import House as HouseElastic, Location as LocationElastic
from house.models import House, Availability
from house.utils import index_to_es as index_house_to_es
from cities_custom.utils import index_to_es as index_location_to_es
from admin_custom.models import ActivityLog


def synchronise_es_house():
    HouseElastic._index.delete()
    HouseElastic.init()
    print("Loading Active Houses ...", flush=True)
    qs = House.active_objects.all()
    total = len(qs)
    for i, obj in enumerate(qs):
        index_house_to_es(obj)

        if i % 10 == 0:
            print(
                'Loading: %s%s %d%% [%d]    ' % (
                    "#" * int((i / total) * 100),
                    " " * int(((total - i) / total) * 100),
                    int((i / total) * 100),
                    i
                ),
                end='\r', flush=True
            )
    print("\nSynchronisation ... Complete [%d objects]" % total, flush=True)


def clean_house_availability_dates():
    """
    Warning: this rewrites all the dates
    """
    for house in House.objects.all():
        availabilities = list(house.availability_set.all().values('dates', 'periodic'))
        house.availability_set.all().delete()
        try:
            Availability.objects.add_date_ranges(house=house, date_list=availabilities)
        except ValidationError as e:
            availabilities = map(lambda availability: {
                    'start_date': availability['dates'].lower,
                    'end_date': availability['dates'].upper,
                    'periodic': availability['periodic']
                },
                availabilities
            )
            ActivityLog.objects.create_log(
                request=None, 
                actor=None, 
                entity=house, 
                level='C',
                view='clean_house_availability_dates',
                message='Validation Failed for Availability for house = {}'.format(house.uuid),
                traceback=traceback.format_exc(),
                availabilities=availabilities
            )
            continue


def clean_house_image_thumbnails():
    """
    Use when there are images but either none is selected as thumbnail,
    :return:
    """
    pass


def synchronise_es_location():
    """
    Use to update ElasticSearch Location Index
    :return:
    """
    LocationElastic._index.delete()
    LocationElastic.init()

    def _load_data(_model, related_models, verbose):
        print("Loading %s ..." % verbose, flush=True)
        qs = _model.objects.all().select_related(*related_models)
        total = len(qs)
        buffer = []
        for i, location in enumerate(qs):
            obj = index_location_to_es(
                verbose=location.get_verbose(), parent_verbose=location.get_parents(), geo_point=location.get_geo_loc_point(),
                identifier=location.get_identifier(), keywords=location.get_all_keywords(), commit=False
            )
            buffer.append(obj)
            if len(buffer) >= BULK_CHUNK_SIZE:
                LocationElastic.bulk_create(buffer)
                buffer = []

            if i % 10 == 0:
                print(
                    'Loading: %s%s %d%% [%d]    ' % (
                        "#" * int((i / total) * 100),
                        " " * int(((total - i) / total) * 100),
                        int((i / total) * 100),
                        i
                    ),
                    end='\r', flush=True
                )

        if len(buffer) > 0:
            LocationElastic.bulk_create(buffer)
        print("\nLoading %s ... Complete [%d objects]" % (verbose, total), flush=True)

    _load_data(PostalCodeCustom, ['country', 'region', 'subregion', 'city', 'district'], "Postal Codes")
    _load_data(CityCustom, ['country', 'region', 'subregion'], "Cities")
    _load_data(DistrictCustom, ['city', ], "Districts")
    _load_data(RegionCustom, ['country', ], "Regions")
    _load_data(SubRegionCustom, ['region', ], "SubRegions")


class Command(BaseCommand):
    """ Periodic Cleanup of System """

    help = 'Use for periodic cleanup and synchronisation of System'

    # FIXME: need to remove dangling facilities, welcome_tags, etc

    cleanup_func = {
        'Synchronise ElasticSearch Index - Locations': synchronise_es_location,
        'Synchronise ElasticSearch Index - House': synchronise_es_house,
        'Clean [Reset by re-population] Availability dates for all Houses': clean_house_availability_dates,
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
            for verbose, func in self.cleanup_func.items():
                if self.ask_user_input(verbose):
                    func()
        except KeyError as e:
            print(e)
            traceback.print_stack()
            raise CommandError("Some problem occurred. Rolling back changes.")
        else:
            self.stdout.write("Maintenance task complete.")
