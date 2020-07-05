from django.contrib import admin
from .models import PaymentGatewayTransaction, LedgerRecord
# Register your models here.

admin.site.register(PaymentGatewayTransaction)
admin.site.register(LedgerRecord)