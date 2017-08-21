
// Needs other variables from script inside .html template

// LOSS OR REWARD 

console.log(outcome_type)

if(outcome_type=='gain'){

 var totalpoints = 0
 var totalpointsp=0
 var sign = 1

}else if(outcome_type=='loss'){
 var totalpoints = 10000
 var totalpointsp=10000
 var sign = -1

}
console.log(cb)
console.log(typeof(cb))
// change name for instructions
/*
if(cb==0 || cb==1){
 stim_name_green='green' 
 stim_name_blue='blue'

}else if(cb==2 || cb==3){
 stim_name_green='blue' 
 stim_name_blue='green'

}
*/


// Counters
var currentevent = 0
var currenttrial = 0


// Permissions
var canProceed = true // allowed to press space bar 
var trialrunning = false // 
var canRespond = false // respond left or right (only during trial)

// Timings 
var min_decisionlim = 250  // question mark comes up
var decisionlim = 6000 // no response

var outcomewait = 1000 // wait for outcome 4 in mikes
var outcomelim = 1500 // time to view the outcome

var ITI = 2000


var allow_instruct_to_press = false; 
var practice = false; 

// Mscl
var startTrialTime = 0;
var response 

var finished = 0; 


var eventarray = []

var total_instruct =15
var num_trials = 180
//var num_trials = 2

// Practice Trials

// 
var side_of_screen_p = [1,1,1,1]
var currenttrial_p = 0
var green_reward_p = ['75','50','75','50']
var blue_reward_p = ['30','40','30','40']
var outcomes_p = ['0','0','0','0']
var num_trials_p = 4


// Just so it exists
var timeout = setTimeout(function(){},300000);
var timeouta = setTimeout(function(){},300000);
var timeoutb = setTimeout(function(){},300000);

// Create Event Array 
for (i = 0; i <total_instruct; i++) {
	var eventarray = eventarray.concat('instruct-'+i.toString())
}

//


for (i = 0; i <num_trials; i++) {
	var eventarray = eventarray.concat('trial-'+i.toString())
	if(i % 45 ==44){
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
	$('#stim_green_outline').hide();	
	$('#stim_blue_outline').hide();
	$('#stim_purple_outline').hide();	
	$('#stim_red_outline').hide();
	$('#stim_blue').hide();

	$('#stim_red').hide();
	//$('#stim_blue').hide();

	$('#outcome').hide();
	$('#fixation').hide();
	$('#trialcounter').hide();
	$('#pointscounter').hide();
	$('#instruct').show();
	$('#noresp').hide();
	$('#thanks').hide();

	
	//$(document).bind('keyup',Proceed);
	$(document).bind('keyup',Pressedleft);
	$(document).bind('keyup',Pressedright);
	$("#button_continue" ).click(function() {
		Proceed('next');
	});
	$("#button_previous" ).click(function() {
		
		Proceed('previous');
	});

	Proceed('next');

	
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
			setTimeout(function() {
				RunTrial(eventt); // wait on the first trial. 
				}, ITI-1250);
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
		document.getElementById("stim_green_outline").style.left = "5%";
		document.getElementById("stim_green_outline").style.right = "auto";
	
		document.getElementById("stim_blue").style.right = "10%";
		document.getElementById("stim_blue").style.left = "auto";
		document.getElementById("stim_blue_outline").style.right = "5%";
		document.getElementById("stim_blue_outline").style.left = "auto";

	}else if(side_of_screen[currenttrial]==1){
			
		document.getElementById("stim_green").style.right = "10%";
		document.getElementById("stim_green").style.left = "auto";
		document.getElementById("stim_green_outline").style.right = "5%";
		document.getElementById("stim_green_outline").style.left = "auto";
	
	
		document.getElementById("stim_blue").style.left = "10%";
		document.getElementById("stim_blue").style.right = "auto";
		document.getElementById("stim_blue_outline").style.left = "5%";
		document.getElementById("stim_blue_outline").style.right = "auto";

	}

	// display stimuli 
	$('#stim_green').show();
	$('#stim_blue').show();

	// display magnitudes
	var element = document.getElementById("stim_text_green");
	element.innerHTML = parseInt(green_reward[currenttrial].replace("'", "").replace("'",""))*sign
	var element = document.getElementById("stim_text_blue");
	element.innerHTML=  parseInt(blue_reward[currenttrial].replace("'", "").replace("'",""))*sign
	
	// get current rtial 
	currentnumber = parseInt(event.split('-')[2])// get number 
	
	// Set time out for cross 
	timeout2 = setTimeout(function(){
		var element = document.getElementById("fixation");
		element.innerHTML = '+' // ?
		canRespond = true
		
	},min_decisionlim);
	
	// Set trial time out for no response
	timeout1 = setTimeout(function() {
		//$('#noresp').show();
		Outcome('noresp');
	},min_decisionlim+ decisionlim);

	
}



function Pressedleft(e) {
	
	if (canRespond==true && e.keyCode==90 ) {
		console.log('pressed left via trial')
		if(side_of_screen[currenttrial]==0){Outcome('green')}else{Outcome('blue')}
	}
	if(practice && e.keyCode==90){
		console.log('pressed left via practice')
		if(side_of_screen_p[currenttrial_p]==0){
		PracticeOutcome('green')}else{PracticeOutcome('blue')}
	}

}

function Pressedright(e) {
	
	if (canRespond==true && e.keyCode==77) {
		console.log('pressed right via trial')
		if(side_of_screen[currenttrial]==0){Outcome('blue')}else{Outcome('green')}
	}
	if(practice && e.keyCode==77){
		console.log('pressed right via practice')
		if(side_of_screen_p[currenttrial_p]==0){
		PracticeOutcome('blue')}else{PracticeOutcome('green')}
	}
	/// example trial presses right
	if(allow_instruct_to_press){
		console.log('pressed right via intstruct')
		if (e.keyCode==77){Proceed('next')}
	}

}






function Outcome(response){
	
	///// Person Responded //////

	// deal with no response 
	if(response=='noresp'){
		noresp=1
		console.log('NO RESPONSE')
		randomchoice  = Math.floor(Math.random()*2)
		if(randomchoice==1){response='green'}else{response='blue'}
	}else{
		noresp=0 // just to deal with cataloging
	}


	// show selection
		if(response=='green'){
			$('#stim_green_outline').show();
		}else if (response=='blue'){
			$('#stim_blue_outline').show();
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
			chosenmag= parseInt(green_reward[currenttrial].replace("'", "").replace("'",""))*sign
		}else{
			chosenmag= parseInt(blue_reward[currenttrial].replace("'", "").replace("'",""))*sign
		}
		
	// Determine if Its a correct response 
		var element = document.getElementById("outcome");	
		if(((correct_outcome==1)&&(response=='green'))|((correct_outcome==0)&&(response=='blue'))){
			correct=1
			if(outcome_type=='gain'){
			element.innerHTML=chosenmag}else{
			element.innerHTML=chosenmag
			}
			element.style.color = "black";
			totalpoints+=chosenmag
		}else{
			correct=0
			element.innerHTML=' 0'
			element.style.color = "black";
		}

	
	

	// get RT
		var currentTime = new Date().getTime();
		var RT = currentTime - startTrialTime;
	
	// store side of screen
	if(side_of_screen[currenttrial]==0){leftstim='green',rightstim='blue'}
	if(side_of_screen[currenttrial]==1){leftstim='blue',rightstim='green'}

	// Store data (sends get query to django)
		var green_value = parseInt(green_reward[currenttrial].replace("'", "").replace("'",""))*sign
		var blue_value = parseInt(blue_reward[currenttrial].replace("'", "").replace("'",""))*sign
		$.get("?resp="+response+"&rt="+RT+"&chosenmag="+chosenmag+"&totalpoints="+totalpoints+"&currenttrial="+currenttrial+"&outcome="+correct+"&trialstart="+startTrialTime+"&correct_choice="+correct_outcome+"&blue_value="+blue_value+"&green_value="+green_value+"&noresp="+noresp+"&rightstim="+rightstim+"&leftstim="+leftstim, function(response){});
		//$.get("?resp="+response+"&rt="+RT+"&chosenmag="+chosenmag+"&totalpoints="+totalpoints+"&currenttrial="+currenttrial+"&outcome="+correct+"&trialstart="+startTrialTime+"&correct_choice="+correct_outcome+"&blue_value="+blue_value+"&green_value="+green_value+"&noresp="+noresp, function(response){});
	
	///// WAIT BEFORE DISPLAYING OUTCOME ///// 

		
	timeout3 = setTimeout(function(){
		// display Correct or Not 
			$('#outcome').show() 

		// Display the correct shape and hide the incorrect shape
		if(correct_outcome==1){
			$('#stim_blue').hide();
			$('#stim_green').show();}
		if(correct_outcome==0){			
			$('#stim_green').hide();
			$('#stim_blue').show();}
		
	
		// Display Total Points
			var element = document.getElementById("pointscounter");
			element.innerHTML='Points: '+totalpoints
			$('#pointscounter').show()
	},outcomewait);


	

	/////Go To Next Trial ///// 
	timeout4 = setTimeout(function() {
			$('#noresp').hide()
			$('#outcome').hide()
			$('#stim_blue_outline').hide();
			$('#stim_green_outline').hide();
			$('#stim_green').hide();	
			$('#stim_blue').hide();
			// Display Trial Counter
			var element = document.getElementById("trialcounter");
			var ct = currenttrial+1
			element.innerHTML='Completed: '+ct+'/'+num_trials
			$('#trialcounter').show()
			NextTrial('noresp');
		},outcomewait+outcomelim);

}

function NextTrial(response) {


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




//////////////////////////////////////////////////////////////'

function RunPracticeTrial(event) {
	
	// trial start time 
	startTrialTime = new Date().getTime();

	//display
	$('#trialcounter').show()
	$('#pointscounter').show()
	$('#fixation').show()

	practice=false
	canProceed = false 

	console.log(currenttrial_p)
	console.log(side_of_screen_p[currenttrial_p])
	
	
	//determine side of screen
	if(side_of_screen_p[currenttrial_p]==0){

		document.getElementById("stim_purple").style.left = "10%";
		document.getElementById("stim_purple").style.right = "auto";
		document.getElementById("stim_purple_outline").style.left = "5%";
		document.getElementById("stim_purple_outline").style.right = "auto";
	
		document.getElementById("stim_red").style.right = "10%";
		document.getElementById("stim_red").style.left = "auto";
		document.getElementById("stim_red_outline").style.right = "5%";
		document.getElementById("stim_red_outline").style.left = "auto";

	}else if(side_of_screen_p[currenttrial_p]==1){
			
		document.getElementById("stim_purple").style.right = "10%";
		document.getElementById("stim_purple").style.left = "auto";
		document.getElementById("stim_purple_outline").style.right = "5%";
		document.getElementById("stim_purple_outline").style.left = "auto";
	
	
		document.getElementById("stim_red").style.left = "10%";
		document.getElementById("stim_red").style.right = "auto";
		document.getElementById("stim_red_outline").style.left = "5%";
		document.getElementById("stim_red_outline").style.right = "auto";


	}

	// display stimuli 
	$('#stim_purple').show();
	$('#stim_red').show();

	// display magnitudes
	var element = document.getElementById("stim_text_purple");
	element.innerHTML = parseInt(green_reward_p[currenttrial_p].replace("'", "").replace("'",""))*sign
	var element = document.getElementById("stim_text_red");
	element.innerHTML= parseInt(blue_reward_p[currenttrial_p].replace("'", "").replace("'",""))*sign
	

	
	// Set time out for cross 
	timeout2 = setTimeout(function(){
		var element = document.getElementById("fixation");
		element.innerHTML = '+'
		practice = true
		
	},min_decisionlim);
	
	// Set trial time out for no response
	timeout1 = setTimeout(function() {
		//$('#noresp').show();
		PracticeOutcome('noresp');
	},min_decisionlim+ decisionlim);

	
}



function PracticeOutcome(response){
	
	///// Person Responded //////
	practice=false

	// deal with no response 
	if(response=='noresp'){
		noresp=1
		console.log('NO RESPONSE')
		randomchoice  = Math.floor(Math.random()*2)
		if(randomchoice==1){response='green'}else{response='blue'}
	}else{
		noresp=0 // just to deal with cataloging
	}


	// show selection
		if(response=='green'){
			$('#stim_purple_outline').show();
		}else if (response=='blue'){
			$('#stim_red_outline').show();
		}
		

	// cancel previous timeout ( when user presses button timeout is redundent)
		clearTimeout(timeout1)

		var element = document.getElementById("fixation");
		element.innerHTML = '+'
		pratice = false

	// Get Correct Option
		var correct_outcome = outcomes_p[currenttrial_p] 
		var correct_outcome = correct_outcome.replace("'", "").replace("'","") // 1 means green is correct  ****
		correct_outcome = parseInt(correct_outcome)
		

	// Get the chosen magnitude 
		if(response=='green'){
			chosenmag= parseInt(green_reward_p[currenttrial_p].replace("'", "").replace("'",""))*sign
		}else{
			chosenmag= parseInt(blue_reward_p[currenttrial_p].replace("'", "").replace("'",""))*sign
		}
		
	// Determine if Its a correct response 
		var element = document.getElementById("outcome");	
		if(((correct_outcome==1)&&(response=='green'))|((correct_outcome==0)&&(response=='blue'))){
			correct=1
			if(outcome_type=='gain'){
			element.innerHTML=chosenmag}else{
			element.innerHTML=chosenmag
			}
			element.style.color = "black";
			totalpointsp+=chosenmag
		}else{
			correct=0
			element.innerHTML=' 0'
			element.style.color = "black";
		}
	


	
	///// WAIT BEFORE DISPLAYING OUTCOME ///// 

		
	timeout3 = setTimeout(function(){
		// display Correct or Not 
			$('#outcome').show() 
		
		
		// Display the correct shape and hide the incorrect shape
		if(correct_outcome==1){
			$('#stim_red').hide();
			$('#stim_purple').show();}
		if(correct_outcome==0){			
			$('#stim_purple').hide();
			$('#stim_red').show();}	


		// Display Total Points
			var element = document.getElementById("pointscounter");
			element.innerHTML='Points: '+totalpointsp
			$('#pointscounter').show()
	},outcomewait);


	

	/////Go To Next Trial ///// 
	timeout4 = setTimeout(function() {
			$('#noresp').hide()
			$('#outcome').hide()
			$('#stim_red_outline').hide();
			$('#stim_purple_outline').hide();			
			$('#stim_purple').hide();	
			$('#stim_red').hide();
			// Display Trial Counter
			var element = document.getElementById("trialcounter");
			var ctp = currenttrial_p+1
			element.innerHTML='Completed: '+ctp+'/'+num_trials_p
			$('#trialcounter').show()
			PracticeNextTrial('noresp');
		},outcomewait+outcomelim);

}

function PracticeNextTrial(response) {


	// increment trial number 
		
		currenttrial_p+=1
		currentevent+=1

		canProceed=true; 
		var e = new Object();
		e.keyCode=39
		
	// Proceed after break (look up what is next in event array) 
		setTimeout(function() {
			Proceed(e);
		}, ITI);	

}





/////////////////// INTRUCTIONS //////////////////////////////


function RunInstruct(event){
	var currentnumber = parseInt(event.split('-')[1])// get number 
	console.log(currentnumber)



	
	if(currentnumber==1){
		clearTimeout(timeout)
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p>The aim of this task is to gain as many points as you can.'}else{
	document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p> The aim of this task  is to avoid losing points out of your starting total of 10,000.</p>'
}
		$('#button_previous').hide();
		$('#button_continue').show();
		$('#stim_red').hide();
		$('#stim_purple').hide();
		$('#fixation').hide();

	}

//// Your score at the end of the game will be compared to that of other participants who do the task in the same week as you, and your relative ranking will determine any bonus you receive. A bonus of $3 will be awarded to participants that score in the top 5%, $1 to those in the top 10%, and $0.25 to the top 50%.</p>
//// Your score at the end of the game will be compared to that of other participants who do the task in the same week as you, and your relative ranking will determine any bonus you receive. A bonus of $3 will be awarded to participants that score in the top 5%, $1 to those in the top 10%, and $0.25 to the top 50%.



	else if(currentnumber==2){
		clearTimeout(timeout)

		if(outcome_type=='gain'){
	
		document.getElementById('instruct').innerHTML='On each trial you have to choose between two colored circles. Choosing one of them will result in you receiving a reward. The size of that reward is indicated by the number inside the circle. Choosing the other will result in no reward. There may be differences in how likely each color is to result in a reward and this may or may not change throughout the task. Click continue for an example trial.'
		}else{
document.getElementById('instruct').innerHTML='On each trial you have to choose between two colored circles. Choosing one of them will result in you losing points. The size of that loss is indicated by the number inside the circle. Choosing the other will result in no loss. There may be differences in how likely each color is to result in a loss and this may or may not change throughout the task. Click continue for an example trial.'}
	
		$('#button_previous').show();
		$('#button_continue').show();
		if(outcome_type=='gain'){
		var element = document.getElementById("stim_text_purple");
		element.innerHTML='40'
		var element = document.getElementById("stim_text_red");
		element.innerHTML='75'}else{
		var element = document.getElementById("stim_text_purple");
		element.innerHTML='-75'
		var element = document.getElementById("stim_text_red");
		element.innerHTML='-40'}
		$('#stim_purple').show();
		$('#stim_red').show();
		$('#fixation').hide();




//////////  Walk Through Example /////// 

	}else if(currentnumber==3){
		clearTimeout(timeout)
		document.getElementById('instruct').innerHTML=''
		$('#fixation').show();
		$('#button_continue').hide();
		$('#button_previous').hide();
		$('#stim_red').hide();
		$('#stim_purple').hide();
		
		timeout = setTimeout(function(){
			//Proceed('next')
					if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='You will see the two circles and a cross in the center of the screen. Each circle can occur on either side of the screen, but that doesn’t matter, all that matters is the color. Press Z for the circle on the left or M for the circle on the right. You have up to 6 seconds to make your choice. After this, the computer will choose one of the circles at random. For this example, lets say you choose the red circle, because it gives the higher reward. You can press M now.'}else{
document.getElementById('instruct').innerHTML='You will see the two circles and a cross in the center of the screen. Each circle can occur on either side of the screen, but that doesn’t matter, all that matters is the color. Press Z for the circle on the left or M for the circle on the right. You have up to 6 seconds to make your choice. After this, the computer will choose one of the circles at random. For this example, lets say you choose the red circle, because it would result in a smaller loss. You can press M now.'}
			//$('#button_continue').show();
			allow_instruct_to_press = true; 
			$('#stim_purple').show();
			$('#stim_red').show();
		},ITI-1250);
		
		

	}else if(currentnumber==4){
		clearTimeout(timeout)
		document.getElementById('instruct').innerHTML = 'You can see that the circle you selected is outlined in black.'
		
		$('#stim_red_outline').show();
		allow_instruct_to_press = false;
		$('#button_continue').show();
		//$('#button_previous').show();
		$('#outcome').hide() 
		var element = document.getElementById("fixation");
		element.innerHTML = '+'


		


	}else if(currentnumber==5){
		clearTimeout(timeout)
		document.getElementById('instruct').innerHTML=''
		
		$('#button_continue').hide();

		var element = document.getElementById("outcome");
		if(outcome_type=='gain'){	
		element.innerHTML='75'
		totalpointsp+=75}else{
		element.innerHTML='40'
		totalpointsp-=40}

	
		$('#stim_red_outline').show();
		$('#stim_red').show()

		if(outcome_type=='gain'){
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpointsp
		}else{
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpointsp
		}
		
		timeout = setTimeout(function(){
			if(outcome_type=='gain'){
			document.getElementById('instruct').innerHTML='After a small delay you will be shown the outcome of the trial. At this point, the nonrewarded circle will vanish and only the rewarded one will remain on the screen. If this is the one you chose (i.e. it is outlined), you will obtain the corresponding points. The points received are shown at the middle of the top of the screen.'}else{
			document.getElementById('instruct').innerHTML='After a small delay you will be shown the outcome of the trial. At this point, the circle that would result in a loss will remain on the screen, while the other circle will vanish. If this is the one you chose (i.e. it is outlined), you will lose the corresponding points. The points lost are shown at the middle of the top of the screen.'}
			$('#outcome').show() 
			$('#stim_purple').hide()
			$('#button_continue').show();
		
		},outcomewait);

		
		//timeout = setTimeout(function(){
		//	Proceed('next')
		//},3000);

		currenttrial_p+=1

	}else if(currentnumber==6){
		clearTimeout(timeout)
		$('#pointscounter').show();

		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='In this trial, the red circle gave the reward. As you chose it, you received a reward of 75. If you had chosen the purple circle, you would have received 0 points. You’re hoping that the circle you choose is the one that stays on the screen, not the one that vanishes.  Note, the counter at the top right of the screen will keep track of your running total.'}else{
		document.getElementById('instruct').innerHTML='In this trial, the red circle resulted in a loss. As you chose it, 40 points were subtracted from your total. If you had chosen the purple circle, your point total would have remained the same. You’re hoping that the circle you choose is the one that vanishes, not the one that stays on the screen. Note, the counter at the top right of the screen will keep track of your running total.'}
		$('#stim_purple').hide()
		$('#stim_red').hide()
		$('#stim_red_outline').hide();
		$('#fixation').hide()
		$('#outcome').hide() 
		$('#button_continue').show();




		
	}else if(currentnumber==7){
		clearTimeout(timeouta)
		clearTimeout(timeoutb)
		if(outcome_type=='gain'){
		var element = document.getElementById("stim_text_purple");
		element.innerHTML='30'
		var element = document.getElementById("stim_text_red");
		element.innerHTML='60'}else{
		var element = document.getElementById("stim_text_purple");
		element.innerHTML='-60'
		var element = document.getElementById("stim_text_red");
		element.innerHTML='-30'}
		$('#stim_purple').hide();
		$('#stim_red').hide();
		$('#fixation').hide();
		document.getElementById('instruct').innerHTML='Press continue to see an example second trial. Note, the counter at the top left of the screen will track how many trials you have completed.'
		$('#button_continue').show();
		var element = document.getElementById("trialcounter");
		var ctp = currenttrial_p
		element.innerHTML='Completed: '+ctp+'/'+num_trials_p
		$('#trialcounter').show()




//////// Another Walk Through Example //////  


	}else if(currentnumber==8){
		document.getElementById('instruct').innerHTML=''
		var element = document.getElementById("fixation");
		element.innerHTML = '+'
		$('#fixation').show();
		$('#stim_purple').hide();
		$('#stim_red').hide();

		$('#stim_blue_outline').hide();
		$('#button_continue').hide();
		allow_instruct_to_press = false;
		
		timeouta = setTimeout(function(){
			//Proceed('next')
			//$('#button_continue').show();
			$('#stim_purple').show();
			$('#stim_red').show();
			if(outcome_type=='gain'){
			document.getElementById('instruct').innerHTML='In this trial, lets say you again choose the red circle. You can press M now.'}else{
			document.getElementById('instruct').innerHTML='In this trial, lets say you again choose the red circle. You can press M now.'}
			allow_instruct_to_press = true; 
		},ITI-1250);



		
	
	}else if(currentnumber==9){
		clearTimeout(timeout)
		allow_instruct_to_press = false;
		document.getElementById('instruct').innerHTML=''
		
		var element = document.getElementById("outcome");
		if(outcome_type=='gain'){	
		element.innerHTML=' 0'}else{element.innerHTML='0'}

		var element = document.getElementById("fixation");
		element.innerHTML = '+'
		
		$('#stim_red_outline').show();
		$('#button_continue').hide();
	

		timeout = setTimeout(function(){
			if(outcome_type=='gain'){
			var element = document.getElementById("pointscounter");
			element.innerHTML='Points: '+totalpointsp
			$('#pointscounter').show()
			}else{
			var element = document.getElementById("pointscounter");
			element.innerHTML='Points: '+totalpointsp
			$('#pointscounter').show()
			}
			if(outcome_type=='gain'){document.getElementById('instruct').innerHTML='Here the red circle has disappeared and only the purple circle remains. This indicates that the purple circle would have resulted in a reward. However, because you chose the red circle, you do not gain any points. A zero is shown in middle of the screen to indicate your running total has not changed.'}else{
			document.getElementById('instruct').innerHTML='Here the red circle has disappeared and only the purple circle remains. This indicates that the purple circle would have resulted in a loss. However, because you chose the red circle, you do not lose any points. A zero is shown in middle of the screen to indicate your running total has not changed.'}
			$('#stim_purple').show()
			$('#stim_red').hide()
			$('#outcome').show() 
			$('#pointscounter').show();
			$('#button_continue').show();
		},outcomewait);
		currenttrial_p+=1

	}else if(currentnumber==10){
		document.getElementById('instruct').innerHTML='Press continue to try two more trials on your own. Remember: press Z for the circle on the left and M for the circle on the right.'
		$('#stim_purple').hide();
		$('#stim_red').hide();
		$('#fixation').hide();
		$('#outcome').hide();
		$('#button_continue').show();
		$('#stim_red_outline').hide();		

		
		var element = document.getElementById("trialcounter");
		var ctp = currenttrial_p
		element.innerHTML='Completed: '+ctp+'/'+num_trials_p
		$('#trialcounter').show()
		
//////////  Practice Trials ////////////

	}else if(currentnumber==11){
		document.getElementById('instruct').innerHTML=''

		$('#button_continue').hide();
		$('#button_previous').hide();
		$('#stim_red').hide();
		$('#stim_purple').hide();
		practice=true
		timeout=setTimeout(function() {
			RunPracticeTrial(event);
		}, ITI-1250)


	}else if(currentnumber==12){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunPracticeTrial(event);
		
		





//////////  Final Instructions /////// 

	}else if(currentnumber==13){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='Okay, practice over! Before you begin for real, lets recap. On each trial you need to consider 2 pieces of information. The first is: what size of reward might I receive if I choose this circle? For this, look at the number in the center of the circles.  Second, there may be differences in how likely circles of each color are to result in a reward and this may or may not change throughout the task. For example, in the 4 trials you had, choosing red would have resulted in reward on 3 of them. So pay attention to whether the circle of a given color results in a reward on each trial, as you may also want to keep track of this.'}else{
		document.getElementById('instruct').innerHTML='Okay, practice over! Before you begin for real, lets recap. On each trial you need to consider 2 pieces of information. The first is: how many points might I lose if I choose this circle? For this, look at the number in the center of the circles. Second, there may be differences in how likely circles of each color are to result in a loss and this may or may not change throughout the task. For example, in the 4 trials you had, choosing red would have resulted in a loss on 3 of them. So pay attention to whether the circle of a given color results in a loss on each trial, as you may also want to keep track of this.'
		}
		$('#button_continue').show();
		$('#button_previous').hide();
		//$('#pointscounter').hide();
		//$('#trialcounter').hide();
		$('#fixation').hide();
		$('#stim_red').hide()
		$('#stim_yeloow').hide()




	}else if(currentnumber==14){
		$('#button_previous').show();
		document.getElementById('instruct').innerHTML='<p> STOP! This is a timed experiment, so once you click continue, you will not be able to go back. If you would like to re-read the instructions, you can go back to the beginning <a href="javascript:history.go(0)">here</a>. There will be 180 trials. You will get to take two breaks midway. But if you need the bathroom or anything now, please do that first as if you leave outside of the official breaks you will miss trials!</p> <p>Remember press Z for the circle on the left and M for the circle on the right</p><p> If you are ready to begin the experiment, click continue.</p>'
		
		var element = document.getElementById("trialcounter");
		var ct = currenttrial
		element.innerHTML='Completed: '+ct+'/'+num_trials
		$('#trialcounter').show()
		
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		$('#pointscounter').show()

	}
	
	
	
}

//Whatever proportion of that you make we will pay you in dollars, using the conversion rate 1:1000. This means that if you make 6000 points we will pay you $6.'


////////////////// BREAK //////////////////


function RunBreak(event){
	$('#instruct').show()
	$('#button_continue').show()
	$('#button_previous').hide()
	document.getElementById('instruct').innerHTML='Take a break. When you are ready to begin, click continue.'
}

////////////////// END SCREEN //////////////////

function RunEndScreen(){
	//document.getElementById("thanks2").innerHTML='You have earned an extra: $'+totalpoints*.001
	$('#fixation').hide()
	$('#thanks').show()
	$('#thanks2').show()	
	$('#instruct').hide()
	$('#button_return_home').show();
	$('#button_continue').hide()
	canProceed = false 
// Store data (sends get query to django)
	finished=1
	$.get("?finished="+finished, function(response){});
	
	
	
}




/////////////



