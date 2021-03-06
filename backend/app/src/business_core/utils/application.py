from .house import House
from .promo_code import PromoCode
from .business_model import BusinessModel
from ..models import CancellationPolicy


class Application(object):
    """
    Only processes the information required to create a financial object. It does not save or synchronize
    with `application.models.Application`.
    """

    # region init
    def __init__(self, house, date_range, guests_num, promo_codes):
        """
        :param house: 'House` object
        :param date_range: [datetime.date, datetime.date]
        :param promo_codes: [`PromoCode` object, ...]
        """
        self.house = house

        self.date_range = date_range
        self.guests_num = guests_num
        self.promo_codes = promo_codes

        self._business_model = self._allocate_business_model()
        self._business_model.set_application(self)
        self._cancellation_policy = self._allocate_can_policy()

        self._booking_date_time = None

        self._state = None

    @property
    def state(self):
        if self._state:
            return self._state
        else:
            raise ValueError("State is not set")

    def set_state(self, state):
        self._state = state

    @property
    def check_in_date(self):
        return self.date_range[0]

    @property
    def check_out_date(self):
        return self.date_range[1]

    @property
    def homeowner_account(self):
        return self.get_business_model().financial_model.homeowner_account

    @property
    def tenant_account(self):
        return self.get_business_model().financial_model.tenant_account

    @property
    def financial_model(self):
        return self.get_business_model().financial_model

    @classmethod
    def create(cls, house_db, booking_info):
        """
        Create an Application object from house database object, booking_info from user.
        Warning: Doesn't provide any performable actions.

        :param house_db:
        :param booking_info:
        :return: Application()
        """
        house = House.load(house_db)
        return cls(
            house=house,
            date_range=[booking_info['start_date'], booking_info['end_date']],
            guests_num=booking_info['guests'],
            promo_codes=[],  # TODO: Validate and send promo codes
        )

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
            promo_codes=[PromoCode(obj) for obj in db_obj.get_house_meta_info('promo_codes')],
            max_people_allowed=db_obj.get_house_meta_info('max_people_allowed'),
            timezone=db_obj.get_house_meta_info('local_timezone')
        )
        house.set_business_model(BusinessModel.init_from_code(db_obj.get_house_meta_info('business_config__code')))
        house.set_can_policy(CancellationPolicy.objects.get(
            code=db_obj.get_house_meta_info('cancellation_policy__code'))
        )

        obj = cls(
            house=house, date_range=db_obj.get_stay_date_range(),
            guests_num=db_obj.get_meta_info('guests'),
            promo_codes=[PromoCode(obj) for obj in db_obj.get_all_promo_codes()],
        )
        obj.set_business_model(BusinessModel(db_obj.get_business_model_config()))

        try:
            booking_date = db_obj.accountdetail.get_meta_info('booking_date')
        except KeyError:
            pass
        else:
            obj._booking_date = booking_date

        return obj

    def _allocate_business_model(self):
        for promo_code in self.promo_codes:
            if promo_code.can_change_business_model:
                return BusinessModel(promo_code.get_business_model_config())
        return self.house.get_business_model()

    def _allocate_can_policy(self):
        # TODO: Check new can policy in promo codes
        return self.house.get_can_policy()

    def set_business_model(self, business_model):
        """
        :param business_model: `BusinessModel` object
        """
        self._business_model = business_model
        self._business_model.set_application(self)

    def get_business_model(self):
        return self._business_model

    def set_cancellation_policy(self, cancellation_policy):
        """
        :param cancellation_policy: `CancellationPolicy` object
        """
        self._cancellation_policy = cancellation_policy

    def get_cancellation_policy(self):
        return self._cancellation_policy

    def set_prospective_booking_date(self, datetime_obj):
        self._booking_date_time = datetime_obj

    def get_booking_date_time(self):
        if self._booking_date_time:
            return self._booking_date_time
        raise ValueError("Booking date is not provided")

    # endregion init

    def validate(self):
        errors = []
        errors += self.get_business_model().validate_application()
        return errors
