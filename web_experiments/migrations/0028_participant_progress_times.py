# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0027_auto_20160605_2202'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='progress_times',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
    ]
