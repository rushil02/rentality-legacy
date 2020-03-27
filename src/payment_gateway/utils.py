from .adapters import get_adaptor_class
from .models import PaymentGatewayLocation


class User(object):
    def __init__(self, user):
        self.email = user.email
        self.first_name = user.first_name
        self.last_name = user.last_name
        self.dob = user.userprofile.dob
        self.country = user.get_billing_location()


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
        :param payment_gateway_location: `payment_gateway.models.PaymentGatewayLocation` object
        """
        self._payment_gateway = get_adaptor_class(payment_gateway_location.payment_gateway.code)()

    # @classmethod
    # def create(cls, house_db):
    #     """
    #     # TODO: Enhancement can be made - if rentality's ledgers become single source of truth,
    #             payment gateway can be chosen on other criteria than on the basis of existing
    #             home owner account
    #
    #     :param house_db:
    #     :return: cls object
    #     """
    #
    #     obj = PaymentGatewayLocation.objects.get_location_default(
    #         house_location=house_db.get_location(),
    #         billing_location=house_db.home_owner.user.get_billing_location()
    #     )
    #     return cls(payment_gateway_location=obj)

    def get_transaction_record(self):
        return

    def set_user_account(self, user_account):
        """
        :param user_account: 'user_custom.models.Account' object
        :return:
        """

    def create_payout_account(self):
        # self._payment_gateway.
        # return response
        ...

    def parse_PII(self, user):
        return {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'dob': user.userprofile.dob,
            'country': user.get_billing_location(),  # FIXME: PArse
            'street_address': user.userprofile.billing_street_address,

        }


    def on_event(self, event):
        return self._payment_gateway.on_event(event)

    def perform_pay_in(self, amount):
        self._payment_gateway.process_pay_in(amount)

    def perform_pay_out(self, amount):
        self._payment_gateway.process_pay_out(amount)

    def perform_refund(self, amount):
        self._payment_gateway.process_refund(amount)

    def create_pay_out_account(self, user, **kwargs):
        self._payment_gateway.create_home_owner_account()

    def update_pay_out_account(self, user, **kwargs):
        self._payment_gateway.create_home_owner_account()

    def create_pay_in_account(self, user, **kwargs):
        self._payment_gateway.create_home_owner_account()

    def update_pay_in_account(self, user, **kwargs):
        self._payment_gateway.create_home_owner_account()


def get_field_for_serializer(field):
    return
