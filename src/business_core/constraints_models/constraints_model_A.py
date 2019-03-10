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


class ConstraintsModel(ConstraintsModelBase):
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
        kwargs.get('rent')
        super(ConstraintsModel, self).__init__()

    def validate(self):
        ...
