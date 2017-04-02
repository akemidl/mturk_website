# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0056_auto_20170214_1346'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='motiondots_colourspeed_trial',
            name='rb_array_thistrial',
        ),
        migrations.RemoveField(
            model_name='motiondots_colourspeed_trial',
            name='rc_array_thistrial',
        ),
        migrations.RemoveField(
            model_name='motiondots_colourspeed_trial',
            name='speed_array_thistrial',
        ),
        migrations.AddField(
            model_name='motiondots_colourspeed_trial',
            name='random_numbers_array',
            field=models.CharField(default=b'NaN', max_length=500),
            preserve_default=True,
        ),
    ]
