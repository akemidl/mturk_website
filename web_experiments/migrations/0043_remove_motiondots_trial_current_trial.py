# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0042_motiondots_trial_currenttrial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='motiondots_trial',
            name='current_trial',
        ),
    ]
