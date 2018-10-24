import os
import time
import uuid

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Review(models.Model):
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    description = models.TextField()

    class Meta:
        abstract = True


class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    CHOICE = (
        ('NM', 'New Message'),
        ('RL', 'Requests'),
        ('OF', 'Offers')
    )

    notification_type = models.CharField(max_length=3, choices=CHOICE)

    data = JSONField()
    deleted = models.DateTimeField(null=True, blank=True)
    notified = models.BooleanField(default=False)
    update_time = models.DateTimeField(auto_now=True)
    create_time = models.DateTimeField(auto_now_add=True)


def get_policy_doc_path(instance, filename):
    path = 'docs/policy/' + time.strftime('/%Y/%m/%d/')
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join(path, filename)


class Policy(models.Model):
    version = models.CharField(max_length=20, unique=True)
    verbose_name = models.CharField(max_length=100)
    code_name = models.CharField(max_length=20)
    doc = models.FileField(upload_to=get_policy_doc_path)
    html = models.TextField(blank=True)

    STATUS = (
        ("A", "Active"),
        ("L", "Legacy")
    )
    status = models.CharField(choices=STATUS, max_length=1)

    parent_policy = models.OneToOneField('essentials.Policy', on_delete=models.PROTECT, null=True, blank=True)
    meta = JSONField(blank=True, null=True)
    updated_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.version


class DataPrivacySettingManager(models.Manager):

    def create_default_privacy_info(self, instance):
        """
        Creates privacy attributes with provided defaults in the 'PrivacySetting' inner class.
        Raises an error if 'PrivacySetting' class doesn't exist.
        """

        model = type(instance)

        try:
            privacy_setting = instance.PrivacySetting.fields
            get_default = instance.PrivacySetting.get_default
        except AttributeError as e:
            raise AssertionError(
                "Privacy Attributes not found for model '%s'. "
                "Define inner class 'PrivacySetting' with required Privacy options with dictionary 'fields'. "
                "Failure message :'%s'"
                % (model.__name__, e)
            )
        else:
            objs = []
            for field in privacy_setting:
                objs.append(self.model(
                    content_object=instance, attribute=field,
                    setting=get_default(field)[0]
                ))
            self.bulk_create(objs)

    def get_privacy_settings(self, instance, fields='__all__'):
        """
        :param instance: object for which privacy settings are to be returned
        :param fields: array of specific field or all (default)
        :return: dictionary of current privacy settings with available options, default and help-text
        """
        model = type(instance)

        try:
            privacy_setting = instance.PrivacySetting.fields

        except AttributeError as e:
            raise AssertionError(
                "Privacy Attributes not found for model '%s'. "
                "Define inner class 'PrivacySetting' with required Privacy options with dictionary 'fields'. "
                "Failure message :'%s'"
                % (model.__name__, e)
            )
        else:
            ct = ContentType.objects.get_for_model(instance)
            instance_settings = dict()
            if fields == '__all__':
                saved_settings = self.filter(content_type=ct, object_id=instance.id).values('attribute', 'setting')
            else:
                try:
                    iter(fields)
                except TypeError:
                    raise AssertionError("Provided arguments of fields is not an iterable.")
                else:
                    saved_settings = self.filter(content_type=ct, object_id=instance.id, attribute__in=fields).values(
                        'attribute', 'setting')

            for attribute in saved_settings:
                instance_settings[attribute['attribute']] = dict(**privacy_setting[attribute],
                                                                 current=attribute['setting'])
            return instance_settings


class DataPrivacySetting(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    attribute = models.CharField(max_length=20)
    setting = models.CharField(max_length=1)

    objects = DataPrivacySettingManager()

    class Meta:
        unique_together = (('content_type', 'object_id', 'attribute'),)

    def __str__(self):
        return "%s" % self.content_object

    def get_setting_verbose(self):
        return self.content_type.model_class().PrivacySetting.get_option_verbose(self.attribute, self.setting)
