# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0041_participant_progress_times2'),
    ]

    operations = [
        migrations.AddField(
            model_name='motiondots_trial',
            name='currenttrial',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
