import traceback

from django.core.exceptions import ValidationError
from django.core.management import BaseCommand, CommandError

from house.models import House, Availability
from admin_custom.models import ActivityLog


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
    # FIXME
    pass


class Command(BaseCommand):
    """ Periodic Cleanup of System """

    help = 'Use for periodic cleanup and synchronisation of System'

    # FIXME: need to remove dangling facilities, welcome_tags, etc

    cleanup_func = {
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
