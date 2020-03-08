from business_core.adapters.business_model.validations import get_constraints_model_class
from business_core.adapters.business_model.behaviours import get_behaviour_class
from business_core.adapters.cancellation import get_cancellation_behaviour_class

from business_core.models import BusinessModelConfiguration as BusinessModelConfigurationDB


class BusinessModel(object):
    """
    Models and processes the behaviour and constraints acquired from 'business_core.models.BusinessModelConfiguration'.
    """

    def __init__(self, business_model_config):
        """
        :param business_model_config: 'business_core.models.BusinessModelConfiguration' object
        """
        self._db = business_model_config
        self._can_policy_db = None

        self.validator = get_constraints_model_class(business_model_config.constraints_model)(
            constraints_meta=business_model_config.get_constraints_meta()
        )
        self.behaviour = get_behaviour_class(business_model_config.behaviour)(
            meta=business_model_config.get_behaviour_meta()
        )
        self.can_policy_behaviour = None

    def set_cancellation_policy(self, cancellation_policy):
        """
        :param cancellation_policy: 'business_core.models.CancellationPolicy' object
        """
        self._can_policy_db = cancellation_policy
        self.can_policy_behaviour = get_cancellation_behaviour_class(cancellation_policy.behaviour)()

    def get_db_object(self):
        return self._db

    def get_can_db_object(self):
        return self._can_policy_db

    def on_event(self, curr_state, event, actor):
        return self.behaviour.on_event(curr_state, event, actor)

    def get_start_event(self):
        return self.behaviour.STATE_START

    # def get_booking_datetime(self, db_obj, actor):
    #     """
    #     On the basis of actor, returns the date when intent was executed
    #     :param db_obj: 'application.models.Application'
    #     :param actor: 'tenant', 'homeowner', 'system', ...
    #     :return: datetime object
    #     """
    #
    #     # Ensure that state and actor has always one possible state
    #     app_state = db_obj.application_states.get(
    #         new_state=self.behaviour.get_booking_state_for_actor(actor),
    #         actor=actor
    #     )
    #
    #     return app_state.created_on

    def to_dict(self):
        return ...

    @classmethod
    def init_default(cls, billing_location, house_location):
        return cls(
            business_model_config=BusinessModelConfigurationDB.objects.get_location_default(
                billing_location,
                house_location
            )
        )

    def validate_house(self, raise_exception=False):
        """
        :param raise_exception: boolean
        :return:
        """
        return self.constraints_model.validate_house(raise_exception)

    def validate_application(self, application):
        """
        :param raise_exception: boolean
        :return: [errors, ...]
        """
        return self.validator.validate_application(application=application)

    def get_errors(self):
        return self.constraints_model.get_errors()

    def cancel(self):
        ...