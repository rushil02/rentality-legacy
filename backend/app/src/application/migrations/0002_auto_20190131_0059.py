# Generated by Django 2.0.4 on 2019-01-31 00:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('promotions', '0001_initial'),
        ('tenant', '0002_auto_20181122_1946'),
        ('billing', '0001_initial'),
        ('application', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='promotional_code',
            field=models.ManyToManyField(blank=True, to='promotions.PromotionalCode'),
        ),
        migrations.AddField(
            model_name='application',
            name='tenant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='tenant.TenantProfile'),
        ),
        migrations.AddField(
            model_name='accountdetail',
            name='application',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='application.Application'),
        ),
        migrations.AddField(
            model_name='accountdetail',
            name='fee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='billing.Fee'),
        ),
    ]
