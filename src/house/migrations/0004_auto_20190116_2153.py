# Generated by Django 2.0.4 on 2019-01-16 21:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('house', '0003_house_description'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='application',
            unique_together=set(),
        ),
        migrations.RemoveField(
            model_name='application',
            name='fee',
        ),
        migrations.RemoveField(
            model_name='application',
            name='house',
        ),
        migrations.RemoveField(
            model_name='application',
            name='tenant',
        ),
        migrations.RemoveField(
            model_name='applicationstate',
            name='actor',
        ),
    ]
