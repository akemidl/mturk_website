# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0054_participant_show_info_sheet'),
    ]

    operations = [
        migrations.AddField(
            model_name='ambi_trial',
            name='instruct_number',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
