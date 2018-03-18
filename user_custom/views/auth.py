from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse

from house.models import House
from tenant.models import HousePreference
from user_custom.forms import UserCreationForm, LoginForm
from user_custom.models import UserProfile


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
            UserProfile.objects.create(user=user_obj)
            new_user = authenticate(email=user_obj.email,
                                    password=sign_up_form.cleaned_data['password1'])
            login(request, new_user)
            send_registration_email(new_user)
            return redirect(reverse('user:account_creation'))
        else:
            return render(request, 'user_common/signup.html', {'sign_up_form': sign_up_form})
    else:
        return render(request, 'user_common/signup.html', {'sign_up_form': sign_up_form})


@login_required
def logout_view(request):
    logout(request)
    return redirect('/')


def send_registration_email(user):
    print("%s - Registration email" % user)
