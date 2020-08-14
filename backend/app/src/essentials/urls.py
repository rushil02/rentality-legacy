from django.urls import path

from essentials.views import notification, get_policy, GetPolicyPublicReadView

app_name = 'essentials'

urlpatterns = [
    # path('notifications', notification, name='notifications_all'),
    path('policy/<str:policy_type>', get_policy, name='get_policy'),

    # Internal System Level API
    path('policy/<str:policy_type>/<str:internal_access_key>', GetPolicyPublicReadView.as_view(), name='all_articles'),
]
