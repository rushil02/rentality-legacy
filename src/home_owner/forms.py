from django import forms
from cities.models import Country
from django.contrib.auth import get_user_model
from user_custom.models import UserProfile


class HomeOwnerInfoForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['country'].widget.attrs['class'] = 'form-control'
        if kwargs.get('initial'):
            self.fields['country'].widget.attrs['disabled'] = 'true'
    
    type = forms.ChoiceField(
        choices=(
            ('individual', 'Individual'),
            ('company', 'Company')
        ),
        required=False,
        widget=forms.Select(
            attrs={
                'class': 'inp-type form-control',
            }
        )
    )
    country = forms.ModelChoiceField(queryset=Country.objects.all(), required=False)
    street_address1 = forms.CharField(
        max_length=50, required=False, 
        widget=forms.TextInput(
            attrs={
                'class': 'inp-street-address1 form-control',
            }
        )
    )
    city = forms.CharField(
        max_length=50, required=False, 
        widget=forms.TextInput(
            attrs={
                'class': 'inp-city form-control',
            }
        )
    )
    state = forms.CharField(
        max_length=50, required=False, 
        widget=forms.TextInput(
            attrs={
                'class': 'inp-state form-control',
            }
        )
    )
    zip = forms.CharField(
        max_length=50, required=False, 
        widget=forms.TextInput(
            attrs={
                'class': 'inp-zip form-control',
            }
        )
    )


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
                'data-toggle': 'datepicker'
            },
            format='%m/%d/%Y'
        )
        self.fields['sex'].widget.attrs['class'] = 'inp-gender form-control'
        self.fields['contact_num'].widget.attrs['class'] = 'inp-contact-num form-control'