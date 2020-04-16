from rest_framework import permissions

from user_custom.models import User


class IsTenantOfApplication(permissions.BasePermission):
    """
    Object-level permission to only allow tenant of a Application object to read/edit it.
    Assumes the model instance has a `tenant` attribute.
    """

    def has_object_permission(self, request, view, obj):
        print(obj.tenant == request.user.tenant)
        return obj.tenant == request.user.tenant



class IsTenantOfRelatedApplication(permissions.BasePermission):
    """
    Object-level permission to only allow tenant of the related Application object to read/edit it.
    Assumes the model instance has a `application` attribute.
    """

    def has_object_permission(self, request, view, obj):
        return obj.application.tenant == request.user.tenant
