# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0005_auto_20151218_1811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='start_time',
            field=models.BigIntegerField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='trial',
            name='trialstart',
            field=models.BigIntegerField(),
            preserve_default=True,
        ),
    ]
