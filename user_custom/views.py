from django.shortcuts import render
from django.contrib import messages
from django.utils.translation import gettext_lazy as _

# Create your views here.
from user_custom.forms import UserProfileForm


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
