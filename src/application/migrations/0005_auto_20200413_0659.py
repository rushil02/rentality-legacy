# Generated by Django 2.2.10 on 2020-04-13 06:59

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0004_auto_20200413_0659'),
        ('payment_gateway', '0002_auto_20200413_0754'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountdetail',
            name='payment_gateway',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='payment_gateway.PaymentGateway'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='accountdetail',
            name='home_owner',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='accountdetail',
            name='meta',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='accountdetail',
            name='tenant',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='application',
            name='house_meta',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, help_text='Frozen information of house', null=True),
        ),
        migrations.AlterField(
            model_name='application',
            name='meta',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, help_text='Additional details provided in regards to the application', null=True),
        ),
        migrations.AlterField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('I', 'Incomplete'), ('P', 'Pending'), ('L', 'Pending Locked'), ('A', 'Accepted'), ('D', 'Declined'), ('E', 'Error'), ('B', 'Booked'), ('C', 'Cancelled'), ('O', 'In-Effect/In-Stay'), ('Z', 'Complete'), ('X', 'In-Dispute'), ('F', 'In-Dispute Locked'), ('R', 'Dispute Resolved')], max_length=1),
        ),
        migrations.AlterField(
            model_name='application',
            name='tenant_meta',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, help_text='Additional details provided by the tenant', null=True),
        ),
        migrations.AlterField(
            model_name='applicationstate',
            name='actor',
            field=models.CharField(choices=[('T', 'Tenant'), ('H', 'Homeowner'), ('A', 'Staff'), ('S', 'System')], max_length=1),
        ),
        migrations.AlterField(
            model_name='applicationstate',
            name='new_state',
            field=models.CharField(choices=[('I', 'Incomplete'), ('P', 'Pending'), ('L', 'Pending Locked'), ('A', 'Accepted'), ('D', 'Declined'), ('E', 'Error'), ('B', 'Booked'), ('C', 'Cancelled'), ('O', 'In-Effect/In-Stay'), ('Z', 'Complete'), ('X', 'In-Dispute'), ('F', 'In-Dispute Locked'), ('R', 'Dispute Resolved')], max_length=2),
        ),
        migrations.AlterField(
            model_name='applicationstate',
            name='old_state',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='application.ApplicationState'),
        ),
    ]