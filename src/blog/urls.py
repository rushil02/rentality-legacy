from django.urls import path
from blog.views.api.read import PopularArticlesListView, LatestArticlesListView, PopularTagsListView, \
    ArticlePublicReadView

app_name = 'blog'

urlpatterns = [
    path('popular-articles', PopularArticlesListView.as_view(), name='pop_articles'),
    path('latest-articles', LatestArticlesListView.as_view(), name='latest_articles'),
    path('popular-tags', PopularTagsListView.as_view(), name='pop_tags'),
    path('article/<slug:slug>', ArticlePublicReadView.as_view(), name='view_article'),
    path('tag-articles', ArticlePublicReadView.as_view(), name='view_article'),

]
