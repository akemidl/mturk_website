# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0017_auto_20160322_1136'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='counterbalance',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
