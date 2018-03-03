from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm as DjangoUserCreationForm
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
