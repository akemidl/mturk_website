# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0029_auto_20160616_1545'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ambi_trial',
            name='chosen_mag',
        ),
        migrations.RemoveField(
            model_name='ambi_trial',
            name='correct_choice',
        ),
        migrations.RemoveField(
            model_name='ambi_trial',
            name='left_stimuli',
        ),
        migrations.RemoveField(
            model_name='ambi_trial',
            name='right_stimuli',
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='prop_left',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='prop_right',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='resp',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='revealed_left',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='revealed_right',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='blue_reward',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='green_reward',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='outcome',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='reaction_time',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='trialstart',
            field=models.BigIntegerField(default=0),
            preserve_default=True,
        ),
    ]
