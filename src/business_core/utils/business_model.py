from business_core.adapters.business_model.validations import get_constraints_model_class
from business_core.adapters.business_model.behaviours import get_behaviour_class
from business_core.models import BusinessModelConfiguration as BusinessModelConfigurationDB


class BusinessModel(object):
    """
    Models and processes the behaviour and constraints acquired from 'business_core.models.BusinessModelConfiguration'.
    """

    def __init__(self, business_model_config):
        """
        :param business_model_config: 'business_core.models.BusinessModelConfiguration' object
        """
        self.validator = get_constraints_model_class(business_model_config.constraints_model)(
            constraints_meta=business_model_config.get_constraints_meta()
        )
        self.behaviour = get_behaviour_class(business_model_config.behaviour)(
            meta=business_model_config.get_behaviour_meta()
        )

    def on_event(self, curr_state, event, actor):
        return self.behaviour.on_event(curr_state, event, actor)

    def get_start_event(self):
        return self.behaviour.STATE_START

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
