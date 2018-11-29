from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.http import Http404
from django.shortcuts import render, redirect, reverse

from house.forms import ApplyForm
from house.models import House
from django.contrib import messages


def info(request, house_uuid):
    try:
        house = House.active_objects.select_related('home_owner__user', 'home_owner__user__userprofile').get(
            uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    else:
        apply_form = ApplyForm(obj=house)
        return render(request, 'property/detail.html', {'house': house, 'form': apply_form})


# FIXME: temporary method
@login_required
def apply_temp(request, house_uuid):
    email = request.user.email
    house = House.objects.get(uuid=house_uuid)
    form = ApplyForm(request.GET, obj=house)
    if form.is_valid():
        message = "Following are the application details \n " \
                  "applicant email - %s \n" \
                  "house - %s \n" \
                  "dates - %s to %s \n" \
                  "guests - %s" % (email, house, form.cleaned_data['move_in_date'], form.cleaned_data['move_out_date'], form.cleaned_data['guests'])
        send_mail("New Application", message, "support@rentality.com.au", ["admin@rentality.com.au"])
        messages.add_message(request, messages.SUCCESS,
                             "Your application has been registered with us, We will contact you shortly via your registered email for the next steps.")
    else:
        messages.add_message(request, messages.ERROR,
                             "Invalid Data Submission")
    return redirect(reverse("house:info", args=[house_uuid]))
