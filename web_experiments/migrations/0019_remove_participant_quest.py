# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0018_participant_counterbalance'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='participant',
            name='quest',
        ),
    ]
