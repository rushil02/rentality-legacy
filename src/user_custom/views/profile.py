from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from house.models import House
from tenant.models import HousePreference
from user_custom.forms import ProfileForm1, ProfileForm2, EditProfileForm, UserChangeForm


@login_required
def dashboard(request):
    houses = House.objects.filter(home_owner__user=request.user).exclude(status='D').all()
    context = {
        'houses': houses
    }
    return render(request, 'home_owner/dashboard.html', context)


def check_mail(request):
    # TODO: send email
    return render(request, 'user_common/account_creation/email_conf.html')


def edit_profile(request):
    form1 = UserChangeForm(request.POST or None, instance=request.user)
    form2 = EditProfileForm(request.POST or None, request.FILES or None, instance=request.user.userprofile)
    context = {
        'form1': form1,
        'form2': form2
    }
    print(request.POST)
    if request.method == 'POST':
        if form1.is_valid() and form2.is_valid():
            form1.save()
            obj = form2.save(commit=False)
            obj.profile_pic = form2.cleaned_data['profile_pic']
            obj.save()

    return render(request, 'user_common/profile.html', context)
