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
EMAIL_FILE_PATH = os.path.join(os.path.dirname(BASE_DIR), 'test_emails')

ALLOWED_HOSTS = ['*']
