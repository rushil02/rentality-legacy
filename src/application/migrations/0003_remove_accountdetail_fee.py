# Generated by Django 2.2.10 on 2020-04-11 08:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0002_auto_20190131_0059'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accountdetail',
            name='fee',
        ),
    ]
