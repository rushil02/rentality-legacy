# Generated by Django 2.0.4 on 2018-11-22 19:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('house', '0001_initial'),
        ('billing', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='application',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='house.Application'),
        ),
    ]