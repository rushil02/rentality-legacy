from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from house.models import House
from tenant.models import HousePreference
from user_custom.forms import ProfileForm1, ProfileForm2, EditProfileForm, UserChangeForm


@login_required
def dashboard(request):
    house_pref = HousePreference.objects.filter(tenant__user=request.user).all()
    houses = House.objects.filter(landlord__user=request.user)
    context = {
        'house_pref': house_pref,
        'houses': houses
    }
    return render(request, 'user_common/dashboard.html', context)


def check_mail(request):
    # TODO: send email
    return render(request, 'user_common/account_creation/email_conf.html')


# FIXME: not working
def edit_profile(request):
    if request.method == 'POST':
        form1 = UserChangeForm(request.POST, instance=request.user)
        form2 = EditProfileForm(request.POST, request.FILES, instance=request.user.userprofile)
        if form1.is_valid() and form2.is_valid():
            form1.save()
            form2.save()
    else:
        form1 = UserChangeForm(instance=request.user)
        form2 = EditProfileForm(instance=request.user.userprofile)
    context = {
        'form1': form1,
        'form2': form2
    }
    return render(request, 'user_common/profile.html', context)
