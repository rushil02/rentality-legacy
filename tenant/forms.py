from django import forms
from django.forms import inlineformset_factory

from tenant.models import HousePreference, AdditionalTenant


class HousePreferenceForm(forms.ModelForm):
    class Meta:
        model = HousePreference
        fields = ['tags', 'locations', 'description']
        widgets = {
            'tags': forms.SelectMultiple(attrs={'class': 'form-control', }),
            'locations': forms.SelectMultiple(attrs={'class': 'form-control', }),
            'description': forms.Textarea(attrs={'class': 'form-control', }),
        }


class HousePreferenceForm2(forms.ModelForm):
    flexible_dates = forms.BooleanField()

    class Meta:
        model = HousePreference
        exclude = ['tenant', 'tags', 'locations', 'description']
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
            'contact_num': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Contact number'}),
            'dob': forms.DateInput(attrs={'class': 'form-control', 'placeholder': 'Date of Birth'}),
            'sex': forms.Select(attrs={'class': 'form-control', 'placeholder': 'Sex'}),
        }


AddTenantFormSet = inlineformset_factory(HousePreference, AdditionalTenant, form=AddTenantsForm, extra=3)


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
