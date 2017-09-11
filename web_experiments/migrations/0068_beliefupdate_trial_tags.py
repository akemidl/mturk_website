# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0067_beliefupdate_trial_labels'),
    ]

    operations = [
        migrations.AddField(
            model_name='beliefupdate_trial',
            name='tags',
            field=models.CharField(default=b'NaN', max_length=2000),
            preserve_default=True,
        ),
    ]
