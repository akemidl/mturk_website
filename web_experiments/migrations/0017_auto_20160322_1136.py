# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0016_horizon_trial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='participant',
            old_name='task_order',
            new_name='tasks',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='bandit_schedule',
        ),
        migrations.AddField(
            model_name='participant',
            name='quest',
            field=models.CharField(default=b'Nothing', max_length=500),
            preserve_default=True,
        ),
    ]
