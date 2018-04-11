from django.urls import path

from house.views import info, add_edit_house

app_name = 'house'

urlpatterns = [
    path('info/<uuid:house_uuid>', info, name='info'),
    path('add/<int:form_num>', add_edit_house, name='add'),
    path('edit/<int:form_num>/<uuid:uuid>', add_edit_house, name='edit'),
]
