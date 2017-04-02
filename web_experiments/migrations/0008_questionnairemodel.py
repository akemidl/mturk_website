# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0007_trial_totalpoints'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionnaireModel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('PID', models.CharField(max_length=200)),
                ('start_date', models.DateTimeField(verbose_name=b'start date')),
                ('start_time', models.BigIntegerField()),
                ('survey_name', models.CharField(max_length=200)),
                ('question', models.CharField(max_length=200)),
                ('answer', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
