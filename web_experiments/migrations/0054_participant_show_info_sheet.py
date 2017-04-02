# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0053_motiondots_colourspeed_trial'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='show_info_sheet',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
