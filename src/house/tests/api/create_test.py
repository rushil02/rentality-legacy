from django.test import TestCase, RequestFactory
from django.contrib.auth import get_user_model
from house.views.api.create import FormOptionsView, HouseView
from house.models import House, HomeType

from rest_framework.test import APIRequestFactory, force_authenticate

import pprint

class DefaultTestData:
    @classmethod
    def create_test_user(cls):
        return get_user_model().objects.create_user(email='test@test.com', password='test@test.com')

    @classmethod
    def create_test_house_data(cls):
        HomeType.objects.update_or_create(id=1, name="Whole Apartment", defaults={'space_style': 'F'})
        HomeType.objects.update_or_create(id=2, name="Whole House", defaults={'space_style': 'F'})
        HomeType.objects.update_or_create(id=3, name="Room in Share-house with Private bathroom", defaults={'space_style': 'S'})
        HomeType.objects.update_or_create(id=4, name="Room in Share-house with Shared bathroom", defaults={'space_style': 'S'})
        HomeType.objects.update_or_create(id=5, name="Student Accommodation", defaults={'space_style': 'S'})
        HomeType.objects.update_or_create(id=6, name="Home Stay", defaults={'space_style': 'S'})
        HomeType.objects.update_or_create(id=7, name="Granny Flat", defaults={'space_style': 'S'})


class GetFormOptionsTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = DefaultTestData.create_test_user()
        DefaultTestData.create_test_house_data()
    
    def test_get_form_details(self):
        # Create an instance of a GET request.
        request = self.factory.get('')
        force_authenticate(request, user=self.user)

        response = FormOptionsView.as_view()(request)
        self.assertEqual(len(response.data['field_options']['furnished']), len(House.FURNISHED_OPTIONS))
        self.assertEqual(len(response.data['field_options']['home_type']), 7)
        self.assertEqual(response.status_code, 200)


class CreateHouseTest(TestCase):
    fixtures = ['tests/fixtures/test_cities.json',]

    test_cases = [
        {
            "data": {
                "title": "Test House",
                "location": 22    
            },
            "status_code": 200
        },
        {
            "data": {
                "title": "Test House",
                "location": 22,
                "home_type": 1    
            },
            "status_code": 200
        },
        {
            "data": {
                "title": "Test House",    
            },
            "status_code": 400
        },
    ]

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = DefaultTestData.create_test_user()
        DefaultTestData.create_test_house_data()
    
    def test_create_house(self):
        for test_case in self.test_cases:
            request = self.factory.post('', test_case['data'])
            force_authenticate(request, user=self.user)

            response = HouseView.as_view()(request)

            self.assertEqual(response.status_code, test_case["status_code"])
    
    def test_home_owner_and_business_conf(self):
        data = {
            "title": "Test House",
            "location": 22    
        }
        request = self.factory.post('', data)
        force_authenticate(request, user=self.user)
        response = HouseView.as_view()(request)
        uuid = response.data['uuid']
        house = House.objects.get(uuid=uuid)
        self.assertEqual(house.home_owner.user, self.user)
        self.assertIsNotNone(house.business_config)
        self.assertEqual(house.business_config.id, 1)

