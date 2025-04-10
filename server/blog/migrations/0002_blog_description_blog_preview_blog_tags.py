# Generated by Django 5.2 on 2025-04-10 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='description',
            field=models.TextField(default='Default description'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blog',
            name='preview',
            field=models.URLField(default='/default-blog.png'),
        ),
        migrations.AddField(
            model_name='blog',
            name='tags',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
