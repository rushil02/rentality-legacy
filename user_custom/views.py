from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import View
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from essentials.models import Notification
from essentials.serializers import NotificationSerializer
from house.models import House
from tenant.models import TenantProfile, HousePreference
from user_custom.forms import UserProfileForm, UserCreationForm, LoginForm
from user_custom.serializers import UserTimezoneSerializer


def test_templates(request):
    return render(request, 'tenant/info.html', {})


@login_required
def dashboard(request):
    house_pref = HousePreference.objects.filter(tenant__user=request.user).all()
    houses = House.objects.filter(landlord__user=request.user)
    context = {
        'house_pref': house_pref,
        'houses': houses
    }
    return render(request, 'user_common/dashboard.html', context)


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


def check_user(request):
    if request.user.is_authenticated:
        return welcome_auth_user(request)
    else:
        return welcome(request)


@login_required
def welcome_auth_user(request):
    context = {
        'house_pref': HousePreference.objects.all().order_by('-id')[:5],
        'houses': House.objects.all().order_by('-id')[:5]
    }
    return render(request, 'user_common/welcome_auth_user.html', context)


def welcome(request):
    context = {
        'house_pref': HousePreference.objects.all().order_by('-id')[:5],
        'houses': House.objects.all().order_by('-id')[:5]
    }
    return render(request, 'user_common/welcome.html', context)


def sign_in(request):  # FIXME: only anon user allowed
    login_form = LoginForm(request.POST or None, prefix='login_form')
    if request.POST:
        if login_form.is_valid():
            user = login_form.get_user()
            login(request, user)
            return redirect('/')
        else:
            return render(request, 'user_common/signin.html', {'login_form': login_form})
    else:
        context = {'login_form': login_form}
        return render(request, 'user_common/signin.html', context)


def sign_up(request):  # FIXME: only anon user allowed
    sign_up_form = UserCreationForm(request.POST or None, prefix='sign_up_form')
    if request.POST:
        if sign_up_form.is_valid():
            user_obj = sign_up_form.save(commit=False)
            user_obj.save()
            new_user = authenticate(email=user_obj.email,
                                    password=sign_up_form.cleaned_data['password1'])
            login(request, new_user)
            send_registration_email(new_user)
            return redirect('/')
        else:
            return render(request, 'user_common/signup.html', {'sign_up_form': sign_up_form})
    else:
        return render(request, 'user_common/signup.html', {'sign_up_form': sign_up_form})


@login_required
def logout_view(request):
    logout(request)
    return redirect('/')


class Notifications(generics.ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user, deleted__isnull=True, notified=False)


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
