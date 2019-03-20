# Generated by Django 2.0.4 on 2019-03-20 00:21

from django.db import migrations, models
import django.db.models.deletion


def migrate_cancellation_policy(apps, schema_editor):
    # FIXME: @pranav migrate cancellation policies here
    # Old field cancellation_policy; new field can_policy; set new field to old value by pk!
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('business_core', '0001_initial'),
        ('house', '0006_auto_20190219_0952'),
    ]

    operations = [
        migrations.AddField(
            model_name='house',
            name='business_config',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='business_core.BusinessModelConfiguration'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='house',
            name='can_policy',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='business_core.CancellationPolicy'),
        ),
        migrations.AlterField(
            model_name='house',
            name='location',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='cities.PostalCode', verbose_name='location'),
            preserve_default=False,
        ),

        migrations.RunPython(migrate_cancellation_policy),

        migrations.RemoveField(
            model_name='cancellationpolicy',
            name='official_policy',
        ),
        migrations.RemoveField(
            model_name='house',
            name='cancellation_policy',
        ),
        migrations.DeleteModel(
            name='CancellationPolicy',
        ),
        migrations.RenameField(
            model_name='house',
            old_name='can_policy',
            new_name='cancellation_policy',
        ),
    ]
