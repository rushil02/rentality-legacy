from django.contrib import admin
from application.models import Application, AccountDetail, ApplicationState

# Register your models here.

admin.site.register(Application)
admin.site.register(AccountDetail)
admin.site.register(ApplicationState)