from django import forms
from django.contrib.auth import get_user_model, authenticate, password_validation
from django.contrib.auth.forms import UserCreationForm as DjangoUserCreationForm
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from custom_package.email_validator import clean_gmail
from user_custom.models import UserProfile


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
            'dob': forms.DateInput(attrs={'class': 'form-control', 'id': 'Email',
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
            'profile_pic': forms.FileInput(attrs={'class': 'form-control', }),
        }


class LoginForm(forms.Form):
    user_cache = None

    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'class': 'form-control',
                                                                           'placeholder': 'Email'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Password',
                                                                 }), required=True)

    def clean(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')
        if email and password:
            self.user_cache = authenticate(email=email, password=password)
            if not self.user_cache:
                raise forms.ValidationError("Sorry, Invalid credentials. Please try again.")
            else:
                if not self.is_active():
                    raise forms.ValidationError("Your account is not active. Please contact us via our Helpdesk.")
                else:
                    return self.cleaned_data
        else:
            raise forms.ValidationError("Enter Email and Password")

    def clean_email(self):
        email = self.cleaned_data.get('email')
        try:
            email = clean_gmail(email)
        except ValidationError:
            raise forms.ValidationError(_("Enter valid email address"))
        else:
            return email

    def get_user_id(self):
        if self.user_cache:
            return self.user_cache.id
        return None

    def get_user(self):
        return self.user_cache

    def is_active(self):
        if self.user_cache:
            return self.user_cache.is_active
        else:
            return False
