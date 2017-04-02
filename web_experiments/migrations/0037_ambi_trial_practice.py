# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0036_auto_20160719_1617'),
    ]

    operations = [
        migrations.AddField(
            model_name='ambi_trial',
            name='practice',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
