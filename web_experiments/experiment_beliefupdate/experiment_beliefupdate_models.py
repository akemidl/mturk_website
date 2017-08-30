from django.db import models
from django.db.models import IntegerField, BigIntegerField, FloatField


class BeliefUpdate_Trial(models.Model):

    # Trial Stuff
    save_time = models.DateTimeField('start date')
    rt = BigIntegerField(default=0)
    trial_type = models.CharField(max_length=200,default='NaN')
    key_press = models.CharField(max_length=200,default='NaN')
    trial_index = BigIntegerField(default=0)
    time_elapsed  = BigIntegerField(default=0)

    # Session (Part 1, 2, 3)
    session  = BigIntegerField(default=0)

    # participant stuff
    MID = models.CharField(max_length=200,default='NaN')
    AID = models.CharField(max_length=200,default='NaN')
    HID = models.CharField(max_length=200,default='NaN')
    session_id =models.CharField(max_length=200,default=None) # this is about browsing session
