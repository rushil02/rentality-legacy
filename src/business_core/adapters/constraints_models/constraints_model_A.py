"""
Business constraints
    - Limited by minimum days of booking [min_stay]
    - Maximum buffer (between booking date and check-in date) for advanced booking
    - Minimum buffer (between booking date and check-in date) for advanced booking
    - Buffer between consecutive booking on the same house, therefore a one-day buffer
      ensures that check-out date of Booking 'A' and check-in date of booking 'B' cannot
      be on the same day.
"""
from business_core.adapters.constraints_models.base import ConstraintsModelBase


class ConstraintsModelA(ConstraintsModelBase):
    REQUIRED_ATTRS = {
        'min_stay': {
            'type': 'positive-integer',
            'verbose': "Minimum length of Stay"
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

    def validate_house(self, raise_exception):
        if self.min_stay > self.house.min_stay:
            self.errors.append("House minimum stay cannot be less than {}".format(self.min_stay))
        return super(ConstraintsModelA, self).validate_for_house(raise_exception)

    def validate_application(self, raise_exception):
        # FIXME: Complete this
        if self.min_stay > self.house.min_stay:
            self.errors.append("House minimum stay cannot be less than {}".format(self.min_stay))
        return super(ConstraintsModelA, self).validate_for_application(raise_exception)
