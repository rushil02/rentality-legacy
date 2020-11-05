# TODO: set prod file
from .common import *

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': get_env_var('POSTGRES_DB'),
        'USER': get_env_var('POSTGRES_USER'),
        'PASSWORD': get_env_var('POSTGRES_PASSWORD'),
        'HOST': get_env_var('POSTGRES_HOST'),
        'PORT': '5432',
    }
}

STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), "static_dev", "static_root")

MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), "static_dev", "media_root")

# FIXME: update before final
ALLOWED_HOSTS = ['.rentality.com.au', '178.128.99.241', 'web']


# Logging information [External logger - Sentry]
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn=get_env_var("SENTRY_DSN"),
    integrations=[DjangoIntegration()],
    debug=False
)


# Email settings (using Sendgrid via API)
SENDGRID_API_KEY = get_env_var("SENDGRID_API_KEY")
EMAIL_BACKEND = "sendgrid_backend.SendgridBackend"
