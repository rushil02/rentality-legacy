"""
Create all validation functions to be used for validating promotion codes here.

Each method is expected to return a boolean for validation and corresponding error message or "" if True (valid).
"""

from django.utils import timezone
from django.contrib.contenttypes.models import ContentType


def check_time_limit(obj, *args, **kwargs):
    if obj.time_limit:
        if timezone.now() >= obj.time_limit:
            return False, "The code has expired by time limit."
    return True, ""


def check_use_limit(obj, user, *args, **kwargs):
    """ Checks used-times per user"""
    if obj.use_limit:
        if obj.get_used_times(user=user) >= obj.use_limit:
            return False, "The code has expired by use limit."
    return True, ""


def check_total_use_limit(obj, *args, **kwargs):
    if obj.use_limit:
        if obj.get_used_times() >= obj.use_limit:
            return False, "The code has expired by use limit."
    return True, ""


def check_user_permission(obj, user, *args, **kwargs):
    if not obj.user_has_permission(user):
        return False, "The code is invalid for use."
    return True, ""


def check_applied_on(obj, entity, *args, **kwargs):
    if obj.applied_on != ContentType.objects.get_for_model(entity):
        return False, "The code is invalid for use here."
    return True, ""

