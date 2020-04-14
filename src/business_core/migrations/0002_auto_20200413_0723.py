# Generated by Django 2.2.10 on 2020-04-13 07:23

from django.db import migrations


def create_default_cancellation_policies(apps, schema_editor):
    OldCancellationPolicy = apps.get_model('house', 'CancellationPolicy')
    CancellationPolicy = apps.get_model('business_core', 'CancellationPolicy')
    for policy in OldCancellationPolicy.objects.all():
        CancellationPolicy.objects.create(
            id=policy.id,
            code=policy.verbose.split(' ')[0].lower(),
            verbose=policy.verbose,
            description=policy.description,
            properties=policy.properties,
            behaviour='A',
            official_policy=policy.official_policy
        )


def create_legacy_business_config(apps, schema_editor):
    CancellationPolicy = apps.get_model('business_core', 'CancellationPolicy')
    can_policies = CancellationPolicy.objects.all()
    ConfigProfile = apps.get_model('business_core', 'ConfigProfile')
    ConfigLocationRestriction = apps.get_model('business_core', 'LocationRestriction')

    BusinessModelConfig = apps.get_model('business_core', 'BusinessModelConfiguration')
    prev_config = {
        "financial": {
            "attr": {"tenant_charge": 8, "homeowner_charge": 10}
        }, "constraints": {
            "attr": {"min_stay": 28, "max_buffer": 210, "min_buffer": 1, "bookings_buffer": 1}
        }
    }
    b_model = BusinessModelConfig.objects.create(
        id=1, verbose="Business Model Legacy", code="legacy", meta=prev_config,
        description="Placeholder BM Config for Legacy objects",
        constraints_model='A',
        behaviour='A',
        financial_model='A'
    )
    for can_policy in can_policies:
        b_model.cancellation_policies.add(can_policy)

    profile = ConfigProfile.objects.create(
        id=1,
        config=b_model,
        meta={}
    )

    ConfigLocationRestriction.objects.create(
        config_profile=profile
    )


def create_default_business_config(apps, schema_editor):
    CancellationPolicy = apps.get_model('business_core', 'CancellationPolicy')
    can_policies = CancellationPolicy.objects.all()

    BusinessModelConfig = apps.get_model('business_core', 'BusinessModelConfiguration')
    ConfigProfile = apps.get_model('business_core', 'ConfigProfile')
    ConfigLocationRestriction = apps.get_model('business_core', 'LocationRestriction')
    prev_config = {
        "financial": {
            "attr": {"tenant_charge": 0, "homeowner_charge": 8}
        }, "constraints": {
            "attr": {"min_stay": 28, "max_buffer": 210, "min_buffer": 4, "bookings_buffer": 1}
        }
    }
    b_model = BusinessModelConfig.objects.create(
        id=2, verbose="Business Model A", code="B1.C1.F1", meta=prev_config,
        description="Instant Booking \n Minimum 28 days \n No charge on Tenant",
        constraints_model='A',
        behaviour='A',
        financial_model='A'
    )

    for can_policy in can_policies:
        b_model.cancellation_policies.add(can_policy)

    profile = ConfigProfile.objects.create(
        id=2,
        config=b_model,
        meta={}
    )

    ConfigLocationRestriction.objects.create(
        config_profile=profile,
        active=True,
        default=True
    )


class Migration(migrations.Migration):
    dependencies = [
        ('business_core', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_cancellation_policies),
        migrations.RunPython(create_legacy_business_config),
        migrations.RunPython(create_default_business_config),
    ]
