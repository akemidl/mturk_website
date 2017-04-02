# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0052_motiondots_trial2_slider_start_position'),
    ]

    operations = [
        migrations.CreateModel(
            name='MotionDots_ColourSpeed_Trial',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('MID', models.CharField(default=b'NaN', max_length=200)),
                ('AID', models.CharField(default=b'NaN', max_length=200)),
                ('HID', models.CharField(default=b'NaN', max_length=200)),
                ('session_id', models.CharField(default=b'NaN', max_length=200)),
                ('numbertrials_elapsed', models.CharField(default=b'NaN', max_length=200)),
                ('currenttrial', models.CharField(default=b'NaN', max_length=200)),
                ('trial_type', models.CharField(default=b'NaN', max_length=200)),
                ('start_date', models.DateTimeField(verbose_name=b'start_date')),
                ('trialstart', models.CharField(default=b'NaN', max_length=200)),
                ('speed_eachdot', models.CharField(default=b'NaN', max_length=200)),
                ('colour_eachdot', models.CharField(default=b'NaN', max_length=200)),
                ('true_outcome_colour', models.CharField(default=b'NaN', max_length=200)),
                ('true_outcome_speed', models.CharField(default=b'NaN', max_length=200)),
                ('choicebutton_side', models.CharField(default=b'NaN', max_length=200)),
                ('category_boundary_colour', models.CharField(default=b'NaN', max_length=200)),
                ('category_boundary_speed', models.CharField(default=b'NaN', max_length=200)),
                ('response', models.CharField(default=b'NaN', max_length=200)),
                ('RT', models.CharField(default=b'NaN', max_length=200)),
                ('correct', models.CharField(default=b'NaN', max_length=200)),
                ('last_pressed', models.CharField(default=b'NaN', max_length=200)),
                ('choicemade_array', models.CharField(default=b'NaN', max_length=200)),
                ('testcolumn', models.CharField(default=b'NaN', max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
