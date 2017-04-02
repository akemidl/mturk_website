# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0011_auto_20160209_1928'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bandit_Trial',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('MID', models.CharField(max_length=200)),
                ('trial_number', models.CharField(max_length=200)),
                ('start_date', models.DateTimeField(verbose_name=b'start date')),
                ('trialstart', models.BigIntegerField()),
                ('correct_choice', models.IntegerField()),
                ('outcome', models.IntegerField()),
                ('chosen_mag', models.IntegerField()),
                ('green_reward', models.IntegerField()),
                ('blue_reward', models.IntegerField()),
                ('reaction_time', models.IntegerField()),
                ('left_stimuli', models.CharField(max_length=200)),
                ('right_stimuli', models.CharField(max_length=200)),
                ('totalpoints', models.IntegerField(null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.DeleteModel(
            name='Trial',
        ),
    ]
