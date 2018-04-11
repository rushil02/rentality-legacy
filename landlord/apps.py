from django.apps import AppConfig


class LandlordConfig(AppConfig):
    name = 'landlord'

    def ready(self):
        from . import signals
