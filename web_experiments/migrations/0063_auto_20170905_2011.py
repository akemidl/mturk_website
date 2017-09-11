# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0062_auto_20170905_2010'),
    ]

    operations = [
        migrations.AddField(
            model_name='beliefupdate_trial',
            name='extra_column',
            field=models.CharField(default=b'NaN', max_length=2000),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='beliefupdate_trial',
            name='trial_name',
            field=models.CharField(default=b'NaN', max_length=2000),
            preserve_default=True,
        ),
    ]
