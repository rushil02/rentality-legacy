from django.urls import path
from django.views.generic import TemplateView

from user_custom.views import set_timezone, check_user, \
    dashboard, Notifications, shortlist, shortlist_view, edit_profile, SignUpInfoWizard, \
    CustomSignupView, search, get_stripe_publishable_key, UserInfoView, BusinessSignupView
from user_custom.views.api.details import UserDetailsView

from user_custom.views.api.profile import GetEditUserProfileView, ProfilePicUploadView, PersonalityTagView
from user_custom.views.api import edit_profile_react

app_name = 'user'

urlpatterns = [
    path('', check_user, name='home_page'),

    path('search', search, name='search'),

    path('accounts/signup/', CustomSignupView.as_view(), name="account_signup"),
    path('accounts/signup/business/', BusinessSignupView.as_view(), name="business_account_signup"),

    path('notifications', Notifications.as_view(), name='notifications'),
    path('dashboard', dashboard, name='dashboard'),
    # path('sel-listing', TemplateView.as_view(template_name='user_common/account_creation/select_listing.html'),
    #      name='sel_listing'),
    path('time', set_timezone, name='set_timezone'),
    path('publishable_key', get_stripe_publishable_key, name='payment_publishable_key'),
    path('shortlist/<str:entity>/<uuid:uuid>', shortlist, name='add_to_shortlist'),
    path('my-shortlist/', shortlist_view, name='view_shortlist'),

    path('add-details/', SignUpInfoWizard.as_view(), name='account_creation'),

    # TODO: remove later (or create seperate package, shouldn't be here; immediate requirement defies project structure
    path('vfxr', TemplateView.as_view(template_name='others/validation_email_1.html'), name='validation_email_1'),

    # React Entry-points
    path('profile', edit_profile_react, name='user_details'),
    # Older version. Remove once profile is complete
    path('profile-old', edit_profile, name='user_details-old'),

    # APIs
    #FIXME: Deprecated cu-info
    path('cu-info/', UserInfoView.as_view(), name='info'),
    path('user-profile', GetEditUserProfileView.as_view(), name='get-edit-user-profile'),
    path('upload-profile-pic', ProfilePicUploadView.as_view(), name='upload-profile-pic'),

    # APIs v2
    path('user-nav-info', UserDetailsView.as_view(), name='user_nav_info'),
    path('personality-tags', PersonalityTagView.as_view(), name='personality_tags'),

]
