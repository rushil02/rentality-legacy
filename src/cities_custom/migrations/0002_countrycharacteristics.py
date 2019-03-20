# Generated by Django 2.0.4 on 2019-03-18 15:18

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


def create_country_characteristics(apps, schema_editor):
    Country = apps.get_model('cities', 'Country')
    aus = Country.objects.get(code='AU')
    CountryCharacteristics = apps.get_model('cities_custom', 'CountryCharacteristics')
    conf = CountryCharacteristics(country=aus, bank_account_info={
        'fields': {
            'account_number': {
                'verbose': 'Account Number',
                'type': 'string',
                'regex': ''
            }
        }
    })
    conf.save()


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.CITIES_COUNTRY_MODEL),
        ('cities_custom', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CountryCharacteristics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bank_account_info', django.contrib.postgres.fields.jsonb.JSONField(
                    help_text='Holds information required to create a bank account in the selected country.')),
                ('country',
                 models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.CITIES_COUNTRY_MODEL)),
            ],
        ),
        migrations.RunPython(create_country_characteristics)
    ]
