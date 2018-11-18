from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse

from house.models import House
from tenant.models import HousePreference
from user_custom.forms import ProfileForm1, ProfileForm2, EditProfileForm, UserChangeForm


@login_required
def dashboard(request):
    houses = House.objects.filter(home_owner__user=request.user).exclude(status='D').all()
    context = {
        'houses': houses
    }
    # FIXME: separation of dashboards
    return render(request, 'home_owner/dashboard.html', context)


def edit_profile(request):
    form1 = UserChangeForm(request.POST or None, instance=request.user)
    form2 = EditProfileForm(request.POST or None, request.FILES or None, instance=request.user.userprofile)
    context = {
        'form1': form1,
        'form2': form2
    }
    if request.method == 'POST':
        if form1.is_valid() and form2.is_valid():
            form1.save()
            form2.save()
            return redirect(reverse('user:user_details'))

    return render(request, 'user/profile/edit_details.html', context)
