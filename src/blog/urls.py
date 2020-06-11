from django.urls import path
from blog.views import article, home, search
from blog.views.api.read import ArticleListReadView, ArticlePublicReadView
app_name = 'blog'

urlpatterns = [
    path('', home, name='home'),
    path('<slug:slug>', ArticlePublicReadView.as_view(), name='view_article'),
    path('search', search, name='search')
]
