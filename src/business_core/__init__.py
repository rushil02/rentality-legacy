from .fee_behaviours import get_behaviours as get_fee_behaviour_models
from .fee_behaviours import get_behaviour_description as get_fee_behaviour_description
from .utils import Booking


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

