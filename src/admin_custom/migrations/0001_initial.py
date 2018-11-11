# Generated by Django 2.0.4 on 2018-11-08 16:35

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ActivityLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_id', models.PositiveIntegerField(blank=True, null=True)),
                ('level', models.CharField(choices=[('I', 'INFO'), ('E', 'ERROR'), ('C', 'CRITICAL'), ('D', 'DEBUG'), ('W', 'WARNING')], max_length=1)),
                ('meta_info', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('create_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
