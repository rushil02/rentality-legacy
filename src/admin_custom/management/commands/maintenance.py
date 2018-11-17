from django.core.management import BaseCommand


class Command(BaseCommand):
    """ Periodic Cleanup of System """

    help = 'Use for periodic cleanup of System'

    # FIXME: need to remove dangling facilities
