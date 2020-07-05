from datetime import datetime
from django.utils import timezone
from ..base import ValidationsModelBase


class ValidationModelOneOne(ValidationsModelBase):
    """
    Business constraints
        - Limited by minimum days of booking [min_stay]
        - Maximum buffer (between booking date and check-in date) for advanced booking
        - Minimum buffer (between booking date and check-in date) for advanced booking
        - Buffer between consecutive booking on the same house, therefore a one-day buffer
          ensures that check-out date of Booking 'A' and check-in date of booking 'B' cannot
          be on the same day.
    """

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

    def validate_house(self):
        errors = []
        if self.min_stay > self.house.min_stay:
            errors.append("House minimum stay cannot be less than {}".
                          format(self.min_stay))
        return errors

    def validate_application(self):
        errors = []

        date_range = self.application.date_range
        stay_length = (date_range[1] - date_range[0]).days

        if self.application.check_in_date <= timezone.localdate(timezone=self.house.timezone):
            errors.append("Selected Check-in date is invalid. Select a future date.")

        booking_buffer_days = (self.application.date_range[0] - self.application.get_booking_date_time()).days
        if self.min_buffer > booking_buffer_days:
            errors.append("Check-in date is too close to booking date. Minimum %s days required." % self.min_buffer)
        if self.max_buffer < booking_buffer_days:
            errors.append("Check-in date is more than %s days away. Not allowed." % self.max_buffer)

        if self.house.min_stay > stay_length:
            errors.append('Minimum length of stay should be greater than %s days.' % self.house.min_stay)
        if self.house.max_stay < stay_length:
            errors.append('Maximum length of stay should be less than %s days.' % self.house.max_stay)
        if self.house.max_people_allowed < self.application.guests_num:
            errors.append('Number of guests more than allowed.')

        return errors
