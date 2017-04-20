from django.http import Http404, HttpResponse
import datetime
from django.template import RequestContext
from django.shortcuts import render_to_response, render
import django
from django.utils import timezone
from web_experiments import models
from datetime import datetime, timedelta
import time
import random, string
from random import randint

from web_experiments.models import Participant, Bandit_Trial, QuestionnaireModel, Horizon_Trial, Ambi_Trial, MotionDots_Trial2,MotionDots_ColourSpeed_Trial
from web_experiments.forms import Questionnaire
import csv
import json
import simplejson
import numpy as np





##################################################
## Start a Task with  ##


# http://127.0.0.1:8000/?MID=1323&tasks=experiment_bandit_gain&cb=1&assign_id=adsfasdf&hit_id=asdfasdf

# http://127.0.0.1:8000/?MID=1323&tasks=experiment_ambi_gain&cb=1&assign_id=adsfasdf&hit_id=asdfasdf
# http://127.0.0.1:8000/?MID=1323&tasks=experiment_ambi_loss&cb=1&assign_id=adsfasdf&hit_id=asdfasdf


# http://127.0.0.1:8000/?MID=1323&tasks=experiment_horizon_gain&cb=1&assign_id=adsfasdf&hit_id=asdfasdf


# http://127.0.0.1:8000/?MID=13231234123&tasks=survey_STAI_Trait,survey_BDI,experiment_ambi_gain&cb=100&assign_id=adsfasdf&hit_id=asdfasdf

# http://127.0.0.1:8000/?MID=1323&tasks=survey_STAI_State&cb=1

# http://127.0.0.1:8000/?MID=1323&tasks=experiment_motiondots&cb=1&assign_id=adsfasdf&hit_id=asdfasdf

# http://127.0.0.1:8000/?MID=1323&tasks=experiment_motiondots_colourspeed&cb=1&assign_id=adsfasdf&hit_id=asdfasdf

# http://127.0.0.1:8000/?MID=1323&tasks=c_MD_consent&cb=1&assign_id=adsfasdf&hit_id=asdfasdf

# http://127.0.0.1:8000/?MID=1323&tasks=survey_BDI,recontact&cb=1&assign_id=adsfasdf&hit_id=asdfasdf


def index(request):


    # Get Amazon ID or Other ID from HTML request first time. (ex. A2GIYY77IUO78U)
    # if its not in the URL, get it from the session variable
    tempMID=request.GET.get('MID')
    if tempMID is not None:
       request.session['MID']=tempMID

    tempAID=request.GET.get('assign_id')
    if tempAID is not None:
       request.session['AID']=tempAID

    tempHID=request.GET.get('hit_id')
    if tempHID is not None:
       request.session['HID']=tempHID

    temptask=request.GET.get('tasks')
    if temptask is not None:
	tasks = [str(x) for x in temptask.split(',')]
        request.session['tasks']=tasks
	#print(tasks)
    else:
	tasks = request.session['tasks']

    temp_variables={}

    # check if participant exists in database
    participant_exists = Participant.objects.filter(MID=request.session['MID']).exists()
    repeat_session=0
    if participant_exists:
	repeat_session,p=get_same_participant_session(request,tasks)
	print('participant exists')

    if repeat_session==1:
	request.session['cb'] = str(p.cb2) # set the counter balance string **** it get's set by participant database variable not URL request, or generated anew


    # IF NOT, create a new person in database
    if repeat_session==0 or not participant_exists:

	print('creating new participant')
	# get a place holder for cb (just so its the right size); doesn't actually read in cb from URL
	cb = list(str(request.GET.get('cb'))) # create a list so can access items

	print(cb)
	print(tasks)

	#### BANDIT TASK Counterbalaning #### 
	tasks,cb = bandit_task_counter_balancing(tasks,cb,1)
	request.session['tasks']=tasks # save into cookies
	request.session['cb'] = cb
	######## 


	# generate random completion code
        completion_code = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(10)])
	session_id = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(4)])

	# generate new participant / save 
        p = Participant(MID=str(request.session['MID']), session_id=session_id, start_date=datetime.now(),progress_times='NULL',progress_times2='NULL',start_time=time.mktime(datetime.now().timetuple()),completion_code=completion_code,AID=tempAID,HID=tempHID,progress=0,total_tasks=len(tasks),tasks=','.join(tasks),cb=str(cb),cb2=cb) # add new participant to RDS database
        p.save()

	print('tasks {0}').format(p.tasks)
	print('counter balance {0}').format(p.cb2)

    print(p.show_info_sheet)

    temp_variables['completion_code'] = p.completion_code
    temp_variables['progress']=p.progress
    temp_variables['total_tasks']=p.total_tasks
    temp_variables['progress_countdown']=temp_variables['total_tasks']-temp_variables['progress']
    temp_variables['MID']=p.MID
    temp_variables['tasks'] = [str(x) for x in request.session['tasks']]
    temp_variables['show_info_sheet']=p.show_info_sheet

    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))


    #if valid_user:
        # pass relevant parameters to template and render
    return(render_to_response('index.html',temp_variables))
    #else:
        #return(render_to_response('redirect.html'))




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
			if 'survey' in task and 'bandit' not in task: ## this is super sloppy and may cause problems later
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
			ptime = ptime+';bandit gain start:'+str(time.mktime(datetime.now().timetuple())) # this is all in seconds #
			p.progress_times = ptime
			p.save()
	    	if ('bandit loss start' not in ptime) and (outcome_type=='loss'):
			ptime = ptime+';bandit loss start:'+str(time.mktime(datetime.now().timetuple()))
			p.progress_times = ptime
			p.save()
		# progress time 2 

		ptime = str(p.progress_times2)
		if('bandit gain start' not in ptime) and (outcome_type=='gain'):
			ptime = ptime+';bandit gain start:'+str(datetime.now()) # this is all in seconds #
			p.progress_times2 = ptime
			p.save()
	    	if ('bandit loss start' not in ptime) and (outcome_type=='loss'):
			ptime = ptime+';bandit loss start:'+str(datetime.now())
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
        start_date=datetime.now(),
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
	ptime = ptime+';bandit '+outcome_type+' end:'+str(time.mktime(datetime.now().timetuple()))
	#ptime = ptime+';bandit '+outcome_type+' end:'+str(datetime.now())
	# datetime.now()	
	p.progress_times = ptime

	# progress time 2
	ptime = str(p.progress_times2)
	ptime = ptime+';bandit '+outcome_type+' end:'+str(datetime.now())
	p.progress_times2 = ptime


	p.save()


    return(render_to_response('experiment_bandit.html',variables))











########################################
############## AMBI ####################

#http://127.0.0.1:8000/?MID=13233&tasks=experiment_ambicombined&cb=1&assign_id=adsfasdf&hit_id=asdfasdf

def exp_page_ambi_combined(request):

    print('here')
   # combined gain lossversion 
    outcome_type='combined'

    # get task list
    tasks = [str(x) for x in request.session['tasks']]

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

		# progress time 2 

		ptime = str(p.progress_times2)
		if('ambi combined start' not in ptime):
			ptime = ptime+'ambi combined start:'+str(datetime.now()) # this is all in seconds #
			p.progress_times2 = ptime
			p.save()




    variables = {}
    variables['MID']=p.MID

    # params 
    params=np.loadtxt('web_experiments/small_data/ambi/parameters/Parameters_block_gain_loss_combined.csv',delimiter=',',skiprows=1)


    variables['mag_l']=list(params[:,1])
    variables['mag_r']=list(params[:,2])
    variables['p_r']=list(params[:,3])
    variables['p_l']=list(params[:,4])
    variables['r_r']=list(params[:,5])
    variables['r_l']=list(params[:,6])

    #print(variables['mag_l'])


    # need make new practice 
    params_p=load_ambi_file3(version='2')
    print(params_p)
    variables['mag_l_p']=params_p[0]
    variables['mag_r_p']=params_p[1]
    variables['p_r_p']=params_p[2]
    variables['p_l_p']=params_p[3]
    variables['r_r_p']=params_p[4]
    variables['r_l_p']=params_p[5]

    # need new XOList
    with open('web_experiments/small_data/ambi/colours/colours_toinput_simple_combined.txt') as txt:
	XOlist = txt.read()
    variables['XOlist']=XOlist
    variables['XOlist_p']=load_ambi_file2('web_experiments/small_data/ambi/colours/colours_toinput_demo_chris_combined.txt')
    variables['outcome_type'] = outcome_type

    # save trial data
    resp = request.GET.get('resp')


    if resp is not None:
	print('here')
        T = Ambi_Trial(trialstart=request.GET.get('trialstart'),
        start_date=datetime.now(),
        outcome = request.GET.get('outcome'),
        resp = request.GET.get('resp'),
        trial_number = request.GET.get('currenttrial'),
        received_mag=request.GET.get('received_mag'),
        prop_left=request.GET.get('prop_left'),
        prop_right=request.GET.get('prop_right'),
        reaction_time=request.GET.get('rt'),
        revealed_right=request.GET.get('revealed_right'),
        revealed_left=request.GET.get('revealed_left'),
        mag_right=request.GET.get('mag_right'),
        mag_left=request.GET.get('mag_left'),
	practice=request.GET.get('practice'),
	revealed_o_r=request.GET.get('revealed_o_r'),
	revealed_o_l=request.GET.get('revealed_o_l'),
	revealed_x_r=request.GET.get('revealed_x_r'),
	revealed_x_l=request.GET.get('revealed_x_l'),
        MID=p.MID,
	session_id=p.session_id,
	AID=p.AID,
	HID=p.HID,
	loss_or_reward=outcome_type,
	noresp=request.GET.get('noresp'),
	five_trial_outcome = request.GET.get('five_trial_outcome'),
        totalpoints=request.GET.get('totalpoints'),
	instruct_number=request.GET.get('instruct_number'))

        T.save()

    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1 
	ptime = str(p.progress_times)
	# progress time 2
	ptime = str(p.progress_times2)
	ptime = ptime+';ambi '+outcome_type+' end:'+str(datetime.now())
	p.progress_times2 = ptime
	p.save()


    return(render_to_response('experiment_ambi_combined.html',variables))


###############################################

def exp_page_ambi(request,outcome_type):

    print(outcome_type)

    # get task list
    tasks = [str(x) for x in request.session['tasks']]

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

		# progress time 2 

		ptime = str(p.progress_times2)
		if('ambi gain start' not in ptime) and (outcome_type=='gain'):
			ptime = ptime+'ambi gain start:'+str(datetime.now()) # this is all in seconds #
			p.progress_times2 = ptime
			p.save()
	    	if ('ambi loss start' not in ptime) and (outcome_type=='loss'):
			ptime = ptime+';ambi loss start:'+str(datetime.now())
			p.progress_times2 = ptime
			p.save()
	


    # Load Task Data
    variables = {}
    if outcome_type=='gain':
	    params=load_ambi_file()
	    variables['mag_l']=params[0]
	    variables['mag_r']=params[1]
	    variables['p_r']=params[2]
            variables['p_l']=params[3]
	    variables['r_r']=params[4]
	    variables['r_l']=params[5]
	    params_p=load_ambi_file3()
	    print(params_p[0])
	    variables['mag_l_p']=params_p[0]
	    variables['mag_r_p']=params_p[1]
	    variables['p_r_p']=params_p[2]
            variables['p_l_p']=params_p[3]
	    variables['r_r_p']=params_p[4]
	    variables['r_l_p']=params_p[5]
	    variables['XOlist']=load_ambi_file2('web_experiments/small_data/ambi/colours/colours_toinput_simple.txt')
	    variables['XOlist_p']=load_ambi_file2('web_experiments/small_data/ambi/colours/colours_toinput_demo_chris.txt')
	    variables['outcome_type'] = outcome_type

    if outcome_type=='loss':
	    params=load_ambi_file()
	    variables['mag_l']=params[0]
	    variables['mag_r']=params[1]
	    variables['p_r']=params[2]
            variables['p_l']=params[3]
	    variables['r_r']=params[4]
	    variables['r_l']=params[5]
	    params_p=load_ambi_file3()
	    print(params_p[0])
	    variables['mag_l_p']=params_p[0]
	    variables['mag_r_p']=params_p[1]
	    variables['p_r_p']=params_p[2]
            variables['p_l_p']=params_p[3]
	    variables['r_r_p']=params_p[4]
	    variables['r_l_p']=params_p[5]
	    variables['XOlist']=load_ambi_file2('web_experiments/small_data/ambi/colours/colours_toinput_simple.txt')
	    variables['XOlist_p']=load_ambi_file2('web_experiments/small_data/ambi/colours/colours_toinput_demo_chris.txt')
	    variables['outcome_type'] = outcome_type



    variables['MID']=p.MID
    variables['outcome_type'] = outcome_type


    # save trial data
    resp = request.GET.get('resp')


    if resp is not None:
	print('here')
        T = Ambi_Trial(trialstart=request.GET.get('trialstart'),
        start_date=datetime.now(),
        outcome = request.GET.get('outcome'),
        resp = request.GET.get('resp'),
        trial_number = request.GET.get('currenttrial'),
        received_mag=request.GET.get('received_mag'),
        prop_left=request.GET.get('prop_left'),
        prop_right=request.GET.get('prop_right'),
        reaction_time=request.GET.get('rt'),
        revealed_right=request.GET.get('revealed_right'),
        revealed_left=request.GET.get('revealed_left'),
        mag_right=request.GET.get('mag_right'),
        mag_left=request.GET.get('mag_left'),
	practice=request.GET.get('practice'),
	revealed_o_r=request.GET.get('revealed_o_r'),
	revealed_o_l=request.GET.get('revealed_o_l'),
	revealed_x_r=request.GET.get('revealed_x_r'),
	revealed_x_l=request.GET.get('revealed_x_l'),
        MID=p.MID,
	session_id=p.session_id,
	AID=p.AID,
	HID=p.HID,
	loss_or_reward=outcome_type,
	noresp=request.GET.get('noresp'),
	five_trial_outcome = request.GET.get('five_trial_outcome'),
        totalpoints=request.GET.get('totalpoints'))

        T.save()

    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1 
	ptime = str(p.progress_times)
	# progress time 2
	ptime = str(p.progress_times2)
	ptime = ptime+';ambi '+outcome_type+' end:'+str(datetime.now())
	p.progress_times2 = ptime
	p.save()


    return(render_to_response('experiment_ambi.html',variables))


def load_ambi_file():
	newlist=[]
	for ii in range(4):
		fname = 'web_experiments/small_data/ambi/parameters/Parameters_block'+str(ii+1)+'_order1.txt'
		with open(fname) as f:
		    content = f.readlines()
		if ii==0:
		    content=content[0].split('\r')

		for i in content:
		    newlist.append(i.replace('{','').replace('}','').split(','))
	mag_l=[]
	mag_r=[]
	p_l=[]
	p_r=[]
	r_l=[]
	r_r=[]
	for iii in newlist:
		mag_l.append(iii[0])
		mag_r.append(iii[1])
		p_l.append(iii[2])
		p_r.append(iii[3])
		r_r.append(iii[4]) # supposed to be right
		r_l.append(iii[5])
	return([mag_l,mag_r,p_l,p_r,r_r,r_l])




def load_ambi_file2(fname):
	with open(fname) as f:
		content = f.readlines()
	for cc,c in enumerate(content):
		content[cc]=content[cc].replace('{','').replace('}','').replace('\n','').replace('\r','').split(',')[0:100]

	content = [item for sublist in content for item in sublist]
	content = "".join(content) ## make a big string 100011...
	#print(content)
	return(content)

## just for practice.. easier copying the function rather than allowing different inptu
def load_ambi_file3(version=''):
	newlist=[]
	# version 2 is for combined 
	fname = 'web_experiments/small_data/ambi/parameters/input_file_piloting_demo_chris'+version+'.txt'
	with open(fname) as f:
		content = f.readlines()


	#print(content)
	for i in content:
		newlist.append(i.replace('{','').replace('}','').split(','))
	mag_l=[]
	mag_r=[]
	p_l=[]
	p_r=[]
	r_l=[]
	r_r=[]
	for iii in newlist:
		mag_l.append(iii[0])
		mag_r.append(iii[1])
		p_l.append(iii[2])
		p_r.append(iii[3])
		r_r.append(iii[4]) # supposed to be right
		r_l.append(iii[5])
	return([mag_l,mag_r,p_l,p_r,r_r,r_l])


########################################
############## Horizon ####################

def exp_page_horizon(request,outcome_type):

    tasks = [str(x) for x in request.session['tasks']]

    ## Get same person based on Session Cookie.
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)
    		# need time stamp
    print(outcome_type)


    variables = {}
    variables['outcome_type'] = outcome_type

    ###### Save trial to database #####
    # Get button presses upon subsequent presses
    resp = request.GET.get('resp')
    if resp is not None:
        T = Horizon_Trial(trialstart=request.GET.get('trialstart'),
        start_date=datetime.now(),
        game_number = request.GET.get('game_number'),
        game_trial_number = request.GET.get('game_trial_number'),
        left_value = request.GET.get('left_value'),
        right_value=request.GET.get('right_value'),
        choice=request.GET.get('choice'),
        fixed=request.GET.get('fixed'),
        reaction_time=request.GET.get('rt'),
        MID=p.MID,
	session_id=p.session_id,
	loss_or_reward=request.GET.get('gametype'),
        totalpoints=request.GET.get('totalpoints'))
        T.save()

    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1
	### need time stamp
	p.save()

    return(render_to_response('experiment_horizon.html',variables))


############MOTION DOTS#################

def exp_page_motiondots(request):
    print('here')

    tasks = [str(x) for x in request.session['tasks']]

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

    variables={} #nothing I actually need to input here...

###### Save trial to database #####
    # Get button presses upon subsequent presses

     #resp = request.GET.get('response')
    trialstart=request.GET.get('trialstart')
    print('TESTING')
    print(trialstart)
    if trialstart is not None:
	print('here')
        T = MotionDots_Trial2(
        start_date=datetime.now(),
        response = request.GET.get('response'),
	slider_start_position=request.GET.get('slider_start_position'),
        RT = request.GET.get('rt'),
        trial_type = request.GET.get('trial_type'),
        currenttrial = request.GET.get('currenttrial'),
	numbertrials_elapsed=request.GET.get('numbertrials_elapsed'),
        slider_position_subjectresponse=request.GET.get('slider_position_subjectresponse'),
        slider_position_subjectresponse_array=request.GET.get('slider_position_subjectresponse_array'),
        speed_eachdot=request.GET.get('speed_eachdot'),
        colour_eachdot=request.GET.get('colour_eachdot'),
        true_outcome_colour=request.GET.get('true_outcome_colour'),
        true_outcome_speed=request.GET.get('true_outcome_speed'),
	outcome_bar_position=request.GET.get('outcome_bar_position'),
        trialstart=request.GET.get('trialstart'),
        choicebutton_side=request.GET.get('choicebutton_side'),
	choicemade_array=request.GET.get('choicemade_array'),
        correct=request.GET.get('correct'),
        category_boundary=request.GET.get('category_boundary'),
        last_pressed=request.GET.get('last_pressed'),

	#noresp=request.GET.get('noresp'),
        MID=p.MID,
	    session_id=p.session_id, #Do we have this for motion dots? Same with AID and HID...
	    AID=p.AID,
	    HID=p.HID)

        T.save()

    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))

    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1
	ptime = str(p.progress_times)
	p.progress_times = ptime
	p.save()

    return(render_to_response('experiment_motiondots_django.html',variables))



############MOTION DOTS COLOUR and SPEED#################

def exp_page_motiondots_colourspeed(request):
    print('here')

    tasks = [str(x) for x in request.session['tasks']]

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

    variables={} #nothing I actually need to input here...

###### Save trial to database #####
    # Get button presses upon subsequent presses

     #resp = request.GET.get('response')
    trialstart=request.GET.get('trialstart')
    print('TESTING')
    print(trialstart)
    if trialstart is not None:
	print('here')
        T = MotionDots_ColourSpeed_Trial(
        start_date=datetime.now(),
        response = request.GET.get('response'),
        RT = request.GET.get('rt'),
        trial_type = request.GET.get('trial_type'),
        currenttrial = request.GET.get('currenttrial'),
	numbertrials_elapsed=request.GET.get('numbertrials_elapsed'),
        speed_eachdot=request.GET.get('speed_eachdot'),
        colour_eachdot=request.GET.get('colour_eachdot'),
        true_outcome_colour=request.GET.get('true_outcome_colour'),
        true_outcome_speed=request.GET.get('true_outcome_speed'),
        trialstart=request.GET.get('trialstart'),
        choicebutton_side=request.GET.get('choicebutton_side'),
	choicemade_array=request.GET.get('choicemade_array'),
        correct=request.GET.get('correct'),
        category_boundary_speed=request.GET.get('category_boundary_speed'),
        category_boundary_colour=request.GET.get('category_boundary_colour'),
        last_pressed=request.GET.get('last_pressed'),
	#speed_array_thistrial=request.GET.get('speed_array_thistrial'),
	#rb_array_thistrial=request.GET.get('rb_array_thistrial'),
	#rc_array_thistrial=request.GET.get('rc_array_thistrial'),
	random_numbers_array=request.GET.get('random_numbers_array'),

	#noresp=request.GET.get('noresp'),
        MID=p.MID,
	    session_id=p.session_id, #Do we have this for motion dots? Same with AID and HID...
	    AID=p.AID,
	    HID=p.HID)

        T.save()

    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))

    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1
	ptime = str(p.progress_times)
	p.progress_times = ptime
	p.save()

    return(render_to_response('experiment_motiondots_colourspeed_django.html',variables))

########################################
########## Questionnaires #############


def surveyDisplay(request,survey_name):

    tasks = [str(x) for x in request.session['tasks']]
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)


		ptime = str(p.progress_times)
		ptime = ptime+';'+survey_name+' start:'+str(time.mktime(datetime.now().timetuple()))
		p.progress_times = ptime

		# progress times 2
		ptime = str(p.progress_times2)
		ptime = ptime+';'+survey_name+' start:'+str(datetime.now())
		p.progress_times2 = ptime

		p.save()

    #print(survey_name)

    csrfContext = RequestContext(request)
    form = Questionnaire(namme=survey_name)
    csrfContext['form']=form
    csrfContext['instructions']=form.instruction

    #print(form)

    return(render_to_response('survey.html',csrfContext))



def surveyProcess(request,survey_name):

    tasks = [str(x) for x in request.session['tasks']]
       ## Get same person based on Session Cookie.
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

    #print(p.MID)

    variables={}

     

    ### validate survey response ###
    bdi_total=0
    if request.method == 'POST':
        form = Questionnaire(request.POST,namme=survey_name)
        for key in request.POST.iterkeys():
            value = request.POST.getlist(key)
            v=value[0]
            if 'q' in key:
                #if p.MID is None:
                #   p.MID = 'None'
                Q = QuestionnaireModel(survey_name=survey_name,MID=p.MID,AID=p.AID,HID=p.HID, start_date=datetime.now(),start_time=time.mktime(datetime.now().timetuple()),question=key.replace('q',''),answer=v)
                Q.save()
		bdi_total=bdi_total+int(v) # in case I need this 
	    
	    ## add BDI, check for suicide question
            if survey_name =='BDI':
	    	print('here')
		if key=='q8':
		    if int(v)>0:
			print('suicide question')
			p.show_info_sheet=1
		    
			
		
  	    print(key)
	    print(value)

        if form.is_valid():
            variables['survey_completed']=True

	    ## gate keeping progress for consent form ## 

            p.progress+=1 ### increment progress
	    ptime = str(p.progress_times)
	    ptime = ptime+';'+survey_name+' end:'+str(time.mktime(datetime.now().timetuple()))
	    p.progress_times = ptime

            # progress times 2
	    ptime = str(p.progress_times2)
	    ptime = ptime+';'+survey_name+' end:'+str(datetime.now())
	    p.progress_times2 = ptime

	    #print('here')
	    p.save()
        else:
            variables['survey_completed']=False

    #print(variables)
    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))



    return render_to_response('survey_results.html',variables)

########################################
########## MSCL Pages #############


def infosheetDisplay(request):

    name = 'info_sheet.html'
    csrfContext = RequestContext(request)
    return(render_to_response(name,csrfContext))

def withdrawDisplay(request):

    name = 'withdraw.html'
    csrfContext = RequestContext(request)
    return(render_to_response(name,csrfContext))

########################################
########## Consents #############

# to get surveys to display - you need - 
# c_MD_consent
# c_

def consentDisplay(request,survey_name):

    tasks = [str(x) for x in request.session['tasks']]
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)


		ptime = str(p.progress_times)
		ptime = ptime+';'+survey_name+' start:'+str(time.mktime(datetime.now().timetuple()))
		p.progress_times = ptime

		# progress times 2
		ptime = str(p.progress_times2)
		ptime = ptime+';'+survey_name+' start:'+str(datetime.now())
		p.progress_times2 = ptime

		p.save()

    #print(survey_name)

    csrfContext = RequestContext(request)
    #form = Questionnaire(namme=survey_name)
    #csrfContext['form']=form
    #csrfContext['instructions']=form.instruction

    #print(form)

    if 'MD_consent' in survey_name:
	name = 'consent_MD.html'
    if 'AMT_Bishop1' in survey_name:
	name = 'consent_AMT_Bishop1.html'

    return(render_to_response(name,csrfContext))



def consentProcess(request,survey_name):

    tasks = [str(x) for x in request.session['tasks']]
       ## Get same person based on Session Cookie.
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

    #print(p.MID)

    variables={}

    ### validate survey response ###
    if request.method == 'POST':


	## yes's checked (a vector a the yes's)
	yeses = 0
        for key in request.POST.iterkeys():
            value = request.POST.getlist(key)
            v=value[0]
	    print('here')
	    print(key)
	    print(str(value))
	    if 'Yes' in value:
		yeses+=1 # tally which ones they said yes to

        print('number of yeses')
	print(yeses)


	# total number of yeses 
	if 'MD_consent' in survey_name:
		totalyeses=8
	if 'AMT_Bishop1' in survey_name:
		totalyeses=8

 
        if yeses==totalyeses: # number of yeses should equal the number of questions XX HARD CODED AT THE MOMENT # 
	    variables['survey_completed']=True

            p.progress+=1 ### increment progress
	    ptime = str(p.progress_times)
	    ptime = ptime+';'+survey_name+' end:'+str(time.mktime(datetime.now().timetuple()))
	    p.progress_times = ptime

            # progress times 2
	    ptime = str(p.progress_times2)
	    ptime = ptime+';'+survey_name+' end:'+str(datetime.now())
	    p.progress_times2 = ptime

	    #print('here')
	    p.save()
        else:
            variables['survey_completed']=False

    #print(variables)
    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))



    return render_to_response('consent_results.html',variables)


###############################################
################## Recontacting ################

def recontactDisplay(request):
    survey_name='recontact'
    tasks = [str(x) for x in request.session['tasks']]
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)


		ptime = str(p.progress_times)
		ptime = ptime+';'+survey_name+' start:'+str(time.mktime(datetime.now().timetuple()))
		p.progress_times = ptime

		# progress times 2
		ptime = str(p.progress_times2)
		ptime = ptime+';'+survey_name+' start:'+str(datetime.now())
		p.progress_times2 = ptime

		p.save()

    csrfContext = RequestContext(request)

    return(render_to_response('recontact.html',csrfContext))


def recontactProcess(request):
    print('here')
    survey_name = 'recontact'
    tasks = [str(x) for x in request.session['tasks']]
       ## Get same person based on Session Cookie.
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

    variables={}
    print('made it this far')
    ### validate survey response ###
    if request.method == 'POST':

	## yes's checked (a vector a the yes's)
	yeses=0
        for key in request.POST.iterkeys():
            value = request.POST.getlist(key)
            v=value[0]
            print(value)
	    if 'Yes' in value:
		yeses+=1 # tally which ones they said yes to
	
	# total number of yeses
	totalyeses=1


        if yeses==totalyeses: # number of yeses should equal the number of questions XX HARD CODED AT THE MOMENT # 
	    variables['agreed_to_come_back']=True
            p.agreed_to_be_contacted=1

        else:
            variables['agreed_to_come_back']=False
	    p.agreed_to_be_contacted=1


	p.progress+=1 ### increment progress
	ptime = str(p.progress_times)
        ptime = ptime+';'+survey_name+' end:'+str(time.mktime(datetime.now().timetuple()))
        p.progress_times = ptime

        # progress times 2
        ptime = str(p.progress_times2)
        ptime = ptime+';'+survey_name+' end:'+str(datetime.now())
        p.progress_times2 = ptime

        #print('here')
        p.save()


    return render_to_response('recontact_results.html',variables)


########################################
############## MSCL ####################

def get_same_participant_session(request,tasks):
	# determine if they have an entry with same tasks
	p_set = Participant.objects.filter(MID=request.session['MID'])
	repeat_session=0
	p=None
	for pp in p_set:
	# do they have the same tasks as a previous visit?
		old_tasks=[str(x) for x in pp.tasks.split(',')]
		#print(old_tasks)
		#print(tasks)

		if set(tasks)==set(old_tasks):
			repeat_session=1
			p=pp # set the participant object to that specific session
	return(repeat_session,p)



def read_csv(filepath,col=0):

    column=[]
    included_cols = [col]
    with open('web_experiments/small_data/'+filepath, 'rU') as f:
        reader = csv.reader(f)
	print(reader)
        for row in reader:
                c=list(row[i] for i in included_cols)
                column.append(c[0])
    return(column)

########################################
#### CHECKING COMPLETION from AMT ######

# not working yet #

def json_response(func):
    """
    A decorator thats takes a view response and turns it
    into json. If a callback is added through GET or POST
    the response is JSONP. Apparently, you can't just return JSON object from a request. A jsonp which allows non-local requests. (Browsers prevent javascript from querying offsite). you need to return a function wrapper.
    """
    def decorator(request, *args, **kwargs):
        objects = func(request, *args, **kwargs)
        if isinstance(objects, HttpResponse):
            return objects
        try:
            data = simplejson.dumps(objects)
            if 'callback' in request.REQUEST:
                # a jsonp response!
                data = '%s(%s);' % (request.REQUEST['callback'], data)
                return HttpResponse(data, "text/javascript")
        except:
            data = simplejson.dumps(str(objects))
        return HttpResponse(data, "application/json")
    return decorator


@json_response
def completed(request):
    comp_code=None
    MID=request.GET.get('MID')


    response = HttpResponse()
    if Participant.objects.filter(MID=MID).exists():
        P = Participant.objects.filter(MID=MID)
        for p in P:
            p=p
        comp_code = p.completion_code
        completed = p.completed
    else:
        comp_code = None
        completed = 0


    return {'code':comp_code, 'completed':completed}

    #from django.http import JsonResponse
    #return HttpResponse("{'asdfs':'asdfasdf'}")
    #return HttpResponse(json.dumps({'foo':'bar'}), content_type="application/json")
    #return JsonResponse({'foo':'bar'})
    #return Response(data)





def test(request):


    with open ("web_experiments/small_data/Test.html", "r") as myfile:
        my_html=myfile.read()

    variables = {}
    variables['my_html']=my_html

    return render_to_response('test.html',variables)