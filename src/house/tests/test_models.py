from datetime import timedelta, date

from django.test import TestCase
from django.utils import timezone
from psycopg2._range import DateRange

from house.models import Availability
from .factories import AvailabilityFactory, HouseFactory


class AvailabilityModelTests(TestCase):
    maxDiff = None

    def test_add_overlapping_dates(self):
        test_dates = {
            'periodic': [
                DateRange(lower=timezone.now().date() + timedelta(days=30),
                          upper=timezone.now().date() + timedelta(days=130)),
                DateRange(lower=timezone.now().date() + timedelta(days=120),
                          upper=timezone.now().date() + timedelta(days=250)),
            ],
            'non-periodic': [
                DateRange(lower=timezone.now().date() + timedelta(days=200),
                          upper=timezone.now().date() + timedelta(days=350)),
                DateRange(lower=timezone.now().date() + timedelta(days=300),
                          upper=timezone.now().date() + timedelta(days=340)),
            ]
        }

        house = HouseFactory()
        new_dates = []
        for test_date in test_dates['periodic']:
            new_dates.append({'dates': test_date, 'periodic': True})

        for test_date in test_dates['non-periodic']:
            new_dates.append({'dates': test_date, 'periodic': False})

        Availability.objects.add_date_ranges(house=house, date_list=new_dates)
        expected_output = [
            (
                DateRange(lower=timezone.now().date() + timedelta(days=30),
                          upper=timezone.now().date() + timedelta(days=250)),
                True
            ), (  # FIXME: Dates are repetitive, although it doesn't matter to availability checker(s)
                DateRange(lower=timezone.now().date() + timedelta(days=30),
                          upper=timezone.now().date() + timedelta(days=350)),
                False
            )
        ]

        result = list(Availability.objects.filter(house=house).all().values_list('dates', 'periodic'))
        self.assertCountEqual(result, expected_output)

    def test_all_add_dates(self):
        test_dates = {
            'periodic': [
                DateRange(lower=timezone.now().date() + timedelta(days=30),
                          upper=timezone.now().date() + timedelta(days=130)),
                DateRange(lower=timezone.now().date() + timedelta(days=200),
                          upper=timezone.now().date() + timedelta(days=250)),
            ],
            'non-periodic': [
                DateRange(lower=timezone.now().date() + timedelta(days=200),
                          upper=timezone.now().date() + timedelta(days=300)),
                DateRange(lower=timezone.now().date() + timedelta(days=310),
                          upper=timezone.now().date() + timedelta(days=350)),
            ]
        }

        house = HouseFactory()

        new_dates = []
        for test_date in test_dates['periodic']:
            new_dates.append({'dates': test_date, 'periodic': True})

        for test_date in test_dates['non-periodic']:
            new_dates.append({'dates': test_date, 'periodic': False})

        Availability.objects.add_date_ranges(house=house, date_list=new_dates)

        expected_output = [
            (
                DateRange(lower=timezone.now().date() + timedelta(days=30),
                          upper=timezone.now().date() + timedelta(days=130)),
                True
            ), (
                DateRange(lower=timezone.now().date() + timedelta(days=200),
                          upper=timezone.now().date() + timedelta(days=250)),
                True
            ), (
                DateRange(lower=timezone.now().date() + timedelta(days=200),
                          upper=timezone.now().date() + timedelta(days=300)),
                False
            ), (
                DateRange(lower=timezone.now().date() + timedelta(days=310),
                          upper=timezone.now().date() + timedelta(days=350)),
                False
            ),
        ]

        result = list(Availability.objects.filter(house=house).all().values_list('dates', 'periodic'))
        self.assertCountEqual(result, expected_output)

    def test_simplify_periodic_dates(self):
        test_dates = {
            'periodic': [
                DateRange(lower=timezone.now().date() + timedelta(days=20),
                          upper=timezone.now().date() + timedelta(days=500)),
            ],
        }

        house = HouseFactory()

        new_dates = []

        for test_date in test_dates['periodic']:
            new_dates.append({'dates': test_date, 'periodic': True})

        Availability.objects.add_date_ranges(house=house, date_list=new_dates)

        curr_year = timezone.now().year
        expected_output = [
            (
                DateRange(lower=date(curr_year, 1, 1), upper=date(curr_year, 12, 31)),
                True
            )
        ]

        result = list(Availability.objects.filter(house=house).all().values_list('dates', 'periodic'))
        self.assertCountEqual(result, expected_output)
