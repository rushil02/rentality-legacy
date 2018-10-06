from django.urls import path
from django.views.generic import TemplateView

from user_custom.views import logout_view, set_timezone, check_user, \
    sign_in, sign_up, dashboard, Notifications, shortlist, shortlist_view, edit_profile, SignUpInfoWizard

app_name = 'user'

urlpatterns = [
    # path('temp', TemplateView.as_view(template_name='temp-mig/thread_messages.html'), name='test_templates'),  # FIXME: remove later
    path('', check_user, name='home_page'),
    path('sign-in', sign_in, name='sign_in'),
    path('notifications', Notifications.as_view(), name='notifications'),
    path('dashboard', dashboard, name='dashboard'),
    path('sign-up', sign_up, name='sign_up'),
    path('sel-listing', TemplateView.as_view(template_name='user_common/account_creation/select_listing.html'),
         name='sel_listing'),
    path('logout', logout_view, name='logout'),
    path('profile', edit_profile, name='user_details'),
    path('time', set_timezone, name='set_timezone'),
    path('shortlist/<str:entity>/<uuid:uuid>', shortlist, name='add_to_shortlist'),
    path('my-shortlist/', shortlist_view, name='view_shortlist'),

    path('add-details/', SignUpInfoWizard.as_view(), name='account_creation'),

    # TODO: remove later (or create seperate package, shouldn't be here; immediate requirement defies project structure
    path('vfxr', TemplateView.as_view(template_name='others/validation_email_1.html'), name='validation_email_1')
]
