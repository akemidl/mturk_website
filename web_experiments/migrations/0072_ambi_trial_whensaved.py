# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0071_ambi_trial_est_left_over_right'),
    ]

    operations = [
        migrations.AddField(
            model_name='ambi_trial',
            name='whensaved',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
