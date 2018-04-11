from django.urls import path
from django.views.generic import TemplateView

from user_custom.views import logout_view, set_timezone, check_user, \
    sign_in, sign_up, dashboard, Notifications, shortlist, shortlist_view, user_details_form1, edit_profile

app_name = 'user'

urlpatterns = [
    # path('temp', TemplateView.as_view(template_name='temp-mig/thread_messages.html'), name='test_templates'),  # FIXME: remove later
    path('', check_user, name='home_page'),
    path('sign-in', sign_in, name='sign_in'),
    path('notifications', Notifications.as_view(), name='notifications'),
    path('dashboard', dashboard, name='dashboard'),
    path('sign-up', sign_up, name='sign_up'),
    path('ac_cr', user_details_form1, name='account_creation'),
    path('sel-listing', TemplateView.as_view(template_name='user_common/account_creation/select_listing.html'),
         name='sel_listing'),
    path('logout', logout_view, name='logout'),
    path('profile', edit_profile, name='user_details'),
    path('time', set_timezone, name='set_timezone'),
    path('shortlist/<str:entity>/<uuid:uuid>', shortlist, name='add_to_shortlist'),
    path('my-shortlist/', shortlist_view, name='view_shortlist'),
]
