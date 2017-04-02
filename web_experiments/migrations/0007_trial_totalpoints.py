# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0006_auto_20151218_1823'),
    ]

    operations = [
        migrations.AddField(
            model_name='trial',
            name='totalpoints',
            field=models.IntegerField(null=True),
            preserve_default=True,
        ),
    ]
