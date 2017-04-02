# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0026_bandit_trial_cb'),
    ]

    operations = [
        migrations.RenameField(
            model_name='participant',
            old_name='counterbalance',
            new_name='cb',
        ),
        migrations.AlterField(
            model_name='questionnairemodel',
            name='MID',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
    ]
