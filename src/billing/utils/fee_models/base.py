"""
Base file to describe Fee and Billing Financial models
"""

# FIXME: Requires validation checks, All checks can be migrated here (duration limit, etc)
from datetime import timedelta
from decimal import Decimal, ROUND_UP


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
        if charge is None and value is None:
            raise ValueError("Need at least one argument - charge or value")
        self._charge = charge
        self._value = value
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

    def __init__(self, stay_duration, weekly_rent, fee, promo_codes):
        """
        :param stay_duration:
        :param weekly_rent:
        :param fee:
        :param promo_codes: iterable of promo_code objects applicable for tenant
        """
        self.stay_duration = stay_duration
        self.weekly_rent = weekly_rent
        self.fee = fee
        self.promo_codes = promo_codes

    @property
    def total_rent(self):
        return Decimal(self.stay_duration * self.weekly_rent)

    @property
    def payable_rent(self):
        return self.total_rent

    @property
    def service_fee(self):
        return Charge.init(self.fee.tenant_charge, self.payable_rent)

    @property
    def total_amount(self):
        """ Total before tax and discount """
        return self.service_fee.value + self.payable_rent

    @property
    def discount(self):
        val = Decimal(0.0)
        for promo_code in self.promo_codes:
            val += Decimal(promo_code.apply_code(total_rent=self.payable_rent, service_fee=self.service_fee,
                                                 total_amount=self.total_amount))
        return Charge.reverse_init(value=val, principal=self.total_amount)

    @property
    def tax(self):
        return Charge.init(self.fee.GST, self.service_fee.value)

    @property
    def payable_amount(self):
        """ Final amount paid by the tenant """
        return max(0, self.total_amount - self.discount.value) + self.tax.value

    def to_dict(self):
        return dict(
            weekly_rent=self.weekly_rent,
            total_rent=self.total_rent,
            payable_rent=self.payable_rent,
            service_fee=self.service_fee.value,
            total_amount=self.total_amount,
            discount=self.discount.value,
            tax=self.tax.value,
            payable_amount=self.payable_amount,
            stay_duration=self.stay_duration
        )

    def to_json_dict(self):
        representation = self.to_dict()
        json_di = dict()
        for key in representation:
            if isinstance(representation[key], Decimal):
                json_di[key] = float(representation[key])
            else:
                json_di[key] = representation[key]
        return json_di


class HomeOwnerAccountBase(object):
    def __init__(self, stay_duration, weekly_rent, fee, promo_codes):
        """
        :param stay_duration:
        :param weekly_rent:
        :param fee:
        :param promo_codes: iterable of promo_code objects applicable for home_owner
        """
        self.stay_duration = stay_duration
        self.weekly_rent = weekly_rent
        self.fee = fee
        self.promo_codes = promo_codes

    @property
    def total_rent(self):
        return Decimal(self.stay_duration * self.weekly_rent)

    @property
    def payable_rent(self):
        """ Rent paid via Rentality to home_owner """
        return self.total_rent

    @property
    def service_fee(self):
        return Charge.init(charge=self.fee.home_owner_charge, principal=self.payable_rent)

    @property
    def total_amount(self):
        """ Total before tax and discount """
        return self.payable_rent - self.service_fee.value

    @property
    def discount(self):
        val = Decimal(0.0)
        for promo_code in self.promo_codes:
            val += Decimal(promo_code.apply_code(total_rent=self.payable_rent, service_fee=self.service_fee,
                                                 total_amount=self.total_amount))
        return Charge.reverse_init(value=val, principal=self.total_amount)

    @property
    def tax(self):
        return Charge.init(self.fee.GST, self.service_fee.value)

    @property
    def payable_amount(self):
        """ Final amount received by the home owner """
        return max(0, self.total_amount + self.discount.value - self.tax.value)

    def to_dict(self):
        return dict(
            weekly_rent=self.weekly_rent,
            total_rent=self.total_rent,
            payable_rent=self.payable_rent,
            service_fee=self.service_fee.value,
            total_amount=self.total_amount,
            discount=self.discount.value,
            tax=self.tax.value,
            payable_amount=self.payable_amount,
            stay_duration=self.stay_duration
        )

    def to_json_dict(self):
        representation = self.to_dict()
        json_di = dict()
        for key in representation:
            if isinstance(representation[key], Decimal):
                json_di[key] = float(representation[key])
            else:
                json_di[key] = representation[key]
        return json_di


class FeeModelBase(object):
    TenantAccountModel = TenantAccountBase
    HomeOwnerAccountModel = HomeOwnerAccountBase

    def __init__(self, application, fee):
        """
        :param application: 'billing.utils.application' object or a child class object
        :param fee: model object instance passed from the DB
        """
        self.application = application
        self.fee = fee

        self.tenant_account = self.TenantAccountModel(
            stay_duration=self.stay_duration, weekly_rent=self.application.rent,
            fee=self.fee, promo_codes=self.application.promo_codes
        )
        self.home_owner_account = self.HomeOwnerAccountModel(
            stay_duration=self.stay_duration, weekly_rent=self.application.rent,
            fee=self.fee, promo_codes=self.application.house.promo_codes.all()
        )

    @property
    def source_amount(self):
        return self.tenant_account.payable_amount.quantize(Decimal('.01'), rounding=ROUND_UP)

    @property
    def destination_amount(self):
        return self.home_owner_account.payable_amount.quantize(Decimal('.01'), rounding=ROUND_UP)

    @property
    def stay_duration(self):
        return (self.application.date_range[1] - self.application.date_range[0] + timedelta(days=1)).days / 7

    def to_dict(self):
        return dict(
            source_amount=self.source_amount,
            destination_amount=self.destination_amount,
            stay_duration=self.stay_duration,
        )

    def to_json_dict(self):
        representation = self.to_dict()
        json_di = dict()
        for key in representation:
            if isinstance(representation[key], Decimal):
                json_di[key] = float(representation[key])
            else:
                json_di[key] = representation[key]
        return json_di
