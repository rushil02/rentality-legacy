from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from django.http import Http404, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse

from house.forms import HouseDetailsForm1, HouseDetailsForm2, HouseDetailsForm3, SearchForm, \
    HousePhotoFormSet, HouseDeleteForm, HouseRemoveTypeForm, HouseMarkLeasedForm, HouseRemoveForm, HouseForm, \
    AvailabilityFormSet
from house.models import House


def get_context(request, house=None):
    if house:
        context = {
            'main_form': HouseForm(request.POST or None, instance=house, prefix='main-form'),
            'availability_formset': AvailabilityFormSet(request.POST or None, queryset=house.availability_set.all(),
                                                        prefix='availability-form'),
            'image_formset': HousePhotoFormSet(request.POST or None, queryset=house.image_set.all(),
                                               prefix='images-form')
        }
    else:
        context = {
            'main_form': HouseForm(request.POST or None, instance=house, prefix='main-form'),
            'availability_formset': AvailabilityFormSet(request.POST or None, prefix='availability-form'),
            'image_formset': HousePhotoFormSet(request.POST or None, prefix='images-form')
        }

    return context


def list_house(house):
    house = House()
    for field in house.REQUIRED_FIELDS:
        if getattr(house, field) in (None, '', 0):
            raise KeyError
        else:
            continue


def save_and_exit():
    pass


@login_required()
def edit(request, house_uuid):
    try:
        house = House.objects.get(uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House Information does not exist. It may be deleted by the user.")
    else:
        context = get_context(request, house)
        if request.method == 'POST':
            valid = True
            if context['main_form'].is_valid():
                context['main_form'].save()
            else:
                valid = False
            if context['availability_formset'].is_valid():
                for formset_form in context['availability_formset'].forms:
                    if formset_form.is_valid():
                        if formset_form.has_changed():
                            availability = formset_form.save(commit=False)
                            availability.house = house
                            availability.save()
                    else:
                        valid = False
                for obj in context['availability_formset'].deleted_forms:
                    obj.delete()
            else:
                valid = False

            if valid:
                pass

            return render(request, 'property/create_edit/edit.html', context)
        else:
            return render(request, 'property/create_edit/edit.html', context)


@login_required()
def create(request):
    context = get_context(request)
    if request.method == 'POST':
        if context['main_form'].is_valid():
            house = context['main_form'].save(commit=False)
            house.home_owner = request.user.home_owner
            house.save()
            return redirect(reverse('house:create_edit', args=[house.uuid, ]))
        else:
            return render(request, 'property/create_edit/create.html', context)
    else:
        return render(request, 'property/create_edit/create.html', context)
