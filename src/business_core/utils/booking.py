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

    # region init
    __ACTOR_REVERSE_MAP_FOR_DB = {
        'tenant': 'T',
        'homeowner': 'H',
        'system': 'S',
        'admin': 'A',
        'staff': 'A'
    }

    __STATE_REVERSE_MAP_FOR_DB = get_state_reverse_map()

    def __init__(self, application, actor, state):
        """
        :param application: 'Application' object
        """
        self._application = application
        self._payment_gateway = None
        self._business_model = None
        self._actor = actor
        self.state = state

        self._acc_info = {}
        self._response = {}
        self._inform_entities = {}

    @property
    def business_model(self):
        return self._application.get_business_model()

    @property
    def cancellation_policy(self):
        return self._application.get_can_policy()

    @classmethod
    def load(cls, application_obj, actor, payment_gateway):
        """
        Creates a new Financial Booking object. This will create all the required
        details for booking object from the frozen details in given application object.

        :param actor: [tenant, home_owner, system, admin]
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
        :param actor: [tenant, home_owner, system, admin]
        :return: Booking()
        """

        house = House.load(house_db)
        application = Application(
            house=house,
            date_range=[booking_info['start_date'], booking_info['end_date']],
            guests_num=booking_info['guests'],
            promo_codes=[],  # TODO: Validate and send promo codes
        )
        application.set_prospective_booking_date(booking_date)
        return cls(application, actor, '_no_app_')

    # endregion

    def validate(self):
        return self._application.validate()

    def use_payment_gateway(self, payment_gateway):
        """
        :param payment_gateway:
        :return:
        """
        self._payment_gateway = None  # TODO

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
        application_db.update_status(self.__STATE_REVERSE_MAP_FOR_DB[self.get_current_state()],
                                     self.__ACTOR_REVERSE_MAP_FOR_DB[self._actor])
        try:
            application_db.update_account(meta_info=self._acc_info)
        except AssertionError:
            application_db.create_account(
                business_model_config=self.business_model.get_db_object(),
                cancellation_policy=self.business_model.get_can_db_object(),
            )
        else:
            application_db.update_account(meta_info=self._acc_info)

        # Rentality records
        # PaymentGatewayTransaction
        # LedgerRecord

    def _load_data(self, result):
        self.set_new_state(result['state'])
        self._response = result.get('response', {})
        self._acc_info = result.get('acc_info', {})
        self._inform_entities = result.get('mail', {})

    def get_response(self):
        return self._response

    def inform_entities(self, application_db):
        pass
        # tenant email
        # homeowner email

    def initialize(self):
        """
        Use to initialize a booking process.
        :return:
        """
        result = self.business_model.on_event(
            self.get_current_state(), self.business_model.get_start_event(), self._actor
        )
        self._load_data(result)

    def execute_intent(self):
        result = self.business_model.on_event(
            self.get_current_state(), 'execute_intent', self._actor
        )
        self._load_data(result)

    # region future #FIXME: URGENT
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

    # endregion
