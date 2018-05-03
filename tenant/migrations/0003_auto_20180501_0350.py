# Generated by Django 2.0.4 on 2018-05-01 03:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ('house', '0004_auto_20180501_0036'),
        ('tenant', '0002_auto_20180430_0415'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='housepreference',
            name='property_type',
        ),
        migrations.AddField(
            model_name='housepreference',
            name='room_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='house.RoomType',
                                    verbose_name='Property Type'),
        ),
        migrations.AddField(
            model_name='housepreference',
            name='status',
            field=models.CharField(choices=[('I', 'Incomplete'), ('P', 'Published')], default='I', max_length=1),
        ),
        migrations.AlterField(
            model_name='housepreference',
            name='locations',
            field=models.ManyToManyField(to=settings.CITIES_CITY_MODEL),
        ),
        migrations.AlterField(
            model_name='housepreference',
            name='max_budget',
            field=models.PositiveIntegerField(default=0),
        ),
    ]