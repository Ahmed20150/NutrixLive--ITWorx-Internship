# Generated by Django 4.2.3 on 2023-08-15 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_users_firsttimenutri_users_firsttimeworkout'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='session_token',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]
