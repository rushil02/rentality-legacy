from django.test import TestCase
from business_core.models import BusinessModelConfiguration
from cities.models import Continent, PostalCode, Country
# Create your tests here.

# FIXME: Stale tests !! Update required - model structures do not match

class DatabaseCheckTestCase(TestCase):
    """
    Test Case for migrations
    """
    fixtures = ['tests/fixtures/test_cities.json',]

    def test_business_configuration_is_not_null(self):
        business_confs_count = BusinessModelConfiguration.objects.all().count()
        self.assertEqual(business_confs_count, 1)
    
    def test_fixture_loaded(self):
        continent_count = Continent.objects.all().count()
        p_2602 = PostalCode.objects.filter(code="2602").count()
        self.assertEqual(continent_count, 7)
        self.assertEqual(p_2602, 7)


class BusinessConfigurationGetDefaultWithOneTestCase(TestCase):
    """
    Business Model Test for default data
    """
    fixtures = ['tests/fixtures/test_cities.json',]

    def test_filter(self):
        billing_location = Country.objects.get(code='AU')
        house_location = PostalCode.objects.get(id=22)
        filtered_business_confs = BusinessModelConfiguration.objects.get_valid_business_configs(billing_location, house_location).count()
        self.assertEqual(filtered_business_confs, 1)
    
    def test_priority(self):
        billing_location = Country.objects.get(code='AU')
        house_location = PostalCode.objects.get(id=22)
        business_conf = BusinessModelConfiguration.objects.get_location_default(billing_location, house_location)
        self.assertEqual(business_conf.id, 1)


class BusinessConfigurationGetDefaultWithMultipleTestCase(TestCase):
    """
    Business model edge cases test
    """
    fixtures = ['tests/fixtures/test_cities.json',]

    def setUp(self):
        aus = Country.objects.get(code='AU')
        b = BusinessModelConfiguration(
            id=2, verbose="Business Model ", code="model_B", meta={}, constraints_model='A', constraints_description="",
            behaviour='A', behaviour_description="", 
            active=True, default=True, home_owner_billing_location=aus
        )
        b.save()
        b = BusinessModelConfiguration(
            id=3, verbose="Business Model ", code="model_c", meta={}, constraints_model='A', constraints_description="",
            behaviour='A', behaviour_description="", 
            active=True, default=True, house_location=aus
        )
        b.save()
        b = BusinessModelConfiguration(
            id=4, verbose="Business Model ", code="model_d", meta={}, constraints_model='A', constraints_description="",
            behaviour='A', behaviour_description="", 
            active=True, default=True, house_location=aus, home_owner_billing_location=aus
        )
        b.save()
    
    def test_filter(self):
        billing_location = Country.objects.get(code='AU')
        house_location = PostalCode.objects.get(id=22)
        filtered_business_confs = BusinessModelConfiguration.objects.get_valid_business_configs(billing_location, house_location)
        for filtered_business_conf in filtered_business_confs:
            self.assertIn(filtered_business_conf.id, [1, 2, 3, 4])
        self.assertEqual(filtered_business_confs.count(), 4)
    
    def test_filter2(self):
        billing_location = Country.objects.get(code='CX')
        house_location = PostalCode.objects.get(id=22)
        filtered_business_confs = BusinessModelConfiguration.objects.get_valid_business_configs(billing_location, house_location)
        bcs = BusinessModelConfiguration.objects.all().count()
        for filtered_business_conf in filtered_business_confs:
            self.assertIn(filtered_business_conf.id, [1, 3])
            self.assertEqual(type(filtered_business_conf), BusinessModelConfiguration)
        self.assertEqual(filtered_business_confs.count(), 2)
    
    def test_priority(self):
        billing_location = Country.objects.get(code='AU')
        house_location = PostalCode.objects.get(id=22)
        business_conf = BusinessModelConfiguration.objects.get_location_default(billing_location, house_location)
        self.assertEqual(business_conf.id, 4)
    
    def test_priority2(self):
        billing_location = Country.objects.get(code='CX')
        house_location = PostalCode.objects.get(id=22)
        business_conf = BusinessModelConfiguration.objects.get_location_default(billing_location, house_location)
        self.assertEqual(business_conf.id, 3)
