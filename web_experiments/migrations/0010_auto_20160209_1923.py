# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0009_participant_completed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='participant',
            name='scheduled_used',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='stim_set_used',
        ),
        migrations.AddField(
            model_name='participant',
            name='progress',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='participant',
            name='total_tasks',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
