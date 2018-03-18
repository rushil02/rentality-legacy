import os

from django.conf import settings
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUserManager(UserManager):
    def get_sentinel_user(self):
        return self.get_queryset().get_or_create(
            email='deleted@deleted.del',
            defaults={
                'first_name': 'deleted',
                'password': os.environ.get('DELETED_USER_PASS')
            }
        )[0]


class User(AbstractUser):
    email = models.EmailField(
        _('email address'),
        unique=True,
    )
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    objects = CustomUserManager()


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contact_num = models.CharField(
        _('contact number'),
        blank=True,
        max_length=15,
        # validators=[contact_num_validator]  FIXME: No validator. Need custom validator
    )
    SEX_TYPE = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    sex = models.CharField(_('sex'), blank=True, max_length=1, choices=SEX_TYPE, default='O')
    dob = models.DateField(_('Date of Birth'), blank=True, null=True)
    profile_pic = models.ImageField(verbose_name=_('profile picture'), null=True, blank=True)  # FIXME: upload_to
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.user
