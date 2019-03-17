from .adapters import get_adaptor_class


class PaymentGateway(object):
    """
    Models all the payment gateway processes used by the system.
    """

    CORE_TRANSACTION_TYPES = {
        'P': ('Payout', "Transaction from Rentality to Home Owner"),
        'C': ('Pay-in', "Transaction from Tenant to Rentality"),
        'R': ('Refund', "Transaction from Rentality to Tenant"),
    }

    VIRTUAL_TRANSACTIONS = (
        # if USES_VIRTUAL_HOME_OWNER_ACCOUNT = True
        ('HT', 'Home-owner Transfer', "Virtual Transfer from Rentality to Home-owner Virtual Account"),
        ('RHT', 'Reverse Home-owner Transfer', "Virtual Transfer from Home-owner Virtual Account to Rentality"),
        # if USES_VIRTUAL_TENANT_ACCOUNT = True
        ('TT', 'Tenant Transfer', "Virtual Transfer from Tenant Virtual Account to Rentality"),
        ('RTT', 'Reverse Tenant Transfer', "Virtual Transfer from Rentality to Tenant Virtual Account"),
    )

    def __init__(self, payment_gateway_location):
        """
        :param payment_gateway_location: `admin_custom.models.PaymentGatewayLocation` object
        """
        self._payment_gateway = get_adaptor_class(payment_gateway_location.payment_gateway.code)()


    def get_transaction_record(self):
        return

    def perform_pay_in(self, amount):
        self._payment_gateway.process_pay_in(amount)

    def perform_pay_out(self, amount):
        self._payment_gateway.process_pay_out(amount)

    def perform_refund(self, amount):
        self._payment_gateway.process_refund(amount)

    def create_account(self, user, **kwargs):
        user_details = {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'dob': ''
        }
        self._payment_gateway.create_home_owner_account()


def get_field_for_serializer(field):
    return