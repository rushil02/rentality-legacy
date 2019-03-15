from .models import BusinessModelConfiguration as BusinessModelConfigurationDB
from business_core.adapters.behaviours import get_behaviour_class
from business_core.adapters.constraints_models import get_constraints_model_class
from promotions.utils.promo_code_behaviour import get_behaviour_class as get_promo_code_behaviour_class


class PromoCode(object):

    def __init__(self, obj):
        """
        :param obj: `promotions.models.PromotionalCode` object
        """
        self._obj = obj
        self.behaviour = get_promo_code_behaviour_class(obj.behaviour)()

    @property
    def can_change_business_model(self):
        return self.behaviour.can_change_business_model_config

    def get_business_model_config(self):
        return self.behaviour.get_business_model_config()


class House(object):
    """
    Only processes the information required to create a pseudo object for validations and
    constraints. It does not save or synchronize with `house.models.House`.
    """

    def __init__(self, rent, min_stay, max_stay, promo_codes):
        """
        :param rent: [Decimal] rent per day
        :param min_stay: Positive Integer
        :param max_stay: Positive Integer
        :param promo_codes: [`PromoCode` object, ...]
        """
        self.business_model = None

        self.promo_codes = promo_codes
        self.rent = rent
        self.min_stay = min_stay
        self.max_stay = max_stay

    def get_rent(self):
        return self.rent

    def allocate_business_model(self, default):
        allocated = False
        for promo_code in self.promo_codes:
            if promo_code.can_change_business_model:
                self.set_business_model(BusinessModel(self, promo_code.get_business_model_config()))
                allocated = True
        if not allocated:
            self.set_business_model(default)

    def set_business_model(self, business_model):
        """
        :param business_model: `BusinessModel` object
        """
        self.business_model = business_model

    def get_business_model(self):
        return self.business_model

    @classmethod
    def build(cls, db_obj):
        """
        Creates a new Financial House object. This will ignore the existing recorded financial
        or agreement info of business config, and create from fresh sources.

        If the data is being calculated for a known business_config, use `load(...)` method.

        It is assumed that promo codes are already clean and validated.

        :param db_obj: `house.models.House` object
        :return: cls object
        """
        obj = cls(
            rent=db_obj.get_rent_per_day(), min_stay=db_obj.min_stay,
            max_stay=db_obj.max_stay, promo_codes=[PromoCode(obj) for obj in db_obj.promo_codes]
        )

        obj.allocate_business_model(default=BusinessModel.init_default(
            house=obj,
            bank_location=db_obj.home_owner.user.get_bank_location(),
            house_location=db_obj.get_location()
        ))
        return obj

    @classmethod
    def load(cls, db_obj, business_model_config):
        """
        Creates a Financial House object with given business_model_config
        :param db_obj: `house.models.House` object
        :param business_model_config: 'admin_custom.models.BusinessModelConfiguration' object
        :return: cls object
        """
        _promo_codes = []
        for promo_code in db_obj.promo_codes:
            _promo_codes.append(PromoCode(obj=promo_code))
        obj = cls(rent=db_obj.get_rent_per_day(), min_stay=db_obj.min_stay, max_stay=db_obj.max_stay,
                  promo_codes=_promo_codes)
        obj.set_business_model(BusinessModel(obj, business_model_config))
        return obj

    def validate(self, raise_exception=False):
        return self.business_model.validate_house(self, raise_exception)

    def get_errors(self):
        return self.business_model.get_errors()


class Application(object):
    """
    Only processes the information required to create a financial object. It does not save or synchronize
    with `application.models.Application`.
    """

    def __init__(self, house, rent, date_range, guests_num, promo_codes):
        """
        :param house: 'House` object
        :param date_range: [datetime.date, datetime.date]
        :param promo_codes: [`PromoCode` object, ...]
        """
        self.house = house
        self.rent = rent
        self.date_range = date_range
        self.guests_num = guests_num
        self.promo_codes = promo_codes

    def set_business_model(self, business_model):
        """
        :param business_model: `BusinessModel` object
        """
        self.house.business_model = business_model

    def get_business_model(self):
        return self.house.business_model

    @classmethod
    def build(cls, db_obj):
        """
        Create a new Financial Application object. This will ignore the existing recorded financial
        or agreement info of business config, and create from fresh sources.

        It is assumed that promo codes are already clean and validated.

        :param db_obj: 'application.models.Application` object
        :return: cls object
        """
        house = House.load(db_obj.house, db_obj.house.business_config)
        obj = cls(
            house=house, rent=house.get_rent(), date_range=db_obj.get_stay_date_range(),
            guests_num=db_obj.get_meta_info('guests'),
            promo_codes=[PromoCode(obj) for obj in db_obj.get_all_promo_codes()]
        )
        return obj

    @classmethod
    def load(cls, db_obj, business_model_config):
        """
        :param db_obj: 'application.models.Application` object
        :param business_model_config: 'admin_custom.models.BusinessModelConfiguration' object
        :return: cls object
        """
        house = House(
            rent=db_obj.get_house_meta_info('rent'), min_stay=db_obj.get_house_meta_info('min_stay'),
            max_stay=db_obj.get_house_meta_info('max_stay'),
            promo_codes=[PromoCode(obj) for obj in db_obj.get_house_meta_info('promo_codes')]
            # FIXME: Promo-codes cannot be loaded like this
        )
        house.set_business_model(db_obj.get_house_meta_info('business_config'))

        obj = cls(
            house=house, rent=db_obj.get_rent_per_day(), date_range=db_obj.get_stay_date_range(),
            guests_num=db_obj.get_meta_info('guests'),
            promo_codes=[PromoCode(obj) for obj in db_obj.get_all_promo_codes()]
        )
        obj.set_business_model(BusinessModel(house, business_model_config))
        return obj

    def validate(self, raise_exception=False):
        return self.get_business_model().validate_appliaction(self, raise_exception)

    def get_errors(self):
        return self.get_business_model().get_errors()


class BusinessModel(object):
    """
    Models and processes the behaviour and constraints acquired from 'admin_custom.models.TransactionConfiguration'.
    """

    def __init__(self, house, business_model_config):
        """
        :param house: `House` object
        :param business_model_config: 'admin_custom.models.BusinessModelConfiguration' object
        """
        self.house = house
        self.CONSTRAINTS_MODEL = get_constraints_model_class(business_model_config.constraints_model)(
            house=house,
            constef0602ed0057raints_meta=business_model_config.get_constraints_meta()
        )
        self.BEHAVIOUR = get_behaviour_class(business_model_config.behaviour)(
            house=house,
            constraints_meta=business_model_config.get_behaviour_meta()
        )

    def to_dict(self):
        return ...

    @classmethod
    def init_default(cls, house, bank_location, house_location):
        return cls(house=house,
                   business_model_config=BusinessModelConfigurationDB.objects.get_location_default(bank_location,
                                                                                                   house_location))

    def validate_house(self, raise_exception=False):
        """
        :param raise_exception: boolean
        :return:
        """
        return self.CONSTRAINTS_MODEL.validate_house(raise_exception)

    def validate_application(self, raise_exception=False):
        """
        :param raise_exception: boolean
        :return:
        """
        return self.CONSTRAINTS_MODEL.validate_application(raise_exception)

    def get_errors(self):
        return self.CONSTRAINTS_MODEL.get_errors()

    def book(self):
        ...

    def cancel(self):
        ...


class Booking(object):
    """
    Models all the processes and constraints involved in the Life cycle of an
    Application.

    It requires 2 necessary attributes to work correctly,
        - Application (To calculate Payment data)
        - Payment Gateway (Channel to process payments with)

    Application information is processed and calculated in this class; while a
    `PaymentGateway' object from `business_core` package is expected, which is
    already initialized with necessary data including accounts of tenant and
    home-owner.
    """

    def __init__(self, application, payment_gateway):
        """
        :param application: 'Application' object
        :param payment_gateway: `PaymentGateway` object
        """
        self.application = application
        self.payment_gateway = payment_gateway

    @classmethod
    def build(cls, application_obj, payment_gateway):
        """
        Creates a new Financial Booking object. This will create all the required
        details for booking object from the frozen details in given application object.

        :param application_obj: 'application.models.Application` object
        :param payment_gateway: `PaymentGateway` object
        :return: cls object
        """
        application = Application.load(application_obj, application_obj.get_business_model_config())
        return cls(application, payment_gateway)

    def create(self):
        """ Provide information to create a booking """
        business_model = self.application.get_business_model()
        # business_model.
        # self.payment_gateway.

    def cancel(self):
        pass

    # def extend(self):
