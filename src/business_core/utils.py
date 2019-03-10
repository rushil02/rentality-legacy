from admin_custom.models import BusinessModelConfiguration
from business_core.behaviours import get_behaviour_class
from business_core.constraints_models import get_constraints_models, get_constraints_model_class
from promotions.utils.promo_code_behaviour import get_behaviour_class as get_promo_code_behaviour


class PromoCode(object):

    def __init__(self, obj):
        """
        :param obj: `promotions.models.PromotionalCode` object
        """
        self._obj = obj
        self.behaviour = get_promo_code_behaviour(obj.behaviour)()

    @property
    def can_change_business_model_config(self):
        return self.behaviour.can_change_business_model_config

    def get_business_model_config(self):
        return self.behaviour.get_business_model_config()


class House(object):
    """
    Only processes the information required to create a pseudo object for validations and
    constraints. It does not save or synchronize with `house.models.House`.
    """

    def __init__(self, rent, min_stay, max_stay, promo_codes):
        self.business_model_config = None

        self.promo_codes = promo_codes
        self.rent = rent
        self.min_stay = min_stay
        self.max_stay = max_stay

    def set_business_model_config(self, business_model_config):
        """
        :param business_model_config: `BusinessModel` object
        """
        self.business_model_config = business_model_config

    @classmethod
    def build(cls, house):
        """
        To create a new Financial House object. This will ignore the existing recorded financial
        or agreement info of business config, and create from fresh sources.

        If the data is being calculated for a known business_config, use `load(...)` method.

        It is assumed that promo codes are already clean and validated.

        :param house: `house.models.House` object
        :return:
        """
        config = BusinessModel.init_default(house.home_owner.user.get_bank_location(), house.get_location())
        _promo_codes = []
        for promo_code in house.promo_codes:
            _promo_code = PromoCode(obj=promo_code)
            _promo_codes.append(_promo_code)
            if _promo_code.can_change_business_model_config:
                config = BusinessModel(_promo_code.get_business_model_config())
        obj = cls(rent=house.rent, min_stay=house.min_stay, max_stay=house.max_stay, promo_codes=_promo_codes)
        obj.set_business_model_config(config)
        return obj

    @classmethod
    def load(cls, house, business_model_config):
        """
        Creates a Financial House object with given business_model_config
        :param house: `house.models.House` object
        :param business_model_config: 'admin_custom.models.BusinessModelConfiguration' object
        :return:
        """
        _promo_codes = []
        for promo_code in house.promo_codes:
            _promo_codes.append(PromoCode(obj=promo_code))
        obj = cls(rent=house.rent, min_stay=house.min_stay, max_stay=house.max_stay, promo_codes=_promo_codes)
        obj.set_business_model_config(BusinessModel(business_model_config))
        return obj

    def validate(self):
        ...


class Application(object):
    """
    Only processes the information required to create a financial object. It does not save or synchronize
    with `application.models.Application`.
    """

    def __init__(self, house, date_range, promotional_codes, **kwargs):
        """
        :param house: 'House` object
        :param date_range: [datetime.date, datetime.date]
        :param promotional_codes: [`PromoCode` object, ...]
        :param kwargs: any other given attribute will be set as Application's attribute
        """
        self.house = house
        self.rent = self.house.rent
        self.date_range = date_range
        self.promo_codes = promotional_codes or []
        for var in kwargs:
            setattr(self, var, kwargs[var])


class BusinessModel(object):
    """
    Models and processes the behaviour and constraints acquired from 'admin_custom.models.TransactionConfiguration'.
    """

    def __init__(self, business_model_config):
        """
        :param business_model_config: 'admin_custom.models.BusinessModelConfiguration' object
        """
        self._business_model_config = business_model_config
        self.CONSTRAINTS_MODEL = get_constraints_model_class(business_model_config.constraints_model)(
            business_model_config.meta)
        self.BEHAVIOUR = get_behaviour_class(business_model_config.behaviour)(business_model_config.meta)

    def to_dict(self):
        return ...

    @classmethod
    def init_default(cls, bank_location, house_location):
        return cls(business_model_config=BusinessModelConfiguration.objects.get_location_default())


class Booking(object):
    """
    Models all the processes and constraints involved in the Life cycle of an Application.
    """

    def __init__(self, application):
        """
        :param application: 'Application' object
        """
        self.house = House.load(application.house_deserailized(),)
        # self.application = Application(house, date_range, promotional_codes, **kwargs)

        self.promo_codes = list(self.application.promo_codes) + list(self.application.house.promo_codes.all())

        self.business_model = BusinessModel(self.get_applicable_transaction_config())

    def get_applicable_transaction_config(self):
        """
        :return: `admin_custom.models.TransactionConfiguration` object
        """
        ...
        return BusinessModelConfiguration()

    @classmethod
    def build(cls, house, date_range, promotional_codes, **kwargs):
        pass

    @classmethod
    def load(cls, application):
        house = ...  # TODO: Deserialize application meta and house from relevant meta
        return cls(house=house, date_range=application.date, promotional_codes=...)

    def refund(self):
        pass

    def cancel(self):
        pass
