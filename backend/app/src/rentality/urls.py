"""rentality URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from django.views.generic import RedirectView, TemplateView

from user_custom.views import not_found
from rentality.sitemap import sitemaps

urlpatterns = [
    path('db/', admin.site.urls),
    path('pages/', include('django.contrib.flatpages.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('summernote/', include('django_summernote.urls')),

    path('es/', include('elastic_search.urls')),
    path('te/', include('tenant.urls')),
    path('ho/', include('home_owner.urls')),
    path('st/', include('staff.urls')),
    path('admin/', include('admin_custom.urls')),
    path('', include('user_custom.urls')),
    path('accounts/email/', not_found),
    path('accounts/confirm-email/', not_found),
    path('accounts/', include('allauth.urls')),
    path('property/', include('house.urls')),
    path('blog/', include('blog.urls')),
    path('app/', include('application.urls')),
    path('promo/', include('promotions.urls')),
    path('pg/', include('payment_gateway.urls')),

    path('ess/', include('essentials.urls')),
    path('cities/', include('cities_custom.urls')),

    # TODO: no individual messaging urls needed ?
    path('messaging/', include('messaging.urls')),

    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),

    path('favicon.ico', RedirectView.as_view(url=settings.STATIC_URL + 'favicon.ico')),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    import debug_toolbar

    urlpatterns += path('__debug__/', include(debug_toolbar.urls)),

# FIXME: for prod

admin.site.site_header = 'Rentality Administration Panel'
admin.site.site_title = 'Rentality'

handler404 = 'user_custom.views.not_found'
