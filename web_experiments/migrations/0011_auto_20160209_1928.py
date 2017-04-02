# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0010_auto_20160209_1923'),
    ]

    operations = [
        migrations.RenameField(
            model_name='participant',
            old_name='PID',
            new_name='MID',
        ),
        migrations.RenameField(
            model_name='questionnairemodel',
            old_name='PID',
            new_name='MID',
        ),
        migrations.RenameField(
            model_name='trial',
            old_name='PID',
            new_name='MID',
        ),
    ]
