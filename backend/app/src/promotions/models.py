from django.db import models

from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.contrib.postgres.fields import JSONField
from django.conf import settings
from django.utils.translation import gettext_lazy as _

from promotions.code_validations import VALIDATORS as AVAILABLE_VALIDATORS
from promotions.utils.promo_code_behaviour import get_behaviours


class MetaValueDoesNotExit(Exception):
    pass


class PromotionalCodeManager(models.Manager):
    def validate(self, code, user, applied_on_content_type, **kwargs):
        """
        :param code: code
        :param user: current user
        :param applied_on_content_type: Content type of entity on which the code is being used
        :return: [Boolean, error_msg] or raises error
        """
        if self.get_queryset().filter(code=code).count() == 0:
            return {"valid": False, "msg": "Invalid Code", "obj": None}
        else:
            try:
                code_obj = self.get(code=code, active=True)
            except PromotionalCode.MultipleObjectsReturned:
                raise ValueError("Multiple schemes active with same promo code")
            except PromotionalCode.DoesNotExist:
                return {"valid": False, "msg": "This code has expired.", "obj": None}
            else:
                return dict(
                    obj=code_obj,
                    **code_obj.validate_for_use(user=user, applied_on_content_type=applied_on_content_type, **kwargs)
                )

    def validate_list(self, codes, user, applied_on_content_type, applier_type, **kwargs):
        """ Validates a list of promo-codes, returns error if any is invalid or if they are incompatible. """
        promo_codes = []
        incompatible_with_others = False
        for code in codes:
            result = self.validate(
                code=code,
                user=user,
                applied_on_content_type=applied_on_content_type,
                applier_type=applier_type
            )
            if result["valid"]:
                promo_codes.append(result["obj"])
                if not incompatible_with_others:
                    incompatible_with_others = result["obj"].get_meta_data("incompatible_with_others", default=False)
            else:
                raise ValueError(result["msg"])

        if incompatible_with_others and len(promo_codes) > 1:
            raise ValueError("Incompatible Promo Codes")
        else:
            return promo_codes


class PromotionalCode(models.Model):
    """
    Promotional Code object can either belong to (`applied_by`) Home-owner or Tenant; and can
    only be applied on (`applicable_on`) either House or Application. Only following 2
    combinations can exist -
        1. Home-owner & House
        2. Tenant & Application

    Home-owner promo-codes are allowed to have a TransactionConfiguration, while a tenant promo-code
    is strictly not allowed to associate with a TransactionConfiguration. Any Tenant promo-code can
    only impact the values associated with Tenant's charge which are payable to Rentality.

    For exclusive cases (example - to create an application with 0 account transactions).
    Application will be generated using staff tools with relevant TransactionConfiguration.
    Promotional Codes for Tenant are strictly prohibited from altering the TransactionConfiguration.

    Strict Validations ensure pre-save checks to warn for any mismatch in selected entities,
    constraints and behaviour. (Including entities and behaviour in the transaction model.)  # TODO

    To apply the promo-code, the validations are defined by the selected `VALIDATORS` stored
    in meta. These are the user (staff member who created promo-code) selected validations,
    example - Expiry date, Maximum number of use, etc.

    Promotional Codes which are attached to a TransactionConfiguration are limited to the location
    specified by the later.
    
    Since the behaviour of a promo code is unknown and dynamic, the attrs and relationships involved 
    are unknown. `meta` is used to store all attributes relevant for the functioning of promocode.
    Known parent attrs of meta ->  # FIXME: Expand on this list
        - validation_list : methods to run for validation of promo-code
        - override_default_validation : [Boolean] will not run default validation checks
        - id of attached TransactionConfiguration object

    VALIDATORS ->   Mapping of string values stored in DB to actual methods used for validating
                    the current object
    """
    code = models.CharField(max_length=20, verbose_name='Coupon/Voucher Code')
    verbose = models.TextField(verbose_name='Title', help_text='Example: 50% off for New users')
    description = models.TextField(blank=True)
    tnc = models.TextField(blank=True, verbose_name='Terms & Conditions')

    BEHAVIOURS = get_behaviours()
    behaviour = models.CharField(max_length=1, choices=BEHAVIOURS)

    active = models.BooleanField(default=False)

    USER_CHOICES = (
        ('T', 'Tenant'),
        ('H', 'Home Owner')
    )
    applied_by = models.CharField(max_length=1, choices=USER_CHOICES)

    APPLICABLE_ON_LIMIT = models.Q(
        app_label='application', model='application') | models.Q(
        app_label='house', model='house')
    applicable_on = models.ForeignKey(ContentType, on_delete=models.PROTECT, limit_choices_to=APPLICABLE_ON_LIMIT)

    allowed_users = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True,
        help_text="Users who are allowed to use this Promotional Code. Selecting None will make it applicable to all."
    )

    meta = JSONField(null=True, blank=True)

    VALIDATORS = AVAILABLE_VALIDATORS

    objects = PromotionalCodeManager()

    def __str__(self):
        return "%s" % self.code

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude=exclude)
        if PromotionalCode.objects.filter(code=self.code, active=True).exclude(id=self.id).exists() and self.active:
            raise ValidationError({
                'code': _(
                    'A Promotional scheme is already active with this code. Please change the code.'),
            })
        if self.meta:
            if self.get_meta_data('override_default_validation', default=False) and self.active:
                try:
                    self.get_meta_data('validation_list')
                except KeyError:
                    raise ValidationError({
                        'code': _(
                            'Need Validation List to override the default validators.'
                        ),
                    })
        for validator in self.get_validators_list():
            method = self.get_validation_method(validator)
            try:
                method(obj=self, user=None, applied_on_content_type=None, applied_on=None)
            except MetaValueDoesNotExit as e:
                raise ValidationError({
                    'code': _(
                        'Variables are not configured correctly - %s' % e),
                })

    def get_meta_data(self, attr, **kwargs):
        """
        Find and return information within object's meta, or return given default value or raise error if no default
        value is provided.
        :param attr: lookup keyword
        :param kwargs: 'default' value
        :return: value of key in self.meta
        """
        if not self.meta:
            self.meta = {}
        try:
            return self.meta[attr]
        except KeyError as e:
            try:
                return kwargs['default']
            except KeyError:
                raise MetaValueDoesNotExit(str(e))

    def update_meta(self, keys, value):
        """
        Updates `self.meta` with given information. `keys` is a list of sting objects, from parent to child, to state
        nesting of information (value) to be stored at.
        :param keys: can be a list of string objects which will be checked in order [parent, child, ...] or a single string
        :param value: can be anything, but no nesting will be checked, any existing value will be simply overridden
        :return: None
        """
        if isinstance(keys, str):
            keys = [keys, ]

        if not self.meta:
            self.meta = {}

        curr = self.meta
        for key in keys[:-1]:
            try:
                curr[key]
            except KeyError:
                curr[key] = dict()
            finally:
                curr = curr[key]

        curr.update({keys[-1]: value})

    def get_validation_method(self, validator):
        return self.VALIDATORS[validator]['method']

    def get_validation_error(self, validator):
        return self.VALIDATORS[validator]['error_msg']

    # region Common methods required by validators

    def get_used_times(self, user=None):
        if user:
            self.applicable_on.model_class().objects.get_promo_code
        if user:
            return
        else:
            return 0

    def user_has_permission(self, user):
        if user is None:
            raise ValueError("   User cannot be None")
        else:
            matches = self.allowed_users_set.filter(id=user.id).count()
            if matches == 1:
                return True
            elif matches > 1:
                raise ValueError("Matches should not ge greater than 1")
            else:
                return False

    # endregion

    def default_validations(self, applied_on_content_type, applier_type):
        # check applied_on
        if self.applicable_on != applied_on_content_type:
            print(self.applicable_on, applied_on_content_type)
            print("hrer")
            return False
        # check applied by
        if self.applied_by != applier_type:
            print("here2")
            return False
        return True

    def get_validators_list(self):
        override_default_validation = self.get_meta_data(
            'override_default_validation', default=False
        )
        if override_default_validation:
            try:
                validations_list = self.get_meta_data('validation_list')
            except KeyError as e:
                # TODO: Log high priority error
                raise e
            else:
                return validations_list
        else:
            return self.get_meta_data('validation_list', default=[])

    def validate_for_use(self, user, applied_on_content_type, applier_type, **kwargs):
        """
        :param applier_type: can be home owner [H] or tenant [T]. Refer to 'applied_by' choices for all options.
        :param user: current user
        :param applied_on_content_type: Content Type of entity on which the code is being used
        :returns Boolean, Error message if applicable
        """
        override_default_validation = self.get_meta_data(
            'override_default_validation', default=False
        )
        if not override_default_validation:
            validation_result = self.default_validations(applied_on_content_type, applier_type)
            if not validation_result:
                return {'valid': False, 'msg': "This code is not valid."}
        validations = self.get_validators_list()
        for validator in validations:
            method = self.get_validation_method(validator)
            if method(obj=self, user=user, applied_on_content_type=applied_on_content_type, applier_type=applier_type,
                      **kwargs):
                continue
            else:
                return {'valid': False, 'msg': self.get_validation_error(validator)}
        return {'valid': True, 'msg': ""}

    def apply_code(self, total_rent, service_fee, total_amount):
        invert_discount = {True: -1, False: 1}
        principal_options = {'R': total_rent, 'S': service_fee, 'T': total_amount}

        if self.value_type == 'F':
            return self.value * invert_discount[self.invert_discount]

        elif self.value_type == 'P':
            principal = principal_options[self.principal]
            discount = principal * (self.value / 100) * invert_discount[self.invert_discount]
            return discount

    @property
    def is_change_fee(self):  # FIXME: record fee structure changes
        return False

    def get_fee_model(self):
        return None  # FIXME


class Referee(models.Model):
    """
    Information particular to Referee
    """

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='referee')

    def __str__(self):
        return "%s" % self.user


class PromotionalCodeReferee(models.Model):
    promo = models.ForeignKey('promotions.PromotionalCode', on_delete=models.PROTECT)
    referee = models.ForeignKey('promotions.Referee', on_delete=models.PROTECT)

