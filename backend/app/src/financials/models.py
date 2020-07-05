from django.db import models

from utils.model_utils import next_ref_code


class PaymentGatewayTransaction(models.Model):
    """
    Stores the monetary (virtual and actual) interaction and events between rentality and payment gateway.

    `application` - To store if a payment gateway transaction is happening for an application.

    `payment_gateway` - Stores for which payment gateway this transaction is going through.

    """
    CORE_TRANSACTION_TYPES = [
        ('P', 'Payout - Transaction from Rentality to Home Owner'),
        ('C', 'Pay-in - Transaction from Tenant to Rentality'),
        ('R', 'Refund - Transaction from Rentality to Tenant'),
    ]

    VIRTUAL_TRANSACTIONS = [
        # if PG uses Virtual Homeowner accounts
        ('HT', "Virtual Transfer from Rentality to Home-owner Virtual Account"),
        ('RHT', "Virtual Transfer from Home-owner Virtual Account to Rentality"),
        # if PG uses Virtual Tenant accounts
        ('TT', "Virtual Transfer from Tenant Virtual Account to Rentality"),
        ('RTT', "Virtual Transfer from Rentality to Tenant Virtual Account"),
    ]

    ref_code = models.CharField(unique=True, max_length=20, blank=True)
    application = models.ForeignKey('application.Application', on_delete=models.PROTECT, null=True, blank=True)
    transaction_type = models.CharField(max_length=3, choices=(CORE_TRANSACTION_TYPES + VIRTUAL_TRANSACTIONS))
    transaction_id = models.TextField()
    user_account = models.ForeignKey('user_custom.Account', on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    create_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.ref_code

    def _create_ref_code(self):
        try:
            obj = PaymentGatewayTransaction.objects.latest('create_time')
        except PaymentGatewayTransaction.DoesNotExist:
            ref_code = 'AA0001'
        else:
            ref_code = next_ref_code(obj.ref_code.split('_')[1])
        return "%s_%s" % (self.transaction_type, ref_code)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.pk is None:
            self.ref_code = self._create_ref_code()
        super(PaymentGatewayTransaction, self).save(force_insert=False, force_update=False, using=None,
                                                    update_fields=None)


class LedgerRecord(models.Model):
    """
    Stores actual Credits and Debits to and from rentality
    """
    ref_code = models.CharField(unique=True, max_length=20, blank=True)
    description = models.TextField()
    PAYMENT_TYPE = (
        ('Cr', 'Credit'),
        ('De', 'Debit')
    )
    payment_type = models.CharField(max_length=2, choices=PAYMENT_TYPE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    pg_transaction = models.OneToOneField(
        'financials.PaymentGatewayTransaction', on_delete=models.PROTECT,
        verbose_name="Payment Gateway Transaction"
    )
    create_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.ref_code

    def _create_ref_code(self):
        try:
            obj = LedgerRecord.objects.latest('created_on')
        except LedgerRecord.DoesNotExist:
            ref_code = 'AA0001'
        else:
            ref_code = next_ref_code(obj.ref_code.split('_')[1])
        return "%s_%s" % (self.payment_type, ref_code)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.pk is None:
            self.ref_code = self._create_ref_code()
        super(LedgerRecord, self).save(force_insert=False, force_update=False, using=None,
                                       update_fields=None)
