from django.shortcuts import render_to_response, render

# import shared stuff
from web_experiments.models import Participant
from web_experiments.views import *

# import mscl
import numpy as np
import json
import datetime
import csv
import time
import random, string
from random import randint

########################################
########### BANDIT TASK ##############

def bandit_task_counter_balancing(tasks,cb,which=0):

	if which==0:
		''' this one was for (gain,loss) in the same hit. So there are 4 cb's '''

		# switch order of bandit tasks randomly

		rand0 = random.randint(0,1)
		if rand0 ==1: # switch order of loss and gain tasks
			tasks = [task.replace('bandit_loss','bbgg') for task in tasks]
			tasks = [task.replace('bandit_gain','bbll') for task in tasks]
			tasks = [task.replace('bbll','bandit_loss') for task in tasks]
			tasks = [task.replace('bbgg','bandit_gain') for task in tasks]


		# generate counter balance
		rand1 = random.randint(0,3)
		randoms = [4,5,6,7]
		rand = randoms[rand1]

		# another counter balance


		for t,task in enumerate(tasks):
			if rand==0:
				if 'bandit_loss' in task:
					cb[t]=str(0)
				if 'bandit_gain' in task:
					cb[t]=str(1)
			if rand==1:
				if 'bandit_loss' in task:
					cb[t]=str(2)
				if 'bandit_gain' in task:
					cb[t]=str(3)
			if rand==2:
				if 'bandit_loss' in task:
					cb[t]=str(1)
				if 'bandit_gain' in task:
					cb[t]=str(0)
			if rand==3:
				if 'bandit_loss' in task:
					cb[t]=str(3)
				if 'bandit_gain' in task:
					cb[t]=str(2)

			if rand==4: #bandit loss is schedule 3, bandit gain is schedule 1
				if 'bandit_loss' in task:
					cb[t]=str(4)
				if 'bandit_gain' in task:
					cb[t]=str(0)
			if rand==5:#bandit loss is schedule 1, bandit gain is schedule 3
				if 'bandit_loss' in task:
					cb[t]=str(0)
				if 'bandit_gain' in task:
					cb[t]=str(4)

			if rand==6: #bandit loss is schedule 3, bandit gain is schedule 3
				if 'bandit_loss' in task:
					cb[t]=str(4)
				if 'bandit_gain' in task:
					cb[t]=str(4)
			if rand==7:#bandit loss is schedule 1, bandit gain is schedule 1
				if 'bandit_loss' in task:
					cb[t]=str(0)
				if 'bandit_gain' in task:
					cb[t]=str(0)

			if 'survey' in task and 'bandit' not in task: ## this is super sloppy and may cause problems later
				cb[t] = str(1) ## can't start cb with 0 because its an integer field, maybe change some day
		cb = "".join(cb) # save it as a string

	if which ==1:
		print(type(cb))
		''' this is for single task, either gain or loss '''
		# generate counter balance
		rand1 = random.randint(0,1)
		for t,task in enumerate(tasks):
			if rand1==0: # stable first
				if 'bandit_loss' in task:
					cb[t]=str(0)
				if 'bandit_gain' in task:
					cb[t]=str(0)
			if rand1==1: # vol first
				if 'bandit_loss' in task:
					cb[t]=str(4)
				if 'bandit_gain' in task:
					cb[t]=str(4)
			if 'survey' in task and 'bandit' not in task: ## this is super sloppy and may cause problems later (Haha it did .. months later)
				cb[t] = str(1) ## can't start cb with 0 because its an integer field, maybe change some day
		cb = "".join(cb) # save it as a string

	return(tasks,cb)


def exp_page_bandit(request,outcome_type):

    print(outcome_type)

    # counter balance
    tasks = [str(x) for x in request.session['tasks']]
    cb = list(request.session['cb'])
    for t,task in enumerate(tasks):
	if 'bandit_'+outcome_type in task:
		current_cb = int(cb[t])

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

		# progress time 1
		ptime = str(p.progress_times)
		if('bandit gain start' not in ptime) and (outcome_type=='gain'):
			ptime = ptime+';bandit gain start:'+str(time.mktime(datetime.datetime.now().timetuple())) # this is all in seconds #
			p.progress_times = ptime
			p.save()
	    	if ('bandit loss start' not in ptime) and (outcome_type=='loss'):
			ptime = ptime+';bandit loss start:'+str(time.mktime(datetime.datetime.now().timetuple()))
			p.progress_times = ptime
			p.save()
		# progress time 2

		ptime = str(p.progress_times2)
		if('bandit gain start' not in ptime) and (outcome_type=='gain'):
			ptime = ptime+';bandit gain start:'+str(datetime.datetime.now()) # this is all in seconds #
			p.progress_times2 = ptime
			p.save()
	    	if ('bandit loss start' not in ptime) and (outcome_type=='loss'):
			ptime = ptime+';bandit loss start:'+str(datetime.datetime.now())
			p.progress_times2 = ptime
			p.save()




    print(type(current_cb))
    print(current_cb)

    print(outcome_type)
    if outcome_type=='gain':
	magname = 'reward'

    if outcome_type=='loss':
        magname = 'loss'


    # cb 0, 2 have sched 1
    # cb 1, 3 have sched 2

    # stab first
    if current_cb==0 or current_cb==2:
	green_rew = read_csv('new_schedules_2015-varying_section_length/sched1_180_green_'+magname+'.txt')
	blue_rew = read_csv('new_schedules_2015-varying_section_length/sched1_180_blue_'+magname+'.txt')
	outcomes = read_csv('new_schedules_2015-varying_section_length/sched1_180.txt')
	print('stable first')
    # vol first
    elif current_cb==1 or current_cb==3:
	green_rew = read_csv('new_schedules_2015-varying_section_length/sched2_180_green_'+magname+'.txt')
	blue_rew = read_csv('new_schedules_2015-varying_section_length/sched2_180_blue_'+magname+'.txt')
	outcomes = read_csv('new_schedules_2015-varying_section_length/sched2_180.txt')

    # vol first
    elif current_cb==4 or current_cb==5:
	green_rew = read_csv('new_schedules_2015-varying_section_length/sched3_180_green_'+magname+'.txt')
	blue_rew = read_csv('new_schedules_2015-varying_section_length/sched3_180_blue_'+magname+'.txt')
	outcomes = read_csv('new_schedules_2015-varying_section_length/sched3_180.txt')
	print('volatile first')
#(so can't attribute effects to green v blue color)
    # cb 0 and 1 have green=green image
    # cb 2 and 3 have green=blue iamge

    if current_cb==0 or current_cb==1 or current_cb==4:
	imageg='images/green.png'
	imageb='images/blue.png'
    elif current_cb==2 or current_cb==3 or current_cb==5: # the pairing is 0,2 ; 1,3 ; 4,5 for schedule/color counter-balance.
	imageb='images/green.png'
	imageg='images/blue.png'




    # Load Task Data
    variables = {}
    variables['green_reward']= green_rew
    variables['blue_reward'] = blue_rew
    variables['outcomes'] = outcomes
    variables['imageg'] = imageg
    variables['imageb'] = imageb
    variables['MID']=p.MID
    variables['outcome_type'] = outcome_type
    variables['cb'] = current_cb



    ###### Save trial to database #####
    # Get button presses upon subsequent presses
    resp = request.GET.get('resp')
    if resp is not None:
	print('here')
        T = Bandit_Trial(trialstart=request.GET.get('trialstart'),
        start_date=datetime.datetime.now(),
        outcome = request.GET.get('outcome'),
        correct_choice = request.GET.get('correct_choice'),
        trial_number = request.GET.get('currenttrial'),
        chosen_mag=request.GET.get('chosenmag'),
        green_reward=request.GET.get('green_value'),
        blue_reward=request.GET.get('blue_value'),
        reaction_time=request.GET.get('rt'),
        left_stimuli=request.GET.get('leftstim'),
        right_stimuli=request.GET.get('rightstim'),
        MID=p.MID,
	cb=current_cb,
	session_id=p.session_id,
	AID=p.AID,
	HID=p.HID,
	loss_or_reward=outcome_type,
	noresp=request.GET.get('noresp'),
	order=current_cb,
        totalpoints=request.GET.get('totalpoints'))

        T.save()

    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))


    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1
	ptime = str(p.progress_times)
	ptime = ptime+';bandit '+outcome_type+' end:'+str(time.mktime(datetime.datetime.now().timetuple()))
	#ptime = ptime+';bandit '+outcome_type+' end:'+str(datetime.datetime.now())
	# datetime.datetime.now()
	p.progress_times = ptime

	# progress time 2
	ptime = str(p.progress_times2)
	ptime = ptime+';bandit '+outcome_type+' end:'+str(datetime.datetime.now())
	p.progress_times2 = ptime


	p.save()


    return(render_to_response('experiment_bandit.html',variables))
