from dal import autocomplete
from django import forms
from django.forms import inlineformset_factory, modelformset_factory

from tenant.models import HousePreference, AdditionalTenant


class HousePreferenceForm(forms.ModelForm):
    class Meta:
        model = HousePreference
        fields = ['locations', 'description']
        widgets = {
            'locations': autocomplete.ModelSelect2Multiple(url='tenant:city_name_api',
                                                           attrs={'class': 'form-control',
                                                                  'data-placeholder': 'Locations (Cities)'}),
            'description': forms.Textarea(attrs={'class': 'form-control', }),
        }


class HousePreferenceForm2(forms.ModelForm):
    flexible_dates = forms.BooleanField(required=False)

    class Meta:
        model = HousePreference
        exclude = ['tenant', 'locations', 'description', 'status']
        widgets = {
            'max_budget': forms.NumberInput(attrs={'class': 'form-control', }),
            'flexible_dates': forms.CheckboxInput(attrs={'class': 'form-control', })
        }


class AddTenantsForm(forms.ModelForm):
    class Meta:
        model = AdditionalTenant
        exclude = ['house_pref']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Name'}),
            'contact_num': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Contact number'}),
            'dob': forms.DateInput(attrs={'class': 'form-control', 'placeholder': 'Date of Birth'}),
            'sex': forms.Select(attrs={'class': 'form-control', 'placeholder': 'Sex'}),
        }


AddTenantFormSet = modelformset_factory(AdditionalTenant, form=AddTenantsForm, extra=1)


class SearchForm(forms.Form):
    location = forms.CharField(
        label='Location',
        widget=forms.TextInput(attrs={
            'class': 'form-control', 'placeholder': 'City, State, Postcode, etc.'
        })
    )
    bedrooms = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'No. of bedrooms', })
    )
    bathrooms = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'No. of bathrooms'})
    )
    max_price = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Max Rent'})
    )


class MarkSelectedForm(forms.Form):
    confirm = forms.TypedChoiceField(coerce=lambda x: x == 'True',
                                     choices=((False, 'No'), (True, 'Yes')))
