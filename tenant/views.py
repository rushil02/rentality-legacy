from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views import View
from django.views.decorators.http import require_POST, require_GET
from django.urls import reverse

from tenant.forms import HousePreferenceForm, SearchForm, AddTenantFormSet, HousePreferenceForm2
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
        return render(request, 'tenant/info.html', {'house_pref': house_pref})


@login_required
def add_preference_main(request):
    house_pref = HousePreference.objects.create(tenant=request.user.tenant)
    return redirect(reverse('tenant:edit', args=[1, house_pref.uuid]))


@login_required
def tenant_info(request, uuid):
    template_name = 'tenant/add_edit/tenant_details.html'

    try:
        house_pref = HousePreference.objects.get(uuid=uuid)
    except HousePreference.DoesNotExist:
        raise Http404("Preference does not exist.")

    form = EditProfileForm(request.POST or None, instance=request.user.userprofile)
    context = {
        'house_pref': house_pref,
        'form': form,
    }
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            if 'save' in request.POST:
                context['form'] = EditProfileForm(instance=request.user.userprofile)
                return render(request, template_name, context)
            elif 'savetolist' in request.POST:
                house_pref.status = 'P'
                house_pref.save()
                return redirect(reverse('user:dashboard'))
    return render(request, template_name, context)


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
            elif 'savetonext' in request.POST:
                return redirect(reverse('tenant:edit', args=[3, house_pref.uuid]))

    return render(request, template_name, context)


@login_required
def add_pref_form1(request, uuid):
    template_name = 'tenant/add_edit/house_pref.html'

    try:
        house_pref = HousePreference.objects.get(uuid=uuid)
    except HousePreference.DoesNotExist:
        raise Http404("Preference does not exist.")

    form = HousePreferenceForm(request.POST or None, instance=house_pref)
    queryset = house_pref.additionaltenant_set.all()
    formset = AddTenantFormSet(request.POST or None, queryset=queryset)
    context = {
        'house_pref': house_pref,
        'form': form,
        'formset': formset,
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
                        add_tenant = formset_form.save(commit=False)
                        add_tenant.house_pref = house_pref
                        add_tenant.save()
                else:
                    valid = False
        else:
            valid = False
        if valid:
            if 'save' in request.POST:
                context['form'] = HousePreferenceForm(instance=house_pref)
                context['formset'] = AddTenantFormSet(queryset=house_pref.additionaltenant_set.all())
                return render(request, template_name, context)
            elif 'savetonext' in request.POST:
                return redirect(reverse('tenant:edit', args=[2, house_pref.uuid]))
        else:
            return render(request, template_name, context)
    else:
        return render(request, template_name, context)


@login_required
def add_edit_pref(request, form_num, uuid=None):
    func_di = {
        1: add_pref_form1,
        2: add_pref_form2,
        3: tenant_info,
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

@require_POST
def search_tenant_page(request):
    query = request.POST['query']
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
    hp = HousePreference.objects.all()
    serializer = HousePreferenceSerializer(hp, many=True)
    return JsonResponse(serializer.data, safe=False)
