import time
import socket

from django.conf import settings
from kombu import Connection as KombuConnection

from django.core.management import BaseCommand, CommandError
from django.db import connection, OperationalError as PGOperationalError
from kombu.exceptions import OperationalError as KombuOperationalError

from elastic_search.core.utils import establish_es_connection


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
            help='Check if ElasticSearch service is connectable',
        )
        parser.add_argument(
            '--rabbitMQ',
            action='store_true',
            help='Check if RabbitMQ service is connectable',
        )
        parser.add_argument(
            '--migration',
            action='store_true',
            help='Check if DB Migration service is complete',
        )

    def handle(self, *args, **options):
        """Handle the command"""

        if not any([options['postgres'], options['es'], options['rabbitMQ'], options['migration']]):
            raise CommandError("At least one service argument is required")

        self.stdout.write('Checking for services...')

        # Postgres Connection
        if options['postgres']:
            conn = False
            while not conn:
                try:
                    connection.ensure_connection()
                    conn = True
                except PGOperationalError:
                    self.stdout.write('Database unavailable, retrying in 3 seconds...')
                    time.sleep(3)
                else:
                    self.stdout.write(self.style.SUCCESS('Postgres is available!'))

        # ElasticSearch Connection
        if options['es']:
            conn = False
            while not conn:
                try:
                    es_conn = establish_es_connection()
                    if es_conn is None:
                        raise AssertionError("Transport Error")
                except AssertionError:
                    self.stdout.write('ES unavailable, retrying in 5 seconds...')
                    time.sleep(5)
                else:
                    conn = True
                    self.stdout.write(self.style.SUCCESS('ElasticSearch is available!'))

        # RabbitMQ Connection
        if options['rabbitMQ']:
            conn = False
            while not conn:
                try:
                    rmq_conn = KombuConnection(settings.CELERY_BROKER_URL)
                    rmq_conn.ensure_connection(max_retries=2)
                except KombuOperationalError:
                    self.stdout.write('RabbitMQ unavailable, retrying in 5 seconds...')
                    time.sleep(5)
                else:
                    conn = True
                    self.stdout.write(self.style.SUCCESS('RabbitMQ is available!'))


        # Migrations Service Completion
        if options['migration']:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            server_address = ('migration', 1299)
            conn = False
            while not conn:
                try:
                    sock.connect(server_address)
                    sock.sendall(str.encode("Checking services"))
                    data = sock.recv(1024)
                    data = data.decode()
                    if data != "Service Complete":
                        raise AssertionError("Incorrect Message!")
                except (ConnectionRefusedError, socket.gaierror):
                    self.stdout.write('Migration service pending, checking in 5 seconds...')
                    time.sleep(5)
                else:
                    conn = True
                    self.stdout.write(self.style.SUCCESS('Migration Service is complete!'))
