from decimal import Decimal

import pytz
import math

from .business_model import BusinessModel
from .promo_code import PromoCode


class House(object):
    """
    Only processes the information required to create a pseudo object for validations and
    constraints. It does not save or synchronize with `house.models.House`.
    """

    # region init
    def __init__(self, rent, min_stay, max_stay, promo_codes, max_people_allowed, timezone):
        """
        :param rent: [Decimal] rent per week
        :param min_stay: Positive Integer
        :param max_stay: Positive Integer
        :param promo_codes: [`PromoCode` object, ...]
        """
        self.promo_codes = promo_codes
        self.rent = rent
        self.min_stay = min_stay
        if max_stay != 0 and max_stay is not None:
            self.max_stay = max_stay
        else:
            self.max_stay = math.inf
        self.max_people_allowed = max_people_allowed
        self.timezone = pytz.timezone(timezone)
        self._business_model = None

    def get_rent(self):
        return self.rent

    def deduce_business_model(self, default_db):
        """
        :param default_db: 'business_core.models.BusinessModelConfiguration'
        :return:
        """
        for promo_code in self.promo_codes:
            if promo_code.can_change_business_model:
                self.set_business_model(BusinessModel(promo_code.get_business_model_config()))
        return BusinessModel(default_db)

    def set_business_model(self, business_model):
        """
        :param business_model: `BusinessModel` object
        """
        self._business_model = business_model
        self._business_model.set_house(self)

    def set_can_policy(self, cancellation_policy_db):
        """
        :param cancellation_policy_db: 'business_core.models.CancellationPolicy' object
        """
        self._business_model.set_cancellation_policy(cancellation_policy=cancellation_policy_db)

    def get_business_model(self):
        return self._business_model

    def get_can_policy(self):
        return self._business_model.get_can_db_object()

    # @classmethod
    # def build(cls, db_obj):
    #     """
    #     WARNING: Ignores frozen BusinessModelConfig information. Consider using
    #     'load(...)' instead.
    #
    #     Creates a new Financial locationHouse object. This will ignore the existing recorded financial
    #     or agreement info of business config, and create from fresh sources.
    #
    #     If the data is being calculated for a known business_config, use `load(...)` method.
    #
    #     It is assumed that promo codes are already clean and validated.
    #
    #     :param db_obj: `house.models.House` object
    #     :return: cls object
    #     """
    #     obj = cls(
    #         rent=db_obj.get_rent_per_day(), min_stay=db_obj.min_stay,
    #         max_stay=db_obj.max_stay, promo_codes=[PromoCode(obj) for obj in db_obj.promo_codes.all()],
    #     )
    #     business_model = BusinessModel.init_default(
    #         billing_location=db_obj.home_owner.user.get_billing_location(),
    #         house_location=db_obj.location
    #     )
    #     obj.deduce_business_model(business_model)
    #     return obj

    @classmethod
    def load(cls, db_obj):
        """
        Creates a Financial House object from house DB object with stored business_model_config
        :param db_obj: `house.models.House` object
        :return: cls object
        """
        _promo_codes = []
        for promo_code in db_obj.promo_codes.all():
            _promo_codes.append(PromoCode(obj=promo_code))
        obj = cls(
            rent=Decimal(db_obj.rent), min_stay=db_obj.min_stay, max_stay=db_obj.max_stay,
            max_people_allowed=db_obj.max_people_allowed,
            promo_codes=_promo_codes,
            timezone=db_obj.local_timezone
        )
        obj.set_business_model(business_model=BusinessModel(db_obj.business_config))
        if db_obj.cancellation_policy:
            obj.set_can_policy(cancellation_policy_db=db_obj.cancellation_policy)
        return obj

    # endregion init

    def validate(self):
        return self._business_model.validate_house()

