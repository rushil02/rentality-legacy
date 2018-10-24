import abc

from django.contrib.contenttypes.models import ContentType
from django.db import models

from essentials.models import DataPrivacySetting


class BasePrivacySetting(object):
    """
    fields = {
        'field_name': {
            'default': options_list[0][0],
            'options': options_list[0],
            'help_text': 'Lorem ipsum'
        }
    }
    """
    options_list = [
        (
            ('A', 'Public'),
            ('P', 'Private')
        )
    ]

    @property
    @abc.abstractmethod
    def fields(self):
        raise NotImplementedError

    @classmethod
    def get_option_verbose(cls, field, option):
        # TODO: needs optimization - options are changed to dict every time
        # TODO: test if options are valid (like no repeats) at code compilation
        return dict(cls.fields[field]['options'])[option]

    @classmethod
    def get_options(cls, field):
        return cls.fields[field]['options']

    @classmethod
    def get_default(cls, field):
        return cls.fields[field]['default']

    def __init__(self, **kwargs):
        for attr in kwargs:
            setattr(self, attr, kwargs[attr])


class ModelWithPrivacy(models.Model):
    """
    Integrates Privacy settings within the model instance
    Settings can be accessed via - instance.privacy_setting.attribute

    To use privacy settings, object needs to be saved in the database first.
    The settings are not automatically loaded to the object to save DB query in case unnecessary for a process.
    To load settings - instance.load_privacy_settings()
    """

    class Meta:
        abstract = True

    class PrivacySetting(BasePrivacySetting):
        pass

    def load_privacy_settings(self):
        if self.pk:
            ct = ContentType.objects.get_for_model(self)
            saved_settings = DataPrivacySetting.objects.filter(
                content_type=ct, object_id=self.id).values('attribute', 'setting')
            self.privacy_setting = self.PrivacySetting(
                **{item['attribute']: item['setting'] for item in saved_settings})
        else:
            raise Exception("Object needs to be saved to associate privacy settings")

    def save(self, *args, **kwargs):
        object_is_new = not self.pk
        super(ModelWithPrivacy, self).save(*args, **kwargs)
        if object_is_new:
            DataPrivacySetting.objects.create_default_privacy_info(self)

    # TODO: Extend methods to update privacy settings, check single setting, etc (depending on use cases)
