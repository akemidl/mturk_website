# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0055_ambi_trial_instruct_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='motiondots_colourspeed_trial',
            name='rb_array_thistrial',
            field=models.CharField(default=b'NaN', max_length=5000),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='motiondots_colourspeed_trial',
            name='rc_array_thistrial',
            field=models.CharField(default=b'NaN', max_length=5000),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='motiondots_colourspeed_trial',
            name='speed_array_thistrial',
            field=models.CharField(default=b'NaN', max_length=5000),
            preserve_default=True,
        ),
    ]
