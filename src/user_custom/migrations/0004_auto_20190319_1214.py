# Generated by Django 2.0.4 on 2019-03-19 12:14

from django.conf import settings
from django.db import migrations, models
from django.core.exceptions import ObjectDoesNotExist
import django.utils.timezone


def add_user_accounts_with_stripe(apps, schema_editor):
    PaymentGateway = apps.get_model('payment_gateway', 'PaymentGateway')
    User = apps.get_model('user_custom', 'User')
    Account = apps.get_model('user_custom', 'Account')

    stripe = PaymentGateway.objects.get(name='Stripe', code='stripe')
    users = User.objects.all()
    for user in users:
        try:
            account = user.account_set.get(payment_gateway=stripe)
            details = dict()
            if account.details.get('customer_id'):
                details['customer_id'] = account.details.get('customer_id')
            elif user.tenant.customer_id:
                details['customer_id'] = user.tenant.customer_id
            if account.details.get('account_id'):
                details['account_id'] = account.details.get('account_id')
            elif user.home_owner.account_id:
                details['account_id'] = user.home_owner.account_id
            account.details = details
            account.save()
        except ObjectDoesNotExist:
            details = dict()
            account = Account(user=user, payment_gateway=stripe)
            if user.tenant.customer_id:
                details['customer_id'] = user.tenant.customer_id
            if user.home_owner.account_id:
                details['account_id'] = user.home_owner.account_id
            account.details = details
            account.save()


class Migration(migrations.Migration):
    dependencies = [
        ('cities', '0011_auto_20180108_0706'),
        migrations.swappable_dependency(settings.CITIES_COUNTRY_MODEL),
        ('user_custom', '0003_auto_20190131_0834'),
        ('payment_gateway', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='create_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='account_type',
            field=models.CharField(choices=[('B', 'Business'), ('I', 'Individual')], default='I', max_length=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='billing_country',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT,
                                    to=settings.CITIES_COUNTRY_MODEL),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='billing_postcode',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT,
                                    to='cities.PostalCode'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='billing_street_address',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='payment_gateway',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='payment_gateway.PaymentGateway'),
        ),
        migrations.RunPython(add_user_accounts_with_stripe),
    ]
