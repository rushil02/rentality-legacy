from django.apps import AppConfig


class TenantConfig(AppConfig):
    name = 'tenant'

    def ready(self):
        from . import signals
