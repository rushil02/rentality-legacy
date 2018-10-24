from django.urls import path
from blog.views import article, home, search

app_name = 'blog'

urlpatterns = [
    path('', home, name='home'),
    path('<slug:slug>', article, name='view_article'),
    path('search', search, name='search')
]
