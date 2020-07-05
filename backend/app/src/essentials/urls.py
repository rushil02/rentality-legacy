from django.urls import path

from essentials.views import notification, get_policy

app_name = 'essentials'

urlpatterns = [
    # path('notifications', notification, name='notifications_all'),
    path('policy/<str:policy_type>', get_policy, name='get_policy')
]
