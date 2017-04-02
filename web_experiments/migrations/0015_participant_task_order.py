# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0014_participant_bandit_schedule'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='task_order',
            field=models.CharField(default=b'Nothing', max_length=500),
            preserve_default=True,
        ),
    ]
