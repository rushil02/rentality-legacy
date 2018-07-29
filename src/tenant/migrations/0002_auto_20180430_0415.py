# Generated by Django 2.0.4 on 2018-04-30 04:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('essentials', '0002_notification_user'),
        ('tenant', '0001_initial'),
        ('house', '0003_auto_20180430_0415'),
    ]

    operations = [
        migrations.AddField(
            model_name='tenantprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='tenant', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='housepreference',
            name='locations',
            field=models.ManyToManyField(to='essentials.Location'),
        ),
        migrations.AddField(
            model_name='housepreference',
            name='tags',
            field=models.ManyToManyField(to='house.Tag'),
        ),
        migrations.AddField(
            model_name='housepreference',
            name='tenant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tenant.TenantProfile'),
        ),
        migrations.AddField(
            model_name='additionaltenant',
            name='house_pref',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tenant.HousePreference'),
        ),
    ]