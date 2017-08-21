
// Needs other variables from script inside .html template

// LOSS OR REWARD 

console.log(outcome_type)

if(outcome_type=='gain'){

 var totalpoints = 0
 var sign = 1

}else if(outcome_type=='loss'){
 var totalpoints = 10000
 var sign = -1

}


// Counters
var currentevent = 0
var currenttrial = 0


// Permissions
var canProceed = true // allowed to press space bar 
var trialrunning = false // 
var canRespond = false // respond left or right (only during trial)

// Timings 
var decisionlim = 6000
var ITI = 2000
var outcomelim = 2000
var min_decisionlim = 1000 
var allow_instruct_to_press = false; 

// Mscl
var startTrialTime = 0;
var response 

var finished = 0; 


var eventarray = []


var total_instruct =17
var num_trials = 10


// Create Event Array 
for (i = 0; i <total_instruct; i++) {
	var eventarray = eventarray.concat('instruct-'+i.toString())
}
for (i = 0; i <num_trials; i++) {
	var eventarray = eventarray.concat('trial-'+i.toString())
	if(i % 10 ==9){
		var eventarray = eventarray.concat('break')
	}
}

var eventarray = eventarray.concat('endscreen')

var eventt = eventarray[0]
console.log(eventarray)

// Create  Side of screen Array 
side_of_screen = []
for (i = 0; i <num_trials; i++) {
	var side_of_screen = side_of_screen.concat(Math.floor(Math.random()*2))
}
console.log(side_of_screen)

$(document).ready( function() {
	

	/*Setup Functions */
	$('#button_continue').show();
	$('#button_previous').hide();
	$('#button_return_home').hide();
	
	$('#stim_green').hide();	
	$('#stim_blue').hide();
	$('#outcome').hide();
	$('#fixation').hide();
	$('#trialcounter').hide();
	$('#pointscounter').hide();
	$('#instruct').show();
	$('#noresp').hide();
	$('#thanks').hide();


	Proceed('next');

	document.getElementById("stim_green").style.border='None'
	document.getElementById("stim_blue").style.border='None'
	
	
	//$(document).bind('keyup',Proceed);
	$(document).bind('keyup',Pressedleft);
	$(document).bind('keyup',Pressedright);
	$("#button_continue" ).click(function() {
		Proceed('next');
	});
	$("#button_previous" ).click(function() {
		
		Proceed('previous');
	});

	
});

/// Key Codes
// 32 = space
// 13 = enter
// 77 = m
// 90 = z
// 37 = left arrow 
// 39 = right arrow 

function Proceed(e){


	if (canProceed==true){

		if(e=='next'){
			currentevent+=1
		}
		if(e=='previous'){
			currentevent-=1
		}

		if(currentevent<0){
			currentevent=0
		}

		eventt=String(eventarray[currentevent])
		console.log(eventt.indexOf('instruct'))
		console.log(eventt)
		

		//// Do current event 
		if (eventt.indexOf('instruct')==0){
			RunInstruct(eventt);
		} else if (eventt.indexOf('trial')==0){
			$('#instruct').hide()
			$('#button_continue').hide()
			$('#button_previous').hide()
			$("#fixation").show()

			if(currenttrial==0){
				timeout1 = setTimeout(function() {
					var element = document.getElementById("fixation");
					element.innerHTML = '1'
				}, 0);
				timeout1 = setTimeout(function() {
					var element = document.getElementById("fixation");
					element.innerHTML = '2'
				}, 1000);
				timeout1 = setTimeout(function() {
					var element = document.getElementById("fixation");
					element.innerHTML = '3'
				}, 2000);
				timeout1 = setTimeout(function() {
					var element = document.getElementById("fixation");
					element.innerHTML = '+'
				RunTrial(eventt); // wait on the first trial. 
				}, 3000);
			}else{
				RunTrial(eventt);
			}

		}else if(eventt.indexOf('break')==0){
			RunBreak();
		} 
		else if (eventt.indexOf('endscreen')==0){
			RunEndScreen();
		}
		



	}
}



function RunTrial(event) {
	
	// trial start time 
	startTrialTime = new Date().getTime();

	//display
	$('#trialcounter').show()
	$('#pointscounter').show()
	$('#fixation').show()

	
	trialrunning = true
	canProceed = false 
	canRespond = false 
	
	//determine side of screen
	if(side_of_screen[currenttrial]==0){

		document.getElementById("stim_green").style.left = "10%";
		document.getElementById("stim_green").style.right = "auto";
	
		document.getElementById("stim_blue").style.right = "10%";
		document.getElementById("stim_blue").style.left = "auto";

	}else if(side_of_screen[currenttrial]==1){
			
		document.getElementById("stim_green").style.right = "10%";
		document.getElementById("stim_green").style.left = "auto";
	
		document.getElementById("stim_blue").style.left = "10%";
		document.getElementById("stim_blue").style.right = "auto";

	}

	// display stimuli 
	$('#stim_green').show();
	$('#stim_blue').show();

	// display magnitudes
	var element = document.getElementById("stim_text_green");
	element.innerHTML = green_reward[currenttrial].replace("'", "").replace("'","")
	var element = document.getElementById("stim_text_blue");
	element.innerHTML= blue_reward[currenttrial].replace("'", "").replace("'","")
	
	// get current rtial 
	currentnumber = parseInt(event.split('-')[2])// get number 
	
	// Set time out for cross 
	timeout2 = setTimeout(function(){
		var element = document.getElementById("fixation");
		element.innerHTML = '?'
		canRespond = true
		
	},min_decisionlim);
	
	// Set trial time out for no response
	timeout1 = setTimeout(function() {
		$('#stim_green').hide();
		$('#stim_blue').hide();
		$('#noresp').show();
		Outcome('noresp');
	}, decisionlim);

	
}




function Pressedleft(e) {
	console.log('pressed left')
	if (canRespond==true && e.keyCode==90 ) {
		if(side_of_screen[currenttrial]==0){
		Outcome('green')}else{Outcome('blue')}
	}

}
function Pressedright(e) {
	console.log('pressed right')
	console.log(allow_instruct_to_press)
	if (canRespond==true && e.keyCode==77) {
		if(side_of_screen[currenttrial]==0){
		Outcome('blue')}else{Outcome('green')}
	}
	if(allow_instruct_to_press){
		if (e.keyCode==77){Proceed('next')}
	}

}



function Outcome(response){
	if (trialrunning==true){

	// show selection
		if(response=='green'){
			document.getElementById("stim_green").style.border='solid'
			$('#stim_blue').hide();
		}else if (response=='blue'){
			document.getElementById("stim_blue").style.border='solid'
			$('#stim_green').hide();
		}
		

	// cancel previous timeout ( when user presses button timeout is redundent)
		clearTimeout(timeout1)

		var element = document.getElementById("fixation");
		element.innerHTML = '+'
		canRespond = false

	// Get Correct Option
		var correct_outcome = outcomes[currenttrial] 
		var correct_outcome = correct_outcome.replace("'", "").replace("'","") // 1 means green is correct  ****
		correct_outcome = parseInt(correct_outcome)
		

		
	// Get the chosen magnitude 
		if(response=='green'){
			chosenmag= parseInt(green_reward[currenttrial].replace("'", "").replace("'",""))
		}else{
			chosenmag= parseInt(blue_reward[currenttrial].replace("'", "").replace("'",""))
		}
		
	// Determine if Its a correct response 
		var element = document.getElementById("outcome");	
		if(((correct_outcome==1)&&(response=='green'))|((correct_outcome==0)&&(response=='blue'))){
			correct=1
			if(outcome_type=='gain'){
			element.innerHTML='+ '+chosenmag}else{
			element.innerHTML='- '+chosenmag
			}
			element.style.color = "black";
			totalpoints+=chosenmag*sign
		}else{
			correct=0
			element.innerHTML='0'
			element.style.color = "black";
		}
	
	// display Correct or Not 
		$('#outcome').show() 
		
	// Display Trial Counter
		var element = document.getElementById("trialcounter");
		var ct = currenttrial+1
		element.innerHTML='Completed: '+ct+'/'+num_trials
		$('#trialcounter').show()
	
	
	// Display Total Points
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		$('#pointscounter').show()
		

		
	// get RT
		var currentTime = new Date().getTime();
		var RT = currentTime - startTrialTime;
	
	// Store data (sends get query to django)
		var green_value = parseInt(green_reward[currenttrial].replace("'", "").replace("'",""))
		var blue_value = parseInt(blue_reward[currenttrial].replace("'", "").replace("'",""))
		$.get("?resp="+response+"&rt="+RT+"&chosenmag="+chosenmag+"&totalpoints="+totalpoints+"&currenttrial="+currenttrial+"&outcome="+correct+"&trialstart="+startTrialTime+"&correct_choice="+correct_outcome+"&blue_value="+blue_value+"&green_value="+green_value, function(response){});


		
	// Go to Next Trial 
		timeout2 = setTimeout(function() {
			$('#noresp').hide()
			$('#outcome').hide()
			document.getElementById("stim_green").style.border='None'
			document.getElementById("stim_blue").style.border='None'
		// prepare for next trial 
			$('#stim_green').hide();	
			$('#stim_blue').hide();
			NextTrial('noresp');
		}, outcomelim);
	}
}

function NextTrial(response) {

	if (trialrunning==true){

	// increment trial number 
		
		currenttrial+=1
		currentevent+=1

		canProceed=true; 
		trialrunning=false 
		var e = new Object();
		e.keyCode=39
		
	// Proceed after break (look up what is next in event array) 
		setTimeout(function() {
			Proceed(e);
		}, ITI);	
	}

}



/////////////////// INTRUCTIONS //////////////////////////////


function RunInstruct(event){
	var currentnumber = parseInt(event.split('-')[1])// get number 
	console.log(currentnumber)

	
	if(currentnumber==1){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p>The aim of this task is to gain as many points as you can. Your score at the end of the game will be compared to that of other participants who do the task in the same week as you, and your relative ranking will determine any bonus you receive. A bonus of $3 will be awarded to participants that score in the top 5%, $1 to those in the top 10%, and $0.25 to the top 50%.</p>'}else{
	document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p>The aim of this task  is to avoid losing points out of your starting total of 10,000. Your score at the end of the game will be compared to that of other participants who do the task in the same week as you, and your relative ranking will determine any bonus you receive. A bonus of $3 will be awarded to participants that score in the top 5%, $1 to those in the top 10%, and $0.25 to the top 50%.</p>'
}
		$('#button_previous').hide();
		$('#button_continue').show();
	}
	else if(currentnumber==2){
		console.log(outcome_type)
		if(outcome_type=='gain'){
	
		document.getElementById('instruct').innerHTML='The study involves a task in which you have to choose between two colored circles. On each trial, you will get the same two circles and one of them will result in you receiving a reward. This may vary across trials. The size of that reward is indicated by the number inside the circle. There may be differences in how likely each circle is to result in a reward and this may or may not change throughout the task. Click CONTINUE for an example trial.'
		}else{
document.getElementById('instruct').innerHTML='The study involves a task in which you have to choose between two colored circles. On each trial, you will get the same two circles and one of them will result in you losing points from your starting total. This may vary across trials. The size of that loss is indicated by the number inside the circle. There may be differences in how likely each circle is to result in a loss of points and this may or may not change throughout the task. Click CONTINUE for an example trial.'}

		$('#button_previous').show();
		$('#button_continue').show();
		$('#stim_green').hide();
		$('#stim_blue').hide();
		$('#fixation').hide();


	}else if(currentnumber==3){
		if(outcome_type=='gain'){
		var element = document.getElementById("stim_text_green");
		element.innerHTML='40'
		var element = document.getElementById("stim_text_blue");
		element.innerHTML='75'}else{
		var element = document.getElementById("stim_text_green");
		element.innerHTML='75'
		var element = document.getElementById("stim_text_blue");
		element.innerHTML='40'

}
		$('#stim_green').show();
		$('#stim_blue').show();
		$('#fixation').show();
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='Each trial will start like this. You will be shown a green and a blue circle, and have to choose one of them. Each circle can occur on either side of the screen, but that doesnt matter, all that matters is the color. The circle you choose may lead to you receiving a reward. Remember on each trial only one of the circles will result in receipt of reward, so if the one you chose did not, you can know that the other one would have. There may be differences in how likely the green and the blue circles are to result in a reward and this may or may not change throughout the task.'}else{
document.getElementById('instruct').innerHTML='Each trial will start like this. You will be shown a green and a blue circle, and have to choose one of them. Each circle can occur on either side of the screen, but that doesnt matter, all that matters is the color. The circle you choose may lead to you losing points. Remember on each trial only one of the circles will result in a loss, so if the one you chose did, you can know that the other one would not have. There may be differences in how likely the green and the blue circles are to result in a loss and this may or may not change throughout the task.'}
		$('#button_continue').show();

	}else if(currentnumber==4){
		document.getElementById('instruct').innerHTML='As you can see there is a cross in the center of the screen. You cannot choose the color you want until that cross turns into a question mark.'
		$('#fixation').show()
		var element = document.getElementById("fixation");
		element.innerHTML = '+'
		$('#button_continue').show();
	}else if(currentnumber==5){
		var element = document.getElementById("fixation");
		element.innerHTML = '?'
		$('#stim_green').show();
		$('#stim_blue').show();
		document.getElementById("stim_blue").style.border='None'
		$('#button_continue').hide();
		
	if(outcome_type=='gain'){
		
	document.getElementById('instruct').innerHTML='Once the question mark is displayed, you can make your choice by pressing Z for the left circle or M for right circle. You have up to 6 seconds to make your choice. After this, the computer will choose one of the circles at random. Dont worry, when you do the task, 6 seconds will be tons of time. Lets say you choose the blue circle, because it is giving the highest reward. You can press M now.'}else{
	document.getElementById('instruct').innerHTML='Once the question mark is displayed, you can make your choice by pressing Z for the left circle or M for right circle. You have up to 6 seconds to make your choice. After this, the computer will choose one of the circles at random. Dont worry, when you do the task, 6 seconds will be tons of time. Lets say you choose the blue circle, because it is giving the smallest loss. You can press M now.'}
	allow_instruct_to_press = true; 
		
	
	}else if(currentnumber==6){
		document.getElementById('instruct').innerHTML = 'You can see that a box appears around the circle you picked.'
		document.getElementById("stim_blue").style.border='solid'
		allow_instruct_to_press = false;
		$('#button_continue').show();
		$('#button_previous').show();
		$('#outcome').hide() 
		var element = document.getElementById("fixation");
		element.innerHTML = '+'
	}else if(currentnumber==7){
		document.getElementById('instruct').innerHTML='After a small delay you will be shown the outcome of the trial.'
		var element = document.getElementById("outcome");
		if(outcome_type=='gain'){	
		element.innerHTML='+75'}else{element.innerHTML='-40'}

		element.style.color = "black";
		$('#stim_green').show()
		$('#stim_blue').show()
		$('#outcome').show() 
		$('#pointscounter').hide();
		document.getElementById("stim_blue").style.border='None'

	}else if(currentnumber==8){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='In this trial, the blue circle gave the reward. As you chose it, you would have received a reward of 75. If you had chosen the green circle, you would not have received any reward. The counter at the top of the screen will keep track of your total points.'}else{
		document.getElementById('instruct').innerHTML='In this trial, the blue circle gave the loss. As you chose it, 40 would have been subtracted from your total. If you had chosen the green circle, you would not have lost any points. The counter at the top of the screen will keep track of your total points.'}
		$('#stim_green').hide()
		$('#stim_blue').hide()
		$('#outcome').hide() 
		
		if(outcome_type=='gain'){
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+75
		$('#pointscounter').show()
		}else{
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+9960
		$('#pointscounter').show()
		}

		
	}else if(currentnumber==9){
		if(outcome_type=='gain'){
		var element = document.getElementById("stim_text_green");
		element.innerHTML='30'
		var element = document.getElementById("stim_text_blue");
		element.innerHTML='60'}else{
		var element = document.getElementById("stim_text_green");
		element.innerHTML='60'
		var element = document.getElementById("stim_text_blue");
		element.innerHTML='30'}
		$('#stim_green').show();
		$('#stim_blue').show();
		$('#fixation').show();
		document.getElementById('instruct').innerHTML='After this, the task repeats itself and the next trial is shown.'
		$('#button_continue').show();
		var element = document.getElementById("fixation");
		element.innerHTML = '+'

	}else if(currentnumber==10){
		var element = document.getElementById("fixation");
		element.innerHTML = '?'
		$('#stim_green').show();
		$('#stim_blue').show();
		document.getElementById("stim_blue").style.border='None'
		$('#button_continue').hide();
		
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='In this trial, lets say you again choose the blue circle because it is giving the highest reward. You can press M now.'}else{
		document.getElementById('instruct').innerHTML='In this trial, lets say you again choose the blue circle because it is giving the smallest loss. You can press M now.'}
		allow_instruct_to_press = true; 
		
	
	}else if(currentnumber==11){
		document.getElementById('instruct').innerHTML = ''
		document.getElementById("stim_blue").style.border='solid'
		allow_instruct_to_press = false;
		$('#button_continue').show();
		$('#button_previous').show();
		$('#outcome').hide() 
		var element = document.getElementById("fixation");
		element.innerHTML = '+'
	}else if(currentnumber==12){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='Unfortunately in this trial, the green circle was the color that gave the reward. As you chose the blue, you would not have received a reward.'}else{
		document.getElementById('instruct').innerHTML='Fortunately in this trial, the green circle was the color that gave the loss. As you chose the blue, you would not have not lost any points.'}
		var element = document.getElementById("outcome");
		if(outcome_type=='gain'){element.innerHTML='+0'}else{element.innerHTML='-0'}

		element.style.color = "black";
		$('#stim_green').show()
		$('#stim_blue').show()
		$('#outcome').show() 
		$('#pointscounter').show();
		$('#fixation').show();
		document.getElementById("stim_blue").style.border='None'

	}else if(currentnumber==13){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='To summarize, in order to make your choice on each trial you need to consider 2 pieces of information. The first is: what size of reward might I receive if I choose this circle? This information, as you saw in the examples is given to you by the numbers in the center of each circle. 1 is the smallest reward you could receive and 99 is the highest. One important thing is that the size of reward given by each circle on each trial is random, so you need to pay attention to those numbers on every trial.'}else{
		document.getElementById('instruct').innerHTML='To summarize, in order to make your choice on each trial you need to consider 2 pieces of information. The first is: how many points might I lose if I choose this circle? This information, as you saw in the examples is given to you by the numbers in the center of each circle. 1 is the smallest amount you could lose and 99 is the highest. One important thing is that the size of loss given by each circle on each trial is random, so you need to pay attention to those numbers on every trial.'
		}
		$('#stim_green').hide()
		$('#stim_blue').hide()
		$('#outcome').hide()
		$('#fixation').hide();
		$('#pointscounter').hide();

	}else if(currentnumber==14){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='The second important thing, as we said is that there may be differences in how likely the blue and the green circles are to result in a reward and this may or may not change throughout the task. So pay attention to whether the blue or the green circle results in a reward on each trial, as you may also want to take how likely each circle is to result in a reward into account.'
		}else{
		document.getElementById('instruct').innerHTML='The second important thing, as we said is that there may be differences in how likely the blue and the green circles are to result in losing points and this may or may not change throughout the task. So pay attention to whether the blue or the green circle results in a loss on each trial, as you may also want to take how likely each circle is to result in a loss into account.'
		}

	}else if(currentnumber==15){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='Remember, on each trial one of the two circles results in reward. Generally you will want to choose the circle which is most likely to give you a reward and the circle which will give you the highest reward. Sometimes you will have to decide which of these two things is more important to you. People vary on this.'}else{
		document.getElementById('instruct').innerHTML='Remember, on each trial one of the two circles results in loss of points. Generally you will want to choose the circle which is least likely to give you a loss and the circle which with the smaller loss. Sometimes you will have to decide which of these two things is more important to you. People vary on this.'
	}
		//$('#stim_green').show();
		//$('#stim_blue').show();
		//$('#pointscounter').show();
		//$('#fixation').show();

	}else if(currentnumber==16){
		document.getElementById('instruct').innerHTML='STOP! This is a timed experiment, so once you click CONTINUE, you will not be able to go back. If you would like to re-read the instructions, please click GO BACK. Each trial is timed, but there will be several breaks throughout. It is NOT possible to refresh the page and start off where you left off. If you are ready to begin the experiment, click CONTINUE.'
		$('#stim_green').hide()
		$('#stim_blue').hide()
		$('#pointscounter').hide();
		$('#fixation').hide()
	}
	
	
	
}

//Whatever proportion of that you make we will pay you in dollars, using the conversion rate 1:1000. This means that if you make 6000 points we will pay you $6.'


////////////////// BREAK //////////////////


function RunBreak(event){
	$('#instruct').show()
	$('#button_continue').show()
	$('#button_previous').hide()
	document.getElementById('instruct').innerHTML='Take a break. When you are ready to begin, click CONTINUE.'
}

////////////////// END SCREEN //////////////////

function RunEndScreen(){
	//document.getElementById("thanks2").innerHTML='You have earned an extra: $'+totalpoints*.001
	$('#fixation').hide()
	$('#thanks').show()
	$('#thanks2').show()	
	$('#button_return_home').show();
	$('#button_continue').hide()
	canProceed = false 
// Store data (sends get query to django)
	finished=1
	$.get("?finished="+finished, function(response){});
	
	
	
	/// Genenerate finished key 
	
}



