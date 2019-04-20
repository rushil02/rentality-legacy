# Generated by Django 2.0.4 on 2019-03-20 00:51

from django.db import migrations, models
import django.db.models.deletion
from utils.model_utils import next_ref_code


# FIXME: Update LedgerRecord manually


def migrate_billing_data(apps, schema_editor):
    PaymentGatewayTransaction = apps.get_model('financials', 'PaymentGatewayTransaction')
    PaymentGateway = apps.get_model('payment_gateway', 'PaymentGateway')
    Order = apps.get_model('billing', 'Order')
    orders = Order.objects.all()
    ref_code = 'AA0001'
    stripe = PaymentGateway.objects.get(id=1)

    for order in orders:
        PaymentGatewayTransaction.objects.create(
            ref_code=ref_code,
            transaction_type='DC',
            transaction_id=order.charge_id,
            amount=order.application.accountdetail.meta['source_amount'],
            application=order.application,
            payment_gateway=stripe,
            user_account=order.application.tenant.user.account_set.all()[0]
        )
        ref_code = next_ref_code(ref_code) #FIXME
    # FIXME: create time not captured


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_custom', '0006_auto_20190418_1113'),
        ('payment_gateway', '0001_initial'),
        ('application', '0002_auto_20190131_0059'),
    ]

    operations = [
        migrations.CreateModel(
            name='LedgerRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ref_code', models.CharField(blank=True, max_length=20, unique=True)),
                ('description', models.TextField()),
                ('payment_type', models.CharField(choices=[('Cr', 'Credit'), ('De', 'Debit')], max_length=2)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=15)),
                ('create_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentGatewayTransaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ref_code', models.CharField(blank=True, max_length=20, unique=True)),
                ('transaction_type', models.CharField(max_length=2)),
                ('transaction_id', models.TextField()),
                ('amount', models.DecimalField(decimal_places=2, max_digits=15)),
                ('create_time', models.DateTimeField(auto_now_add=True)),
                ('application', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='application.Application')),
                ('payment_gateway', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='payment_gateway.PaymentGateway')),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='user_custom.Account')),
            ],
        ),
        migrations.AddField(
            model_name='ledgerrecord',
            name='pg_transaction',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='financials.PaymentGatewayTransaction', verbose_name='Payment Gateway Transaction'),
        ),
        migrations.RunPython(migrate_billing_data)
    ]
