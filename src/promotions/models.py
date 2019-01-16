from django.db import models

from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.contrib.postgres.fields import JSONField
from django.conf import settings
from django.utils.translation import gettext_lazy as _

from promotions.code_validations import VALIDATORS as AVAILABLE_VALIDATORS


class MetaValueDoesNotExit(Exception):
    pass


class PromotionalCodeManager(models.Manager):
    def validate(self, code, user, entity, **kwargs):
        """
        :param code: code
        :param user: current user
        :param entity: Entity on which the code is being used
        :return: [Boolean, error_msg] or raises error
        """
        if self.get_queryset().filter(code=code).count() == 0:
            return False, "Invalid Code", None
        else:
            try:
                code_obj = self.get(code=code, active=True)
            except PromotionalCode.MultipleObjectsReturned:
                raise ValueError("Multiple schemes active with same promo code")
            except PromotionalCode.DoesNotExist:
                return False, "This code has expired.", None
            else:
                return [*code_obj.validate_for_use(user=user, entity=entity, **kwargs), code_obj]


class PromotionalCode(models.Model):
    """
    meta -> can be used to store any additional details, like - referrer, custom_validation_function
        - time_limit, use_limit
        - validation_list : methods to run for validation of promo-code
        - override_default_validation : [Boolean] will not run default validation checks
        - referrer : '{user: user_id, }'  # FIXME: Needs use case and documentation
        - additional_methods : [List of methods in order of call] Methods to be run at successful validation of code
    VALIDATORS -> Mapping of string values stored in DB to actual methods used for validating the current object
    """
    code = models.CharField(max_length=20, verbose_name='Coupon/Voucher Code')
    verbose = models.TextField(verbose_name='Title', help_text='Example: 50% off for New users')
    description = models.TextField(blank=True)
    tnc = models.TextField(blank=True, verbose_name='Terms & Conditions')

    VALUE_TYPE = (
        ('F', 'Flat'),
        ('P', 'Percentage'),
    )
    value_type = models.CharField(max_length=1, choices=VALUE_TYPE)
    invert_discount = models.BooleanField(
        default=False,
        help_text="Default behaviour is Discount. Selecting it will change the behaviour to extra charge."
    )
    PRINCIPAL_CHOICES = (
        ('R', 'Total Rent'),
        ('S', 'Service Fee'),
        ('N', 'Net Amount')
    )
    principal = models.CharField(max_length=1, choices=PRINCIPAL_CHOICES)
    value = models.DecimalField(max_digits=12, decimal_places=5)

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

    allowed_users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True,
                                           help_text="Users which are allowed to use this Promotional Code. "
                                                     "Selecting None will make it applicable to all.")

    meta = JSONField(null=True, blank=True)

    VALIDATORS = AVAILABLE_VALIDATORS

    objects = PromotionalCodeManager()

    def __str__(self):
        return "%s" % self.code

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude=exclude)
        if PromotionalCode.objects.filter(code=self.code, active=True).exists() and self.active:
            raise ValidationError({
                'code': _(
                    'A Promotional scheme is already active with this code. Please change the code.'),
            })
        if self.meta:
            if self.get_meta_data('override_default_validation', default=False) and self.active:
                try:
                    self.get_meta_data('vapromo-resultlidation_list')
                except KeyError:
                    raise ValidationError({
                        'code': _(
                            'Need Validation List to override the default validators.'
                        ),
                    })
        for validator in self.get_validators_list():
            method = self.get_validation_method(validator)
            try:
                method(obj=self, user=None, entity=None, applied_on=None)
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
            raise ValueError("User cannot be None")
        else:
            matches = self.allowed_users_set.filter(id=user.id).count()
            if matches == 1:
                return True
            elif matches > 1:
                raise ValueError("Matches should not ge greater than 1")
            else:
                return False

    # endregion

    def default_validations(self, entity, applier_type):
        # check applied_on
        if self.applicable_on != ContentType.objects.get_for_model(entity):
            return False
        # check applied by
        if self.applied_by != applier_type:
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

    def validate_for_use(self, user, entity, applier_type, **kwargs):
        """
        :param applier_type: can be home owner [H] or tenant [T]. Refer to 'applied_by' choices for all options.
        :param user: current user
        :param entity: Entity on which the code is being used
        :returns Boolean, Error message if applicable
        """
        override_default_validation = self.get_meta_data(
            'override_default_validation', default=False
        )
        if not override_default_validation:
            self.default_validations(entity, applier_type)
        validations = self.get_validators_list()
        for validator in validations:
            method = self.get_validation_method(validator)
            if method(obj=self, user=user, entity=entity, applier_type=applier_type, **kwargs):
                continue
            else:
                return False, self.get_validation_error(validator)
        return True, ""


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
