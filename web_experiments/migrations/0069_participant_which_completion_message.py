# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0068_beliefupdate_trial_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='which_completion_message',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
