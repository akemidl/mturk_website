from django.shortcuts import render_to_response, render

# import shared stuff
from web_experiments.models import Participant
from web_experiments.views import *

# import mscl
import numpy as np
import json
import datetime




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
			ptime = ptime+'ambi gain start:'+str(datetime.datetime.now()) # this is all in seconds #
			p.progress_times2 = ptime
			p.save()
	    	if ('ambi loss start' not in ptime) and (outcome_type=='loss'):
			ptime = ptime+';ambi loss start:'+str(datetime.datetime.now())
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
        start_date=datetime.datetime.now(),
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
	ptime = ptime+';ambi '+outcome_type+' end:'+str(datetime.datetime.now())
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
