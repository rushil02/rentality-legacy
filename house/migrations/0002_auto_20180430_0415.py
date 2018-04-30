# Generated by Django 2.0.4 on 2018-04-30 04:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('house', '0001_initial'),
        ('landlord', '0001_initial'),
        ('cities', '0011_auto_20180108_0706'),
    ]

    operations = [
        migrations.AddField(
            model_name='house',
            name='landlord',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='houses', to='landlord.LandlordProfile', verbose_name='property owner'),
        ),
        migrations.AddField(
            model_name='house',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='cities.PostalCode', verbose_name='location'),
        ),
        migrations.AddField(
            model_name='house',
            name='room_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='house.RoomType'),
        ),
        migrations.AddField(
            model_name='house',
            name='tags',
            field=models.ManyToManyField(blank=True, to='house.Tag'),
        ),
        migrations.AddField(
            model_name='application',
            name='house',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='house.House'),
        ),
    ]
