from rest_framework import generics

from essentials.models import Notification
from essentials.serializers import NotificationSerializer


class Notifications(generics.ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user, deleted__isnull=True, notified=False)
