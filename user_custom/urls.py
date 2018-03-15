from django.urls import path

from user_custom.views import MainPage, logout_view, user_details, set_timezone, test_templates, welcome, check_user

urlpatterns = [
    path('temp', test_templates, name='test_templates'),  # FIXME: remove latter
    path('', check_user, name='home_page'),
    path('logout', logout_view, name='logout'),
    path('profile', user_details, name='user_details'),
    path('time', set_timezone, name='set_timezone'),
]
