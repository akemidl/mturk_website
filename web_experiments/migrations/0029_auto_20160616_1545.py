# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0028_participant_progress_times'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='progress_times',
            field=models.CharField(default=None, max_length=2000),
            preserve_default=True,
        ),
    ]
