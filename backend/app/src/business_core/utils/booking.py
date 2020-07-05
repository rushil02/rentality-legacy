from payment_gateway.utils import PaymentGateway
from .application import Application
from application.utils import STATE_REVERSE_MAP_FOR_DB, ACTOR_REVERSE_MAP_FOR_DB


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
    def __init__(self, application, actor, state):
        """
        :param application: 'Application' object
        """
        self._application = application
        self._application.set_state(state)
        self._actor = actor

        self._db = None

        self._payment_gateway = None
        self._payment_gateway_info = {}

    @property
    def db(self):
        if self._db:
            return self._db
        else:
            raise ValueError("DB object is not set for application")

    def set_application_db(self, application_obj):
        self._db = application_obj

    @property
    def current_state(self):
        return self._application.state

    @property
    def business_model(self):
        return self._application.get_business_model()

    @property
    def cancellation_policy(self):
        return self._application.get_cancellation_policy()

    @classmethod
    def load(cls, application_obj, actor):
        """
        Creates a new Financial Booking object. This will create all the required
        details for booking object from the frozen details in given application object.

        :param actor: [tenant, home_owner, system, admin]
        :param application_obj: 'application.models.Application` object
        :return: cls object
        """
        application = Application.load(application_obj)
        obj = cls(application, actor=actor, state=application_obj.get_status_display())
        obj.set_application_db(application_obj)
        obj.use_payment_gateway(PaymentGateway.init_for_application(application_obj))
        return obj

    @classmethod
    def create(cls, house_db, booking_info, actor, booking_date):
        """
        Create a booking from house database object, booking_info from user.
        :param booking_date:
        :param house_db:rep/apply/property/info/37185854-e4fe-440a-a167-cde50cc8d3b6
        :param booking_info:
        :param actor: [tenant, home_owner, system, admin]
        :return: Booking()
        """

        application = Application.create(house_db, booking_info)
        application.set_prospective_booking_date(booking_date)
        obj = cls(application, actor=actor, state='_no_app_')
        return obj

    # endregion

    def validate(self):
        return self._application.validate()

    def use_payment_gateway(self, payment_gateway):
        """
        :param payment_gateway: 'payment_gateway.utils.PaymentGateway'
        :return:
        """
        self._payment_gateway = payment_gateway
        self._payment_gateway.set_application(self.db)
        self._payment_gateway.set_homeowner_user(self.db.house.home_owner.user)
        self._payment_gateway.set_tenant_user(self.db.tenant.user)

    def initialize(self):
        """
        Use to initialize a booking process.
        :return:
        """
        action = self.business_model.on_event(
            self.business_model.get_start_event(), self._actor
        )
        action.execute_all(self.db, self._payment_gateway)

        if action.status_is_updated:
            self.db.update_status(STATE_REVERSE_MAP_FOR_DB[action.next_state],
                                  ACTOR_REVERSE_MAP_FOR_DB[self._actor])
        self.db.create_account(
            business_model_config=self.business_model.get_db_object(),
            cancellation_policy=self.business_model.get_can_db_object(),
            payment_gateway=self._payment_gateway.db,
            tenant_info=self._application.tenant_account.to_json_dict(),
            homeowner_info=self._application.homeowner_account.to_json_dict(),
            meta_info=action.get_meta_update_info()
        )
        return action

    def execute_intent(self):
        action = self.business_model.on_event(
            'execute_intent', self._actor
        )
        action.execute_all(self.db, self._payment_gateway)

        if action.status_is_updated:
            self.db.update_status(STATE_REVERSE_MAP_FOR_DB[action.next_state],
                                  ACTOR_REVERSE_MAP_FOR_DB[self._actor])
        self.db.update_account(
            meta_info=action.get_meta_update_info()
        )

        return action

    # region future # FIXME: URGENT
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
