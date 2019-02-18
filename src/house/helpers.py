import copy

from django.utils import timezone
from psycopg2.extras import DateRange


class OutOfLowerBoundException(Exception):
    pass


class OutOfUpperBoundException(Exception):
    pass


def check_house_availability(house, date_range):
    """
    :param house: house object
    :param date_range: psycopg2.extras.DateRange object
    :return: boolean
    """

    # if dates are already booked
    if house.application_set.filter(date__overlap=date_range).exists():
        return False
    else:
        # if dates are available
        if house.availability_set.filter(dates__contains=date_range).exists():
            return True
        else:
            # check for periodic dates
            periodic_dates = house.availability_set.filter(periodic=True)

            for periodic_date in periodic_dates:
                diff = date_range.lower.year - periodic_date.dates.lower.year
                lower_bound = periodic_date.dates.lower.replace(year=(periodic_date.dates.lower.year + diff))
                upper_bound = periodic_date.dates.upper.replace(year=(periodic_date.dates.upper.year + diff))
                if date_range.lower >= lower_bound and date_range.upper <= upper_bound:
                    return True

    return False


def date_range_difference(date_range_1, date_range_2):
    """
    Subtracts date_range_2 from date_range_1

    :param date_range_1: psycopg2.extras.DateRange object
    :param date_range_2: psycopg2.extras.DateRange object
    :return: list of psycopg2.extras.DateRange objects
    """
    if date_range_2.upper < date_range_1.lower:
        raise OutOfLowerBoundException("Date ranges do not overlap")

    if date_range_2.lower > date_range_1.upper:
        raise OutOfUpperBoundException("Date Ranges do not overlap")

    ranges = dict()

    if date_range_2.lower > date_range_1.lower:
        ranges['left'] = DateRange(lower=date_range_1.lower, upper=date_range_2.lower)
    else:
        ranges['left'] = None

    if date_range_2.upper < date_range_1.upper:
        ranges['right'] = DateRange(lower=date_range_2.upper, upper=date_range_1.upper)
    else:
        ranges['right'] = None

    return ranges


def merge_dates(date_range_1, date_range_2):
    """
    Merege 2 Date Ranges if possible or raise error [in reference to date_range_1]
    :param date_range_1:
    :param date_range_2:
    :return:
    """

    if date_range_2.upper < date_range_1.lower:
        raise OutOfLowerBoundException("Date ranges do not overlap")

    if date_range_2.lower > date_range_1.upper:
        raise OutOfUpperBoundException("Date Ranges do not overlap")

    return DateRange(
        lower=min(date_range_1.lower, date_range_2.lower), upper=max(date_range_1.upper, date_range_2.upper)
    )


def filter_past_dates(date_range):
    """
    Removes dates which cannot be booked as they are past the minimum buffer required for booking start_date
    :param date_range: psycopg2.extras.DateRange object
    :return: psycopg2.extras.DateRange object
    """
    # FIXME: Describes the minimum start_date of booking;should be detailed in the payment model and imported from there
    MIN_DATE = timezone.now().date()

    assert date_range.upper > MIN_DATE, "Date Range is old"

    return DateRange(lower=max(MIN_DATE, date_range.lower), upper=date_range.upper)


def filter_small_date_ranges(date_range):
    # FIXME: Describes the minimum length of booking; should be detailed in the payment model and imported from there
    MIN_DAYS = 28
    assert (date_range.upper - date_range.lower).days >= MIN_DAYS, "Date Range is smaller than required - %s" % MIN_DAYS
    return date_range


def validate_date_range(house, date_range):
    try:
        return True, filter_small_date_ranges(filter_past_dates(date_range))
    except AssertionError:
        return False, None


def get_available_dates(house, from_year=None, till_year=None):
    """
    Important: The availability records of a house should not have duplicate, overlapping or colliding date_ranges.

    :param house: house object
    :param from_year: integer - 2xxx
    :param till_year: integer - 2xxx
    :return: list of psycopg2.extras.DateRange objects
    """
    if from_year is None:
        from_year = timezone.now().year

    if till_year is None:
        till_year = timezone.now().year + 1

    assert till_year >= from_year, "Invalid Arguments: `till_year` should be grater than or equal to `from_year`"

    applications = list(house.application_set.all().values_list('date', flat=True))
    availabilities = house.availability_set.all()

    # construct availabilities for periodic date ranges within the given range by till_date and from_date
    total_availabilities = []
    for availability in availabilities:
        if availability.periodic:
            # `from_year` is set to `from_year - 1` to accommodate availabilities starting from previous year
            # It is expected here that periodic date ranges with more than 365 days of availability are already cleaned.
            for year in range(from_year - 1, till_year + 1):
                diff = year - availability.dates.lower.year
                new_range = DateRange(
                    lower=availability.dates.lower.replace(year=(availability.dates.lower.year + diff)),
                    upper=availability.dates.upper.replace(year=(availability.dates.upper.year + diff))
                )
                filtered_availabilities = []
                for index, selected_date_range in enumerate(total_availabilities):
                    try:
                        new_range = merge_dates(selected_date_range, new_range)
                    except (OutOfUpperBoundException, OutOfLowerBoundException):
                        filtered_availabilities.append(selected_date_range)

                total_availabilities = filtered_availabilities
                total_availabilities.append(new_range)
        else:
            new_range = availability.dates
            filtered_availabilities = []
            for index, selected_date_range in enumerate(total_availabilities):
                try:
                    new_range = merge_dates(selected_date_range, new_range)
                except (OutOfUpperBoundException, OutOfLowerBoundException):
                    filtered_availabilities.append(selected_date_range)

            total_availabilities = filtered_availabilities
            total_availabilities.append(new_range)

    applications.sort(key=lambda x: x.lower)
    total_availabilities.sort(key=lambda x: x.lower)

    available_dates = []

    def get_and_update_diffs(principal_range):
        """
        Finds all available dates within a single principal_range and Updates available_dates directly

        :param principal_range: psycopg2.extras.DateRange object
        :param applications:
        :return: None
        """
        nonlocal available_dates, applications

        curr_apps = copy.deepcopy(applications)

        if len(curr_apps) == 0:
            valid, updated_date_range = validate_date_range(house=house, date_range=principal_range)
            if valid:
                available_dates.append(updated_date_range)
            return

        for index, app in enumerate(curr_apps):
            try:
                sub_ranges = date_range_difference(principal_range, app)
            except OutOfLowerBoundException:
                del applications[0]
                continue
            except OutOfUpperBoundException:
                valid, updated_date_range = validate_date_range(house=house, date_range=principal_range)
                if valid:
                    available_dates.append(updated_date_range)
                return
            else:
                if sub_ranges['left'] is not None:
                    valid, updated_date_range = validate_date_range(house=house, date_range=sub_ranges['left'])
                    if valid:
                        available_dates.append(updated_date_range)

                if sub_ranges['right'] is not None:
                    del applications[index]
                    get_and_update_diffs(sub_ranges['right'])

                return

    for avail_obj in total_availabilities:
        get_and_update_diffs(avail_obj)

    return available_dates
