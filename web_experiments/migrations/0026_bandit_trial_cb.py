# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0025_auto_20160603_0052'),
    ]

    operations = [
        migrations.AddField(
            model_name='bandit_trial',
            name='cb',
            field=models.IntegerField(default=99),
            preserve_default=True,
        ),
    ]
