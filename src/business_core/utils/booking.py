from .house import House
from .application import Application
from application.utils import STATUS_CHOICES


def get_state_reverse_map():
    res = {'_no_app_': None}
    for choice_set in STATUS_CHOICES:
        res[choice_set[1]] = choice_set[0]
    return res


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

    __ACTOR_REVERSE_MAP = {
        'tenant': 'T',
        'homeowner': 'H',
        'system': 'S',
        'admin': 'A',
        'staff': 'A'
    }

    __STATE_REVERSE_MAP = get_state_reverse_map()

    def __init__(self, application, actor, state):
        """
        :param application: 'Application' object
        """
        self._application = application
        self._payment_gateway = None
        self._business_model = None
        self._actor = actor
        self.state = state

    @property
    def business_model(self):
        return self._application.get_business_model()

    @classmethod
    def load(cls, application_obj, actor, payment_gateway):
        """
        Creates a new Financial Booking object. This will create all the required
        details for booking object from the frozen details in given application object.

        :param application_obj: 'application.models.Application` object
        :param payment_gateway: `PaymentGateway` object
        :return: cls object
        """
        application = Application.load(application_obj)
        obj = cls(application, actor=actor, state=application.status)
        obj.use_payment_gateway(payment_gateway)
        return obj

    @classmethod
    def create(cls, house_db, booking_info, actor, booking_date):
        """
        Create a booking from house database object, booking_info from user.
        :param booking_date:
        :param house_db:
        :param booking_info:
        :param actor: [tenant, home_owner, sys, admin]
        :return: Booking()
        """

        house = House.load(house_db)
        application = Application(
            house=house,
            date_range=[booking_info['start_date'], booking_info['end_date']],
            guests_num=booking_info['guests'],
            promo_codes=[],  # TODO: Validate and send promo codes
            booking_date=booking_date,
        )
        return cls(application, actor, '_no_app_')

    def validate(self):
        return self._application.validate()

    def use_payment_gateway(self, payment_gateway):
        """
        :param payment_gateway:
        :return:
        """
        self.payment_gateway = None  # TODO

    def get_current_state(self):
        return self.state

    def set_new_state(self, new_state):
        self.state = new_state

    def record_to_db(self, application_db):
        """

        :param application_db:
        :return:
        """
        # ApplicationState
        print(self.__STATE_REVERSE_MAP)
        print(self.get_current_state())
        print("*********** %s" % self.__STATE_REVERSE_MAP[self.get_current_state()])
        application_db.update_status(self.__STATE_REVERSE_MAP[self.get_current_state()],
                                     self.__ACTOR_REVERSE_MAP[self._actor])
        # application_db.update_accounts()

        # AccountDetail

        # Rentality records
        # PaymentGatewayTransaction
        # LedgerRecord

    def get_response(self):
        return {}

    def inform_entities(self, application_db):
        pass
        # tenant email
        # homeowner email

    def initialize(self):
        """
        Use to initialize a booking process.
        :return:
        """
        state = self.business_model.on_event(
            self.get_current_state(), self.business_model.get_start_event(), self._actor
        )
        self.set_new_state(state)

    def intend(self, actor):
        """
        :return: dict
        """
        business_model = self.application.get_business_model()
        business_model.on_event('intend', actor)
        self.payment_gateway.intend()

    def execute_intent(self):
        ...

    def cancel(self):
        pass

    def dispute(self):
        pass

    def reduce_stay(self):
        ...

    def extend_stay(self):
        ...

    def update(self):
        ...

    def resolve_dispute(self):
        ...

    def check_in(self):
        ...

    def check_out(self):
        ...
