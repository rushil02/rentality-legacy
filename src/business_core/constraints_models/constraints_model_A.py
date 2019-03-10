"""
Business constraints
    - Limited by minimum days of booking [min_stay]
    - Maximum buffer (between booking date and check-in date) for advanced booking
    - Minimum buffer (between booking date and check-in date) for advanced booking
    - Booking is calculated per night (not per day), therefore check-out date is not included
    - Buffer between consecutive booking on the same house, therefore a one-day buffer
      ensures that check-out date of Booking 'A' and check-in date of booking 'B' cannot
      be on the same day.
"""
from business_core.constraints_models.base import ConstraintsModelBase
from .exceptions import ConstraintError

class ConstraintsModelA(ConstraintsModelBase):
    MIN_STAY_DEFAULT = 28
    REQUIRED_ATTRS = {
        'min_stay': {
            'type': 'positive-integer',
            'verbose': "Minimum length of Stay"
        },
        'max_stay': {
            'type': 'positive-integer',
            'verbose': "Maximum length of Stay"
        },
        'max_buffer': {
            'type': 'positive-integer',
            'verbose': "Maximum buffer between booking date and check-in date"
        },
        'min_buffer': {
            'type': 'positive-integer',
            'verbose': "Minimum buffer between booking date and check-in date"
        },
        'bookings_buffer': {
            'type': 'positive-integer',
            'verbose': "Buffer between consecutive booking on the same house"
        },
    }

    def __init__(self, **kwargs):
        self.business_model_meta = kwargs.get('businness_model_meta', {})
        self.errors = []
        self.min_stay = self.business_model_meta.get('min_stay', self.MIN_STAY_DEFAULT)
        super().__init__()

    def validate(self, house_math, raise_exception):
        if self.min_stay > house_math.min_stay:
            self.errors.append("House minimum stay cannot be less than {}".format(self.min_stay))
        if raise_exception and self.errors:
            raise ConstraintError("Constraints validation failed.", self.errors)
        elif self.errors:
            return False
        else:
            return True
    
    def get_errors(self):
        return self.errors
