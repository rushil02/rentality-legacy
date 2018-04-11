from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponseBadRequest
from django.shortcuts import render, redirect
from django.urls import reverse

from house.forms import HouseDetailsForm1, HouseDetailsForm2, HouseDetailsForm3, HousePhotosForm
from house.models import House


def info(request, house_uuid):
    try:
        house = House.objects.get(uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    else:
        return render(request, 'house/info.html', {'house': house})


# FIXME: how to edit houses and maintain continuation, use form wizards?
def add_house_details(request, uuid, next_url, FormClass, template):
    if uuid:
        try:
            house = House.objects.get(uuid=uuid)
        except House.DoesNotExist:
            raise Http404("House does not exist.")
    else:
        house = None

    form = FormClass(request.POST or None, instance=house)

    if request.method == 'POST':
        if form.is_valid():
            obj = form.save(commit=False)
            if not obj.landlord:
                obj.landlord = request.user.landlord
            obj.save()
            return redirect(reverse(next_url))
        else:
            return render(request, template, {'form': form})
    else:
        return render(request, template, {'form': form})


def add_house_form1(request, uuid=None):
    next_url = 'house:'
    template = 'house/add_house/specs.html'
    return add_house_details(request, uuid, next_url, HouseDetailsForm1, template)


def add_house_form2(request, uuid=None):
    next_url = 'house:'
    template = 'house/add_house/date_cost_details.html'
    return add_house_details(request, uuid, next_url, HouseDetailsForm2, template)


def add_house_photos(request, uuid=None):
    next_url = 'house:'
    template = 'house/add_house/photos.html'
    return add_house_details(request, uuid, next_url, HousePhotosForm, template)


def add_house_form4(request, uuid=None):
    next_url = 'house:'
    template = 'house/add_house/description.html'
    return add_house_details(request, uuid, next_url, HouseDetailsForm3, template)


@login_required
def add_edit_house(request, form_num, uuid=None):
    func_di = {
        1: add_house_form1,
        2: add_house_form2,
        3: add_house_photos,
        4: add_house_form4,
    }

    try:
        return func_di[form_num](request, uuid)
    except KeyError:
        raise HttpResponseBadRequest
