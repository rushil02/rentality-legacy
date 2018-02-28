from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    email_validator = None  # FIXME: for google
    username = models.CharField(
        _('username'),
        max_length=150,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[AbstractUser.username_validator],
    )
    email = models.EmailField(
        _('email address'),
        unique=True,
        # validators=[email_validator],  FIXME: works with django default, add for gmail
    )

    USER_TYPE = (
        ('T', 'Tenant'),
        ('L', 'Landlord'),
        ('M', 'Manager'),
        ('A', 'Admin')
    )
    user_type = models.CharField(
        max_length=1,
        choices=USER_TYPE,
        default='T'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = 'username'


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contact_num = models.CharField(
        blank=True,
        max_length=15,
        # validators=[contact_num_validator]  FIXME: No validator. Need custom validator
    )
    SEX_TYPE = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    sex = models.CharField(blank=True, max_length=1, choices=SEX_TYPE, default='O')
    age = models.PositiveSmallIntegerField(blank=True, null=True)
    profile_pic = models.ImageField()  # FIXME: upload_to
