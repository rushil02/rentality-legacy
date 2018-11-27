from django import forms
from cities.models import Country
from django.contrib.auth import get_user_model
from user_custom.models import UserProfile


class HomeOwnerInfoForm(forms.Form):
    def __init__(self, *args, **kwargs):
        business_tax_id_provided = kwargs.pop('business_tax_id_provided', False)
        super().__init__(*args, **kwargs)
        if not business_tax_id_provided:
            self.fields['business_tax_id'] = forms.CharField(
                max_length=50, required=False, 
                widget=forms.TextInput(
                    attrs={
                        'class': 'inp-business-tax-id form-control',
                        'placeholder': 'Business Tax ID'
                    }
                )
            )
        self.fields['country'].widget.attrs['class'] = 'form-control'
        if kwargs.get('initial'):
            self.fields['country'].widget.attrs['disabled'] = 'true'
    
    type = forms.ChoiceField(
        choices=(
            ('individual', 'Individual'),
            ('company', 'Company')
        ),
        required=True,
        widget=forms.Select(
            attrs={
                'class': 'inp-type form-control',
            }
        )
    )
    country = forms.ModelChoiceField(queryset=Country.objects.all(), required=True)
    street_address1 = forms.CharField(
        max_length=50, required=True,
        widget=forms.TextInput(
            attrs={
                'class': 'inp-street-address1 form-control', 'placeholder': 'Street Address'
            }
        )
    )
    city = forms.CharField(
        max_length=50, required=True,
        widget=forms.TextInput(
            attrs={
                'class': 'inp-city form-control', 'placeholder': 'City'
            }
        )
    )
    state = forms.CharField(
        max_length=50, required=False, 
        widget=forms.TextInput(
            attrs={
                'class': 'inp-state form-control', 'placeholder': 'State'
            }
        )
    )
    zip = forms.CharField(
        max_length=50, required=True,
        widget=forms.TextInput(
            attrs={
                'class': 'inp-zip form-control', 'placeholder': 'Zipcode/Postcode'
            }
        )
    )
    business_name = forms.CharField(
        max_length=50, required=False, 
        widget=forms.TextInput(
            attrs={
                'class': 'inp-business-name form-control',
                'placeholder': 'Business Name'
            }
        )
    )


# FIXME: Convert attributes to meta attribute to reduce processing time
class UserHomeOwnerForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].widget.attrs['class'] = 'inp-first-name form-control'
        self.fields['first_name'].widget.attrs['placeholder'] = 'First Name'
        self.fields['last_name'].widget.attrs['class'] = 'inp-last-name form-control'
        self.fields['last_name'].widget.attrs['placeholder'] = 'Last Name'


class UserProfileHomeOwnerForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['contact_num', 'dob', 'sex']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['dob'].widget = forms.DateInput(
            attrs={
                'class': 'inp-dob form-control date',
                'data-toggle': 'datepicker',
                'placeholder': 'Date of Birth',
                'autocomplete': 'off'
            },
        )
        self.fields['sex'].widget.attrs['class'] = 'inp-gender form-control'
        self.fields['contact_num'].widget.attrs['class'] = 'inp-contact-num form-control'
        self.fields['contact_num'].widget.attrs['placeholder'] = 'Contact Number'
