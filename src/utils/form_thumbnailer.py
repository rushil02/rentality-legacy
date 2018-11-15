from django.forms.widgets import FileInput
from django.utils.safestring import mark_safe
from easy_thumbnails.files import get_thumbnailer
from easy_thumbnails.conf import settings


class ImageFileInput(FileInput):
    """
    Use this widget to show a thumbnail of the image next to the image file.

    If using the admin and :class:`~easy_thumbnails.fields.ThumbnailerField`,
    you can use this widget automatically with the following code::

        class MyModelAdmin(admin.ModelAdmin):
            formfield_overrides = {
                ThumbnailerField: {'widget': ImageClearableFileInput},
            }
    """

    template_with_initial = (
        u'%(clear_template)s<br />'
        u'%(input_text)s: %(input)s'
    )
    template_with_thumbnail = (
        u'%(template)s<br />'
        u'<a href="%(source_url)s" target="_blank">%(thumb)s</a>'
    )

    def __init__(self, thumbnail_options=None, template=None, attrs=None):
        """
        Set up the thumbnail options for this widget.

        :param thumbnail_options: options used to generate the thumbnail. If no
            ``size`` is given, it'll be ``(80, 80)``. If not provided at all,
            default options will be used from the
            :attr:`~easy_thumbnails.conf.Settings.THUMBNAIL_WIDGET_OPTIONS`
            setting.
        """
        thumbnail_options = (
            thumbnail_options or settings.THUMBNAIL_WIDGET_OPTIONS)
        thumbnail_options = thumbnail_options.copy()
        if 'size' not in thumbnail_options:
            thumbnail_options['size'] = (80, 80)
        self.thumbnail_options = thumbnail_options
        self.set_template(template)
        super(ImageFileInput, self).__init__(attrs)

    def thumbnail_id(self, name):
        return '%s_thumb_id' % name

    def set_template(self, template):
        """
        Used to modify thumbnail output as needed
        Available attributes ->
            - template: original template from FileInput widget
            - thumb: <img> thumbnail
            - source_url : source URL of changed image
        :return: html template
        """
        if template:
            self.template_with_thumbnail = template

    def get_thumbnail(self, value):
        thumbnailer = get_thumbnailer(value, value.name)
        thumbnailer.source_storage = value.storage
        if hasattr(value, 'thumbnail_storage'):
            thumbnailer.thumbnail_storage = value.thumbnail_storage
        return thumbnailer.get_thumbnail(self.thumbnail_options)

    def render(self, name, value, attrs=None, renderer=None):
        output = super(ImageFileInput, self).render(
            name, value, attrs)
        if not value or not hasattr(value, 'storage'):
            return output
        thumb = self.get_thumbnail(value)
        substitution = {
            'template': output,
            'thumb': thumb.tag(id=self.thumbnail_id(name)),
            'source_url': value.storage.url(value.name),
        }
        return mark_safe(self.template_with_thumbnail % substitution)
