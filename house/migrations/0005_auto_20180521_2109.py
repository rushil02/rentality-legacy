# Generated by Django 2.0.4 on 2018-05-21 21:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('house', '0004_auto_20180501_0036'),
    ]

    operations = [
        migrations.AddField(
            model_name='house',
            name='address_hidden',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='house',
            name='status',
            field=models.CharField(choices=[('I', 'Inactive'), ('P', 'Published'), ('L', 'Leased'), ('D', 'Deleted')],
                                   default='I', max_length=1),
        ),
    ]