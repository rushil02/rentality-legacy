# Generated by Django 2.2.10 on 2020-06-23 00:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verbose', models.CharField(max_length=50)),
                ('priority', models.PositiveSmallIntegerField(default=0, help_text='Higher number sets higher priority')),
                ('create_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='thumbnail_alt_tags',
            field=models.CharField(default='def', help_text='Alternative tags for thumbnail image', max_length=150),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='article',
            name='tags',
        ),
        migrations.AddField(
            model_name='article',
            name='tags',
            field=models.ManyToManyField(help_text='Verbose Tags to find similar articles [Separate the tags using comma]', to='blog.Tag'),
        ),
    ]
