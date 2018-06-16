from django import forms
from django.contrib.auth import get_user_model, authenticate, password_validation
from django.contrib.auth.forms import UserCreationForm as DjangoUserCreationForm
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from custom_package.email_validator import clean_gmail
from user_custom.models import UserProfile
from allauth.account.forms import LoginForm as AllAuthLoginForm
from allauth.account.forms import SignupForm as AllAuthSignupForm


class UserCreationForm(DjangoUserCreationForm):
    """
    A form that creates a user, with no privileges, from the given details.
    """
    error_messages = {
        'duplicate_email': _("A user with that email already exists"),
        'password_mismatch': _("The two password fields didn't match."),
        'policy_agreement': _("Please accept the terms and conditions to signup and use our services.")
    }

    password1 = forms.CharField(strip=False,
                                help_text=password_validation.password_validators_help_text_html(),
                                widget=forms.PasswordInput(attrs={'class': 'form-control', 'id': 'Password',
                                                                  'placeholder': 'Password', 'required': 'required'}))
    password2 = forms.CharField(strip=False,
                                help_text=_("Enter the same password as before, for verification."),
                                widget=forms.PasswordInput(attrs={'class': 'form-control', 'id': 'ConfirmPassword',
                                                                  'placeholder': 'Confirm Password',
                                                                  'required': 'required'}))
    receive_newsletter = forms.BooleanField(initial=True, required=False)  # FIXME: store in db
    policy_agreement = forms.BooleanField()

    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name')

        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'id': 'first_name',
                                                 'placeholder': 'First Name', 'required': 'required'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'id': 'last_name',
                                                'placeholder': 'Last Name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'id': 'Email',
                                             'placeholder': 'Email', 'required': 'required'}),
        }

    def clean_email(self):
        email = self.cleaned_data["email"]
        try:
            get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            email = clean_gmail(email)
            return email
        raise forms.ValidationError(
            self.error_messages['duplicate_email'],
            code='duplicate_email'
        )

    def clean_policy_agreement(self):
        agreement = self.cleaned_data['policy_agreement']
        if not agreement:
            raise forms.ValidationError(
                self.error_messages['policy_agreement'],
                code='Policy agreement not accepted'
            )


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
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'id': 'first_name',
                                                 'placeholder': 'First Name', 'required': 'required'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'id': 'last_name',
                                                'placeholder': 'Last Name'}),
        }


class EditProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = ['user', 'updated_on', ]
        widgets = {
            'contact_num': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Contact number'}),
            'dob': forms.DateInput(attrs={'class': 'form-control', 'placeholder': 'Date of Birth'}),
            'sex': forms.Select(attrs={'class': 'form-control', 'placeholder': 'Sex'}),
            'profile_pic': forms.ClearableFileInput(attrs={'class': 'form-control', }),
        }


class CustomLoginForm(AllAuthLoginForm):
    def __init__(self, *args, **kwargs):
        super(CustomLoginForm, self).__init__(*args, **kwargs)
        self.fields['login'].widget.attrs['class'] = 'form-control'
        self.fields['login'].widget.attrs['placeholder'] = 'Email'
        self.fields['password'].widget.attrs['class'] = 'form-control'
        self.fields['password'].widget.attrs['placeholder'] = 'Password'


class CustomSignupForm(AllAuthSignupForm):

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

    receive_newsletter = forms.BooleanField(initial=True, required=False)  # FIXME: store in db
    policy_agreement = forms.BooleanField()

    def __init__(self, *args, **kwargs):
        super(CustomSignupForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs['class'] = 'form-control'
        self.fields['email'].widget.attrs['placeholder'] = 'Email'
        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['placeholder'] = 'Password'
        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['placeholder'] = 'Password (again)'
    
    def clean_policy_agreement(self):
        agreement = self.cleaned_data['policy_agreement']
        if not agreement:
            raise forms.ValidationError(
                self.error_messages['policy_agreement'],
                code='Policy agreement not accepted'
            )
    
    def custom_signup(self, request, user):
        UserProfile.objects.create(
            user=user, receive_newsletter=self.cleaned_data['receive_newsletter']
        )