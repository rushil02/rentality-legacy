import time

from django.core.management import BaseCommand
from django.db import connection, OperationalError


class Command(BaseCommand):
    """ Periodic Cleanup of System """

    help = 'Check if required services are running'

    def add_arguments(self, parser):
        parser.add_argument(
            '--postgres',
            action='store_true',
            help='Check if postgres service is connectable',
        )
        parser.add_argument(
            '--es',
            action='store_true',
            help='Check if postgres service is connectable',
        )
        parser.add_argument(
            '--rabbitMQ',
            action='store_true',
            help='Check if postgres service is connectable',
        )

    def handle(self, *args, **options):
        """Handle the command"""
        self.stdout.write('Checking for services...')

        # Postgres Connection
        if options['postgres']:
            db_conn = None
            while not db_conn:
                try:
                    connection.ensure_connection()
                    db_conn = True
                except OperationalError:
                    self.stdout.write('Database unavailable, retrying in 3 seconds...')
                    time.sleep(3)
                else:
                    self.stdout.write(self.style.SUCCESS('Postgres is available!'))

        # ElasticSearch Connection
        # if options['es']:
        #     db_conn = None
        #     while not db_conn:
        #         try:
        #             connection.ensure_connection()
        #             db_conn = True
        #         except OperationalError:
        #             self.stdout.write('Database unavailable, retrying in 3 seconds...')
        #             time.sleep(3)
        #         else:
        #             self.stdout.write(self.style.SUCCESS('Postgres is available!'))
