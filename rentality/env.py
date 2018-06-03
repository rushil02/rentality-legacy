from .settings.common import get_secret_var

set__DELETED_USER_PASS = get_secret_var('DELETED_USER_PASS')

set__LD_LIBRARY_PATH = '/usr/local/lib'

set__SENDGRID_API_KEY = get_secret_var('SENDGRID_API_KEY')
