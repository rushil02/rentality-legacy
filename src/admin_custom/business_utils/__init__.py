from .fee_configurations import model_A

# Register all models here
BILLING_FEE_MODELS = {
    'A': {'verbose': '4 weeks of payment only', 'model_file': model_A},
}


def get_available_models():
    models = []
    for key in BILLING_FEE_MODELS:
        models.append((key, BILLING_FEE_MODELS[key]['verbose']))
    return tuple(models)


def get_model_description(key):
    return BILLING_FEE_MODELS[key]['model_file'].__doc__


class Application(object):
    """
    Only processes the information required to create a financial object. It does not save or synchronize
    with `application.models.Application`.
    """

    def __init__(self, house, date_range, guests_num, promotional_codes):
        self.house = house
        self.rent = self.house.rent
        self.date_range = date_range
        self.guests_num = guests_num
        self.promo_codes = promotional_codes or []


class Fee(object):
    """
    Creates a fee object uniquely related to the application. It doesn't (and shouldn't) sync with `billing.models.Fee`,
    since they have different objectives.
    """

    def __init__(self, house, date_range, guests_num, promotional_codes):
        """
        :param house: House object
        :param date_range: [Date(start_date), Date(end_date)]
        :param guests_num: int
        :param promotional_codes: [promo_code_obj_1, ...]
        """
        self.application = Application(house, date_range, guests_num, promotional_codes)

        self.promo_codes = list(self.application.promo_codes) + list(self.application.house.promo_codes.all())

        self.fee = self.get_applicable_fee(self.promo_codes)

    @classmethod
    def init(cls, house, date_range, guests_num, promotional_codes):
        obj = cls(house, date_range, guests_num, promotional_codes)
        return BILLING_FEE_MODELS[obj.fee.billing_model]['model_file'].FeeModel(obj.application, obj.fee)

    @staticmethod
    def get_applicable_fee(promo_codes):
        fee_models_in_promo = []
        for promo_code in promo_codes:
            if promo_code.is_change_fee:
                fee_models_in_promo.append(promo_code.get_fee_model())
        if len(fee_models_in_promo) > 1:
            raise ValueError(
                "Review PromoCodes Validation measures - Multiple incompatible "
                "PromoCodes used, with different Fee structures."
            )
        elif len(fee_models_in_promo) == 0:
            from billing.models import Fee
            return Fee.objects.get_default()
        elif len(fee_models_in_promo) == 1:
            return fee_models_in_promo[0]
