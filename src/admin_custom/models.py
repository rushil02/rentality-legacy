from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields.jsonb import JSONField
from django.db import models, transaction


class ActivityLogManager(models.Manager):
    """
    Manager for Activity Log. 'actor' is none in the case of Anonymous user.
    """

    def create_log(self, request, actor=None, entity=None, level='I', **kwargs):
        try:
            info = {
                'ip': self.get_ip(request),
                'browser_fingerprint': self.get_fingerprint(request),
                'view_name': str(kwargs.pop('view', "")),
                'arguments': kwargs.pop('arguments', {}),
                'message': str(kwargs.pop('message', "")),
                'act_type': kwargs.pop('act_type', ""),
                'extra': kwargs
            }
            self.create(actor=actor, entity=entity, level=level, meta_info=info)
        except Exception as e:
            self.create_log(
                request=None, level='C', message=str(e), act_type="Error in creating activity Log",
                kw_details=str(kwargs), actor_details=str(actor), entity_details=str(entity)
            )
            return False
        else:
            return True

    @staticmethod
    def get_ip(request):
        if request:
            return ""  # TODO
        return "No request data"

    @staticmethod
    def get_fingerprint(request):
        if request:
            return ""  # TODO
        return "No request data"


class ActivityLog(models.Model):
    """
    Logs all acts by a Publication
    meta_info data -> view method, arguments of view, message, extra, ip,
                      browser fingerprint, act_type

    Required arguments for creating a log entry ->
        request(send 'None' for system level logging), act_type
    Can send extra any key based arguments, they'll be stored in the JSON field.
    """

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True
    )

    content_type = models.ForeignKey(
        ContentType,
        null=True, blank=True,
        related_name='entity',
        on_delete=models.SET_NULL
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)
    entity = GenericForeignKey('content_type', 'object_id')

    CHOICES = (
        ('I', 'INFO'),
        ('E', 'ERROR'),
        ('C', 'CRITICAL'),
        ('D', 'DEBUG'),
        ('W', 'WARNING'),
    )
    level = models.CharField(max_length=1, choices=CHOICES)

    meta_info = JSONField(null=True, blank=True)
    create_time = models.DateTimeField(auto_now_add=True)

    objects = ActivityLogManager()

    def __unicode__(self):
        return self.actor
