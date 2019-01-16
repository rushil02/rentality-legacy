from django.urls import path
from application.views import create

app_name = 'application'

urlpatterns = [
    path('<uuid:house_uuid>', create, name='create'),
]
