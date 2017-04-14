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

from web_experiments.models import Participant, Bandit_Trial, QuestionnaireModel, Horizon_Trial, MotionDots_Trial
from web_experiments.forms import Questionnaire
import csv
import json
import simplejson




##################################################
## Start a Task with  ##

# http://127.0.0.1:8000/?MID=1323&tasks=experiment_motiondots&cb=1&assign_id=adsfasdf&hit_id=asdfasdf

# http://127.0.0.1:8000/?MID=1323&tasks=experiment_bandit_gain&cb=1&assign_id=adsfasdf&hit_id=asdfasdf
# http://127.0.0.1:8000/?MID=1323&tasks=experiment_horizon_gain&cb=1&assign_id=adsfasdf&hit_id=asdfasdf


# http://127.0.0.1:8000/?MID=1323&tasks=survey_STAI_State&cb=1


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
	print(tasks)
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
	request.session['cb'] = str(p.cb) # set the counter balance string **** it get's set by participant database variable not URL request, or generated anew
	print('cb=')
	print(p.cb)
	print('here1')

    # IF NOT, create a new person in database
    if repeat_session==0 or not participant_exists:
	
	print('creating new participant')
	# get a place holder for cb (just so its the right size); doesn't actually read in cb from URL 
	cb = list(str(request.GET.get('cb'))) # create a list so can access items
	
	# switch order of bandit tasks # later. #    


	# generate counter balance 
	rand = random.randint(0,3)

	
	for t,task in enumerate(tasks): #// for now this part is irrelevant because they do the hits individually. 
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

		if 'survey' in task and 'bandit' not in task: ## this is super sloppy and may cause problems later
			cb[t] = str(1) ## can't start cb with 0 because its an integer field, maybe change some day
	cb = "".join(cb) # save it as a string
	print('cb=')
	print(cb)
	

	# generate random completion code
        completion_code = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(10)])
	session_id = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(4)])

	# generate new participant 
        p = Participant(MID=str(request.session['MID']), session_id=session_id, start_date=datetime.now(),progress_times='NULL',start_time=time.mktime(datetime.now().timetuple()),completion_code=completion_code,AID=tempAID,HID=tempHID,progress=0,total_tasks=len(tasks),tasks=temptask,cb=cb) # add new participant to RDS database    

	request.session['cb'] = cb

        p.save()
	print('here 2')
	print(p.cb)


    temp_variables['completion_code'] = p.completion_code 
    temp_variables['progress']=p.progress
    temp_variables['total_tasks']=p.total_tasks
    temp_variables['progress_countdown']=temp_variables['total_tasks']-temp_variables['progress']
    temp_variables['MID']=p.MID
    temp_variables['tasks'] = [str(x) for x in request.session['tasks']]

    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))


   # set some indication of whether they've visited an experimental page or not
    request.session['first_time_bandit_loss'] = 2
    request.session['first_time_bandit_gain'] = 2 # 2 = not in tasks set
    print(type(request.session['tasks']))
    if 'bandit_gain' in ''.join(request.session['tasks']):
	request.session['first_time_bandit_gain'] = 0
    if 'bandit_loss' in ''.join(request.session['tasks']):
   	request.session['first_time_bandit_loss'] = 0
    

    #if valid_user:
        # pass relevant parameters to template and render 
    return(render_to_response('index.html',temp_variables))
    #else:
        #return(render_to_response('redirect.html'))




########################################
########### BANDIT TASK ##############

def exp_page_bandit(request,outcome_type):

    print(outcome_type)

    # counter balance 
    tasks = [str(x) for x in request.session['tasks']]
    cb = request.session['cb']
    for t,task in enumerate(tasks):
	if 'bandit_'+outcome_type in task:
		current_cb = int(cb[t])

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)
	    	if request.session['first_time_bandit_gain']==0:
			ptime = str(p.progress_times)
			ptime = ptime+';bandit gain start:'+str(time.mktime(datetime.now().timetuple()))
			p.progress_times = ptime
			p.save()
	    	if request.session['first_time_bandit_loss']==0:
			ptime = str(p.progress_times)
			ptime = ptime+';bandit loss start:'+str(time.mktime(datetime.now().timetuple()))
			p.progress_times = ptime
			p.save()
	    




    print(type(current_cb))
    print(current_cb)


    if outcome_type=='gain':
	magname = 'reward'
	request.session['first_time_bandit_gain']=1
    elif outcome_type=='loss':
        magname = 'loss'
	request.session['first_time_bandit_loss']=1

    # cb 0, 2 have sched 1
    # cb 1, 3 have sched 2 
    if current_cb==0 or current_cb==2:
	green_rew = read_csv('new_schedules_2015-varying_section_length/sched1_180_green_'+magname+'.txt')
	blue_rew = read_csv('new_schedules_2015-varying_section_length/sched1_180_blue_'+magname+'.txt')
	outcomes = read_csv('new_schedules_2015-varying_section_length/sched1_180.txt')
    elif current_cb==1 or current_cb==3:
	green_rew = read_csv('new_schedules_2015-varying_section_length/sched2_180_green_'+magname+'.txt')
	blue_rew = read_csv('new_schedules_2015-varying_section_length/sched2_180_blue_'+magname+'.txt')
	outcomes = read_csv('new_schedules_2015-varying_section_length/sched2_180.txt')
	
#(so can't attribute effects to green v blue color)
    # cb 0 and 1 have green=green image
    # cb 2 and 3 have green=blue iamge 
  
    if current_cb==0 or current_cb==1:
	imageg='images/green.png'
	imageb='images/blue.png'
    elif current_cb==2 or current_cb==3:
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
	p.progress_times = ptime
	p.save()


    return(render_to_response('experiment_bandit.html',variables))



############MOTION DOTS#################

def exp_page_motiondots(request):


    tasks = [str(x) for x in request.session['tasks']]

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

    variables={} #nothing I actually need to input here...


###### Save trial to database #####
    # Get button presses upon subsequent presses
    resp = request.GET.get('resp')
    if resp is not None:
	print('here')
        T = MotionDots_Trial(
	trialstart=request.GET.get('trialstart'), 
        start_date=datetime.now(),
        response = request.GET.get('response'),
        RT = request.GET.get('RT'),
        trial_number = request.GET.get('currenttrial'),
        slider_position_subjectresponse=request.GET.get('sliderposition_tmp'),
        slider_position_subjectresponse_array=request.GET.get('slideposition_array'),
        speed_eachdot=request.GET.get('speed_eachdot'),
        colour_eachdot=request.GET.get('colour_eachdot'),
        true_outcome_colour=request.GET.get('true_outcome_colour'),
        true_outcome_speed=request.GET.get('true_outcome_speed'),
	context_thistrial=request.GET.get('context_thistrial'),
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


########################################
############## AMBI ####################

def exp_page_ambi(request,outcome_type):



    print(outcome_type)

    # counter balance 
    tasks = [str(x) for x in request.session['tasks']]
    cb = request.session['cb']
    for t,task in enumerate(tasks):
	if 'ambi' in task:
		current_cb = cb[t]

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)
	    

    print(current_cb)

    # Load Task Data 
    variables = {}
    if outcome_type=='gain':
	    params=load_ambi_file()
	    variables['mag_l']=params[0]
	    variables['mag_r']=params[1]
	    variables['p_l']=params[2]
            variables['p_r']=params[3]
	    variables['r_r']=params[4]
	    variables['r_l']=params[5]
	    variables['XOlist']=load_ambi_file2()


    variables['MID']=p.MID
    variables['outcome_type'] = outcome_type


    # save trial data 
	


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

def load_ambi_file2():
	fname = 'web_experiments/small_data/ambi/colours/colours_toinput_simple.txt' #
	with open(fname) as f:
		content = f.readlines()
	for cc,c in enumerate(content):
		content[cc]=content[cc].replace('{','').replace('}','').replace('\n','').replace('\r','').split(',')[0:100]
	
	content = [item for sublist in content for item in sublist]
	content = "".join(content) ## make a big string 100011... 
	#print(content)
	return(content)

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
		p.save()

    csrfContext = RequestContext(request)    
    form = Questionnaire(namme=survey_name)
    csrfContext['form']=form
    csrfContext['instructions']=form.instruction

    return(render_to_response('survey.html',csrfContext))
    

    
def surveyProcess(request,survey_name):

    tasks = [str(x) for x in request.session['tasks']]
       ## Get same person based on Session Cookie.     
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)
    
    print(p.MID)

    variables={}

    ### validate survey response ### 
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

        if form.is_valid():
            variables['survey_completed']=True
            p.progress+=1 ### increment progress 
	    ptime = str(p.progress_times)
	    ptime = ptime+';'+survey_name+' end:'+str(time.mktime(datetime.now().timetuple()))
	    p.progress_times = ptime
	    print('here')
	    p.save()
        else:
            variables['survey_completed']=False

    print(variables)
    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))


    
    return render_to_response('survey_results.html',variables)
    
    

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
		print(old_tasks)
		print(tasks)

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


    
    
    
