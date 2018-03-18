from django.urls import path

from user_custom.views import logout_view, user_details, set_timezone, test_templates, welcome, check_user, \
    sign_in, sign_up, dashboard, Notifications

app_name = 'user'

urlpatterns = [
    path('temp', test_templates, name='test_templates'),  # FIXME: remove later
    path('', check_user, name='home_page'),
    path('sign-in', sign_in, name='sign_in'),
    path('notifications', Notifications.as_view(), name='notifications'),
    path('dashboard', dashboard, name='dashboard'),
    path('sign-up', sign_up, name='sign_up'),
    path('logout', logout_view, name='logout'),
    path('profile', user_details, name='user_details'),
    path('time', set_timezone, name='set_timezone'),
]
