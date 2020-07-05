from factory import django, SubFactory, RelatedFactory


class HomeOwnerProfileFactory(django.DjangoModelFactory):
    class Meta:
        model = 'home_owner.HomeOwnerProfile'
        django_get_or_create = ('user', )

    user = SubFactory('user_custom.tests.factories.UserFactory')
    houses = RelatedFactory('house.tests.factories.HouseFactory', 'home_owner')

