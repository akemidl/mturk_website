# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0064_auto_20170905_2045'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beliefupdate_trial',
            name='labels',
            field=models.CharField(default=b'NaN', max_length=2000),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='beliefupdate_trial',
            name='questions',
            field=models.CharField(default=b'NaN', max_length=2000),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='beliefupdate_trial',
            name='rt',
            field=models.BigIntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='beliefupdate_trial',
            name='time_elapsed',
            field=models.BigIntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='beliefupdate_trial',
            name='trial_index',
            field=models.BigIntegerField(default=0),
            preserve_default=True,
        ),
    ]
