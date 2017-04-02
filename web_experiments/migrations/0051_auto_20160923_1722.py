# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0050_auto_20160916_1847'),
    ]

    operations = [
        migrations.RenameField(
            model_name='motiondots_trial2',
            old_name='category_boundary_block1',
            new_name='category_boundary',
        ),
        migrations.AddField(
            model_name='motiondots_trial2',
            name='choicemade_array',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='motiondots_trial2',
            name='numbertrials_elapsed',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='motiondots_trial2',
            name='outcome_bar_position',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='motiondots_trial2',
            name='start_date',
            field=models.DateTimeField(verbose_name=b'start_date'),
            preserve_default=True,
        ),
    ]
