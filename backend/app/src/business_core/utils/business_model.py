from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

from business_core.adapters.business_model.financials import get_financial_model_class
from business_core.adapters.business_model.validations import get_constraints_model_class
from business_core.adapters.business_model.behaviours import get_behaviour_class
from business_core.adapters.cancellation import get_cancellation_behaviour_class

from business_core.models import BusinessModelConfiguration as BusinessModelConfigurationDB, LocationRestriction


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
            meta=business_model_config.get_constraints_meta()
        )
        self.behaviour = get_behaviour_class(business_model_config.behaviour)(
            meta=business_model_config.get_behaviour_meta()
        )
        self.financial_model = get_financial_model_class(business_model_config.financial_model)(
            meta=business_model_config.get_financial_meta()
        )

        self.can_policy_behaviour = None

    def set_cancellation_policy(self, cancellation_policy):
        """
        :param cancellation_policy: 'business_core.models.CancellationPolicy' object
        """
        self._can_policy_db = cancellation_policy
        self.can_policy_behaviour = get_cancellation_behaviour_class(cancellation_policy.behaviour)()

    def set_application(self, application):
        self.validator.set_application(application=application)
        self.behaviour.set_application(application=application)
        self.financial_model.set_application(application=application)

    def set_house(self, house):
        self.validator.set_house(house=house)
        self.behaviour.set_house(house=house)
        self.financial_model.set_house(house=house)

    def get_db_object(self):
        return self._db

    def get_can_db_object(self):
        if self._can_policy_db:
            return self._can_policy_db
        else:
            raise AssertionError("Cancellation Policy is not set yet")

    def on_event(self, event, actor):
        return self.behaviour.on_event(event, actor)

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
    def is_available(cls, billing_location):
        return LocationRestriction.objects.filter(
            Q(config_profile__country=billing_location) | Q(config_profile__country__isnull=True)
        ).filter(active=True, default=True).exists()

    @classmethod
    def init_default(cls, billing_location, house_location):

        def _filter_selection(_loc_res):
            selection_priority = (house_location.country,)

            for location_attr in selection_priority:
                try:
                    _loc_object = _loc_res.get(
                        house_location_id=location_attr.id,
                        house_location_type=ContentType.objects.get_for_model(location_attr),
                        active=True,
                        default=True
                    )
                except LocationRestriction.DoesNotExist:
                    continue
                except LocationRestriction.MultipleObjectsReturned:
                    raise ValueError("Malformed Payment gateway restrictions.")
                else:
                    return _loc_object

            # if couldn't find any location specific object
            try:
                _loc_object = _loc_res.get(
                    house_location_id=None,
                    house_location_type=None,
                    active=True,
                    default=True
                )
            except LocationRestriction.DoesNotExist:
                return None
            except LocationRestriction.MultipleObjectsReturned:
                raise ValueError("Malformed Payment gateway restrictions.")
            else:
                return _loc_object

        try:
            location_restrictions = LocationRestriction.objects.filter(
                config_profile__country=billing_location,
                active=True,
                default=True
            )
            loc_object = _filter_selection(location_restrictions)
            if not loc_object:
                raise AssertionError
        except (LocationRestriction.DoesNotExist, AssertionError):
            location_restrictions = LocationRestriction.objects.filter(
                config_profile__country__isnull=True,
                active=True,
                default=True
            )
            loc_object = _filter_selection(location_restrictions)

        return cls(
            business_model_config=loc_object.config_profile.config
        )

    @classmethod
    def init_from_code(cls, code):
        return cls(business_model_config=BusinessModelConfigurationDB.objects.get(code=code))

    def validate_house(self):
        """
        :return: [errors, ...]
        """
        return self.validator.validate_house()

    def validate_application(self):
        """
        :return: [errors, ...]
        """
        return self.validator.validate_application()
