import traceback

from django.core.management import BaseCommand, CommandError

from elastic_search.models import House as HouseElastic
from house.models import House
from house.utils import index_to_es


def synchronise_es():
    HouseElastic._index.delete()
    HouseElastic.init()
    for obj in House.active_objects.all():
        index_to_es(obj)


class Command(BaseCommand):
    """ Periodic Cleanup of System """

    help = 'Use for periodic cleanup and synchronisation of System'

    # FIXME: need to remove dangling facilities, welcome_tags, etc

    cleanup_func = {
        'Synchronise ElasticSearch Index - House': synchronise_es
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
