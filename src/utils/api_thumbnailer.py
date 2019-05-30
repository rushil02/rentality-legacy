from easy_thumbnails.files import get_thumbnailer


def resize_image(image, preset=None, options=None):
    if bool(preset) == bool(options):
        raise ValueError("Only one thumbnail setting attribute is required")
    if preset:
        return get_thumbnailer(image)[preset].url
    else:
        return get_thumbnailer(image).get_thumbnail(options).url
