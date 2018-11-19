# Generated by Django 2.0.4 on 2018-11-19 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tenant_charge', models.DecimalField(decimal_places=2, max_digits=5)),
                ('home_owner_charge', models.DecimalField(decimal_places=2, max_digits=5)),
                ('GST', models.DecimalField(decimal_places=2, max_digits=5)),
                ('active', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('charge_id', models.CharField(max_length=64)),
            ],
        ),
    ]
