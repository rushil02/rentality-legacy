from django.apps import AppConfig
from django.core.checks import Error, register


def es_connection_check(app_configs, **kwargs):
    # FIXME: Move ES connection check here (might need implementation changes in docker)

    # Checks if django is able to connect to ES, else raise CRITICAL error. Expectantly, Should not wait or retry.
    pass


class ElasticSearchConfig(AppConfig):
    name = 'elastic_search'

    def ready(self):
        from . import signals
        register(es_connection_check, deploy=True)

