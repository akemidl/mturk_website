# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0063_auto_20170905_2011'),
    ]

    operations = [
        migrations.AddField(
            model_name='beliefupdate_trial',
            name='labels',
            field=models.CharField(default=b'NaN', max_length=10000),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='beliefupdate_trial',
            name='questions',
            field=models.CharField(default=b'NaN', max_length=10000),
            preserve_default=True,
        ),
    ]
