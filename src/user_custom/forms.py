from django import forms
from django.conf import settings
from django.contrib.auth import get_user_model, authenticate, password_validation
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from house.models import HomeType
from utils.email_validator import clean_gmail
from user_custom.models import UserProfile
from allauth.account.forms import LoginForm as AllAuthLoginForm
from allauth.account.forms import SignupForm as AllAuthSignupForm
from allauth.account.forms import ChangePasswordForm as AllAuthChangePasswordForm
from allauth.account.forms import ResetPasswordForm as AllAuthResetPasswordForm
from allauth.account.forms import ResetPasswordKeyForm as AllAuthResetPasswordKeyForm

from utils.form_thumbnailer import ImageClearableFileInput


class ProfileForm1(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = ['user', 'profile_pic', 'receive_newsletter']
        widgets = {
            'contact_num': forms.NumberInput(attrs={'class': 'form-control', 'id': 'contact_num',
                                                    'placeholder': 'Contact number'}),
            'dob': forms.DateInput(attrs={'class': 'form-control',
                                          'placeholder': 'Date of Birth'}),
        }


class ProfileForm2(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_pic', ]


class UserChangeForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name']
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control',
                                                 'placeholder': 'First Name', 'required': 'required'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control',
                                                'placeholder': 'Last Name'}),
        }


class EditProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = ['user', 'updated_on', ]
        widgets = {
            'contact_num': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Contact number'}),
            'dob': forms.DateInput(
                attrs={'class': 'form-control', 'placeholder': 'Date of Birth', 'autocomplete': "off"},
            ),
            'sex': forms.Select(attrs={'class': 'form-control select-gender', 'placeholder': 'Sex'}),
            'profile_pic': ImageClearableFileInput(
                thumbnail_options=settings.THUMBNAIL_ALIASES['']['house_detail_small'],
                attrs={'required': False, 'style': "visibility: hidden"},
                template='%(template)s <a id="thumbnail-anchor" href="%(source_url)s" target="_blank">%(thumb)s</a>'
            ),
        }


class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_pic', ]
        widgets = {
            'profile_pic': ImageClearableFileInput(
                thumbnail_options=settings.THUMBNAIL_ALIASES['']['house_detail_small'],
                attrs={'required': False, 'style': "visibility: hidden"},
                template='%(template)s <a id="thumbnail-anchor" href="%(source_url)s" target="_blank">%(thumb)s</a>'
            ),
        }


class CustomLoginForm(AllAuthLoginForm):
    def __init__(self, *args, **kwargs):
        super(CustomLoginForm, self).__init__(*args, **kwargs)
        self.fields['login'].widget.attrs['class'] = 'form-control'
        self.fields['login'].widget.attrs['placeholder'] = 'Email'
        self.fields['password'].widget.attrs['class'] = 'form-control'
        self.fields['password'].widget.attrs['placeholder'] = 'Password'
        self.fields['remember'].widget.attrs['class'] = 'custom-control-input'


class CustomSignupForm(AllAuthSignupForm):
    # FIXME: Add Gmail Checker

    first_name = forms.CharField(max_length=30,
                                 widget=forms.TextInput(
                                     attrs={
                                         'class': 'form-control', 'id': 'first_name',
                                         'placeholder': 'First Name', 'required': 'required'
                                     }
                                 )
                                 )

    last_name = forms.CharField(max_length=150,
                                widget=forms.TextInput(
                                    attrs={
                                        'class': 'form-control', 'id': 'last_name',
                                        'placeholder': 'Last Name'
                                    }
                                )
                                )

    # receive_newsletter = forms.BooleanField(initial=True, required=False)  # FIXME: store in db
    # policy_agreement = forms.BooleanField()
    contact_num = forms.CharField(max_length=15, required=False,
                                  widget=forms.TextInput(
                                      attrs={
                                          'class': 'form-control', 'id': 'contact_num',
                                          'placeholder': 'Phone Number (optional)'
                                      }
                                  )
                                  )
    SEX_TYPE = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    gender = forms.ChoiceField(choices=SEX_TYPE, widget=forms.RadioSelect())

    def __init__(self, *args, **kwargs):
        super(CustomSignupForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs['class'] = 'form-control'
        self.fields['email'].widget.attrs['placeholder'] = 'Email Address'
        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['placeholder'] = 'Password'
        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['placeholder'] = 'Password (again)'

    # def clean_policy_agreement(self):
    #     agreement = self.cleaned_data['policy_agreement']
    #     if not agreement:
    #         raise forms.ValidationError(
    #             _("Please accept the terms and conditions to signup and use our services."),
    #             code='Policy agreement not accepted'
    #         )

    def custom_signup(self, request, user):
        UserProfile.objects.update_or_create(
            user=user, defaults=dict(contact_num=self.cleaned_data['contact_num'],
                                     sex=self.cleaned_data['gender'])
        )


class CustomChangePasswordForm(AllAuthChangePasswordForm):
    def __init__(self, *args, **kwargs):
        super(CustomChangePasswordForm, self).__init__(*args, **kwargs)
        self.fields['oldpassword'].widget.attrs['class'] = "form-control"
        self.fields['password1'].widget.attrs['class'] = "form-control"
        self.fields['password2'].widget.attrs['class'] = "form-control"


class CustomResetPasswordForm(AllAuthResetPasswordForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs['class'] = "form-control"


class CustomResetPasswordKeyForm(AllAuthResetPasswordKeyForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].widget.attrs['class'] = "form-control"
        self.fields['password2'].widget.attrs['class'] = "form-control"



# FIXME: This is in the wrong package
class HomePageSearchForm(forms.Form):
    location = forms.CharField(
        label='Location',
        widget=forms.TextInput(attrs={
            'class': 'form-control marker search', 'placeholder': 'City, State, Post code',
        }, )
    )
    start_date = forms.DateField(
        label='Start date', required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'Start Date', 'hidden': True, 'data-toggle': 'datepicker', 'required': False
        }, )
    )
    end_date = forms.DateField(
        label='End date', required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'End Date', 'hidden': True, 'data-toggle': 'datepicker',
            'required': False

        }, )
    )
    home_type = forms.ModelChoiceField(
        label='Home Type', queryset=HomeType.objects.all(), required=False,
        widget=forms.Select(attrs={
            'class': 'form-control type', 'placeholder': 'Home Type', 'required': False
        }, )
    )
    rent = forms.IntegerField(
        label='Rent', required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control amount', 'placeholder': 'Rent $AUD/week', 'required': False
        }, )
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['home_type'].choices = [(None, "Select Home Type"),] + \
                list(self.fields["home_type"].choices)[1:]

