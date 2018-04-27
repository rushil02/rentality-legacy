from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.http import require_POST, require_GET

from house.forms import HouseDetailsForm1, HouseDetailsForm2, HouseDetailsForm3, SearchForm, \
    HousePhotoFormSet
from house.models import House
from house.serializer import HouseSerializer
from messaging.forms import MessageForm
from messaging.views import save_message
from user_custom.forms import EditProfileForm
from django.contrib import messages


def info(request, house_uuid):
    try:
        house = House.objects.get(uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    else:
        if request.method == 'POST':
            message_form = MessageForm(request.POST)
            if message_form.is_valid():
                try:
                    save_message(request, message_form.data['content'], house)
                except AssertionError:
                    messages.add_message(request, messages.INFO, 'You cannot send yourself a message')
                else:
                    messages.add_message(request, messages.SUCCESS, 'Your message has been sent to the property owner.')
                    message_form = MessageForm()
                context = {'house': house, 'msg_form': message_form}
                return render(request, 'house/info.html', context)
            else:
                context = {'house': house, 'msg_form': message_form}
                return render(request, 'house/info.html', context)
        else:
            message_form = MessageForm()
            context = {'house': house, 'msg_form': message_form}
            return render(request, 'house/info.html', context)


# FIXME: how to edit houses and maintain continuation, use form wizards?
def add_house_details(request, uuid, next_url, FormClass, template, FormSetClass=None):
    if uuid:
        try:
            house = House.objects.get(uuid=uuid)
        except House.DoesNotExist:
            raise Http404("House does not exist.")
    else:
        house = None

    form = FormClass(request.POST or None, instance=house)

    if FormSetClass:
        context = {
            'formset': FormSetClass(request.POST or None)
        }
    else:
        context = {}

    if request.method == 'POST':
        if form.is_valid():
            obj = form.save(commit=False)
            if not obj.landlord:
                obj.landlord = request.user.landlord
            obj.save()

            return redirect(reverse(next_url))
        else:
            context.update({'form': form})
            return render(request, template, context)
    else:
        context.update({'form': form})

        return render(request, template, context)


def add_house_form1(request, uuid=None):
    next_url = 'house:'
    template = 'house/add_house/specs.html'
    return add_house_details(request, uuid, next_url, HouseDetailsForm1, template, FormSetClass=HousePhotoFormSet)


def add_house_form2(request, uuid=None):
    next_url = 'house:'
    template = 'house/add_house/date_cost_details.html'
    return add_house_details(request, uuid, next_url, HouseDetailsForm2, template)


def landlord_info(request, uuid=None):
    next_url = ''
    template = 'house/add_house/landlord_details.html'
    return add_house_details(request, uuid, next_url, EditProfileForm, template)


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


@require_POST
def search_house_page(request):
    query = request.POST['query']
    form = SearchForm(initial={'location': query})
    context = {
        'search_form': form,
        'initial_query': query
    }
    return render(request, 'search/house_listing.html', context)


@require_GET
def search_house_api(request):
    query = request.GET['query']
    houses = House.objects.filter(address__icontains=query)
    serializer = HouseSerializer(houses, many=True)
    return JsonResponse(serializer.data, safe=False)
