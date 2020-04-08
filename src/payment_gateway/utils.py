from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist

from financials.models import PaymentGatewayTransaction
from .adapters import get_adaptor_class
from .models import LocationRestriction, Profile


class User(object):
    """
    Provides interface to limited relevant django models to store all event actions.
    """

    @staticmethod
    def check_existence(attr):
        if attr:
            return attr
        else:
            raise AssertionError("Value required to initialize payment_gateway.utils.User")

    def __init__(self, user):
        self._user_db = user
        self._pg_account_db = None

        self.email = self.check_existence(user.email)
        self.first_name = self.check_existence(user.first_name)
        self.last_name = self.check_existence(user.last_name)

        self.dob = user.userprofile.dob
        self.country = user.get_billing_location()
        self.account_type = user.userprofile.account_type
        self.business_name = user.userprofile.business_name
        self.billing_postcode = user.userprofile.billing_postcode
        self.contact_num = user.userprofile.contact_num

        self.user_data = None  # Contains serialized request details
        self.http_request = None

    def get_user_db_object(self):
        return self._user_db

    def set_pg_account(self, account):
        self._pg_account_db = account

    @property
    def pg_account(self):
        if self._pg_account_db:
            return self._pg_account_db
        else:
            raise AttributeError("User's PG account is not set")

    def update_account(self, value):
        # FIXME: Update by merge not replacement !!!!URGENT!!!
        if self._pg_account_db:
            self._pg_account_db.details = value
            self._pg_account_db.save()
        else:
            raise AssertionError("Cannot update account - None provided")

    @property
    def account_details(self):
        if self._pg_account_db:
            return self._pg_account_db.details
        else:
            raise AssertionError("No account is set")

    @property
    def user_request(self):
        if self.http_request:
            return self.http_request
        else:
            raise AssertionError("Request object is not loaded")

    @property
    def request_data(self):
        if self.user_data:
            return self.user_data
        else:
            raise AssertionError("Request object is not loaded")


class PaymentGateway(object):
    """
    Models all the payment gateway processes used by the system.
    """

    # region init
    def __init__(self, pg_profile):
        """
        :param pg_profile: `payment_gateway.models.Profile` object
        """
        self._pg_profile = pg_profile
        self._pg_db = pg_profile.payment_gateway
        self._payment_gateway = get_adaptor_class(self._pg_db.code)()
        self._homeowner = None
        self._tenant = None
        self._application_db = None

    @property
    def db(self):
        return self._pg_db

    @property
    def profile(self):
        return self._pg_profile

    @property
    def application(self):
        if self._application_db:
            return self._application_db
        else:
            raise AttributeError("Application is not set in utils.PaymentGateway")

    @property
    def tenant(self):
        if self._tenant:
            return self._tenant
        else:
            raise AttributeError("Tenant is not set in utils.PaymentGateway")

    @property
    def homeowner(self):
        if self._homeowner:
            return self._homeowner
        else:
            raise AttributeError("Homeowner is not set in utils.PaymentGateway")

    @classmethod
    def load_location_default(cls, billing_location, house_location):
        """
        `house_location` requires nested evaluation (geo_point is useless since, we don't have polygon information)
        :param billing_location: 'cities.models.Country'
        :param house_location: 'cities.models.PostalCode'
        :return:
        """
        location_restrictions = LocationRestriction.objects.filter(
            payment_gateway_profile__country=billing_location
        )

        # FIXME: city and region filter not available as there are null link between
        #   postal code and city and region
        selection_priority = (house_location.country,)

        for location_attr in selection_priority:
            try:
                loc_object = location_restrictions.get(
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
                return cls(loc_object)

        # if couldn't find any location specific object
        loc_object = location_restrictions.get(
            house_location_id=None,
            house_location_type=None,
            active=True,
            default=True
        )
        return cls(loc_object.payment_gateway_profile)

    @classmethod
    def init_for_homeowner(cls, user, pg_code, **kwargs):
        profile = Profile.objects.get(payment_gateway__code=pg_code, country=user.get_billing_location())
        obj = cls(profile)
        obj.set_homeowner_user(
            user,
            user_request=kwargs.get('user_request', None),
            request=kwargs.get('request', None)
        )
        return obj

    @classmethod
    def init_for_house(cls, house_db):
        return cls.init_for_homeowner(house_db.home_owner.user, house_db.payment_gateway.code)

    @classmethod
    def init_for_application(cls, application_db):
        profile = Profile.objects.get(
            payment_gateway=application_db.accountdetail.payment_gateway,
            country=application_db.house.home_owner.user.get_billing_location()
        )
        return cls(profile)

    def set_homeowner_user(self, user, user_request=None, request=None):
        """
        :param user: 'user_custom.models.User' object
        :param request: [optional] 'django.http.request' object
        :param user_request: [optional] serialized response dictionary from user
        :return:
        """
        self._homeowner = User(user)
        try:
            self.homeowner.set_pg_account(user.account_set.get(payment_gateway=self._pg_db))
        except ObjectDoesNotExist:
            raise AttributeError("Required Home Owner account is not found.")

        if user_request:
            self.homeowner.user_data = user_request
        if request:
            self.homeowner.http_request = request

    def set_tenant_user(self, user, user_request=None, request=None):
        """
        :param user: 'user_custom.models.User' object
        :param request: [optional] 'django.http.request' object
        :param user_request: [optional] serialized response dictionary from user
        :return:
        """
        self._tenant = User(user)
        try:
            self.tenant.set_pg_account(user.account_set.get(payment_gateway=self._pg_db))
        except ObjectDoesNotExist:
            raise AttributeError("Required Home Owner account is not found.")
        if user_request:
            self.tenant.user_data = user_request
        if request:
            self.tenant.http_request = request

    def set_application(self, application_db):
        self._application_db = application_db

    # endregion init

    # region Payout
    def create_payout_account(self):
        pg_transaction = self._payment_gateway.create_payout_account(self.homeowner)
        if pg_transaction.meta_store:
            self.homeowner.update_account(pg_transaction.meta_store)
        return pg_transaction

    def update_payout_account(self):
        pg_transaction = self._payment_gateway.update_payout_account(self.homeowner)
        if pg_transaction.meta_store:
            self.homeowner.update_account(pg_transaction.meta_store)
        return pg_transaction

    def verify_payout_account(self):
        return self._payment_gateway.verify_payout_account_status(self.homeowner)

    def add_update_bank_account(self):
        return self._payment_gateway.add_update_bank_account(self.homeowner)

    def get_bank_account(self):
        return self._payment_gateway.get_bank_account(self.homeowner)

    # endregion

    def record_monetary_transaction(self, pgt, no_app=False):
        if pgt.record_transaction:
            if no_app:
                application = None
            else:
                application = self.application

            if pgt.user_type == 'tenant':
                user_account = self.tenant.pg_account
            elif pgt.user_type == 'homeowner':
                user_account = self.homeowner.pg_account
            else:
                raise ValueError("%s is not valid user_type" % pgt.user_type)

            pgt_obj = PaymentGatewayTransaction.objects.create(
                application=application,
                transaction_type=pgt.transaction_type,
                transaction_id=pgt.transaction_id,
                amount=pgt.amount,
                user_account=user_account
            )
            pgt.set_db(pgt_obj)
            return pgt
        else:
            return pgt

    def create_intent(self, application):
        """
        :param application:
        :return:
        """
        return self.record_monetary_transaction(
            self._payment_gateway.create_intent(self.homeowner, self.tenant, application)
        )

    def perform_pay_in(self, amount):
        self._payment_gateway.process_pay_in(amount)

    def perform_pay_out(self, amount):
        self._payment_gateway.process_pay_out(amount)

    def perform_refund(self, amount):
        self._payment_gateway.process_refund(amount)

    def create_pay_in_account(self, user, **kwargs):
        self._payment_gateway.create_home_owner_account()

    def update_pay_in_account(self, user, **kwargs):
        self._payment_gateway.create_home_owner_account()
