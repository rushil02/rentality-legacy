# Generated by Django 2.0.4 on 2019-01-31 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('promotions', '0001_initial'),
        ('billing', '0003_auto_20190131_0059'),
        ('house', '0004_auto_20190131_0059'),
    ]

    operations = [
        migrations.AddField(
            model_name='house',
            name='promo_codes',
            field=models.ManyToManyField(blank=True, to='promotions.PromotionalCode'),
        ),
        migrations.DeleteModel(
            name='Application',
        ),
        migrations.DeleteModel(
            name='ApplicationState',
        ),
    ]
