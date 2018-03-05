"""
Django settings for rentality project.

Generated by 'django-admin startproject' using Django 2.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

# SECRET KEY
from .secret import *

# BASE DIR
from .common import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Distributed settings
if DEBUG:
    from .development import *
else:
    from .production import *

ALLOWED_HOSTS = []

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django.contrib.sites',

    'rest_framework',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    # all-auth providers
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.instagram',
    'allauth.socialaccount.providers.twitter',
    'allauth.socialaccount.providers.pinterest',

    'user_custom',
    'admin_custom',
    'staff',
    'landlord',
    'tenant',
    'house',
    'essentials',
    'elastic_search',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'rentality.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'rentality.wsgi.application'

# Custom User Model
AUTH_USER_MODEL = 'user_custom.User'

# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)

# User Uploaded files

MEDIA_URL = '/media/'

# FIXME: choose right security permissions api class
# REST_FRAMEWORK = {
#     # Use Django's standard `django.contrib.auth` permissions,
#     # or allow read-only access for unauthenticated users.
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
#     ]
# }

# FIX site id for all auth
SITE_ID = 2

LOGIN_REDIRECT_URL = '/'

# Django all-auth
# http://django-allauth.readthedocs.io/en/latest/configuration.html
# ACCOUNT_ADAPTER = 'custom_package.all_auth_adapter.CustomAccountAdapter'
ACCOUNT_AUTHENTICATION_METHOD = 'email'  # Login field
ACCOUNT_CONFIRM_EMAIL_ON_GET = False  # User has to click a button on the redirected page
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = LOGIN_REDIRECT_URL  # Redirect to '/'
ACCOUNT_EMAIL_REQUIRED = True  # Email required for signing up
ACCOUNT_EMAIL_SUBJECT_PREFIX = "Rentality.com - "
ACCOUNT_LOGIN_ATTEMPTS_TIMEOUT = 3600  # User is blocked for this time after failure to repeatedly log in

# TODO: add config for other providers
# Social Account Providers setup  Docs - http://django-allauth.readthedocs.io/en/stable/providers.html
SOCIALACCOUNT_PROVIDERS = \
    {'facebook':
         {'METHOD': 'oauth2',
          'SCOPE': ['email', 'public_profile'],
          'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
          'FIELDS': [
              'id',
              'email',
              'name',
              'first_name',
              'last_name',
              'verified',
              'locale',
              'timezone',
              'link',
              'gender',
              'updated_time'],
          'VERIFIED_EMAIL': False,
          'VERSION': 'v2.4'},
     'google':
         {'SCOPE': ['profile', 'email'],
          'AUTH_PARAMS': {'access_type': 'online'}}
     }

# Forms
# ACCOUNT_FORMS = {
#     'login': 'user_custom.forms.CustomLoginForm',
#     'signup': 'user_custom.forms.CustomSignupForm',
#     'change_password': 'user_custom.forms.CustomChangePasswordForm',
#     'set_password': 'user_custom.forms.CustomSetPasswordForm',
#     'add_email': 'user_custom.forms.CustomAddEmailForm',
#     'reset_password': 'user_custom.forms.CustomResetPasswordForm',
#     'reset_password_from_key': 'user_custom.forms.CustomResetPasswordKeyForm'
# }
