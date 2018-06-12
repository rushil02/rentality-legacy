from django.apps import AppConfig


class UserCustomConfig(AppConfig):
    name = 'user_custom'

    def ready(self):
        from . import signals
