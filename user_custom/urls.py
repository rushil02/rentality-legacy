from django.urls import path
from django.contrib.auth.views import logout

from user_custom.views import MainPage
from .views import user_details

urlpatterns = [
    path('', MainPage.as_view(), name='home_page'),
    path('logout', logout, name='logout'),
    path('profile', user_details, name='user_details'),
]
