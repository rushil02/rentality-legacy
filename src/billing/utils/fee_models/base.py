"""
Base file to describe Fee and Billing Financial models
"""
# FIXME: Requires validation checks, All checks can be migrated here (duration limit, etc)


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
        return self.stay_duration * self.weekly_rent

    @property
    def payable_rent(self):
        return self.total_rent

    @property
    def service_fee(self):
        return (self.fee.tenant_charge / 100) * self.payable_rent

    @property
    def total_amount(self):
        """ Total before tax and discount """
        return self.service_fee + self.payable_rent

    @property
    def discount(self):
        val = 0.0
        for promo_code in self.promo_codes:
            val += promo_code.apply_code(total_rent=self.payable_rent, service_fee=self.service_fee,
                                         total_amount=self.total_amount)
        return val

    @property
    def tax(self):
        return (self.fee.GST / 100) * self.service_fee

    @property
    def payable_amount(self):
        """ Final amount paid by the tenant """
        return max(0, self.total_amount - self.discount) + self.tax


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
        return self.stay_duration * self.weekly_rent

    @property
    def payable_rent(self):
        """ Rent paid via Rentality to home_owner """
        return self.total_rent

    @property
    def service_fee(self):
        return (self.fee.home_owner_charge / 100) * self.payable_rent

    @property
    def total_amount(self):
        """ Total before tax and discount """
        return self.payable_rent - self.service_fee

    @property
    def discount(self):
        val = 0.0
        for promo_code in self.promo_codes:
            val += promo_code.apply_code(total_rent=self.payable_rent, service_fee=self.service_fee,
                                         total_amount=self.total_amount)
        return val

    @property
    def tax(self):
        return (self.fee.GST / 100) * self.service_fee

    @property
    def payable_amount(self):
        """ Final amount received by the home owner """
        return max(0, self.total_amount + self.discount - self.tax)


class FeeModelBase(object):
    TenantAccountModel = TenantAccountBase
    HomeOwnerAccountModel = HomeOwnerAccountBase

    def __init__(self, application):
        self.application = application
        self.tenant_account = self.TenantAccountModel(
            stay_duration=self.stay_duration, weekly_rent=application.rent,
            fee=application.fee, promo_codes=self.application.promotional_code
        )
        self.home_owner_account = self.HomeOwnerAccountModel(
            stay_duration=self.stay_duration, weekly_rent=application.rent,
            fee=application.fee, promo_codes=self.application.house_meta.get('promotional_codes', [])
        )

    @property
    def source_amount(self):
        return self.tenant_account.payable_amount

    @property
    def destination_amount(self):
        return self.home_owner_account.payable_amount

    @property
    def stay_duration(self):
        return self.application.date[1] - self.application.date[0] + 1
