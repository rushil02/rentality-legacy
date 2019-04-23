from django.test import TestCase

from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth import get_user_model

from house.views.api import RulesView
from house.models import Rule


class DefaultTestData:
    @classmethod
    def create_test_user(cls):
        return get_user_model().objects.create_user(email='test@test.com', password='test@test.com')
    
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


class GetRulesTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = DefaultTestData.create_test_user()
        DefaultTestData.create_house_rule()
    
    def test_get_rules(self):
        # Create an instance of a GET request.
        request = self.factory.get('')
        force_authenticate(request, user=self.user)

        response = RulesView.as_view()(request)
        self.assertEqual(len(response.data), 5)
        self.assertEqual(response.status_code, 200)