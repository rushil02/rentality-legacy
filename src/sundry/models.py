from django.db import models


class EMail(models.Model):
    USER_TYPE = (
        ('G', 'General User'),
        ('T', 'Tenant'),
        ('H', 'Home Owner'),
        ('A', 'Admin'),
    )

    user_type = models.CharField(max_length=1, choices=USER_TYPE)
    verbose_code = models.CharField(max_length=20, help_text="Internal identifier")
    subject = models.TextField(help_text="Email Subject")
    content = models.TextField(help_text="Content within email")

    def __str__(self):
        return self.verbose_code
