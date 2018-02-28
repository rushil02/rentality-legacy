from django.db import models


class Tags(models.Model):
    verbose = models.CharField(max_length=50)

    TAG_TYPE = (
        ('R', 'Rule'),
        ('F', 'Facility')
    )

    tag_type = models.CharField(max_length=1, choices=TAG_TYPE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
