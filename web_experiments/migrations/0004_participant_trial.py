# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0003_auto_20151217_2134'),
    ]

    operations = [
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('PID', models.CharField(max_length=200)),
                ('start_date', models.DateTimeField(verbose_name=b'start date')),
                ('start_time', models.IntegerField()),
                ('completion_code', models.CharField(max_length=200)),
                ('scheduled_used', models.IntegerField()),
                ('stim_set_used', models.IntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Trial',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('trial_number', models.CharField(max_length=200)),
                ('start_date', models.DateTimeField(verbose_name=b'start date')),
                ('start_time', models.IntegerField()),
                ('options_onset', models.IntegerField()),
                ('cue_onset', models.IntegerField()),
                ('interval_onset', models.IntegerField()),
                ('monitor_onset', models.IntegerField()),
                ('ITI_onset', models.IntegerField()),
                ('outcome', models.IntegerField()),
                ('win_amount', models.IntegerField()),
                ('total', models.IntegerField()),
                ('green_side', models.CharField(max_length=200)),
                ('green_reward', models.IntegerField()),
                ('blue_reward', models.IntegerField()),
                ('choice_side', models.CharField(max_length=200)),
                ('choice_colour', models.IntegerField()),
                ('information', models.IntegerField()),
                ('reaction_time', models.IntegerField()),
                ('left_stimuli', models.CharField(max_length=200)),
                ('right_stimuli', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
