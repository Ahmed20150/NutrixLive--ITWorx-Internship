# Generated by Django 4.2.3 on 2023-07-19 10:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='date_of_birth',
        ),
        migrations.RemoveField(
            model_name='users',
            name='email',
        ),
        migrations.RemoveField(
            model_name='users',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='users',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='users',
            name='password',
        ),
    ]
