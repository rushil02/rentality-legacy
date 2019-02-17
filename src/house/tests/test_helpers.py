from datetime import timedelta, date

from django.test import TestCase
from django.utils import timezone
from psycopg2._range import DateRange

from application.tests.factories import ApplicationFactory
from house.helpers import get_available_dates
from .factories import AvailabilityFactory, HouseFactory


class AvailabilityGetTests(TestCase):
    maxDiff = None

    def test_get_simple(self):
        test_dates = [
            DateRange(lower=timezone.now().date() + timedelta(days=10),
                      upper=timezone.now().date() + timedelta(days=50)),
            DateRange(lower=timezone.now().date() + timedelta(days=55),
                      upper=timezone.now().date() + timedelta(days=85))
        ]

        house = HouseFactory.create()
        for test_date in test_dates:
            AvailabilityFactory(house=house, dates=test_date, periodic=False)

        self.assertListEqual(test_dates, get_available_dates(house))

    def test_get_periodic(self):
        today = timezone.now().date()
        new_years_diff = (today - date(day=1, month=1, year=today.year)).days
        test_dates = [
            DateRange(lower=timezone.now().date() - timedelta(days=new_years_diff + 10),
                      upper=timezone.now().date() + timedelta(days=50))
        ]

        lower = timezone.now().date() - timedelta(days=new_years_diff + 10)
        upper = timezone.now().date() + timedelta(days=50)
        expected_output = [
            DateRange(lower=timezone.now().date(),
                      upper=upper),
            DateRange(lower=lower.replace(year=lower.year + 1),
                      upper=upper.replace(year=upper.year + 1)),
        ]

        house = HouseFactory.create()
        for test_date in test_dates:
            AvailabilityFactory(house=house, dates=test_date, periodic=True)

        result = get_available_dates(house, from_year=today.year, till_year=today.year)
        self.assertListEqual(expected_output, result)

    def test_availability_collisions(self):
        test_dates = {
            'periodic': [
                DateRange(lower=timezone.now().date() + timedelta(days=30),
                          upper=timezone.now().date() + timedelta(days=130)),
                DateRange(lower=timezone.now().date() + timedelta(days=120),
                          upper=timezone.now().date() + timedelta(days=250)),
            ],
            'non-periodic': [
                DateRange(lower=timezone.now().date() + timedelta(days=200),
                          upper=timezone.now().date() + timedelta(days=280)),
                DateRange(lower=timezone.now().date() + timedelta(days=300),
                          upper=timezone.now().date() + timedelta(days=340)),
            ]
        }

        expected_output = [
            DateRange(lower=timezone.now().date() + timedelta(days=30),
                      upper=timezone.now().date() + timedelta(days=280)),
            DateRange(lower=timezone.now().date() + timedelta(days=300),
                      upper=timezone.now().date() + timedelta(days=340)),
        ]

        house = HouseFactory.create()
        for test_date in test_dates['periodic']:
            AvailabilityFactory(house=house, dates=test_date, periodic=True)

        for test_date in test_dates['non-periodic']:
            AvailabilityFactory(house=house, dates=test_date, periodic=False)

        today = timezone.now().date()
        result = get_available_dates(house, from_year=today.year, till_year=today.year)
        self.assertListEqual(expected_output, result)

    def test_filter_past_dates(self):
        test_dates = [
            DateRange(lower=timezone.now().date() - timedelta(days=10),
                      upper=timezone.now().date() + timedelta(days=50)),
            DateRange(lower=timezone.now().date() - timedelta(days=85),
                      upper=timezone.now().date() - timedelta(days=55)),
            DateRange(lower=timezone.now().date() + timedelta(days=55),
                      upper=timezone.now().date() + timedelta(days=85))
        ]

        expected_output = [
            DateRange(lower=timezone.now().date(),
                      upper=timezone.now().date() + timedelta(days=50)),
            DateRange(lower=timezone.now().date() + timedelta(days=55),
                      upper=timezone.now().date() + timedelta(days=85))
        ]

        house = HouseFactory.create()
        for test_date in test_dates:
            AvailabilityFactory(house=house, dates=test_date, periodic=False)

        result = get_available_dates(house)

        self.assertListEqual(expected_output, result)

    def test_filter_short_dates(self):
        test_dates = [
            DateRange(lower=timezone.now().date() + timedelta(days=10),
                      upper=timezone.now().date() + timedelta(days=12)),
            DateRange(lower=timezone.now().date() + timedelta(days=55),
                      upper=timezone.now().date() + timedelta(days=85))
        ]

        # FIXME: set common Min days (booking length)
        expected_output = [x for x in test_dates if (x.upper - x.lower).days >= 28]

        house = HouseFactory.create()
        for test_date in test_dates:
            AvailabilityFactory(house=house, dates=test_date, periodic=False)

        result = get_available_dates(house)
        self.assertListEqual(expected_output, result)

    def test_simple_applied_dates_exclusion(self):
        test_dates = {
            'availabilities': [
                DateRange(lower=timezone.now().date() + timedelta(days=10),
                          upper=timezone.now().date() + timedelta(days=90)),
            ],
            'applications': [
                DateRange(lower=timezone.now().date() - timedelta(days=6),
                          upper=timezone.now().date() + timedelta(days=30)),
            ]
        }

        expected_output = [
            DateRange(lower=timezone.now().date() + timedelta(days=30),
                      upper=timezone.now().date() + timedelta(days=90)),
        ]

        house = HouseFactory.create()
        for test_date in test_dates['availabilities']:
            AvailabilityFactory(house=house, dates=test_date, periodic=False)

        for test_date in test_dates['applications']:
            ApplicationFactory(house=house, date=test_date)

        result = get_available_dates(house)
        self.assertListEqual(expected_output, result)

    def test_complex_applied_dates_exclusion(self):
        test_dates = {
            'availabilities': [
                DateRange(lower=timezone.now().date() - timedelta(days=10),
                          upper=timezone.now().date() + timedelta(days=50)),
                DateRange(lower=timezone.now().date() + timedelta(days=55),
                          upper=timezone.now().date() + timedelta(days=100)),
            ],
            'applications': [
                DateRange(lower=timezone.now().date() - timedelta(days=20),
                          upper=timezone.now().date() + timedelta(days=15)),
                DateRange(lower=timezone.now().date() + timedelta(days=45),
                          upper=timezone.now().date() + timedelta(days=60)),
                DateRange(lower=timezone.now().date() + timedelta(days=95),
                          upper=timezone.now().date() + timedelta(days=120)),
            ]
        }

        expected_output = [
            DateRange(lower=timezone.now().date() + timedelta(days=15),
                      upper=timezone.now().date() + timedelta(days=45)),
            DateRange(lower=timezone.now().date() + timedelta(days=60),
                      upper=timezone.now().date() + timedelta(days=95)),
        ]

        house = HouseFactory.create()
        for test_date in test_dates['availabilities']:
            AvailabilityFactory(house=house, dates=test_date, periodic=False)
        for test_date in test_dates['applications']:
            ApplicationFactory(house=house, date=test_date)
        result = get_available_dates(house)
        self.assertListEqual(expected_output, result)

    def test_all(self):
        test_dates = {
            'availabilities': {
                'periodic': [
                    DateRange(lower=timezone.now().date() + timedelta(days=600),
                              upper=timezone.now().date() + timedelta(days=700)),
                    DateRange(lower=timezone.now().date() + timedelta(days=630),
                              upper=timezone.now().date() + timedelta(days=680)),
                ],
                'non-periodic': [
                    DateRange(lower=timezone.now().date() - timedelta(days=10),
                              upper=timezone.now().date() + timedelta(days=500)),
                    DateRange(lower=timezone.now().date() + timedelta(days=480),
                              upper=timezone.now().date() + timedelta(days=540)),
                ]},
            'applications': [
                DateRange(lower=timezone.now().date() - timedelta(days=20),
                          upper=timezone.now().date() + timedelta(days=15)),
                DateRange(lower=timezone.now().date() + timedelta(days=110),
                          upper=timezone.now().date() + timedelta(days=140)),
                DateRange(lower=timezone.now().date() + timedelta(days=220),
                          upper=timezone.now().date() + timedelta(days=250)),
                DateRange(lower=timezone.now().date() + timedelta(days=310),
                          upper=timezone.now().date() + timedelta(days=350)),
                DateRange(lower=timezone.now().date() + timedelta(days=370),
                          upper=timezone.now().date() + timedelta(days=400)),
                DateRange(lower=timezone.now().date() + timedelta(days=460),
                          upper=timezone.now().date() + timedelta(days=550)),
                DateRange(lower=timezone.now().date() + timedelta(days=630),
                          upper=timezone.now().date() + timedelta(days=670)),
                DateRange(lower=timezone.now().date() + timedelta(days=730),
                          upper=timezone.now().date() + timedelta(days=800)),
            ]
        }

        expected_output = [
            DateRange(lower=timezone.now().date() + timedelta(days=15),
                      upper=timezone.now().date() + timedelta(days=110)),
            DateRange(lower=timezone.now().date() + timedelta(days=140),
                      upper=timezone.now().date() + timedelta(days=220)),
            DateRange(lower=timezone.now().date() + timedelta(days=250),
                      upper=timezone.now().date() + timedelta(days=310)),
            DateRange(lower=timezone.now().date() + timedelta(days=400),
                      upper=timezone.now().date() + timedelta(days=460)),
            DateRange(lower=timezone.now().date() + timedelta(days=600),
                      upper=timezone.now().date() + timedelta(days=630)),
            DateRange(lower=timezone.now().date() + timedelta(days=670),
                      upper=timezone.now().date() + timedelta(days=700)),
        ]

        house = HouseFactory.create()
        for test_date in test_dates['availabilities']['non-periodic']:
            print(test_date)
            AvailabilityFactory(house=house, dates=test_date, periodic=False)

        print("-" * 100)
        for test_date in test_dates['availabilities']['periodic']:
            print(test_date)
            AvailabilityFactory(house=house, dates=test_date, periodic=True)

        print("-" * 100)
        for test_date in test_dates['applications']:
            print(test_date)
            ApplicationFactory(house=house, date=test_date)

        curr_year = timezone.now().date().year
        result = get_available_dates(house, from_year=curr_year, till_year=curr_year + 1)

        print('=' * 100)
        for r in result:
            print(r)
        print('*' * 100)

        for r in expected_output:
            print(r)
        self.assertListEqual(expected_output, result)
