from billing.models import Fee


class Charge(object):
    """
    Stores charge (percentage) and calculates value for it
    """

    def __init__(self, charge):
        self.charge = charge
        self.value = 0
        self.promo_codes = None

    def calculate_value(self, rent):
        self.value = self.charge * rent / 100
        return self.value


class TenantAccount(object):
    def __init__(self):
        self.amount_payable = 0


class HomeOwnerCharge(object):
    pass


class PaymentModelA(object):
    """
    Created on - 29/01/19
    """

    def __init__(self):
        self.fee = Fee.objects.get(active=True)
        tenant_charge = TenantAccount(self.fee.tenant_charge)
        home_owner_charge = HomeOwnerCharge(self.fee.home_owner_charge)

    def calculate_payment(self):
        pass


def get_payment_model(*args, **kwargs):
    return PaymentModelA
