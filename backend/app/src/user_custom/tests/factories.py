from factory import django, RelatedFactory, Sequence


class UserFactory(django.DjangoModelFactory):
    class Meta:
        model = 'user_custom.User'
        django_get_or_create = ('email', )

    email = Sequence(lambda n: 'test_user_%s@rentality-test.com' % n)
    # home_owner_profile = RelatedFactory('home_owner.tests.factories.HomeOwnerProfileFactory', 'user')
    # tenant_profile = RelatedFactory('tenant.tests.factories.TenantProfileFactory', 'user')


