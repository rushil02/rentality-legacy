from django.apps import AppConfig


class EssentialsConfig(AppConfig):
    name = 'essentials'

    def ready(self):
        from . import signals
