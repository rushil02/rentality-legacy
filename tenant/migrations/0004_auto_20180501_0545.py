# Generated by Django 2.0.4 on 2018-05-01 05:45

import django.contrib.postgres.fields.ranges
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('tenant', '0003_auto_20180501_0350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='housepreference',
            name='move_in_date',
            field=django.contrib.postgres.fields.ranges.DateRangeField(blank=True, null=True,
                                                                       verbose_name='Move-in date range'),
        ),
        migrations.AlterField(
            model_name='housepreference',
            name='move_out_date',
            field=django.contrib.postgres.fields.ranges.DateRangeField(blank=True, null=True,
                                                                       verbose_name='Move-out date range'),
        ),
    ]
