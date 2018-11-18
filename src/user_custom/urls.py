from django.urls import path
from django.views.generic import TemplateView

from user_custom.views import set_timezone, check_user, \
    dashboard, Notifications, shortlist, shortlist_view, edit_profile, SignUpInfoWizard, \
    CustomSignupView, search, get_stripe_publishable_key

app_name = 'user'

urlpatterns = [
    path('', check_user, name='home_page'),
    path('search', search, name='search'),
    path('accounts/signup/', CustomSignupView.as_view(), name="account_signup"),
    path('notifications', Notifications.as_view(), name='notifications'),
    path('dashboard', dashboard, name='dashboard'),
    path('sel-listing', TemplateView.as_view(template_name='user_common/account_creation/select_listing.html'),
         name='sel_listing'),
    path('profile', edit_profile, name='user_details'),
    path('time', set_timezone, name='set_timezone'),
    path('publishable_key', get_stripe_publishable_key, name='set_timezone'),
    path('shortlist/<str:entity>/<uuid:uuid>', shortlist, name='add_to_shortlist'),
    path('my-shortlist/', shortlist_view, name='view_shortlist'),

    path('add-details/', SignUpInfoWizard.as_view(), name='account_creation'),

    # TODO: remove later (or create seperate package, shouldn't be here; immediate requirement defies project structure
    path('vfxr', TemplateView.as_view(template_name='others/validation_email_1.html'), name='validation_email_1')
]
