from factory import django, SubFactory, fuzzy, RelatedFactory


class ApplicationFactory(django.DjangoModelFactory):
    class Meta:
        model = 'application.Application'
        django_get_or_create = ('tenant', 'house')

    house = SubFactory('house.tests.factories.HouseFactory')
    tenant = SubFactory('tenant.tests.factories.TenantProfileFactory')
    rent = fuzzy.FuzzyInteger(10000)
