from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import View
from django.contrib.auth.forms import AuthenticationForm

from user_custom.forms import UserProfileForm, UserCreationForm


def user_details(request):
    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=request.user.userprofile)
        if form.is_valid():
            form.save()
            messages.success(request, _('Your profile was successfully updated!'))
        else:
            messages.error(request, _('Please correct the error below.'))
    else:
        form = UserProfileForm(instance=request.user.userprofile)

    return render(request, 'user_common/profile.html', {'profile_form': form})


def redirect_user(opt):
    user_url_redirects = {
        'T': redirect(reverse('tenant:home')),
        'L': redirect(reverse('landlord:home')),
        'M': redirect(reverse('staff:home')),
        'A': redirect(reverse('admin_custom:home')),
    }
    return user_url_redirects[opt]


def check_user(request):
    user = request.user
    if user.is_active:
        return redirect_user(user.user_type)
    else:
        logout(request)


class MainPage(View):
    login_form = AuthenticationForm
    sign_up_form = UserCreationForm
    template_name = 'user_common/home_page.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return check_user(request)
        login_form = self.login_form(prefix='login_form')
        sign_up_form = self.sign_up_form(prefix='sign_up_form')
        context = {
            'login_form': login_form,
            'sign_up_form': sign_up_form,
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        if 'sign_up_form-email' in request.POST:
            sign_up_form = self.sign_up_form(request.POST, prefix='sign_up_form')
            if sign_up_form.is_valid():
                user_obj = sign_up_form.save(commit=False)
                user_obj.user_type = 'T'
                user_obj.save()
                new_user = authenticate(email=user_obj.email,
                                        password=sign_up_form.cleaned_data['password1'])
                login(request, new_user)
                send_registration_email(new_user)
                return redirect('/')
            else:
                context = {
                    'login_form': self.login_form(prefix='login_form'),
                    'sign_up_form': sign_up_form,
                }
                return render(request, self.template_name, context)

        if 'login_form-username' in request.POST:
            login_form = self.login_form(request.POST, prefix='login_form')
            if login_form.is_valid():
                user = login_form.get_user()
                login(request, user)
                return check_user(request)

            else:
                context = {
                    'login_form': login_form,
                    'sign_up_form': self.sign_up_form(prefix='sign_up_form'),
                }
                return render(request, self.template_name, context)


def send_registration_email(user):
    print("%s - Registration email" % user)
