# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0039_motiondots_trial_testcolumn'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='cb2',
            field=models.CharField(default=b'default', max_length=500),
            preserve_default=True,
        ),
    ]
