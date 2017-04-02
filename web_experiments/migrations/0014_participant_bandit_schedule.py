# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0013_ambi_trial'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='bandit_schedule',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
