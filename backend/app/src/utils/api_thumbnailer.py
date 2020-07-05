from easy_thumbnails.exceptions import InvalidImageFormatError
from easy_thumbnails.files import get_thumbnailer


def resize_image(image, preset=None, options=None):
    if image is None:
        return None
    if bool(preset) == bool(options):
        raise AssertionError("Only one thumbnail setting attribute is required")
    try:
        if preset:
            return get_thumbnailer(image)[preset].url
        else:
            return get_thumbnailer(image).get_thumbnail(options).url
    except InvalidImageFormatError as e:
        # TODO: Create ErrorLog
        return None
