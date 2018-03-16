from django import forms
from django.contrib.auth import get_user_model, authenticate
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
    }

    class Meta:
        model = get_user_model()
        fields = ('email', 'username')

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


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = ['user', ]


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
