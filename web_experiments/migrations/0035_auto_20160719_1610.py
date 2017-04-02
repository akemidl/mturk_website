# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0034_auto_20160719_1609'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ambi_trial',
            name='outcome',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
