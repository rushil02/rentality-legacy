# Generated by Django 2.0.4 on 2018-11-19 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tenant', '0001_initial'),
        ('home_owner', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='homeownerprofile',
            name='shortlist',
            field=models.ManyToManyField(blank=True, to='tenant.HousePreference'),
        ),
    ]
