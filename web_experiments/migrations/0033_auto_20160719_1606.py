# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0032_auto_20160719_1557'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ambi_trial',
            name='blue_reward',
        ),
        migrations.RemoveField(
            model_name='ambi_trial',
            name='green_reward',
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='five_trial_outcome',
            field=models.IntegerField(default=999),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='mag_left',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='mag_right',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='received_mag',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
