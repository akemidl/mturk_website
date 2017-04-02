# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0015_participant_task_order'),
    ]

    operations = [
        migrations.CreateModel(
            name='Horizon_Trial',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('MID', models.CharField(max_length=200)),
                ('loss_or_reward', models.CharField(max_length=200)),
                ('game_number', models.IntegerField()),
                ('game_trial_number', models.IntegerField()),
                ('start_date', models.DateTimeField(verbose_name=b'start date')),
                ('trialstart', models.BigIntegerField()),
                ('left_value', models.IntegerField()),
                ('right_value', models.IntegerField()),
                ('choice', models.IntegerField()),
                ('fixed', models.IntegerField()),
                ('reaction_time', models.IntegerField()),
                ('totalpoints', models.IntegerField(null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
