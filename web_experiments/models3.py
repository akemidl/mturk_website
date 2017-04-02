from django.db import models
from django.db.models import IntegerField, BigIntegerField

class Trial(models.Model):
    
    PID = models.CharField(max_length=200)
    
    trial_number = models.CharField(max_length=200)
    
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
    left_stimuli = models.CharField(max_length=200)
    right_stimuli = models.CharField(max_length=200)
    
    # 
    totalpoints = models.IntegerField(null=True)


class Participant(models.Model):
    
    PID =models.CharField(max_length=200)
    start_date = models.DateTimeField('start date')
    start_time = BigIntegerField() # in seconds 
    
    completion_code = models.CharField(max_length=200)
    scheduled_used = IntegerField()
    stim_set_used = IntegerField()
    

class Questionnaire(models.Model):
    
    def __init__(self, *args, **kwargs):
        
        self.name = kwargs.pop('namme')
        #### Instructions
        with open('web_experiments/small_data/'+self.name+'_Instruct.txt', 'r') as myfile:
            self.instruction=myfile.read()

        #### Choices
        with open('web_experiments/small_data/'+self.name+'_Choices.txt', 'r') as myfile:
            choices=myfile.read().replace('\r','').split('\n')
        n_choices = len(choices)
        CHOICES = (())
        for c,choice in enumerate(choices):
            temp = (c,choice,)
            CHOICES = CHOICES+(temp,)

        #### Questions
        with open('web_experiments/small_data/'+self.name+'_Questions.txt', 'r') as f:
            questions = [line.strip() for line in f]
        n_questions = len(questions)



        #### Add Fields to HTML Form
        for i in xrange(n_questions):
                self.('q%d' % i]) = models.CharField( choices=CHOICES) #label=questions[i],
         
        
    

from django.contrib import admin

admin.site.register(Trial)
admin.site.register(Participant)