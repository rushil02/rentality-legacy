# Generated by Django 2.0.4 on 2019-03-19 12:46

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


def create_default_cancellation_policies(apps, schema_editor):
    OldCancellationPolicy = apps.get_model('house', 'CancellationPolicy')
    CancellationPolicy = apps.get_model('business_core', 'CancellationPolicy')
    for i in range(1, 4):
        try:
            old = OldCancellationPolicy.objects.get(id=i)
            CancellationPolicy.objects.create(
                id=i, 
                verbose=old.verbose, 
                description=old.description, 
                properties=old.properties, 
                behaviour='A',  # FIXME
                official_policy=old.official_policy
            )
        except OldCancellationPolicy.DoesNotExist:
            pass


def create_default_business_config(apps, schema_editor):
    CancellationPolicy = apps.get_model('business_core', 'CancellationPolicy')
    can_policies = CancellationPolicy.objects.filter(id__in=[1, 2, 3])

    BusinessModelConfig = apps.get_model('business_core', 'BusinessModelConfiguration')
    b_model = BusinessModelConfig.objects.create(
        id=1, verbose="Business Model A", code="model_A", meta={}, constraints_model='A', constraints_description="",
        behaviour='A', behaviour_description="", active=True, default=True
    )
    for can_policy in can_policies:
        b_model.cancellation_policies.add(can_policy)


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.CITIES_COUNTRY_MODEL),
        ('essentials', '0003_auto_20190205_2156'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('house', '0006_auto_20190219_0952')  # Required for creation of Cancellation Policy
    ]

    operations = [
        migrations.CreateModel(
            name='BusinessModelConfiguration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verbose', models.CharField(max_length=50)),
                ('code', models.CharField(help_text='Verbose identifier used internally', max_length=10, unique=True)),
                ('meta', django.contrib.postgres.fields.jsonb.JSONField()),
                ('constraints_model', models.CharField(choices=[('A', 'Business Constraints A')],
                                                       help_text='Defines constraints unique to business model',
                                                       max_length=1)),
                ('constraints_description', models.TextField(help_text='This will be shown to the user.')),
                ('behaviour', models.CharField(choices=[('A', 'Business Constraints A')],
                                               help_text='Defines behaviours unique to business model', max_length=1)),
                ('behaviour_description', models.TextField(help_text='This will be shown to the user.')),
                ('house_location_id', models.PositiveIntegerField(blank=True, null=True)),
                ('active', models.BooleanField(default=False)),
                ('default', models.BooleanField(default=False)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='CancellationPolicy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verbose', models.TextField(verbose_name='Policy Name')),
                ('description', models.TextField()),
                ('properties', django.contrib.postgres.fields.jsonb.JSONField()),
                ('behaviour', models.CharField(choices=[('A', 'Cancellation behaviour A')], max_length=1)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('official_policy',
                 models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT,
                                   related_name='cancellation_policies', to='essentials.Policy')),
            ],
        ),
        migrations.AddField(
            model_name='businessmodelconfiguration',
            name='cancellation_policies',
            field=models.ManyToManyField(to='business_core.CancellationPolicy'),
        ),
        migrations.AddField(
            model_name='businessmodelconfiguration',
            name='home_owner_billing_location',
            field=models.ForeignKey(blank=True,
                                    help_text="Select country to constraint this configuration to the Home Owner's Bank account location.",
                                    null=True, on_delete=django.db.models.deletion.PROTECT,
                                    to=settings.CITIES_COUNTRY_MODEL),
        ),
        migrations.AddField(
            model_name='businessmodelconfiguration',
            name='house_location_type',
            field=models.ForeignKey(blank=True,
                                    limit_choices_to=models.Q(models.Q(('app_label', 'cities'), ('model', 'country')),
                                                              models.Q(('app_label', 'cities'), ('model', 'region')),
                                                              models.Q(('app_label', 'cities'), ('model', 'city')),
                                                              _connector='OR'), null=True,
                                    on_delete=django.db.models.deletion.PROTECT, to='contenttypes.ContentType'),
        ),
        migrations.RunPython(create_default_cancellation_policies),
        migrations.RunPython(create_default_business_config),
    ]
