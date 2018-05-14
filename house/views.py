import os

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from django.http import Http404, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST, require_GET
from formtools.wizard.views import SessionWizardView

from house.forms import HouseDetailsForm1, HouseDetailsForm2, HouseDetailsForm3, SearchForm, \
    HousePhotoFormSet
from house.models import House
from house.serializer import HouseSerializer
from messaging.forms import MessageForm
from messaging.views import save_message, save_new_thread
from user_custom.forms import EditProfileForm
from django.contrib import messages


def add_house_main(request):
    house = House.objects.create(landlord=request.user.landlord)
    return redirect(reverse('house:edit', args=[1, house.uuid]))


def info(request, house_uuid):
    try:
        house = House.objects.prefetch_related('tags').get(uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    else:
        if request.method == 'POST':
            message_form = MessageForm(request.POST)
            if request.user.is_authenticated:
                if message_form.is_valid():
                    try:
                        save_new_thread(request, house, message=message_form.data['content'])
                    except AssertionError:
                        messages.add_message(request, messages.INFO, 'You cannot send yourself a message')
                    else:
                        messages.add_message(request, messages.SUCCESS,
                                             'Your message has been sent to the property owner.')
                        message_form = MessageForm()
                    context = {'house': house, 'msg_form': message_form}
                    return render(request, 'house/info.html', context)
                else:
                    context = {'house': house, 'msg_form': message_form}
                    return render(request, 'house/info.html', context)
            else:
                return redirect(settings.LOGIN_URL + '?next=' + request.get_full_path())
        else:
            message_form = MessageForm()
            context = {'house': house, 'msg_form': message_form}
            return render(request, 'house/info.html', context)


@login_required
def add_house_form1(request, uuid):
    template = 'house/add_house/specs.html'
    try:
        house = House.objects.get(uuid=uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    form = HouseDetailsForm1(request.POST or None, instance=house, prefix='detail-form-1')
    queryset = house.image_set.all()
    formset = HousePhotoFormSet(request.POST or None, request.FILES or None, queryset=queryset)
    context = {
        'house': house,
        'form': form,
        'formset': formset
    }
    if request.method == 'POST':
        valid = True
        if form.is_valid():
            form.save()
        else:
            valid = False
        if formset.is_valid():
            for formset_form in formset.forms:
                if formset_form.is_valid():
                    if formset_form.has_changed():
                        img_obj = formset_form.save(commit=False)
                        img_obj.house = house
                        img_obj.save()
                else:
                    valid = False
        else:
            valid = False
        if valid:
            if 'save' in request.POST:
                context['form'] = HouseDetailsForm1(instance=house, prefix='detail-form-1')
                context['formset'] = HousePhotoFormSet(queryset=house.image_set.all())
                return render(request, template, context)
            elif 'savetonext' in request.POST:
                return redirect(reverse('house:edit', args=[2, house.uuid]))
            else:
                raise HttpResponseBadRequest
        else:
            return render(request, template, context)
    else:
        return render(request, template, context)


@login_required
def add_house_form2(request, uuid):
    template = 'house/add_house/date_cost_details.html'

    try:
        house = House.objects.get(uuid=uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")

    tags = house.tags.all()
    form = HouseDetailsForm2(request.POST or None, instance=house,
                             initial={'facilities': tags.filter(tag_type='F'),
                                      'rules': tags.filter(tag_type='R'), })
    context = {
        'house': house,
        'form': form,
    }
    if request.method == 'POST':
        if form.is_valid():
            obj = form.save()
            print(*form.cleaned_data['facilities'])
            obj.tags.add(*form.cleaned_data['facilities'])
            obj.tags.add(*form.cleaned_data['rules'])

            if 'save' in request.POST:
                context['form'] = HouseDetailsForm2(instance=house, initial={'facilities': tags.filter(tag_type='F'),
                                                                             'rules': tags.filter(tag_type='R'), })
                return render(request, template, context)
            elif 'savetonext' in request.POST:
                return redirect(reverse('house:edit', args=[3, house.uuid]))
            else:
                raise HttpResponseBadRequest

    return render(request, template, context)


@login_required
def landlord_info(request, uuid):
    template = 'house/add_house/landlord_details.html'

    try:
        house = House.objects.get(uuid=uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")

    form = EditProfileForm(request.POST or None, request.FILES or None, instance=request.user.userprofile)
    context = {
        'house': house,
        'form': form,
    }
    print(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            if 'save' in request.POST:
                context['form'] = EditProfileForm(instance=request.user.userprofile)
                return render(request, template, context)
            elif 'savetolist' in request.POST:
                house.status = 'P'
                house.save()
                return redirect(reverse('user:dashboard'))
            else:
                return HttpResponseBadRequest()
    return render(request, template, context)


@login_required
def add_edit_house(request, form_num, uuid=None):
    func_di = {
        1: add_house_form1,
        2: add_house_form2,
        3: landlord_info,
    }

    try:
        return func_di[form_num](request, uuid)
    except KeyError:
        return Http404()


# @require_POST FIXME
def search_house_page(request):
    try:
        query = request.POST['query']
    except:
        query = ''
    form = SearchForm(initial={'location': query})
    context = {
        'search_form': form,
        'initial_query': query
    }
    return render(request, 'search/house_listing.html', context)


@require_GET
def search_house_api(request):
    query = request.GET['query']
    # houses = House.objects.filter(address__icontains=query)
    houses = House.active_objects.all()
    serializer = HouseSerializer(houses, many=True)
    return JsonResponse(serializer.data, safe=False)
