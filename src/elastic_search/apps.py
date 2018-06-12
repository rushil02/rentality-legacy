from django.apps import AppConfig


class ElasticSearchConfig(AppConfig):
    name = 'elastic_search'

    def ready(self):
        from . import signals
