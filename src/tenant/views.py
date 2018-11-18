from django.conf import settings
from django.contrib import messages
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views import View
from django.views.decorators.http import require_POST, require_GET
from django.urls import reverse
from payments.stripe_wrapper import create_charge, create_customer, retrieve_customer
from cities.models import Country

from messaging.forms import MessageForm
from messaging.views import save_new_thread
from tenant.forms import HousePreferenceForm, SearchForm, AddTenantFormSet, HousePreferenceForm2, MarkSelectedForm, TenantInfoForm, UserTenantForm, UserProfileTenantForm
from tenant.models import HousePreference
from tenant.serializers import HousePreferenceSerializer
from user_custom.forms import EditProfileForm


@login_required
def home(request):
    return HttpResponse("Tenant Home Page")


def info(request, house_pref_uuid):
    try:
        house_pref = HousePreference.objects.get(uuid=house_pref_uuid)
    except HousePreference.DoesNotExist:
        raise Http404("Tenant does not exist.")
    else:
        if request.method == 'POST':
            message_form = MessageForm(request.POST)
            if request.user.is_authenticated:
                if message_form.is_valid():
                    try:
                        save_new_thread(request, house_pref, message=message_form.data['content'])
                    except AssertionError:
                        messages.add_message(request, messages.INFO, 'You cannot send yourself a message')
                    else:
                        messages.add_message(request, messages.SUCCESS,
                                             'Your message has been sent to the property owner.')
                        message_form = MessageForm()
                    context = {'house_pref': house_pref, 'msg_form': message_form}
                    return render(request, 'tenant/info.html', context)
                else:
                    context = {'house_pref': house_pref, 'msg_form': message_form}
                    return render(request, 'tenant/info.html', context)
            else:
                return redirect(settings.LOGIN_URL + '?next=' + request.get_full_path())
        else:
            message_form = MessageForm()
            context = {'house_pref': house_pref, 'msg_form': message_form}
            return render(request, 'tenant/info.html', context)


@login_required
def add_preference_main(request):
    house_pref = HousePreference.objects.create(tenant=request.user.tenant)
    return redirect(reverse('tenant:edit', args=[1, house_pref.uuid]))


# @login_required
# def tenant_info(request, uuid):
#     template_name = 'tenant/add_edit/tenant_details.html'
#
#     try:
#         house_pref = HousePreference.objects.get(uuid=uuid)
#     except HousePreference.DoesNotExist:
#         raise Http404("Preference does not exist.")
#
#     form = EditProfileForm(request.POST or None, instance=request.user.userprofile)
#     context = {
#         'house_pref': house_pref,
#         'form': form,
#     }
#     if request.method == 'POST':
#         if form.is_valid():
#             form.save()
#             if 'save' in request.POST:
#                 context['form'] = EditProfileForm(instance=request.user.userprofile)
#                 return render(request, template_name, context)
#             elif 'savetolist' in request.POST:
#                 house_pref.status = 'P'
#                 house_pref.save()
#                 return redirect(reverse('user:dashboard'))
#     return render(request, template_name, context)


@login_required
def add_pref_form2(request, uuid):
    template_name = 'tenant/add_edit/house_pref_2.html'

    try:
        house_pref = HousePreference.objects.get(uuid=uuid)
    except HousePreference.DoesNotExist:
        raise Http404("Preference does not exist.")

    form = HousePreferenceForm2(request.POST or None, instance=house_pref)
    context = {
        'house_pref': house_pref,
        'form': form,
    }
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            if 'save' in request.POST:
                context['form'] = HousePreferenceForm2(instance=house_pref)
                return render(request, template_name, context)
            elif 'savetolist' in request.POST:
                house_pref.status = 'P'
                house_pref.save()
                return redirect(reverse('user:dashboard'))

    return render(request, template_name, context)


@login_required
def tenant_pref_detail_form_view(request, uuid):
    template_name = 'tenant/add_edit/house_pref.html'

    try:
        house_pref = HousePreference.objects.get(uuid=uuid)
    except HousePreference.DoesNotExist:
        raise Http404("Preference does not exist.")

    form1 = HousePreferenceForm(request.POST or None, instance=house_pref, prefix='tenancy-pref')

    form2 = EditProfileForm(request.POST or None, request.FILES or None, instance=request.user.userprofile,
                            prefix='tenant-details')

    context = {
        'house_pref': house_pref,
        'hp_form': form1,
        'td_form': form2,
    }

    if request.method == "POST":
        valid = True
        if form1.is_valid():
            form1.save()
        else:
            valid = False
        if form2.is_valid():
            form2.save()
        else:
            valid = False

        if valid:
            if 'save' in request.POST:
                context['hp_form'] = HousePreferenceForm(instance=house_pref, prefix='tenancy-pref')
                context['td_form'] = EditProfileForm(instance=request.user.userprofile, prefix='tenant-details')
                return render(request, template_name, context)
            elif 'savetonext' in request.POST:
                return redirect(reverse('tenant:edit', args=[2, house_pref.uuid]))
        else:
            return render(request, template_name, context)
    else:
        return render(request, template_name, context)


# @login_required
# def add_pref_form1(request, uuid):
#     template_name = 'tenant/add_edit/house_pref.html'
#
#     try:
#         house_pref = HousePreference.objects.get(uuid=uuid)
#     except HousePreference.DoesNotExist:
#         raise Http404("Preference does not exist.")
#
#     form = HousePreferenceForm(request.POST or None, instance=house_pref)
#     queryset = house_pref.additionaltenant_set.all()
#     formset = AddTenantFormSet(request.POST or None, queryset=queryset)
#     context = {
#         'house_pref': house_pref,
#         'form': form,
#         'formset': formset,
#     }
#     if request.method == 'POST':
#         valid = True
#         if form.is_valid():
#             form.save()
#         else:
#             valid = False
#         if formset.is_valid():
#             for formset_form in formset.forms:
#                 if formset_form.is_valid():
#                     if formset_form.has_changed():
#                         add_tenant = formset_form.save(commit=False)
#                         add_tenant.house_pref = house_pref
#                         add_tenant.save()
#                 else:
#                     valid = False
#         else:
#             valid = False
#         if valid:
#             if 'save' in request.POST:
#                 context['form'] = HousePreferenceForm(instance=house_pref)
#                 context['formset'] = AddTenantFormSet(queryset=house_pref.additionaltenant_set.all())
#                 return render(request, template_name, context)
#             elif 'savetonext' in request.POST:
#                 return redirect(reverse('tenant:edit', args=[2, house_pref.uuid]))
#         else:
#             return render(request, template_name, context)
#     else:
#         return render(request, template_name, context)


@login_required
def add_edit_pref(request, form_num, uuid=None):
    func_di = {
        1: tenant_pref_detail_form_view,
        2: add_pref_form2,
    }

    try:
        return func_di[form_num](request, uuid)
    except KeyError:
        return Http404()


@login_required()
def shortlisted_houses(request):
    house = request.user.tenant.shortlist.all()
    return render(request, 'tenant/shortlisted.html', {'shortlisted': house})


# FIXME: check methods

# @require_POST FIXME
def search_tenant_page(request):
    try:
        query = request.POST['query']
    except:
        query = ''
    form = SearchForm(initial={'location': query})
    context = {
        'search_form': form,
        'initial_query': query
    }
    return render(request, 'search/tenant_listing.html', context)


@require_GET
def search_tenant_api(request):
    query = request.GET['query']
    # hp = HousePreference.objects.filter(locations__suburb__icontains=query)
    hp = HousePreference.active_objects.all()
    serializer = HousePreferenceSerializer(hp, many=True)
    return JsonResponse(serializer.data, safe=False)


@login_required
def mark_as_selected(request, hp_uuid):
    try:
        hp = HousePreference.objects.get(tenant__user=request.user, uuid=hp_uuid)
    except HousePreference.DoesNotExist:
        raise Http404("Bad Request")
    form = MarkSelectedForm(request.POST or None)
    context = {
        'hp': hp,
        'form': form,
    }

    if request.method == 'POST':
        if form.is_valid():
            if form.cleaned_data['confirm']:
                hp.status = 'S'
                hp.save()
            return redirect(reverse('user:dashboard'))

    return render(request, 'tenant/state_change_selected.html', context)


def checkout(request):
    #TODO: Add relavant details
    if request.POST:
        kwargs = {
            'source': request.POST.get('stripeToken'),
            'target_account_id': 'acct_1DXajWJwl0dd6to9',
            'amount': '1000',
            'destination_amount': '877'
        }
        charge = create_charge(**kwargs)
        return redirect(reverse('tenant:payment_successful'))

    return render(request, 'tenant/checkout.html')


def payment_successful(request):
    return render(request, 'tenant/payment_successful.html')


@login_required
def tenant_profile(request):
    tenant = request.user.tenant
    if request.POST:
        tenant_info_form = TenantInfoForm(request.POST)
        user_tenant_form = UserTenantForm(request.POST, instance=request.user)
        user_profile_tenant_form = UserProfileTenantForm(request.POST, instance=request.user.userprofile)
        if tenant_info_form.is_valid() and user_tenant_form.is_valid() and user_profile_tenant_form.is_valid():
            user = user_tenant_form.save()
            user_profile = user_profile_tenant_form.save()
            if not tenant.customer_id:
                kwargs = {
                    'email': request.user.email,
                    'shipping': {
                        'address': {
                            'line1': tenant_info_form.cleaned_data['street_address1'],
                            'city': tenant_info_form.cleaned_data['city'],
                            'country': tenant_info_form.cleaned_data['country'].code,
                            'postal_code': tenant_info_form.cleaned_data['zip'],
                            'state': tenant_info_form.cleaned_data['state']
                        },
                        'name': "{} {}".format(user.first_name, user.last_name),
                        'phone': user_profile.contact_num
                    }
                }
                if request.POST.get('stripeToken'):
                    kwargs['source'] = request.POST.get('stripeToken')
                customer = create_customer(**kwargs)
                tenant.customer_id = customer.id
                tenant.save()
            else:
                customer = retrieve_customer(tenant.customer_id)
                customer.shipping = {
                    'address': {
                        'line1': tenant_info_form.cleaned_data['street_address1'],
                        'city': tenant_info_form.cleaned_data['city'],
                        'country': tenant_info_form.cleaned_data['country'].code,
                        'postal_code': tenant_info_form.cleaned_data['zip'],
                        'state': tenant_info_form.cleaned_data['state']
                    },
                    'name': "{} {}".format(user.first_name, user.last_name),
                    'phone': user_profile.contact_num
                }
                if request.POST.get('stripeToken'):
                    customer.source = request.POST.get('stripeToken')
                customer.save()
            return redirect(reverse('tenant:profile'))
    else:
        if tenant.customer_id:
            customer = retrieve_customer(tenant.customer_id)
            initial = {}
            print(customer.shipping.get('address').get('postal_code'))
            print(customer.sources.data[0].last4)
            if customer.shipping.get('address').get('country'):
                initial['country'] = Country.objects.get(code=customer.shipping.get('address').get('country'))
            initial['city'] = customer.shipping.get('address').get('city'),
            initial['zip'] = customer.shipping.get('address').get('postal_code'),
            initial['state'] = customer.shipping.get('address').get('state')
            initial['street_address1'] = customer.shipping.get('address').get('line1')
            tenant_info_form = TenantInfoForm(initial=initial)
        else:
            tenant_info_form = TenantInfoForm()
        user_tenant_form = UserTenantForm(instance=request.user)
        user_profile_tenant_form = UserProfileTenantForm(instance=request.user.userprofile)
        context = {
            'tenant_info_form': tenant_info_form,
            'user_tenant_form': user_tenant_form,
            'user_profile_tenant_form': user_profile_tenant_form
        }
    return render(request, 'tenant/profile.html', context)