import traceback

from django.core.exceptions import ValidationError
from django.core.management import BaseCommand, CommandError

from elastic_search.core.utils import recreate_indexes
from elastic_search.models import House as HouseElastic
from house.models import House, Availability
from house.utils import index_to_es


def synchronise_es():
    HouseElastic._index.delete()
    HouseElastic.init()
    for obj in House.active_objects.all():
        index_to_es(obj)


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
            # FIXME: Log errors somewhere
            print(house.title)
            print(availabilities)
            print(e)
            print("*"*100)
            continue


def clean_house_image_thumbnails():
    """
    Use when there are images but either none is selected as thumbnail,
    :return:
    """
    pass


class Command(BaseCommand):
    """ Periodic Cleanup of System """

    help = 'Use for periodic cleanup and synchronisation of System'

    # FIXME: need to remove dangling facilities, welcome_tags, etc

    cleanup_func = {
        'Synchronise ElasticSearch Index - House': synchronise_es,
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
