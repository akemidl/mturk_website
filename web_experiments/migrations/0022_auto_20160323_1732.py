# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0021_bandit_trial_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='AID',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='participant',
            name='HID',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
    ]
