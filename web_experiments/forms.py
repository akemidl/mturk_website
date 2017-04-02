from django import forms
import numpy as np


class Questionnaire(forms.Form):
    
    def __init__(self,*args,**kwargs):
        
        if 'namme' in kwargs:
            self.name = kwargs.pop('namme')

        super(Questionnaire, self).__init__(*args, **kwargs)
        

        #### Instructions
        with open('web_experiments/small_data/'+self.name+'_Instruct.txt', 'r') as myfile:
            self.instruction=myfile.read()
	
	if self.name=='STAI_State' or self.name=='MASQ' or self.name=='STAI_Trait' or self.name=='PSWQ' or self.name=='ASIR' or self.name=='EPQ_48' or self.name=='CESD' or self.name=='EPQ' or self.name=='MD_consent' or self.name=='IUS':
		#### Choices
		with open('web_experiments/small_data/'+self.name+'_Choices.txt', 'r') as myfile:
		    self.choices=myfile.read().replace('\r','').split('\n')
		n_choices = len(self.choices)
		CHOICES = (())
		print('choices')
		print(self.choices)
		if self.choices[-1]=='':
			self.choices = self.choices[:-1]
		for c,choice in enumerate(self.choices):
		    temp = (c,choice,)
		    CHOICES = CHOICES+(temp,)

		#### Questions
		with open('web_experiments/small_data/'+self.name+'_Questions.txt', 'r') as f:
		    self.questions = [line.strip() for line in f]
		n_questions = len(self.questions)

		#### Add Fields to HTML Form
        	for i in xrange(n_questions):
                	self.fields['q%d' % i] = forms.ChoiceField(label=str(i)+'.  '+self.questions[i],widget=forms.RadioSelect, choices=CHOICES)

	elif self.name=='BDI':
		n_choices = 4
		#### Choices
		with open('web_experiments/small_data/'+self.name+'_Choices.txt', 'r') as myfile:
		    self.choices=myfile.read().replace('\r','').split('\n')
		
		n_questions = len(self.choices)/n_choices
		i = 0 
		for question in range(n_questions): 
			CHOICES = (())
			for c in range(n_choices):
		    		temp = (c,self.choices[i],)
		   	 	CHOICES = CHOICES+(temp,)
				i+=1

                	self.fields['q%d' % question] = forms.ChoiceField(label=str(question),widget=forms.RadioSelect, choices=CHOICES)
		
	elif self.name=='Demo':
		
		#### Questions
		with open('web_experiments/small_data/'+self.name+'_Questions.txt', 'r') as f:
		    self.questions = [line.strip() for line in f]
		n_questions = len(self.questions)
		
		for question in range(n_questions): 
			#### Choices
			with open('web_experiments/small_data/'+self.name+'_Choices'+str(question+1)+'.txt', 'r') as myfile:
			    self.choices=myfile.read().replace('\r','').split('\n')
			self.choices = self.choices[0:-1]	

			i = 0 
			CHOICES = (())
			for c in range(len(self.choices)):
		    		temp = (c,self.choices[i],)
		   	 	CHOICES = CHOICES+(temp,)
				i+=1

                	self.fields['q%d' % question] = forms.ChoiceField(label=self.questions[question],widget=forms.RadioSelect, choices=CHOICES)
		
  


            
