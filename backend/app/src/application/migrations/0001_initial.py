# Generated by Django 2.0.4 on 2019-01-31 00:59

from django.conf import settings
import django.contrib.postgres.fields.jsonb
import django.contrib.postgres.fields.ranges
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('house', '0003_house_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tenant', django.contrib.postgres.fields.jsonb.JSONField()),
                ('home_owner', django.contrib.postgres.fields.jsonb.JSONField()),
                ('meta', django.contrib.postgres.fields.jsonb.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('ref_code', models.CharField(blank=True, max_length=20, unique=True)),
                ('house_meta', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('tenant_meta', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('rent', models.PositiveIntegerField()),
                ('meta', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('date', django.contrib.postgres.fields.ranges.DateRangeField(verbose_name='stay dates')),
                ('status', models.CharField(choices=[('P', 'Pending'), ('A', 'Accepted'), ('D', 'Declined'), ('T', 'Timeout'), ('E', 'Transaction Error')], default='P', max_length=1)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('house', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='house.House')),
            ],
        ),
        migrations.CreateModel(
            name='ApplicationState',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('old_state', models.CharField(choices=[('P', 'Pending'), ('A', 'Accepted'), ('D', 'Declined'), ('T', 'Timeout'), ('E', 'Transaction Error')], max_length=1)),
                ('new_state', models.CharField(choices=[('P', 'Pending'), ('A', 'Accepted'), ('D', 'Declined'), ('T', 'Timeout'), ('E', 'Transaction Error')], max_length=1)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('actor', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('application', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='application.Application')),
            ],
        ),
    ]
