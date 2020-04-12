# Generated by Django 2.2.10 on 2020-04-11 08:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0003_remove_accountdetail_fee'),
        ('billing', '0004_paymentgateway'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Fee',
        ),
        migrations.RemoveField(
            model_name='order',
            name='application',
        ),
        migrations.DeleteModel(
            name='PaymentGateway',
        ),
        migrations.DeleteModel(
            name='Order',
        ),
    ]
