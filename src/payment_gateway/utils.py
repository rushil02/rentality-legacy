from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist

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

        self.user_data = None
        self.http_request = None

    def get_user_db_object(self):
        return self._user_db

    def set_pg_account(self, account):
        self._pg_account_db = account

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

    CORE_TRANSACTION_TYPES = {
        'P': ('Payout', "Transaction from Rentality to Home Owner"),
        'C': ('Pay-in', "Transaction from Tenant to Rentality"),
        'R': ('Refund', "Transaction from Rentality to Tenant"),
    }

    VIRTUAL_TRANSACTIONS = (
        # if USES_VIRTUAL_HOME_OWNER_ACCOUNT = True
        ('HT', 'Home-owner Transfer', "Virtual Transfer from Rentality to Home-owner Virtual Account"),
        ('RHT', 'Reverse Home-owner Transfer', "Virtual Transfer from Home-owner Virtual Account to Rentality"),
        # if USES_VIRTUAL_TENANT_ACCOUNT = True
        ('TT', 'Tenant Transfer', "Virtual Transfer from Tenant Virtual Account to Rentality"),
        ('RTT', 'Reverse Tenant Transfer', "Virtual Transfer from Rentality to Tenant Virtual Account"),
    )

    # region init
    def __init__(self, pg_profile):
        """
        :param pg_profile: `payment_gateway.models.Profile` object
        """
        self._pg_profile = pg_profile
        self._pg_db = pg_profile.payment_gateway
        self._payment_gateway = get_adaptor_class(self._pg_db.code)()
        self.homeowner = None
        self.tenant = None

    @property
    def db(self):
        return self._pg_db

    @property
    def profile(self):
        return self._pg_profile

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
    def create_from_homeowner(cls, user, pg_code):
        profile = Profile.objects.get(payment_gateway__code=pg_code, country=user.get_billing_location())
        return cls(profile)

    def set_homeowner_user(self, user, user_response=None, request=None):
        """
        :param user: 'user_custom.models.User' object
        :param request: [optional] 'django.http.request' object
        :param user_response: [optional] serialized response dictionary from user
        :return:
        """
        self.homeowner = User(user)
        try:
            self.homeowner.set_pg_account(user.account_set.get(payment_gateway=self._pg_db))
        except ObjectDoesNotExist:
            raise AttributeError("Required Home Owner account is not found.")

        if user_response:
            self.homeowner.user_data = user_response
        if request:
            self.homeowner.http_request = request

    def set_tenant_user(self, user, user_response=None, request=None):
        """
        :param user: 'user_custom.models.User' object
        :param request: [optional] 'django.http.request' object
        :param user_response: [optional] serialized response dictionary from user
        :return:
        """
        self.tenant = User(user)
        if user_response:
            self.homeowner.user_data = user_response
        if request:
            self.homeowner.http_request = request

    # endregion

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

    def on_event(self, event):
        return self._payment_gateway.on_event(event)

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
