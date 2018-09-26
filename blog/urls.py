from django.urls import path
from django.views.generic import TemplateView

app_name = 'blog'

urlpatterns = [
    path('what-is-vacancy-tax-how-to-avoid', TemplateView.as_view(template_name='blogs/vacancy_tax_intro.html'),
         name='vacancy_tax_intro')
]
