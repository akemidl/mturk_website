# import django stuff
from django.http import Http404, HttpResponse
import datetime
from django.template import RequestContext
from django.shortcuts import render_to_response, render
import django
from django.utils import timezone

# import mscl
import csv
import json
import numpy as np
import time
import random, string
from random import randint

# import shared stuff
from web_experiments import models
from web_experiments.models import Participant, Bandit_Trial, QuestionnaireModel, Horizon_Trial, Ambi_Trial, MotionDots_Trial2,MotionDots_ColourSpeed_Trial
from web_experiments.forms import Questionnaire
from shared_mscl import *

# import experiments
from experiment_example.experiment_example_views import exp_page_example
from experiment_ambi_combined.experiment_ambi_combined_views import exp_page_ambi_combined
from experiment_ambi.experiment_ambi_views import exp_page_ambi
from experiment_bandit.experiment_bandit_views import bandit_task_counter_balancing, exp_page_bandit
from experiment_horizon.experiment_horizon_views import exp_page_horizon
from experiment_beliefupdate.experiment_beliefupdate_views import exp_page_beliefupdate

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
        p = Participant(MID=str(request.session['MID']), session_id=session_id, start_date=datetime.datetime.now(),progress_times='NULL',progress_times2='NULL',start_time=time.mktime(datetime.datetime.now().timetuple()),completion_code=completion_code,AID=tempAID,HID=tempHID,progress=0,total_tasks=len(tasks),tasks=','.join(tasks),cb=str(cb),cb2=cb) # add new participant to RDS database
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
########## Questionnaires #############


def surveyDisplay(request,survey_name):

    tasks = [str(x) for x in request.session['tasks']]
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)


		ptime = str(p.progress_times)
		ptime = ptime+';'+survey_name+' start:'+str(time.mktime(datetime.datetime.now().timetuple()))
		p.progress_times = ptime

		# progress times 2
		ptime = str(p.progress_times2)
		ptime = ptime+';'+survey_name+' start:'+str(datetime.datetime.now())
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
                Q = QuestionnaireModel(survey_name=survey_name,MID=p.MID,AID=p.AID,HID=p.HID, start_date=datetime.datetime.now(),start_time=time.mktime(datetime.datetime.now().timetuple()),question=key.replace('q',''),answer=v)
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
	    ptime = ptime+';'+survey_name+' end:'+str(time.mktime(datetime.datetime.now().timetuple()))
	    p.progress_times = ptime

            # progress times 2
	    ptime = str(p.progress_times2)
	    ptime = ptime+';'+survey_name+' end:'+str(datetime.datetime.now())
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
		ptime = ptime+';'+survey_name+' start:'+str(time.mktime(datetime.datetime.now().timetuple()))
		p.progress_times = ptime

		# progress times 2
		ptime = str(p.progress_times2)
		ptime = ptime+';'+survey_name+' start:'+str(datetime.datetime.now())
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
	    ptime = ptime+';'+survey_name+' end:'+str(time.mktime(datetime.datetime.now().timetuple()))
	    p.progress_times = ptime

            # progress times 2
	    ptime = str(p.progress_times2)
	    ptime = ptime+';'+survey_name+' end:'+str(datetime.datetime.now())
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
		ptime = ptime+';'+survey_name+' start:'+str(time.mktime(datetime.datetime.now().timetuple()))
		p.progress_times = ptime

		# progress times 2
		ptime = str(p.progress_times2)
		ptime = ptime+';'+survey_name+' start:'+str(datetime.datetime.now())
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
        ptime = ptime+';'+survey_name+' end:'+str(time.mktime(datetime.datetime.now().timetuple()))
        p.progress_times = ptime

        # progress times 2
        ptime = str(p.progress_times2)
        ptime = ptime+';'+survey_name+' end:'+str(datetime.datetime.now())
        p.progress_times2 = ptime

        #print('here')
        p.save()


    return render_to_response('recontact_results.html',variables)
