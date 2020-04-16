from rest_framework import permissions

from user_custom.models import User


class IsOwnerOfHouse(permissions.BasePermission):
    """
    Object-level permission to only allow owners of a House object to read/edit it.
    Assumes the model instance has a `home_owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        return obj.home_owner == request.user.home_owner


class IsOwnerOfRelatedHouse(permissions.BasePermission):
    """
    Object-level permission to only allow owners of the related House object to read/edit it.
    Assumes the model instance has a `house` attribute.
    """

    def has_object_permission(self, request, view, obj):
        return obj.house.home_owner == request.user.home_owner
