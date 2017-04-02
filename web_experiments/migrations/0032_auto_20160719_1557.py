# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0031_auto_20160719_1553'),
    ]

    operations = [
        migrations.AddField(
            model_name='ambi_trial',
            name='noresp',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='session_id',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
    ]
