from rest_framework import permissions


class IsOwnerOfHouse(permissions.BasePermission):
    """
    Object-level permission to only allow owners of a House object to read/edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        return obj.home_owner == request.user.homeownerprofile
