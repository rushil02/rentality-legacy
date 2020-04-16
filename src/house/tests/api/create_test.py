from django.test import TestCase
from django.contrib.auth import get_user_model
from house.views.api.create import FormOptionsView, HouseView, FacilityListView, HouseRuleListCreateView, \
    HouseRuleListView
from house.models import House, HomeType, Facility, Rule, HouseRule

from rest_framework.test import APIRequestFactory, force_authenticate


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
    
    @classmethod
    def create_house_rule(cls):
        RULES = {
            'Smoking': ('Acceptable', 'Not Acceptable', 'Other'),
            'Pets': ('Acceptable', 'Not Acceptable', 'Other'),
            'Parties & Events': ('Acceptable', 'Not Acceptable', 'Other'),
            'Suitable for Children': ('Yes', 'No', 'Other'),
            'Arrival Time': ('Flexible', 'Other')
        }

        for rule in RULES:
            Rule.objects.update_or_create(verbose=rule, defaults={'options': RULES[rule]})


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
    fixtures = ['tests/fixtures/test_cities.json', ]

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

    def test_read_house(self):
        data = {
            "title": "Test House",
            "location": 22    
        }
        request = self.factory.post('', data)
        force_authenticate(request, user=self.user)
        response = HouseView.as_view()(request)
        uuid = response.data['uuid']
        house = House.objects.get(uuid=uuid)

        get_request = self.factory.get('')
        force_authenticate(get_request, user=self.user)
        response = HouseView.as_view()(get_request, house_uuid=uuid)
        self.assertEqual(response.data['uuid'], uuid)
    
    def test_edit_house(self):
        data = {
            "title": "Test House",
            "location": 22    
        }
        request = self.factory.post('', data)
        force_authenticate(request, user=self.user)
        response = HouseView.as_view()(request)
        uuid = response.data['uuid']
        house = House.objects.get(uuid=uuid)

        data = {
            "title": "Testing",
            "location": 22
        }

        patch_request = self.factory.patch('', data)
        force_authenticate(patch_request, user=self.user)
        response = HouseView.as_view()(patch_request, house_uuid=uuid)
        self.assertEqual(response.data['title'], "Testing")

        get_request = self.factory.get('')
        force_authenticate(get_request, user=self.user)
        response = HouseView.as_view()(get_request, house_uuid=uuid)
        self.assertEqual(response.data['title'], "Testing")


class FacilityTestCase(TestCase):
    fixtures = ['tests/fixtures/test_cities.json',]

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = DefaultTestData.create_test_user()
        DefaultTestData.create_test_house_data()
        Facility.objects.create(id=1, verbose='A', system_default=True)
        Facility.objects.create(id=2, verbose='B', system_default=True)
        Facility.objects.create(id=3, verbose='C', system_default=False)
    
    def create_house(self):
        data = {
            "title": "Test House",
            "location": 22    
        }
        request = self.factory.post('', data)
        force_authenticate(request, user=self.user)
        response = HouseView.as_view()(request)
        self.uuid = response.data['uuid']
   
    def test_facility_get(self):
        self.create_house()
        get_request = self.factory.get('')
        force_authenticate(get_request, user=self.user)
        response = FacilityListView.as_view()(get_request, house_uuid=self.uuid)
        self.assertEqual(len(response.data), 2)
    
    def test_add_facilities(self):
        self.create_house()
        data = [
            {
                "verbose": "E",
                "checked": True,
                "id": None
            },
        ]
        post_request = self.factory.post('', data, format='json')
        force_authenticate(post_request, user=self.user)
        response = FacilityListView.as_view()(post_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 201)
        house = House.objects.get(uuid=self.uuid)
        self.assertEqual(house.facilities.all().count(), 1)
        self.assertEqual(Facility.objects.all().count(), 4)

        data = [
            {
                "verbose": "F",
                "checked": False,
                "id": None
            },
        ]
        post_request = self.factory.post('', data, format='json')
        force_authenticate(post_request, user=self.user)
        response = FacilityListView.as_view()(post_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(house.facilities.all().count(), 1)
        self.assertEqual(Facility.objects.all().count(), 4)

        data = [
            {
                "verbose": "E",
                "checked": False,
                "id": None
            },
        ]
        post_request = self.factory.post('', data, format='json')
        force_authenticate(post_request, user=self.user)
        response = FacilityListView.as_view()(post_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(house.facilities.all().count(), 0)
        self.assertEqual(Facility.objects.all().count(), 4)

        data = [
            {
                "verbose": "A",
                "id": 1,
                "checked": False    
            },
        ]
        post_request = self.factory.post('', data, format='json')
        force_authenticate(post_request, user=self.user)
        response = FacilityListView.as_view()(post_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(house.facilities.all().count(), 0)
        self.assertEqual(Facility.objects.all().count(), 4)

        data = [
            {
                "verbose": "A",
                "id": 1,
                "checked": True    
            },
            {
                "verbose": "F",
                "checked": True,
                "id": None
            },
        ]
        post_request = self.factory.post('', data, format='json')
        force_authenticate(post_request, user=self.user)
        response = FacilityListView.as_view()(post_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(house.facilities.all().count(), 2)
        self.assertEqual(Facility.objects.all().count(), 5)

        data = [
            {
                "verbose": "A",
                "id": 10,
                "checked": True    
            }
        ]
        post_request = self.factory.post('', data, format='json')
        force_authenticate(post_request, user=self.user)
        response = FacilityListView.as_view()(post_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 400)


class EditHouseRulesTestCase(TestCase):
    fixtures = ['tests/fixtures/test_cities.json',]

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = DefaultTestData.create_test_user()
        DefaultTestData.create_house_rule()
    
    def create_house(self):
        data = {
            "title": "Test House",
            "location": 22    
        }
        request = self.factory.post('', data)
        force_authenticate(request, user=self.user)
        response = HouseView.as_view()(request)
        self.uuid = response.data['uuid']
    
    def test_edit_rules(self):
        self.create_house()
        get_request = self.factory.get('')
        force_authenticate(get_request, user=self.user)
        response = HouseRuleListCreateView.as_view()(get_request, house_uuid=self.uuid)
        self.assertEqual(len(response.data), 5)

        data = [
        ]
        put_request = self.factory.put('', data, format='json')
        force_authenticate(put_request, user=self.user)
        response = HouseRuleListCreateView.as_view()(put_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(HouseRule.objects.filter(house__uuid=self.uuid).count(), 5)

        data = [
            {
                "id": 29999,
                "value": "Other"
            }
        ]
        put_request = self.factory.put('', data, format='json')
        force_authenticate(put_request, user=self.user)
        response = HouseRuleListCreateView.as_view()(put_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(HouseRule.objects.filter(house__uuid=self.uuid).count(), 5)

        data = [
            {
                "value": "Other"
            }
        ]
        put_request = self.factory.put('', data, format='json')
        force_authenticate(put_request, user=self.user)
        response = HouseRuleListCreateView.as_view()(put_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(HouseRule.objects.filter(house__uuid=self.uuid).count(), 5)

        rule = HouseRule.objects.get(house__uuid=self.uuid, rule__verbose="Smoking")

        data = [
            {
                "id": rule.id,
                "value": "Other"
            }
        ]
        put_request = self.factory.put('', data, format='json')
        force_authenticate(put_request, user=self.user)
        response = HouseRuleListCreateView.as_view()(put_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(HouseRule.objects.filter(house__uuid=self.uuid).count(), 5)
        self.assertEqual(HouseRule.objects.get(id=rule.id).value, "Other")

        rule1 = HouseRule.objects.get(house__uuid=self.uuid, rule__verbose="Smoking")
        rule2 = HouseRule.objects.get(house__uuid=self.uuid, rule__verbose="Pets")
        data = [
            {
                "id": rule1.id,
                "value": "Not Acceptable"
            }, 
            {
                "id": rule2.id,
                "value": "Not Acceptable"
            }
        ]
        put_request = self.factory.put('', data, format='json')
        force_authenticate(put_request, user=self.user)
        response = HouseRuleListCreateView.as_view()(put_request, house_uuid=self.uuid)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(HouseRule.objects.filter(house__uuid=self.uuid).count(), 5)
        self.assertEqual(HouseRule.objects.get(id=rule1.id).value, "Not Acceptable")
        self.assertEqual(HouseRule.objects.get(id=rule2.id).value, "Not Acceptable")
