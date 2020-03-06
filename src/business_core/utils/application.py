from .house import House
from .promo_code import PromoCode
from .business_model import BusinessModel


class Application(object):
    """
    Only processes the information required to create a financial object. It does not save or synchronize
    with `application.models.Application`.
    """

    def __init__(self, house, date_range, guests_num, promo_codes, booking_date):
        """
        :param house: 'House` object
        :param date_range: [datetime.date, datetime.date]
        :param promo_codes: [`PromoCode` object, ...]
        """
        self.house = house
        self.total_rent = None
        self.date_range = date_range
        self.guests_num = guests_num
        self.promo_codes = promo_codes
        self.booking_date = booking_date
        self._business_model = self._allocate_business_model()

    def _allocate_business_model(self):
        for promo_code in self.promo_codes:
            if promo_code.can_change_business_model:
                return BusinessModel(promo_code.get_business_model_config())
        return self.house.get_business_model()

    def set_business_model(self, business_model):
        """
        :param business_model: `BusinessModel` object
        """
        self._business_model = business_model

    def get_business_model(self):
        return self._business_model

    def get_booking_buffer_days(self):
        return (self.date_range[0] - self.booking_date).days

    @classmethod
    def build(cls, db_obj):
        """
        WARNING: This will load the current object of the linked house and not the frozen info.

        Create a new Financial Application object. This will ignore the existing recorded financial
        or agreement info of business config, and create from fresh sources.

        It is assumed that promo codes are already clean and validated.

        :param db_obj: 'application.models.Application` object
        :return: cls object
        """
        house = House.load(db_obj.house)
        obj = cls(
            house=house, date_range=db_obj.get_stay_date_range(),
            guests_num=db_obj.get_meta_info('guests'),
            promo_codes=[PromoCode(obj) for obj in db_obj.get_all_promo_codes()]
        )
        return obj

    @classmethod
    def load(cls, db_obj):
        """
        Create a new Financial Application object.
        It uses the stored house information available in application's 'house_meta'
        It is assumed that promo codes are already clean and validated.

        :param db_obj: 'application.models.Application` object
        :return: cls object
        """
        house = House(
            rent=db_obj.get_house_meta_info('rent'), min_stay=db_obj.get_house_meta_info('min_stay'),
            max_stay=db_obj.get_house_meta_info('max_stay'),
            promo_codes=[PromoCode(obj) for obj in db_obj.get_house_meta_info('promo_codes')]
        )
        house.set_business_model(db_obj.get_house_meta_info('business_config'))

        obj = cls(
            house=house, date_range=db_obj.get_stay_date_range(),
            guests_num=db_obj.get_meta_info('guests'),
            promo_codes=[PromoCode(obj) for obj in db_obj.get_all_promo_codes()]
        )
        obj.set_business_model(BusinessModel(db_obj.business_model_config))
        return obj

    def validate(self):
        errors = []
        errors += self.house.validate_application(self)
        errors += self.get_business_model().validate_application(self)
        return errors

    def get_errors(self):
        return self.get_business_model().get_errors()

    def get_date_range(self):
        return self.date_range
