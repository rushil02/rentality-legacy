from factory import django, SubFactory, fuzzy, RelatedFactory


class TenantProfileFactory(django.DjangoModelFactory):
    class Meta:
        model = 'tenant.TenantProfile'
        django_get_or_create = ('user',)

    user = SubFactory('user_custom.tests.factories.UserFactory')
