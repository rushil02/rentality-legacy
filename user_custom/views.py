from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import View
from django.contrib.auth.forms import AuthenticationForm
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from user_custom.forms import UserProfileForm, UserCreationForm
from user_custom.serializers import UserTimezoneSerializer


def test_templates(request):
    return render(request, 'user_common/welcome.html', {})


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


def check_user(request):  # FIXME
    user = request.user
    if user.is_active:
        return redirect('/te')
        # return redirect_user(user.user_type)
    else:
        logout(request)


class MainPage(View):
    template_name = 'user_common/home_page.html'

    @staticmethod
    def get_login_form(post_data=None):
        return AuthenticationForm(post_data, prefix='login_form')

    @staticmethod
    def get_sign_up_form(post_data=None):
        return UserCreationForm(post_data, prefix='sign_up_form')

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return check_user(request)
        login_form = self.get_login_form()
        sign_up_form = self.get_sign_up_form()
        context = {
            'login_form': login_form,
            'sign_up_form': sign_up_form,
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        print(request.POST)
        if 'sign_up_form-email' in request.POST:
            sign_up_form = self.get_sign_up_form(request.POST)
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
                    'login_form': self.get_login_form(),
                    'sign_up_form': self.get_sign_up_form(request.POST),
                }
                return render(request, self.template_name, context)

        if 'login_form-username' in request.POST:
            login_form = self.get_login_form(request.POST)
            if login_form.is_valid():
                print("HERE")
                user = login_form.get_user()
                login(request, user)
                return check_user(request)
            else:
                context = {
                    'login_form': self.get_login_form(request.POST),
                    'sign_up_form': self.get_sign_up_form(),
                }
                return render(request, self.template_name, context)


@login_required
def logout_view(request):
    logout(request)
    return redirect('/')


@api_view(['POST'])
@permission_classes((AllowAny,))
def set_timezone(request):
    serializer = UserTimezoneSerializer(data=request.data)
    if serializer.is_valid():
        request.session['django_timezone'] = serializer.validated_data['tz']
        return Response(status=status.HTTP_200_OK)
    else:
        invalid_value = serializer.data['tz']

        # FIXME: check before deploy
        invalid_pairs = {
            'Africa/Asmera': 'Africa/Nairobi',
            'America/Indianapolis': 'America/Indiana/Indianapolis',
            'America/Montreal': 'America/Toronto',
            'Asia/Calcutta': 'Asia/Kolkata',
            'Asia/Chongqing': 'Asia/Shanghai',
            'Asia/Harbin': 'Asia/Shanghai',
            'Asia/Istanbul': 'Europe/Istanbul',
            'Asia/Katmandu': 'Asia/Kathmandu',
            'Asia/Macao': 'Asia/Macau',
            'Atlantic/Faeroe': 'Atlantic/Faroe',
            'Australia/Canberra': 'Australia/Sydney',
            'Australia/NSW': 'Australia/Sydney',
            'Australia/North': 'Australia/Darwin',
            'Australia/Queensland': 'Australia/Brisbane',
            'Australia/South': 'Australia/Adelaide',
            'Australia/Tasmania': 'Australia/Hobart',
            'Australia/Victoria': 'Australia/Melbourne',
            'Australia/West': 'Australia/Perth',
            'Chile/Continental': 'America/Santiago',
            'Pacific/Samoa': 'Pacific/Pago_Pago',
            'US/Samoa': 'Pacific/Pago_Pago',
        }
        if invalid_value in invalid_pairs:
            request.session['django_timezone'] = invalid_pairs[invalid_value]
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


def send_registration_email(user):
    print("%s - Registration email" % user)
