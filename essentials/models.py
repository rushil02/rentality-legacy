from django.db import models


class Location(models.Model):
    """
    Depends on external data source
    """
    # FIXME: needs modification for internationalization
    suburb = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
