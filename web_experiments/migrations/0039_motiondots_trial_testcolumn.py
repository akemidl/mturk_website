# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0038_auto_20160906_1908'),
    ]

    operations = [
        migrations.AddField(
            model_name='motiondots_trial',
            name='testcolumn',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
