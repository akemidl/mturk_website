# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0043_remove_motiondots_trial_current_trial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MotionDots_Trial2',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('MID', models.CharField(default=b'NaN', max_length=200)),
                ('AID', models.CharField(default=b'NaN', max_length=200)),
                ('HID', models.CharField(default=b'NaN', max_length=200)),
                ('session_id', models.CharField(default=b'NaN', max_length=200)),
                ('currenttrial', models.CharField(default=b'NaN', max_length=200)),
                ('trial_type', models.CharField(default=b'NaN', max_length=200)),
                ('start_date', models.DateTimeField(verbose_name=b'start date')),
                ('trialstart', models.CharField(default=b'NaN', max_length=200)),
                ('speed_eachdot', models.CharField(default=b'NaN', max_length=200)),
                ('colour_eachdot', models.CharField(default=b'NaN', max_length=200)),
                ('true_outcome_colour', models.CharField(default=b'NaN', max_length=200)),
                ('true_outcome_speed', models.CharField(default=b'NaN', max_length=200)),
                ('choicebutton_side', models.CharField(default=b'NaN', max_length=200)),
                ('category_boundary_block1', models.CharField(default=b'NaN', max_length=200)),
                ('response', models.CharField(default=b'NaN', max_length=200)),
                ('RT', models.CharField(default=b'NaN', max_length=200)),
                ('slider_position_subjectresponse', models.CharField(default=b'NaN', max_length=200)),
                ('slider_position_subjectresponse_array', models.CharField(default=b'NaN', max_length=200)),
                ('correct', models.CharField(default=b'NaN', max_length=200)),
                ('last_pressed', models.CharField(default=b'NaN', max_length=200)),
                ('testcolumn', models.CharField(default=b'NaN', max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
