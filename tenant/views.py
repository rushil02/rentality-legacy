from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views import View

from tenant.forms import HousePreferenceForm, SearchForm, AddTenantFormSet, HousePreferenceForm2
from tenant.models import HousePreference
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


class HousePreferenceCreateView(View):
    template_name = 'tenant/add_edit/house_pref.html'

    @staticmethod
    def get_form(post_data=None):
        return HousePreferenceForm(post_data)

    def get(self, request, *args, **kwargs):
        form = self.get_form()
        formset = AddTenantFormSet()
        context = {
            'form': form,
            'formset': formset
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        form = self.get_form(request.POST)
        if form.is_valid():
            form.instance.tenant = request.user.tenant
            form.save()
            return redirect('/')
        else:
            return render(request, self.template_name, {'form': form})


class HousePreferenceCreateView2(View):
    template_name = 'tenant/add_edit/house_pref_2.html'

    @staticmethod
    def get_form(post_data=None):
        return HousePreferenceForm2(post_data)

    def get(self, request, *args, **kwargs):
        form = self.get_form()
        context = {
            'form': form,
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        form = self.get_form(request.POST)
        if form.is_valid():
            form.instance.tenant = request.user.tenant
            form.save()
            return redirect('/')
        else:
            return render(request, self.template_name, {'form': form})


class HousePreferenceCreateView3(View):
    template_name = 'tenant/add_edit/tenant_details.html'

    @staticmethod
    def get_form(post_data=None):
        return EditProfileForm(post_data)

    def get(self, request, *args, **kwargs):
        form = self.get_form()
        context = {
            'form': form,
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        form = self.get_form(request.POST)
        if form.is_valid():
            form.instance.tenant = request.user.tenant
            form.save()
            return redirect('/')
        else:
            return render(request, self.template_name, {'form': form})


@login_required()
def shortlisted_houses(request):
    house = request.user.tenant.shortlist.all()
    return render(request, 'tenant/shortlisted.html', {'shortlisted': house})


def search_tenant_page(request):
    form = SearchForm()
    context = {
        'search_form': form,
    }
    return render(request, 'search/tenant_listing.html', context)


def search_tenant_api(request):
    return JsonResponse({"Data": "No Data"})
