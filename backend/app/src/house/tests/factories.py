from factory import django, SubFactory, fuzzy, RelatedFactory


class HouseFactory(django.DjangoModelFactory):
    class Meta:
        model = 'house.House'
        django_get_or_create = ('home_owner', )

    home_owner = SubFactory('home_owner.tests.factories.HomeOwnerProfileFactory', houses=None)


class AvailabilityFactory(django.DjangoModelFactory):
    class Meta:
        model = 'house.Availability'

    house = SubFactory('house.tests.factories.HouseFactory')
    periodic = fuzzy.FuzzyChoice([True, False])
