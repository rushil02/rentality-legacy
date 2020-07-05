from rest_framework.serializers import Field
from datetime import datetime


class DateRangeField(Field):
    """
    Date Range objects (psycopg2.extras.DateRange) are serialized into {'upper': 'YYYY-MM-DD', 'lower': 'YYYY-MM-DD'}
    notation.
    """
    DATE_FORMAT = '%Y-%m-%d'

    default_error_messages = {
        'incorrect_format': 'Incorrect format. Expected `%s`.' % DATE_FORMAT,
    }

    def to_representation(self, value):
        try:
            return {'lower': value.lower.strftime(self.DATE_FORMAT), 'upper': value.upper.strftime(self.DATE_FORMAT)}
        except AttributeError:
            return {'lower': value[0].strftime(self.DATE_FORMAT), 'upper': value[1].strftime(self.DATE_FORMAT)}

    def to_internal_value(self, data):
        try:
            ret = (
                datetime.strptime(data['lower'], self.DATE_FORMAT).date(),
                datetime.strptime(data['upper'], self.DATE_FORMAT).date()
            )
        except (KeyError, ValueError):
            self.fail('incorrect_format')
        else:
            return ret
