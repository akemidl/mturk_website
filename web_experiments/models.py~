from django.db import models
from django.db.models import IntegerField, BigIntegerField, FloatField

class Participant(models.Model):

    MID =models.CharField(max_length=200)
    AID =models.CharField(max_length=200,default=None)
    HID =models.CharField(max_length=200,default=None)
    session_id =models.CharField(max_length=200,default=None)
    start_date = models.DateTimeField('start date')
    start_time = BigIntegerField() # in seconds
    progress_times = models.CharField(max_length=2000,default=None)
    progress_times2 = models.CharField(max_length=2000,default=None)

    completion_code = models.CharField(max_length=200)
    completed=IntegerField(default=0)
    progress=IntegerField(default=0)
    total_tasks=IntegerField(default=0)

    tasks = models.CharField(default='Nothing',max_length=500)
    cb=models.CharField(default='default',max_length=500)
    cb2 = models.CharField(default='default',max_length=500)
    show_info_sheet = IntegerField(default=0)


class Bandit_Trial(models.Model):

    MID = models.CharField(max_length=200)
    AID =models.CharField(max_length=200,default=None)
    HID =models.CharField(max_length=200,default=None)
    session_id =models.CharField(max_length=200,default=None)
    cb  = IntegerField(default=99)

    trial_number = models.CharField(max_length=200)

    loss_or_reward = models.CharField(max_length=200,default=None)

    order     = IntegerField(default=None)

    # Timing Stuff
    start_date = models.DateTimeField('start date')
    trialstart  = BigIntegerField()


    # Outcomes
    correct_choice  = IntegerField() # (1=green)
    outcome  = IntegerField()
    chosen_mag	 = IntegerField()

    green_reward     = IntegerField()
    blue_reward      = IntegerField()


    reaction_time    = IntegerField()

    #
    left_stimuli = models.CharField(default='NaN',max_length=200)
    right_stimuli = models.CharField(default='NaN',max_length=200)

    #
    totalpoints = models.IntegerField(null=True)

    noresp = models.IntegerField(default=0)

class Horizon_Trial(models.Model):

    MID = models.CharField(max_length=200)
    session_id =models.CharField(max_length=200,default=None)

    loss_or_reward = models.CharField(max_length=200)

    game_number = IntegerField()
    game_trial_number = IntegerField()

    # Timing Stuff
    start_date = models.DateTimeField('start date')
    trialstart  = BigIntegerField()


    # Outcomes
    left_value=IntegerField()
    right_value = IntegerField()
    choice  = IntegerField()
    fixed = IntegerField()
    reaction_time    = IntegerField()
    totalpoints = models.IntegerField(null=True)




class Ambi_Trial(models.Model):

    MID = models.CharField(max_length=200,default='NaN')
    AID = models.CharField(max_length=200,default='NaN')
    HID = models.CharField(max_length=200,default='NaN')
    session_id =models.CharField(max_length=200,default=None)

    trial_number = models.CharField(max_length=200,default='NaN')
    instruct_number = models.CharField(max_length=200,default='NaN')
    # repon
    resp = models.CharField(max_length=200,default='NaN')

    loss_or_reward = models.CharField(max_length=200,default='gain')

    # Timing Stuff
    start_date = models.DateTimeField('start date')
    trialstart  = BigIntegerField(default=0)


    # Outcomes

    outcome  = models.CharField(max_length=200,default='NaN')
    received_mag  = models.CharField(max_length=200,default='NaN')

    # trial stuff
    prop_left	 = models.CharField(max_length=200,default='NaN')
    prop_right	 = models.CharField(max_length=200,default='NaN')
    revealed_left	 = models.CharField(max_length=200,default='NaN')
    revealed_right	 = models.CharField(max_length=200,default='NaN')
    mag_left	 = models.CharField(max_length=200,default='NaN')
    mag_right	 = models.CharField(max_length=200,default='NaN')
    revealed_o_r=models.CharField(max_length=200,default='NaN')
    revealed_o_l=models.CharField(max_length=200,default='NaN')
    revealed_x_r=models.CharField(max_length=200,default='NaN')
    revealed_x_l=models.CharField(max_length=200,default='NaN')
    practice = models.CharField(max_length=200,default='NaN')

    # 5 trial outcome stuff
    five_trial_outcome = models.CharField(max_length=200,default='NaN')


    reaction_time    = models.CharField(max_length=200,default='NaN')

    totalpoints = models.CharField(max_length=200,default='NaN')

    noresp = models.CharField(max_length=200,default='NaN')




#Here we are building the table where we will store all of the variables etc in...
# any time you change this, you need to run 'python manage.py makemigrations', followed by 'python manage.py migrate'

class MotionDots_Trial2(models.Model):

    MID = models.CharField(max_length=200, default='NaN')
    AID =models.CharField(max_length=200,default='NaN') #Do I actually have or need these next 3 for Motion Dots??
    HID =models.CharField(max_length=200,default='NaN')
    session_id =models.CharField(max_length=200,default='NaN')

    numbertrials_elapsed=models.CharField(max_length=200, default='NaN')
    currenttrial=models.CharField(max_length=200, default='NaN')
    trial_type=models.CharField(max_length=200, default='NaN')

    # Timing Stuff
    start_date = models.DateTimeField('start_date')
    trialstart  =models.CharField(max_length=200,default='NaN')

    #Trial variables
    speed_eachdot= models.CharField(max_length=200,default='NaN')
    colour_eachdot=models.CharField(max_length=200,default='NaN')
    true_outcome_colour=models.CharField(max_length=200,default='NaN') #for slider trials
    true_outcome_speed= models.CharField(max_length=200,default='NaN') #for slider trials
    choicebutton_side=models.CharField(max_length=200,default='NaN') #for choice button trials
    category_boundary=models.CharField(max_length=200,default='NaN') #for choice button trials
    slider_start_position=models.CharField(max_length=200,default='NaN')	

    # Outcomes
    response  = models.CharField(max_length=200, default='NaN')
    RT  = models.CharField(max_length=200,default='NaN')
    slider_position_subjectresponse = models.CharField(max_length=200,default='NaN')
    slider_position_subjectresponse_array = models.CharField(max_length=200,default='NaN')
    correct=models.CharField(max_length=200,default='NaN')
    last_pressed=models.CharField(max_length=200,default='NaN') #for choice button trials
    choicemade_array=models.CharField(max_length=200,default='NaN')
    outcome_bar_position=models.CharField(max_length=200,default='NaN')

    testcolumn = models.CharField(max_length=200,default='NaN') #chris added to check if updating the table works. 


class MotionDots_ColourSpeed_Trial(models.Model):

    MID = models.CharField(max_length=200, default='NaN')
    AID =models.CharField(max_length=200,default='NaN') #Do I actually have or need these next 3 for Motion Dots??
    HID =models.CharField(max_length=200,default='NaN')
    session_id =models.CharField(max_length=200,default='NaN')

    numbertrials_elapsed=models.CharField(max_length=200, default='NaN')
    currenttrial=models.CharField(max_length=200, default='NaN')
    trial_type=models.CharField(max_length=200, default='NaN')

    # Timing Stuff
    start_date = models.DateTimeField('start_date')
    trialstart  =models.CharField(max_length=200,default='NaN')

    #Trial variables
    speed_eachdot= models.CharField(max_length=200,default='NaN')
    colour_eachdot=models.CharField(max_length=200,default='NaN')
    true_outcome_colour=models.CharField(max_length=200,default='NaN') #for slider trials
    true_outcome_speed= models.CharField(max_length=200,default='NaN') #for slider trials
    choicebutton_side=models.CharField(max_length=200,default='NaN') #for choice button trials
    category_boundary_colour=models.CharField(max_length=200,default='NaN') #for choice button trials
    category_boundary_speed=models.CharField(max_length=200,default='NaN') #for choice button trials
    #speed_array_thistrial=models.CharField(max_length=5000,default='NaN')
    #rc_array_thistrial=models.CharField(max_length=5000,default='NaN')
    #rb_array_thistrial=models.CharField(max_length=5000,default='NaN')	
    random_numbers_array=models.CharField(max_length=500,default='NaN')

    # Outcomes
    response  = models.CharField(max_length=200, default='NaN')
    RT  = models.CharField(max_length=200,default='NaN')
    correct=models.CharField(max_length=200,default='NaN')
    last_pressed=models.CharField(max_length=200,default='NaN') #for choice button trials
    choicemade_array=models.CharField(max_length=200,default='NaN')

    testcolumn = models.CharField(max_length=200,default='NaN') #chris added to check if updating the table works. 


class QuestionnaireModel(models.Model):

    AID =models.CharField(max_length=200,default=None)
    HID =models.CharField(max_length=200,default=None)
    MID =models.CharField(max_length=200,default=None)
    start_date = models.DateTimeField('start date')
    start_time = BigIntegerField() # in seconds
    survey_name =models.CharField(max_length=200)

    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)




from django.contrib import admin

admin.site.register(Bandit_Trial)
admin.site.register(Ambi_Trial)
admin.site.register(Participant)
admin.site.register(MotionDots_Trial2)
