import os
import time
import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.operations import CreateExtension
from django.db import migrations

from messaging.models import Message
from messaging.views import message_count


class Migration(migrations.Migration):
    operations = [
        CreateExtension('postgis'),
    ]


def get_file_path(instance, filename):
    path = 'profile_pictures/' + time.strftime('/%Y/%m/%d/')
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join(path, filename)


class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

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

    def get_new_message_count(self):
        return message_count(self)

    def __str__(self):
        return self.get_full_name()

    def save(self, *args, **kwargs):
        object_is_new = not self.pk
        super(User, self).save(*args, **kwargs)
        if object_is_new:
            UserProfile.objects.create(user=self)


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
    receive_newsletter = models.BooleanField(default=True)
    profile_pic = models.ImageField(verbose_name=_('profile picture'), null=True, blank=True, upload_to=get_file_path)
    personality_tags = models.ManyToManyField('user_custom.PersonalityTag', blank=True)

    updated_on = models.DateTimeField(auto_now=True)

    DEFAULT_PROFILE_PIC = '/static/img/placeholders/profile/default.png'

    def __str__(self):
        return "%s" % self.user

    def get_profile_pic(self):
        if self.profile_pic:
            return self.profile_pic
        else:
            return self.DEFAULT_PROFILE_PIC


class PersonalityTag(models.Model):
    """
    Tags to describe the personality/hobbies of a user.
    """
    verbose = models.CharField(max_length=50)
    system_default = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s" % self.verbose
