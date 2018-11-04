import os

from django.conf import settings
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from django.db.models import F
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils.decorators import method_decorator
from formtools.wizard.views import SessionWizardView

from house.models import House
from tenant.models import HousePreference
from user_custom.forms import ProfileForm1, ProfileForm2, HomePageSearchForm
from user_custom.models import UserProfile
from allauth.account.views import SignupView as AllAuthSignupView


def check_user(request):
    if request.user.is_authenticated:
        return welcome_auth_user(request)
    else:
        return welcome(request)


@login_required
def welcome_auth_user(request):
    context = {
        'house_list': House.active_objects.all().annotate(min_stay_weeks=F('min_stay') / 7).order_by(
            'houseprofile__priority', '-updated_on')[:11],
        'search_form': HomePageSearchForm()
    }
    return render(request, 'user/welcome/auth.html', context)


def welcome(request):
    context = {
        'house_list': House.active_objects.all().annotate(min_stay_weeks=F('min_stay') / 7).order_by(
            'houseprofile__priority', '-updated_on')[:11],
        'search_form': HomePageSearchForm()
    }
    return render(request, 'user/welcome/anon.html', context)


def send_registration_email(user):
    print("%s - Registration email" % user)


@method_decorator(login_required, name='dispatch')
class SignUpInfoWizard(SessionWizardView):
    TEMPLATES = [
        'user_common/account_creation/form1.html',
        'user_common/account_creation/form2.html'
    ]
    form_list = [ProfileForm1, ProfileForm2]
    file_storage = FileSystemStorage(location=settings.FORMTOOLS_STORAGE_LOCATION)

    def get_form_instance(self, step):
        instance = self.request.user.userprofile
        return instance

    def get_template_names(self):
        return [self.TEMPLATES[int(self.steps.current)]]

    def done(self, form_list, **kwargs):
        for form in form_list:
            form.save()
        return render(self.request, 'user_common/account_creation/email_conf.html', {
            'form_data': [form.cleaned_data for form in form_list],
        })


class CustomSignupView(AllAuthSignupView):
    # FIXME: Reverse URL not working for reverse('user:account_creation')
    success_url = '/'
