"""
Django settings for rentality project.

Generated by 'django-admin startproject' using Django 2.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

# BASE DIR
from .common import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_env_var('SECRET_KEY')


# SECURITY WARNING: don't run with debug turned on in production!
def _get_debug_val():
    debug = get_env_var('DEBUG')
    if debug == "True":
        return True
    elif debug == "False":
        return False
    else:
        raise ValueError('Django DEBUG value is improperly configured')


DEBUG = _get_debug_val()

# Distributed settings
if DEBUG:
    from .development import *
else:
    from .production import *

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)

# Application definition
INSTALLED_APPS = [
    'dal',
    'dal_select2',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django.contrib.sites',
    'django.contrib.flatpages',
    'django.contrib.sitemaps',
    'django.contrib.gis',

    'debug_toolbar',
    'cities',
    'rest_framework',
    'rest_framework_gis',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'easy_thumbnails',
    'formtools',
    'django_summernote',

    # all-auth providers
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.instagram',
    'allauth.socialaccount.providers.twitter',
    'allauth.socialaccount.providers.pinterest',

    'user_custom.apps.UserCustomConfig',
    'admin_custom.apps.AdminCustomConfig',
    'staff.apps.StaffConfig',
    'home_owner.apps.HomeOwnerConfig',
    'house.apps.HouseConfig',
    'tenant.apps.TenantConfig',
    'essentials.apps.EssentialsConfig',
    'elastic_search.apps.ElasticSearchConfig',
    'messaging.apps.MessagingConfig',
    'cities_custom.apps.CitiesCustomConfig',
    'blog.apps.BlogConfig',
    'billing.apps.BillingConfig',
    'application.apps.ApplicationConfig',
    'promotions.apps.PromotionsConfig',
    'payment_gateway.apps.PaymentGatewayConfig',
    'business_core.apps.BusinessCoreConfig'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

ROOT_URLCONF = 'rentality.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates', 'v2')],
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
    os.path.join(BASE_DIR, "static", "v2"),
)

# User Uploaded files

MEDIA_URL = '/media/'

FILE_UPLOAD_PERMISSIONS = 0o644

# FIXME: choose right security permissions api class
# REST_FRAMEWORK = {
#     # Use Django's standard `django.contrib.auth` permissions,
#     # or allow read-only access for unauthenticated users.
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
#     ]
# }

# FIXME: site id for all auth
SITE_ID = 1

LOGIN_REDIRECT_URL = '/'
LOGIN_URL = '/accounts/login'

# Django all-auth
# http://django-allauth.readthedocs.io/en/latest/configuration.html
ACCOUNT_ADAPTER = 'user_custom.adapter.CustomAccountAdapter'
ACCOUNT_AUTHENTICATION_METHOD = 'email'  # Login field
ACCOUNT_CONFIRM_EMAIL_ON_GET = False  # User has to click a button on the redirected page
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = LOGIN_REDIRECT_URL  # Redirect to '/'
ACCOUNT_EMAIL_REQUIRED = True  # Email required for signing up
ACCOUNT_EMAIL_SUBJECT_PREFIX = "Rentality.com.au - "
ACCOUNT_LOGIN_ATTEMPTS_TIMEOUT = 3600  # User is blocked for this time after failure to repeatedly log in
ACCOUNT_LOGOUT_ON_GET = True
SOCIALACCOUNT_EMAIL_VERIFICATION = 'none'

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
              'updated_time'
          ],
          'VERIFIED_EMAIL': False,
          'VERSION': 'v2.4'},
     'google':
         {'SCOPE': ['profile', 'email'],
          'AUTH_PARAMS': {'access_type': 'online'}}
     }

# Forms
ACCOUNT_FORMS = {
    'login': 'user_custom.forms.CustomLoginForm',
    'signup': 'user_custom.forms.CustomSignupForm',
    'change_password': 'user_custom.forms.CustomChangePasswordForm',
    # 'set_password': 'user_custom.forms.CustomSetPasswordForm',
    # 'add_email': 'user_custom.forms.CustomAddEmailForm',
    'reset_password': 'user_custom.forms.CustomResetPasswordForm',
    'reset_password_from_key': 'user_custom.forms.CustomResetPasswordKeyForm'
}
OAUTH_DETAILS = {
    "facebook": {
        "verbose": "Facebook",
        "secret": get_env_var('OAUTH_FACEBOOK_SECRET'),
        "client_id": get_env_var('OAUTH_FACEBOOK_CLIENT_ID')
    },
    "google": {
        "verbose": "Google",
        "secret": get_env_var('OAUTH_GOOGLE_SECRET'),
        "client_id": get_env_var('OAUTH_GOOGLE_CLIENT_ID')
    },
    "twitter": {
        "verbose": "Twitter",
        "secret": get_env_var('OAUTH_TWITTER_SECRET'),
        "client_id": get_env_var('OAUTH_TWITTER_CLIENT_ID')
    },
    "instagram": {
        "verbose": "Instagram",
        "secret": get_env_var('OAUTH_INSTAGRAM_SECRET'),
        "client_id": get_env_var('OAUTH_INSTAGRAM_CLIENT_ID')
    },
    "pinterest": {
        "verbose": "Pinterest",
        "secret": get_env_var('OAUTH_PINTEREST_SECRET'),
        "client_id": get_env_var('OAUTH_PINTEREST_CLIENT_ID')
    }
}

LIB_PATH = os.path.join(os.path.dirname(BASE_DIR), 'working_libs')

# Django Cities settings
CITIES_DATA_DIR = os.path.join(LIB_PATH, 'geo_data')
CITIES_VALIDATE_POSTAL_CODES = True
CITIES_POSTAL_CODES = ['AU']

# Debug toolbar settings
DEBUG_TOOLBAR_CONFIG = {
    'SHOW_TOOLBAR_CALLBACK': lambda show_toolbar: True if DEBUG else False,
}

# FormTools for Wizard - file storage
FORMTOOLS_STORAGE_LOCATION = os.path.join(MEDIA_ROOT, 'temp-wizard-storage')

# Email Settings
DEFAULT_FROM_EMAIL = 'support@rentality.com.au'

# SummerNote (WYSIWYG editor)
SUMMERNOTE_THEME = 'bs4'

# Flat page Settings
FLAT_PAGE_DOCS_DIR = os.path.join(BASE_DIR, 'admin_custom', 'utils', 'flat_pages', 'docs')
FLAT_PAGE_TEMPLATES_FOLDER = 'flatpages'
# FLAT_PAGE_TEMPLATES - FORMAT = (url, title, template.html, content.txt, registration_required[BOOL])
FLAT_PAGE_TEMPLATES = (
    ('/about-us/', 'About Us', 'about_us.html', '', False),
    ('/faq/', 'Frequently Asked Questions', 'faq.html', '', False),
    ('/how-it-works/', 'How it Works', 'how_it_works.html', '', False),
    ('/contact-us/', 'Contact Us', 'contact_us.html', '', False),
)

# Easy Thumbnail
# FIXME: Set target and refactor usage (if applicable)
# https://easy-thumbnails.readthedocs.io/en/stable/usage/
THUMBNAIL_ALIASES = {
    '': {
        'profile_navbar': {'size': (41, 41), 'crop': "smart", 'autocrop': True, 'upscale': True},
        'profile_search_page': {'size': (31, 31), 'crop': "smart", 'autocrop': True, 'upscale': True},
        'house_search_page': {'size': (263, 196), 'crop': "smart", 'autocrop': True, 'upscale': True},
        'house_home_page_small': {'size': (263, 196), 'crop': "smart", 'autocrop': True, 'upscale': True},
        'house_home_page_large': {'size': (360, 196), 'crop': "smart", 'autocrop': True, 'upscale': True},
        'house_detail_small': {'size': (596, 416), 'crop': "smart", 'autocrop': True, 'upscale': True},
        'house_dashboard_large': {'size': (360, 196), 'crop': "smart", 'autocrop': True, 'upscale': True},
        'profile_house_info': {'size': (150, 159), 'crop': "smart", 'autocrop': True, 'upscale': True},
        'email': {'size': (480, 283), 'crop': "smart", 'autocrop': True, 'upscale': True},
    }
}

# Django's Message Framework
from django.contrib.messages import constants as messages

MESSAGE_TAGS = {
    messages.WARNING: 'alert-warning',
    messages.DEBUG: 'alert-dark',
    messages.ERROR: 'alert-danger',
    messages.SUCCESS: 'alert-success',
    messages.INFO: 'alert-info'
}

STRIPE_PUBLISHABLE_KEY = get_env_var('STRIPE_PUBLISHABLE_KEY')
STRIPE_SECRET_KEY = get_env_var('STRIPE_SECRET_KEY')
