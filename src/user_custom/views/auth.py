import os

from django.conf import settings
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils.decorators import method_decorator
from formtools.wizard.views import SessionWizardView

from house.models import House
from tenant.models import HousePreference
from user_custom.forms import UserCreationForm, ProfileForm1, ProfileForm2
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
        'house_pref': HousePreference.active_objects.all().order_by('-id')[:5],
        'houses': House.active_objects.all().order_by('-id')[:5]
    }
    return render(request, 'user_common/welcome_auth_user.html', context)


def welcome(request):
    context = {
        'house_pref': HousePreference.active_objects.all().order_by('-id')[:5],
        'houses': House.active_objects.all().order_by('-id')[:5]
    }
    return render(request, 'user_common/welcome.html', context)


def sign_up(request):  # FIXME: only anon user allowed
    sign_up_form = UserCreationForm(request.POST or None, prefix='sign_up_form')
    if request.POST:
        if sign_up_form.is_valid():
            user_obj = sign_up_form.save()
            UserProfile.objects.create(user=user_obj,
                                       receive_newsletter=sign_up_form.cleaned_data['receive_newsletter'])
            new_user = authenticate(email=user_obj.email,
                                    password=sign_up_form.cleaned_data['password1'])
            login(request, new_user)
            send_registration_email(new_user)  # FIXME
            return redirect(reverse('user:account_creation'))
        else:
            return render(request, 'user_common/signup.html', {'sign_up_form': sign_up_form})
    else:
        return render(request, 'user_common/signup.html', {'sign_up_form': sign_up_form})


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
    success_url = '/add-details/'
