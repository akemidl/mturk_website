# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0019_remove_participant_quest'),
    ]

    operations = [
        migrations.AddField(
            model_name='bandit_trial',
            name='loss_or_reward',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bandit_trial',
            name='session_id',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='horizon_trial',
            name='session_id',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='participant',
            name='session_id',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
    ]
