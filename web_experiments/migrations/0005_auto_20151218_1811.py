# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0004_participant_trial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='trial',
            old_name='choice_side',
            new_name='PID',
        ),
        migrations.RenameField(
            model_name='trial',
            old_name='ITI_onset',
            new_name='chosen_mag',
        ),
        migrations.RenameField(
            model_name='trial',
            old_name='choice_colour',
            new_name='correct_choice',
        ),
        migrations.RenameField(
            model_name='trial',
            old_name='cue_onset',
            new_name='trialstart',
        ),
        migrations.RemoveField(
            model_name='trial',
            name='green_side',
        ),
        migrations.RemoveField(
            model_name='trial',
            name='information',
        ),
        migrations.RemoveField(
            model_name='trial',
            name='interval_onset',
        ),
        migrations.RemoveField(
            model_name='trial',
            name='monitor_onset',
        ),
        migrations.RemoveField(
            model_name='trial',
            name='options_onset',
        ),
        migrations.RemoveField(
            model_name='trial',
            name='start_time',
        ),
        migrations.RemoveField(
            model_name='trial',
            name='total',
        ),
        migrations.RemoveField(
            model_name='trial',
            name='win_amount',
        ),
    ]
