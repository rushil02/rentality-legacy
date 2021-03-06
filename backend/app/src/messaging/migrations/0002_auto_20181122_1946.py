# Generated by Django 2.0.4 on 2018-11-22 19:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('messaging', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='threaduser',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='thread',
            name='content_type',
            field=models.ForeignKey(limit_choices_to=models.Q(models.Q(('app_label', 'house'), ('model', 'house')), models.Q(('app_label', 'tenant'), ('model', 'house_preference')), _connector='OR'), on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType'),
        ),
        migrations.AddField(
            model_name='thread',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='message',
            name='thread',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='messaging.Thread'),
        ),
        migrations.AlterUniqueTogether(
            name='threaduser',
            unique_together={('thread', 'user')},
        ),
        migrations.AlterUniqueTogether(
            name='thread',
            unique_together={('content_type', 'object_id', 'creator')},
        ),
    ]
