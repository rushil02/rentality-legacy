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
    HousePhotoFormSet, HouseDeleteForm, HouseRemoveTypeForm, HouseMarkLeasedForm, HouseRemoveForm, HouseForm, \
    AvailabilityFormSet, HomeOwnerInfoForm
from house.models import House
from house.serializer import HouseSerializer
from messaging.forms import MessageForm
from messaging.views import save_message, save_new_thread
from user_custom.forms import EditProfileForm
from django.contrib import messages
from payments.stripe_wrapper import create_account, get_account
from cities.models import Country


def update_house(form):
    pass


def list_house(house):
    house = House()
    for field in house.REQUIRED_FIELDS:
        if getattr(house, field) in (None, '', 0):
            raise KeyError
        else:
            continue


@login_required()
def create(request, house_uuid=None):
    if house_uuid:
        try:
            house = House.objects.get(uuid=house_uuid)
        except House.DoesNotExist:
            raise Http404("House Information does not exist. It may be deleted by the user.")
        else:
            main_form = HouseForm(request.POST or None, instance=house, prefix='main-form')
            availability_formset = AvailabilityFormSet(request.POST or None, queryset=house.availability_set.all(),
                                                       prefix='availability-form')
            context = {
                'main_form': main_form,
                'availability_formset': availability_formset
            }
            if request.method == 'POST':
                valid = True
                if main_form.is_valid():
                    main_form.save()
                else:
                    valid = False
                if availability_formset.is_valid():
                    for formset_form in availability_formset.forms:
                        if formset_form.is_valid():
                            if formset_form.has_changed():
                                availability = formset_form.save(commit=False)
                                availability.house = house
                                availability.save()
                        else:
                            valid = False
                    for obj in availability_formset.deleted_objects:
                        obj.delete()
                else:
                    valid = False

                if valid:
                    print("here")

                return render(request, 'property/add_form.html', context)
            else:
                return render(request, 'property/add_form.html', context)
    else:
        print("here maa ki choot")
        main_form = HouseForm(request.POST or None, prefix='main-form')
        availability_formset = AvailabilityFormSet(request.POST or None)
        context = {
            'main_form': main_form,
            'availability_formset': availability_formset
        }
        if request.method == 'POST':
            if main_form.is_valid():
                house = main_form.save(commit=False)
                house.home_owner = request.user.home_owner
                house.save()
                return redirect(reverse('house:create_edit', args=[house.uuid, ]))
            else:
                return render(request, 'property/add_form.html', context)

        else:
            return render(request, 'property/add_form.html', context)


def add_house_main(request):
    house = House.objects.create(home_owner=request.user.home_owner)
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
            return render(request, 'property/detail.html', context)


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
def home_owner_info(request, uuid):
    template = 'house/add_house/home_owner_details.html'

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
        3: home_owner_info,
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


@login_required
def delete_listing(request, house_uuid, house=None):
    try:
        if not house:
            house = House.objects.get(home_owner__user=request.user, uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("Bad Request")
    form = HouseDeleteForm(request.POST or None)
    context = {
        'house': house,
        'form': form,
    }

    if request.method == 'POST':
        if form.is_valid():
            if form.cleaned_data['confirm']:
                house.status = 'D'
                house.save()
            return redirect(reverse('user:dashboard'))

    return render(request, 'house/remove/confirm_delete.html', context)


@login_required
def remove_listing(request, house_uuid, house=None):
    try:
        if not house:
            house = House.objects.get(home_owner__user=request.user, uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("Bad Request")
    form = HouseRemoveForm(request.POST or None)
    context = {
        'house': house,
        'form': form,
    }

    if request.method == 'POST':
        if form.is_valid():
            if form.cleaned_data['confirm']:
                house.status = 'I'
                house.save()
            return redirect(reverse('user:dashboard'))

    return render(request, 'house/remove/confirm_remove.html', context)


def remove_house_ask(request, house_uuid):
    try:
        house = House.objects.get(home_owner__user=request.user, uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("Bad Request")
    form = HouseRemoveTypeForm(request.POST or None)
    context = {
        'house': house,
        'form': form,
    }

    if house.status not in ['P', 'L']:
        return delete_listing(request, house_uuid, house=house)

    if request.method == 'POST':
        if form.is_valid():
            if form.cleaned_data['remove_type'] == 'R':
                return remove_listing(request, house_uuid, house=house)
            else:
                return delete_listing(request, house_uuid, house=house)

    return render(request, 'house/remove/remove_or_delete.html', context)


@login_required
def mark_as_leased(request, house_uuid):
    try:
        house = House.objects.get(home_owner__user=request.user, uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("Bad Request")
    form = HouseMarkLeasedForm(request.POST or None)
    context = {
        'house': house,
        'form': form,
    }

    if request.method == 'POST':
        if form.is_valid():
            if form.cleaned_data['confirm']:
                house.status = 'L'
                house.save()
            return redirect(reverse('user:dashboard'))

    return render(request, 'house/state_change_leased.html', context)


@login_required
def home_owner_account_details(request):
    home_owner = request.user.home_owner
    if request.POST:
        home_owner_info_form = HomeOwnerInfoForm(request.POST)
        if home_owner_info_form.is_valid():
            if not home_owner.account_id:
                account = create_account(country=home_owner_info_form.cleaned_data.get('country').code)
                home_owner.account_id = account.id
                home_owner.save()
            return redirect(reverse('house:home_owner'))
    if home_owner.account_id:
        account = get_account(home_owner.account_id)
        country = Country.objects.get(code=account.country)
        home_owner_info_form = HomeOwnerInfoForm(initial={'country': country})
    else:
        home_owner_info_form = HomeOwnerInfoForm()
    context = {
        'home_owner_info_form': home_owner_info_form
    }
    return render(request, 'property/home_owner_profile.html', context)
