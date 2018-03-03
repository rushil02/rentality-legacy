from django.urls import path

from .views import home

app_name = 'staff'

urlpatterns = [
    path('', home, name='home'),
]
