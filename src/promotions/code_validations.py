"""
Create all validation functions to be used for validating promotion codes here.

Each method is expected to return a boolean for validation and corresponding error message or "" if True (valid).
"""
from django import forms
from django.utils import timezone


def check_time_limit(obj, *args, **kwargs):
    time_limit = obj.get_meta_data('time_limit')
    return timezone.now() <= time_limit


def check_user_use_limit(obj, user, *args, **kwargs):
    """ Checks used-times per user"""
    use_limit = obj.get_meta_data('user_use_limit')
    return obj.get_used_times(user=user) < use_limit


def check_total_use_limit(obj, *args, **kwargs):
    use_limit = obj.get_meta_data('total_use_limit')
    return obj.get_used_times() < use_limit


def check_user_permission(obj, user, *args, **kwargs):
    # FIXME: Doesn't check if list of permitted users is empty while creating
    if not obj.user_has_permission(user):
        return False
    return True


# Maps Validator name to the method, verbose and custom error message
VALIDATORS = {
    'time_limit': {
        "method": check_time_limit,
        "verbose": "Check Time Limit",
        "help_text": "Only valid if time limit attribute (Date) is provided.",
        "error_msg": "This code is expired.",
        "attributes": {
            'expire_time': {"form_field": forms.DateTimeField}
        }
    },
    'user_use_limit': {
        "method": check_user_use_limit,
        "verbose": "Limit number of times used by a user",
        "help_text": "Only valid if use limit attribute (Integer) is provided.",
        "error_msg": "This code is expired.",
        "attributes": {
            'limit': {"form_field": forms.IntegerField}
        }
    },
    'total_use_limit': {
        "method": check_total_use_limit,
        "verbose": "Limit total number of times used",
        "error_msg": "This code is expired.",
        "attributes": {
            'limit': {"form_field": forms.IntegerField}
        }
    },
    'user_permission': {
        "method": check_user_permission,
        "verbose": "Check if user is permitted to use this",
        "error_msg": "This code is invalid."
    },
}
