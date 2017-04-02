# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0051_auto_20160923_1722'),
    ]

    operations = [
        migrations.AddField(
            model_name='motiondots_trial2',
            name='slider_start_position',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
