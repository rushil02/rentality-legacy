from django.apps import AppConfig


class HomeOwnerConfig(AppConfig):
    name = 'home_owner'

    def ready(self):
        from . import signals
