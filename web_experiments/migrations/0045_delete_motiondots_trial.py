# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0044_motiondots_trial2'),
    ]

    operations = [
        migrations.DeleteModel(
            name='MotionDots_Trial',
        ),
    ]
