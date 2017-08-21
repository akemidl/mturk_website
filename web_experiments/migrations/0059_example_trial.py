# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0058_participant_agreed_to_be_contacted'),
    ]

    operations = [
        migrations.CreateModel(
            name='Example_Trial',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('save_time', models.DateTimeField(verbose_name=b'start date')),
                ('rt', models.BigIntegerField(default=0)),
                ('trial_type', models.CharField(default=b'NaN', max_length=200)),
                ('key_press', models.CharField(default=b'NaN', max_length=200)),
                ('trial_index', models.BigIntegerField(default=0)),
                ('time_elapsed', models.BigIntegerField(default=0)),
                ('MID', models.CharField(default=b'NaN', max_length=200)),
                ('AID', models.CharField(default=b'NaN', max_length=200)),
                ('HID', models.CharField(default=b'NaN', max_length=200)),
                ('session_id', models.CharField(default=None, max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
