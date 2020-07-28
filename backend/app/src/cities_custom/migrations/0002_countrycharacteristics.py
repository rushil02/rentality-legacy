# Generated by Django 2.2.10 on 2020-04-13 06:59

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


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
                ('bank_account_info', django.contrib.postgres.fields.jsonb.JSONField(help_text='Holds information required to create a bank account in the selected country.')),
                ('country', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.CITIES_COUNTRY_MODEL)),
            ],
        ),
    ]