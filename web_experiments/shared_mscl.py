########################################
############## MSCL ####################

import csv

from web_experiments.models import Participant

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
