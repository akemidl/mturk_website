# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0060_beliefupdate_trial'),
    ]

    operations = [
        migrations.AddField(
            model_name='beliefupdate_trial',
            name='responses',
            field=models.CharField(default=b'NaN', max_length=2000),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='beliefupdate_trial',
            name='trial_name',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='beliefupdate_trial',
            name='view_history',
            field=models.CharField(default=b'NaN', max_length=2000),
            preserve_default=True,
        ),
    ]
