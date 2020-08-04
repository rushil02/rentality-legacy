from django.urls import path
from blog.views.api.read import PopularArticlesListView, LatestArticlesListView, PopularTagsListView, \
    ArticlePublicReadView, AllArticlesPublicReadView, AllTagsAndArticlesListView, TagsRelatedArticlesListView

app_name = 'blog'

urlpatterns = [
    path('popular-articles', PopularArticlesListView.as_view(), name='pop_articles'),
    path('latest-articles', LatestArticlesListView.as_view(), name='latest_articles'),
    path('popular-tags', PopularTagsListView.as_view(), name='pop_tags'),
    path('article/<slug:slug>', ArticlePublicReadView.as_view(), name='view_article'),
    path('tag-articles', TagsRelatedArticlesListView.as_view(), name='view_article'),

    # Internal System Level API
    path('all-articles/<str:internal_access_key>', AllArticlesPublicReadView.as_view(), name='all_articles'),
    path('all-tags-and-articles/<str:internal_access_key>', AllTagsAndArticlesListView.as_view(), name='all_tag_and_articles')
]
