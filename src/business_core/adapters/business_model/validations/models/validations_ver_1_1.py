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

    def validate_house(self, house):
        errors = []
        if self.min_stay > self.house.min_stay:
            self.errors.append("House minimum stay cannot be less than {}".
                               format(self.min_stay))
        return errors

    def validate_application(self, application):
        errors = []
        if self.min_buffer < application.get_booking_buffer_days():
            errors.append("Check-in date is too close to booking date. Minimum %s days required." % self.min_buffer)
        return errors
