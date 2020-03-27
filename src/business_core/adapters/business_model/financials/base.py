"""
Base file to describe Financial model
"""

from datetime import timedelta
from decimal import Decimal, ROUND_UP

from business_core.adapters.base import Adapter


def convert_to_json(obj):
    json_di = dict()
    for key, value in vars(obj).items():
        # Protected attributes are not recorded
        if not key.startswith('_'):
            if isinstance(value, Decimal):
                json_di[key] = str(value)
            elif isinstance(value, Charge):
                json_di[key] = convert_to_json(obj)
    return json_di


class Charge(object):
    """
    Stores charge (percentage) and calculates value for it
    """

    def __init__(self, charge, principal, value):
        """
        :param charge: percentage value
        :param principal: amount
        :param value: amount
        """
        if bool(charge) is bool(value):
            raise ValueError("Need only one argument - charge or value")
        self._charge = Decimal(charge)
        self._value = Decimal(value)
        self.principal = principal

    @property
    def value(self):
        if self._value is None:
            self._value = (self.charge / 100) * self.principal
        return self._value

    @property
    def charge(self):
        if self._charge is None:
            self._charge = (self.value / self.principal) * 100
        return self._charge

    @classmethod
    def reverse_init(cls, value, principal):
        return cls(charge=None, principal=principal, value=value)

    @classmethod
    def init(cls, charge, principal):
        return cls(charge=charge, principal=principal, value=None)


class TenantAccountBase(object):

    def __init__(self, stay_duration, weekly_rent, fin_model):
        """
        :param stay_duration:
        :param weekly_rent:
        """
        self.stay_duration = stay_duration
        self.weekly_rent = weekly_rent
        self._fin_model = fin_model

    @property
    def total_rent(self):
        return Decimal(self.stay_duration * self.weekly_rent)

    @property
    def payable_rent(self):
        """ Rent to be paid """
        raise NotImplementedError

    @property
    def payable_amount(self):
        """ Final amount paid by the tenant """
        raise NotImplementedError

    def to_json_dict(self):
        return convert_to_json(self)


class HomeOwnerAccountBase(object):

    def __init__(self, stay_duration, weekly_rent, fin_model):
        """
        :param stay_duration:
        :param weekly_rent:
        """
        self.stay_duration = stay_duration
        self.weekly_rent = weekly_rent
        self._fin_model = fin_model

    @property
    def total_rent(self):
        return Decimal(self.stay_duration * self.weekly_rent)

    @property
    def payable_rent(self):
        """ Rent paid via Rentality to home_owner """
        raise NotImplementedError

    @property
    def payable_amount(self):
        """ Final amount received by the home owner """
        raise NotImplementedError

    def to_json_dict(self):
        return convert_to_json(self)


class FinancialModelBase(Adapter):
    TenantAccountModel = TenantAccountBase
    HomeOwnerAccountModel = HomeOwnerAccountBase

    def __init__(self, *args, **kwargs):
        super(FinancialModelBase, self).__init__(*args, **kwargs)
        self.tenant_account = None
        self.homeowner_account = None

    def _calculate(self):
        """
        Initialize TenantAccountModel and HomeOwnerAccountModel here
        :return: None
        """
        self.tenant_account = self.TenantAccountModel(
            stay_duration=self.stay_duration, weekly_rent=self.house.rent, fin_model=self
        )
        self.homeowner_account = self.HomeOwnerAccountModel(
            stay_duration=self.stay_duration, weekly_rent=self.house.rent, fin_model=self
        )

    def set_application(self, *args, **kwargs):
        super(FinancialModelBase, self).set_application(*args, **kwargs)
        self._calculate()

    @property
    def stay_duration(self):
        return Decimal((self.application.date_range[1] - self.application.date_range[0]).days) / 7

    def to_json_dict(self):
        return {
            'destination_account': self.homeowner_account.to_json_dict(),
            'source_account': self.tenant_account.to_json_dict(),
            'stay_duration': str(self.stay_duration),
        }