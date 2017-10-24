# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0072_ambi_trial_whensaved'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ambi_Estimation_Trial',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('MID', models.CharField(default=b'NaN', max_length=200)),
                ('AID', models.CharField(default=b'NaN', max_length=200)),
                ('HID', models.CharField(default=b'NaN', max_length=200)),
                ('session_id', models.CharField(default=None, max_length=200)),
                ('trial_number', models.CharField(default=b'NaN', max_length=200)),
                ('instruct_number', models.CharField(default=b'NaN', max_length=200)),
                ('resp', models.CharField(default=b'NaN', max_length=200)),
                ('loss_or_reward', models.CharField(default=b'gain', max_length=200)),
                ('start_date', models.DateTimeField(verbose_name=b'start date')),
                ('trialstart', models.BigIntegerField(default=0)),
                ('whensaved', models.CharField(default=b'NaN', max_length=200)),
                ('outcome', models.CharField(default=b'NaN', max_length=200)),
                ('received_mag', models.CharField(default=b'NaN', max_length=200)),
                ('prop_left', models.CharField(default=b'NaN', max_length=200)),
                ('prop_right', models.CharField(default=b'NaN', max_length=200)),
                ('revealed_left', models.CharField(default=b'NaN', max_length=200)),
                ('revealed_right', models.CharField(default=b'NaN', max_length=200)),
                ('mag_left', models.CharField(default=b'NaN', max_length=200)),
                ('mag_right', models.CharField(default=b'NaN', max_length=200)),
                ('revealed_o_r', models.CharField(default=b'NaN', max_length=200)),
                ('revealed_o_l', models.CharField(default=b'NaN', max_length=200)),
                ('revealed_x_r', models.CharField(default=b'NaN', max_length=200)),
                ('revealed_x_l', models.CharField(default=b'NaN', max_length=200)),
                ('practice', models.CharField(default=b'NaN', max_length=200)),
                ('est_left_over_right', models.CharField(default=b'NaN', max_length=200)),
                ('five_trial_outcome', models.CharField(default=b'NaN', max_length=200)),
                ('reaction_time', models.CharField(default=b'NaN', max_length=200)),
                ('totalpoints', models.CharField(default=b'NaN', max_length=200)),
                ('noresp', models.CharField(default=b'NaN', max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
