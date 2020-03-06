from .common import *

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

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

EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
EMAIL_FILE_PATH = os.path.join(os.path.dirname(BASE_DIR), '__test_emails')


# Email settings (using Sendgrid via API) Should be always disabled in development
# SENDGRID_API_KEY = get_env_var("SENDGRID_API_KEY")
# EMAIL_BACKEND = "sendgrid_backend.SendgridBackend"
# SENDGRID_SANDBOX_MODE_IN_DEBUG = False

ALLOWED_HOSTS = ['*']

# Used to use Django settings in Template when in DEBUG=True mode
# These settings are not available in production or when this setting is not explicitly present
# WARNING: Always return true for check in list
INTERNAL_IPS = type(str('c'), (), {'__contains__': lambda *a: True})()
