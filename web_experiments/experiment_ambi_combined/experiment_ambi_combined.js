
var totalpoints = 0
var sign = 1.0


//XOlist

XOlist = XOlist.replace('[', "").replace(']', "").replace(/"/g,'')

// Counters
var currentevent = 0
var currenttrial_t = 0
var currenttrial_p = 0 
var currenttrial_within_5 = 0 
var currentnumber=0

// Permissions
var canProceed = true // allowed to go to next event 
var canRespond = false // respond left or right (only during trial)
var practice = false; 

var allow_instruct_to_press = false; 

// Timings 
var min_decisionlim = 250  // question mark comes up
var decisionlim = 8000 // no response
var outcomewait = 1000 // wait for outcome 4 in mikes
var outcomelim = 2000 // time to view the outcome
var ITI = 2000


// Mscl
var startTrialTime = 0;
var response 
var finished = 0; 

var five_trial_outcome = 999; 

//
var last_pressed = 'None';

// Create Event Array //
total_instruct = 63
//total_instruct = 1 /// TESTING TRIALS
console.log('total instruct')
console.log(total_instruct)

num_trials=300
num_trials_original=num_trials // gets used to set the num_trials on the last instruction
var eventarray = []
 
for (i = 0; i <total_instruct; i++) {
	var eventarray = eventarray.concat('instruct-'+i.toString())
}

for (i = 0; i <num_trials; i++) {
	var eventarray = eventarray.concat('trial-'+i.toString())
	if(i % 5 ==4){
		var eventarray = eventarray.concat('summary')
	}
	if(i % 50 ==49){
		var eventarray = eventarray.concat('break')
	}
}
var eventarray = eventarray.concat('endscreen')
var eventt = eventarray[0]
//console.log('event_array')
//console.log(eventarray)


// Urn Storage
var urn_storage_r = []
var urn_storage_l = []

var urn_storage_r_p = []
var urn_storage_l_p = []

// magnitude/outcome storage 
var received_mag_last_5 = ['_','_','_','_','_']

// revealed o's 

revealed_o_l = 0.0
revealed_o_r = 0.0
revealed_x_l = 0.0
revealed_x_r = 0.0



function create_urns(XOlist,urn_storage_r,urn_storage_l){

	iii = 0
	for (trial = 0; trial <300; trial++){

		// for each trial create 2 10x5 urns
		urn_left = []
		urn_right = []
		within_urn_counter_r = 0
		within_urn_counter_l = 0
		for  (row = 0; row <20; row++){ // goes through left then right urns row by row. 
			// create a row
			var row_array = []
			for  (column = 0; column<5; column++){
				one_or_zero = parseInt(XOlist[iii])
				// this was updated to work with newer strings post 7/28/17
				if(one_or_zero==0){row_array[column]='X'}
				if(one_or_zero==1){row_array[column]='O'}
				if(one_or_zero==2){row_array[column]='='}
				iii+=1
			}

			// add row to the appropriate urn based on row number (first 10 go to right urn, second 10 go to right urn)
			if(row<10){
				urn_left[row]=row_array.sort().reverse()
			}else{
				urn_right[row-10]=row_array.sort().reverse()
			} 		
		}
		// store the urns for each trial 
		urn_storage_r[trial]=urn_right
		urn_storage_l[trial]=urn_left
	}
}

function create_urns_p(XOlist_p,urn_storage_r_p,urn_storage_l_p){

	iii = 0
	
	for (trial = 0; trial <50; trial++){ // Only create 50 practie trials 
   
	
		// for each trial create 2 10x5 urns
		urn_left = []
		urn_right = []
		within_urn_counter_r = 0
		within_urn_counter_l = 0
		for  (row = 0; row <20; row++){

			// create a row
			var row_array = []
			for  (column = 0; column<5; column++){
				one_or_zero = parseInt(XOlist_p[iii])
				if(one_or_zero==0){row_array[column]='X'}
				if(one_or_zero==1){row_array[column]='O'}

			
				// if row is greater than 10 use the within left urn counter and reveal
				if(row<10){
					//console.log(trial)
					
					//console.log(revealed_right_p[trial])
	
					if(within_urn_counter_r>=parseFloat(revealed_right_p[trial].replace("'","").replace("'",""))*50){row_array[column]='='}
					within_urn_counter_r+=1
				}
				else{
					if(within_urn_counter_l>=parseFloat(revealed_left_p[trial].replace("'","").replace("'",""))*50){row_array[column]='='}
					within_urn_counter_l+=1
				}
				iii+=1
			}
			if(trial==0){
			if(row>=10){
				//console.log(row_array)
			}			
			}

			// add row to the appropriate urn based on row number (first 10 go to right urn, second 10 go to left urn)
			if(row<10){
				urn_right[row]=row_array.sort().reverse()
			}else{
				urn_left[row-10]=row_array.sort().reverse()
			} 		
		}
		// store the urns for each trial 
		urn_storage_r_p[trial]=urn_right
		urn_storage_l_p[trial]=urn_left
	}

	

}







// Setup JavaScript Functions on First Call. 

$(document).ready( function() {
	

	/* Set state of HTML objects */
	$('#button_continue').show();
	$('#button_previous').hide();
	$('#button_return_home').hide();
	$('#exp_containor').show()

	$('#outcome').hide();
	$('#outcome5').hide();
	$('#summary_text').hide();


	$('#fixation').hide();

	$('#urn_left').hide();
	$('#urn_right').hide();
	$('#mag_left').hide();
	$('#mag_right').hide();
	$('#out1').hide()
	$('#out2').hide()
	$('#out3').hide()
	$('#out4').hide()
	$('#out5').hide()

	$('#trialcounter').hide();
	// set trial counter
	var element = document.getElementById("trialcounter");
	element.innerHTML='Completed: '+0+'/'+num_trials
	
	$('#pointscounter').hide();
	var element = document.getElementById("pointscounter");
	element.innerHTML='Points: '+totalpoints


	$('#instruct').show();
	$('#noresp').hide();
	$('#thanks').hide();
	$('#thanks1').hide();
	$('#thanks2').hide();

	document.getElementById('urn_left').innerHTML=['XXXXXXXXX']
	
	//add functions that get called by key presses or button presses 
	$(document).bind('keyup',Pressedleft);
	$(document).bind('keyup',Pressedright);
	$("#button_continue" ).click(function() {
		Proceed('next');
	});
	$("#button_previous" ).click(function() {
		Proceed('previous');
	});
	
	//console.log('Im printing3')
	//console.log(mag_left_p)
	//console.log(prop_left_p)
	//console.log(revealed_left_p)
	//console.log(revealed_right_p)

	console.log('Im printing4')
	console.log(mag_left_t)
	//console.log(prop_left_t)
	//console.log(revealed_left_t)
	// Go to first instruction screen. 
	create_urns(XOlist,urn_storage_r,urn_storage_l)
	create_urns_p(XOlist_p,urn_storage_r_p,urn_storage_l_p)
	

	//trial=24
	//display_urns_and_mags(trial,practice)

	//console.log('Im printing')
	//console.log(urn_storage_l)


	//console.log('Im printing2')
	//console.log(urn_storage_l_p)




	//RunSummaryScreen(event)

	Proceed('next');
	
});






function Proceed(e){

	if (canProceed==true){

		// increment the event counter 
		if(e=='next'){currentevent+=1}
		if(e=='previous'){currentevent-=1}
		if(currentevent<0){currentevent=0}

		// get the name of the current event 
		eventt=String(eventarray[currentevent])
		console.log('event: ')
		console.log(eventt)

		//// Do current event 
		if (eventt.indexOf('instruct')==0){
			RunInstruct(eventt);
		} else if (eventt.indexOf('trial')==0){
			document.getElementById('exp_container').style.margin='auto';
			$('#instruct').hide()
			$('#button_continue').hide()
			$('#button_previous').hide()
			document.getElementById('exp_container').style.margin='auto'; // move window into center of the screen. 
			if(currenttrial_t==0){
			setTimeout(function() {
				RunTrial(eventt); // wait on the first trial. 
				}, ITI-1250);
			}else{
			RunTrial(eventt);
			}
		}else if(eventt.indexOf('summary')==0){
			RunSummaryScreen();
		}else if(eventt.indexOf('break')==0){
			RunBreak();
		}else if (eventt.indexOf('endscreen')==0){
			RunEndScreen();
		}
		
	}

}





function RunTrial(event) {
	

	// trial start time for recording RT
	startTrialTime = new Date().getTime();
	
	canProceed = false 
	canRespond = false 

	// show trial counters
	$('#trialcounter').show()
	$('#pointscounter').show()

	// show the tally (even though it should be on the whole time)
	show_tally()
	
	// display urns and mags
	if(practice){
		currenttrial=currenttrial_p
	}else{
		currenttrial=currenttrial_t}

	display_urns_and_mags(currenttrial,practice,0,0)

	//

	// debugging

	console.log('current_trial')
	console.log(currenttrial)
	//console.log('left')
	//console.log(prop_left_t[currenttrial])
	//console.log('right')
	//console.log(prop_right_t[currenttrial])

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


function display_urns_and_mags(trial,practice, switchmag,switchtoken){
   // use this function to display a trial's urns on the screen // 
   // run it in the opening functions to test a particular trial //


   // use different urn storage and magnitude vectors depending on whether its practice // 
   if(practice){
	mag_left=mag_left_p
	mag_right=mag_right_p
	urn_store_l = urn_storage_l_p
	urn_store_r = urn_storage_r_p
   }else{
	mag_left=mag_left_t
	mag_right=mag_right_t
	urn_store_l = urn_storage_l
	urn_store_r = urn_storage_r
   }

   // urns 
   urn_l_str = ''
   urn_r_str = ''


   //console.log(urn_store_l)
   //console.log(mag_left)
   //console.lo
	

   // create a string with breaks every 5 tokens. 
   for  (row = 9; row >-1; row--){
	for (column = 0; column <5; column++){
		//console.log(urn_store_l[0][1][1])
		urn_l_str = urn_l_str.concat(urn_store_l[trial][row][column])
		urn_r_str = urn_r_str.concat(urn_store_r[trial][row][column])
	}
	urn_l_str = urn_l_str.concat('<br>')
	urn_r_str = urn_r_str.concat('<br>')
   }

   console.log(urn_l_str)
   revealed_o_l = (urn_l_str.match(/O/g) || []).length;
   revealed_x_l = (urn_l_str.match(/X/g) || []).length;
   console.log(revealed_o_l);

   console.log(urn_r_str)
   revealed_o_r = (urn_r_str.match(/O/g) || []).length;
   revealed_x_r = (urn_r_str.match(/X/g) || []).length;
   console.log(revealed_o_r);


   //console.log(urn_l_str)
   document.getElementById('urn_left').innerHTML =urn_l_str;
   document.getElementById('urn_right').innerHTML =urn_r_str;
   if (switchtoken==1){
   document.getElementById('urn_left').innerHTML =urn_r_str;
   document.getElementById('urn_right').innerHTML =urn_l_str;
   }

   $('#urn_left').show();
   $('#urn_right').show();

   ml =  parseInt(mag_left[trial].replace("'", "").replace("'",""))*sign
   mr =  parseInt(mag_right[trial].replace("'", "").replace("'",""))*sign
   // mags
   var element = document.getElementById("mag_left");
   element.innerHTML = ml
   var element = document.getElementById("mag_right");
   element.innerHTML=  mr


   // switch mag for one instruction trial
   if (switchmag==1){
   var element = document.getElementById("mag_right");
   element.innerHTML = ml
   var element = document.getElementById("mag_left");
   element.innerHTML=  mr
   }

   console.log('test5')
   console.log(mr)
   console.log(typeof(mr))
   if (mr>0){
	change_background_color('gain')
   }
   if (mr<0){
	change_background_color('loss')
   }

   $('#mag_left').show();
   $('#mag_right').show();	

}


function hide_urns_and_mags(){
   $('#mag_left').hide();
   $('#mag_right').hide();	
   $('#urn_left').hide();
   $('#urn_right').hide();
   document.getElementById('mag_left').style.borderWidth = '1px';	
   document.getElementById('mag_right').style.borderWidth = '1px';	
   $('#outcome').hide()
}

function show_tally(){

	$('#out1').show()
	$('#out2').show()
	$('#out3').show()
	$('#out4').show()
	$('#out5').show()
}

function hide_tally(){
	$('#out1').hide()
	$('#out2').hide()
	$('#out3').hide()
	$('#out4').hide()
	$('#out5').hide()

}

function increment_tally(recent_outcome){
	
	hide_tally()
	//console.log('increment tally called')

	// add recent outcome to array 
	received_mag_last_5[currenttrial_within_5]=recent_outcome
	
	// set future one's to '_'
	for (i = currenttrial_within_5+1; i < 5; i++) {     		received_mag_last_5[i]='_';	}

	// change the text of the things..
	var element = document.getElementById("out1"); 
	element.innerHTML=received_mag_last_5[0]
	var element = document.getElementById("out2"); 
	element.innerHTML=received_mag_last_5[1]
	var element = document.getElementById("out3"); 
	element.innerHTML=received_mag_last_5[2]
	var element = document.getElementById("out4"); 
	element.innerHTML=received_mag_last_5[3]
	var element = document.getElementById("out5"); 
	element.innerHTML=received_mag_last_5[4]

	
	show_tally()

}

function clean_tally(recent_outcome){
	
	hide_tally()


	// set future one's to '_'
	for (i = currenttrial_within_5+1; i < 5; i++) {     		received_mag_last_5[i]='_';	}
	// change the text of the things..
	var element = document.getElementById("out1"); 
	element.innerHTML=received_mag_last_5[0]
	var element = document.getElementById("out2"); 
	element.innerHTML=received_mag_last_5[1]
	var element = document.getElementById("out3"); 
	element.innerHTML=received_mag_last_5[2]
	var element = document.getElementById("out4"); 
	element.innerHTML=received_mag_last_5[3]
	var element = document.getElementById("out5"); 
	element.innerHTML=received_mag_last_5[4]

	
	show_tally()

}



function reset_tally(){
	hide_tally()
	// after summary reset tally
	//console.log('resetting tally')
	received_mag_last_5 = ['_','_','_','_','_']

	// change the text of the things..
	var element = document.getElementById("out1"); 
	element.innerHTML=received_mag_last_5[0]
	var element = document.getElementById("out2"); 
	element.innerHTML=received_mag_last_5[1]
	var element = document.getElementById("out3"); 
	element.innerHTML=received_mag_last_5[2]
	var element = document.getElementById("out4"); 
	element.innerHTML=received_mag_last_5[3]
	var element = document.getElementById("out5"); 
	element.innerHTML=received_mag_last_5[4]

	document.getElementById('out1').style.border = 'None';
	document.getElementById('out2').style.border = 'None';
	document.getElementById('out3').style.border = 'None';
	document.getElementById('out4').style.border = 'None';
	document.getElementById('out5').style.border = 'None';

	show_tally()

}



function Pressedleft(e) {
	if (canRespond==true && e.keyCode==37 ) {
		Outcome('left')
		last_pressed='left'
	}

	/// example trial presses left
	if(allow_instruct_to_press && e.keyCode==37){
		if (e.keyCode==37){
			last_pressed='left'
			Proceed('next')
		}
		
	}

}

function Pressedright(e) {
	if (canRespond==true && e.keyCode==39) {
		Outcome('right')
	}

	/// example trial presses right
	if(allow_instruct_to_press){
		
		if (e.keyCode==39){
			last_pressed='right'
			Proceed('next')
		}
		
	}
}


function Outcome(response){
	
	///// Person Responded //////

	// Don't let them respond anymore
	canRespond = false

	// cancel previous timeout for no response
	clearTimeout(timeout1)

	// determine if practice or not and set appropriate arrays
	// for storage in database // 
	if(practice){
	currenttrial=currenttrial_p
	prop_left=prop_left_p
	prop_right=prop_right_p
	revealed_right=revealed_right_p
	revealed_left = revealed_left_p	
	}else{
	currenttrial=currenttrial_t
	prop_left=prop_left_t
	prop_right=prop_right_t
	revealed_right=revealed_right_t
	revealed_left = revealed_left_t	
	}

	// deal with no response 
	if(response=='noresp'){
		noresp=1
		//console.log('NO RESPONSE')
		randomchoice  = Math.floor(Math.random()*2)
		if(randomchoice==1){response='left'}else{response='right'}
	}else{
		noresp=0 // just to deal with cataloging
	}

	// show selection
		if(response=='left'){
			document.getElementById('mag_left').style.borderWidth = '5px';
		}else if (response=='right'){
			document.getElementById('mag_right').style.borderWidth = '5px';
		}

	// Choose X or O
		number_between_one_and_one_hundred = Math.floor((Math.random() * 100) + 1); // choose number between 1-100
		if(response=='left'){prob_X=prop_left[currenttrial]  // get the probability 
		}else if (response=='right'){prob_X=prop_right[currenttrial]}
		//console.log('testing in outcome')
		prob_X = prob_X.replace("'","").replace("'","")
		//console.log(prob_X)
		//prob_X = parseFloat(prob_X)
		//console.log(prob_X*100)
		//console.log(number_between_one_and_one_hundred)

		if(number_between_one_and_one_hundred<=prob_X*100){outcome = 'X'}else{outcome='O'} // if uniform is less than line for prob_X, then choose X // 

		var element = document.getElementById("outcome"); // display the X 
		element.innerHTML=outcome
		
	// Store received mag
		if(response=='left'){
			received_mag= parseInt(mag_left[currenttrial].replace("'", "").replace("'",""))*sign
		}else{
			received_mag= parseInt(mag_right[currenttrial].replace("'", "").replace("'",""))*sign
		}
		if(outcome=='O'){
			received_mag = 0
		}
	

	// get RT
		var currentTime = new Date().getTime();
		var RT = currentTime - startTrialTime;
	

	// Store data (sends get query to django)

		$.get("?resp="+response+"&rt="+RT+"&totalpoints="+totalpoints+"&currenttrial="+currenttrial+"&outcome="+outcome+"&received_mag="+received_mag+"&trialstart="+startTrialTime+"&noresp="+noresp+"&prop_left="+prop_left[currenttrial]+"&prop_right="+prop_right[currenttrial]+"&revealed_right="+revealed_right[currenttrial]+"&revealed_left="+revealed_left[currenttrial]+"&mag_left="+mag_left[currenttrial]+"&mag_right="+mag_right[currenttrial]+"&five_trial_outcome="+five_trial_outcome+"&practice="+practice+"&revealed_o_r="+revealed_o_r+"&revealed_o_l="+revealed_o_l+"&revealed_x_r="+revealed_x_r+"&revealed_x_l="+revealed_x_l+"&instruct_number="+currentnumber, function(response){});



	//// Wait before displaying outcome 
	timeout3 = setTimeout(function(){
			$('#outcome').show() 
			// show received mag at top
			increment_tally(received_mag)
	},outcomewait);
	

	//// Wait some more before going to next trial  
	timeout4 = setTimeout(function() {

			$('#outcome').hide()
			$('#urn_left').hide()
			$('#urn_right').hide()
			$('#mag_left').hide()
			$('#mag_right').hide()
			document.getElementById('mag_left').style.borderWidth = '1px';
			document.getElementById('mag_right').style.borderWidth = '1px';
			
			if(practice){
			currenttrial_p+=1
			currenttrial_within_5+=1}
			else{
			currenttrial_within_5+=1
			currenttrial_t+=1}

			// Update Trial Counter
			var element = document.getElementById("trialcounter");
			var ctp = currenttrial+1
			element.innerHTML='Completed: '+ctp+'/'+num_trials
			$('#trialcounter').show()


			NextTrial();
	},outcomewait+outcomelim);

}

function NextTrial() {


	// increment event number
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


//////// Screen to show actual outcome //////////
function RunSummaryScreen(event){

	$('fixation').hide()

	/// Display text .. 
	var element = document.getElementById("summary_text");
	element.innerHTML = 'The computer will now choose one of your previous 5 outcomes.'
	$('#summary_text').show();

	//// determine outcome randomly.. 
	randomchoice  = Math.floor(Math.random()*5)
	//console.log('testing summary screen')
	//console.log(randomchoice)
	outcome = received_mag_last_5[randomchoice]

	var element = document.getElementById("outcome5");
	element.innerHTML = outcome

	/// variable for storing outocme of 5 trials in the ether
	five_trial_outcome = outcome

	console.log(outcome)
	console.log(received_mag_last_5)
	console.log(parseInt(outcome))
	console.log(totalpoints)
	


	///// WAIT BEFORE DISPLAYING OUTCOME ///// 
	timeout3 = setTimeout(function(){
		$('#outcome5').show() 
		nam = 'out'
		nam = nam.concat(String(randomchoice+1))
		document.getElementById(nam).style.border ='solid';
		document.getElementById(nam).style.borderWidth = '3px';
		totalpoints+=parseInt(outcome)
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		$('#pointscounter').show()
	},2000);

	// Prcoeed to Next Trial // 
	setTimeout(function() {
		$('#summary_text').hide();
		$('#outcome5').hide()
		currenttrial_within_5=0
		reset_tally()
		NextTrial()
	}, 2000+2000);

}


function change_background_color(gain_or_loss){

if(gain_or_loss=='gain'){
	var background = document.getElementById("exp_container")
	background.style.backgroundColor = '#6495ED'
}

if(gain_or_loss=='loss'){
	var background = document.getElementById("exp_container")
	//background.style.backgroundColor = '#DC143C'
	background.style.backgroundColor = '#ff4d4d'
}
if(gain_or_loss=='neutral'){
	var background = document.getElementById("exp_container")
	background.style.backgroundColor = '#eee'

}


}



/////////////////// INTRUCTIONS //////////////////////////////


function record_instruct_sceen(currentnumber){

$.get("?resp="+999+"&rt="+999+"&totalpoints="+999+"&currenttrial="+999+"&outcome="+999+"&received_mag="+999+"&trialstart="+999+"&noresp="+999+"&prop_left="+999+"&prop_right="+999+"&revealed_right="+999+"&revealed_left="+999+"&mag_left="+999+"&mag_right="+999+"&five_trial_outcome="+999+"&practice="+2+"&revealed_o_r="+999+"&revealed_o_l="+999+"&revealed_x_r="+999+"&revealed_x_l="+999+"&instruct_number="+currentnumber, function(response){});

}


function RunInstruct(event){
	var currentnumber = parseInt(event.split('-')[1])// get number 
	console.log('current number for instruct event')	
	console.log(currentnumber)
	record_instruct_sceen(currentnumber)


//// Welcome Screen 
	if(currentnumber==1){

		document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p>The aim of this experiment is to increase your POINTS as much as possible.  You start with 0 points (shown at the top right of the screen).  On BLUE trials, you are trying to gain points. On RED trials, you are trying to avoid losing points. Each week we will give a bonus to participants who have the highest score at the end of the hit. A bonus of $3 will be awarded to participants that score in the top 5%, $1 to those in the top 10%, and $0.25 to the top 50%.</p><p>Press Continue.</p>' 

		$('#button_previous').hide();
		$('#button_continue').show();
		$('#fixation').hide();

		// set number of trials to 10 practice trials
		num_trials = 30
		var element = document.getElementById("trialcounter");
		element.innerHTML='Completed: '+0+'/'+num_trials
		

		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		$('#pointscounter').show()
		change_background_color('neutral')


//// First Trial 
	}else if(currentnumber==2){

		currenttrial_p=0
		currenttrial_within_5=0
		practice=true
		change_background_color('gain')

		document.getElementById('instruct').innerHTML='<p>On each BLUE trial, you will choose between the the box on the left and the box on the right. In order to make your choice, you will need to consider two things. The first thing to consider is the number above each box, which indicates the number of points you might earn. If you were just considering the number of points, you would want to chose the box with the larger number.</p><p>Press Continue.</p>'
		display_urns_and_mags(currenttrial_p,practice,0,0)

		$('#trialcounter').show()
		$('#button_previous').show();
		

	}else if(currentnumber==3){

		document.getElementById('instruct').innerHTML='<p>The second thing to consider when making your choice is how likely it will be that you will receive the points above the box. This is determined by the number of ‘X’s in the box. Once you have made your choice, a token (an ‘O’ or ‘X’) is randomly drawn from the box you chose. If an ‘X’ is drawn, you may go on to receive those points. If an ‘O’ is drawn, you would receive 0 points.</p><p>Press Continue.</p>'

		
	}else if(currentnumber==4){
		document.getElementById('instruct').innerHTML='<p>On some BLUE trials you may have to trade-off between the probability that an ‘X’ will be drawn, and how many points you might earn. Here for example, the box on the left has a lot less ‘X’s, but the number of points is higher. Conversely, you are more likely to get an ‘X’ if you choose the box on the right, but this is linked to less points. How you make this trade-off is up to you. </p><p>Press Continue.</p>'
		
		$('#button_continue').show();


	}else if(currentnumber==5){
	
		document.getElementById('instruct').innerHTML = '<p>To make your choice, you can press the left arrow key for the box on the left, and the right arrow key for the box on the right. (The arrow keys are at the bottom right of your keyboard).</p><p>Just for this example, let’s pick the one on the right.</p><p>Press the right arrow key.</p>'
		$('#button_continue').hide();
		allow_instruct_to_press = true; 
		document.getElementById('mag_right').style.borderWidth = '1px';

	}else if(currentnumber==6){
	
		document.getElementById('instruct').innerHTML = '<p>Your choice of box is highlighted by the black square.</p><p>You have up to 8 seconds to choose between the boxes on each trial. Once you’ve decided, respond as quickly as you can. If you fail to respond within the time limit, the computer will make a random choice for you.</p><p>Press Continue.</p>'
		
		document.getElementById('mag_right').style.borderWidth = '5px';
		allow_instruct_to_press = false;
		document.getElementById('outcome').innerHTML=''
		$('#button_continue').show();
		currenttrial_p=0
		currenttrial_within_5=0
		$('#button_continue').show();
		

	}else if(currentnumber==7){
		
		reset_tally()
		document.getElementById('instruct').innerHTML=''
		document.getElementById('outcome').innerHTML='X'
		$('#button_continue').hide();
		currenttrial_p=0
		currenttrial_within_5=0

		document.getElementById('instruct').innerHTML='<p>After you make your choice, a token will be drawn from the box. In this case, an ‘X’ was drawn associated with 11 points. This outcome will be added to the first slot of your temporary tally board in the top-middle of the screen. It is not immediately added to your total score.</p><p>Press Continue.</p>'
		display_urns_and_mags(currenttrial_p,practice,0,0)
		outcome = '11'


			$('#outcome').show() 
			$('#button_continue').show();
			increment_tally(outcome)
			show_tally()
			

		
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials

	
//// tally explanation   //// 
	}else if(currentnumber==8){
		hide_urns_and_mags()

		document.getElementById('instruct').innerHTML = '<p>BLUE trials happen in blocks of 5. At the end of each block, one of the outcomes will be selected at random and the points will be added to your total score in the top right corner of the screen. The outcome associated with each trial (stored in the temporary tally board) is equally likely to be chosen. This means you should aim for the best outcome you can on each trial. </p><p>For example, if the outcomes from a block were three ‘O’s, one ‘X’ of magnitude 11 and one ‘X’ of magnitude 30, you’d have a 3/5 chance of getting zero points added to your score, a 1/5 chance of getting 11 points added to your score and a 1/5 chance of getting 30 points added to your score.</p><p>Press Continue.</p>'
	
		document.getElementById('mag_right').style.borderWidth = '5px';
		allow_instruct_to_press = false;
		$('#button_continue').show();
		$('#outcome').hide();
		currenttrial_p=0
		currenttrial_within_5=0
	}else if(currentnumber==9){
		hide_urns_and_mags()
		document.getElementById('instruct').innerHTML = '<p>Importantly, the boxes change independently on every trial, so you can’t use information about whether you got an ‘X’ or not to guide your behavior on the next trial.</p><p>We will now walk through the remaining 4 trials in this example block.</p><p>Press Continue.</p>'
		document.getElementById('mag_right').style.borderWidth = '5px';
		allow_instruct_to_press = false;
		$('#button_continue').show();
		$('#outcome').hide();
		currenttrial_p=0
		currenttrial_within_5=0
		$('#button_continue').show();
		clean_tally();



//// 2nd trial
	}else if(currentnumber==10){	
		currenttrial_p=1
		currenttrial_within_5=1	
		practice=true

		document.getElementById('instruct').innerHTML = '<p>Here is the second  trial. In this one, both boxes have a lot of ‘X’s. However the magnitude is much bigger for the box on the right. So you might want to choose this one. Let’s assume you did.</p><p> Press the right arrow key.</p'
		display_urns_and_mags(currenttrial_p,practice,0,0)

		document.getElementById('mag_left').style.borderWidth = '1px';
		document.getElementById('mag_right').style.borderWidth = '1px';	
		allow_instruct_to_press = true; 
		$('#button_continue').hide();
		clean_tally();



	}else if(currentnumber==11){		
		document.getElementById('mag_right').style.borderWidth = '5px';	
		currenttrial_p=1
		currenttrial_within_5=1	
		document.getElementById('instruct').innerHTML = '<p>Here the outcome was again an ‘X’, so the 2nd slot in the temporary tally board changes to show 75 points.</p><p>Press Continue.</p>'
		outcome='75'
		display_urns_and_mags(currenttrial_p,practice,0,0) // 

		document.getElementById('outcome').innerHTML='X'
		$('#outcome').show()
	
		increment_tally(outcome)
		allow_instruct_to_press = false; 
		$('#button_continue').show();
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials
		


//// Third Trial  (X) 


	}else if(currentnumber==12){		
		document.getElementById('instruct').innerHTML = '<p>This third example is another type of trial you will encounter. Some of the tokens in one of the boxes are covered up by ‘=’ signs.  So you do not know whether there is an ‘O’ or an ‘X’ underneath each one. There are still 50 tokens in the box with a predefined proportion of ‘O’s and ‘X’s. This unknown proportion determines the likelihood that an ‘X’ will be drawn.</p><p>Press Continue.</p>'
		document.getElementById('mag_left').style.borderWidth = '1px';
		document.getElementById('mag_right').style.borderWidth = '1px';	
		document.getElementById('outcome').innerHTML=''		
		$('#outcome').hide()	
		currenttrial_p=2
		currenttrial_within_5=2
		display_urns_and_mags(currenttrial_p,practice,1,0)


	}else if(currentnumber==13){		
		document.getElementById('instruct').innerHTML = '<p>The 20 uncovered tokens have been picked at random, so they give you some information about what is in the box. If the computer did it again, it might pick a different number of ‘X’s and ‘O’s even though you’re drawing from the same box with the same predefined underlying number of ‘O’s and ‘X’s. So, you have to infer the actual proportion from the sample you see.</p><p>Press Continue.</p>'


	}else if(currentnumber==14){		
		document.getElementById('instruct').innerHTML = '<p>The more tokens you can see, the more information you have and the more likely it will be that the ratio of ‘X’s to ‘O’s you can see reflects the actual proportion of ‘O’s to ‘X’s in the box.</p><p>Press Continue.</p>'
		currenttrial_p=2
		currenttrial_within_5=2
		display_urns_and_mags(currenttrial_p,practice,1,0)

		document.getElementById('mag_left').style.borderWidth = '1px';
		document.getElementById('mag_right').style.borderWidth = '1px';		
		document.getElementById('outcome').innerHTML=''		
		$('#outcome').hide()	
		$('#button_continue').show();


	}else if(currentnumber==15){		
		document.getElementById('instruct').innerHTML = '<p> Okay, so let’s assume you chose the one on the right. </p><p>Press the right arrow key.</p>'
		currenttrial_p=2
		currenttrial_within_5=2

		document.getElementById('mag_left').style.borderWidth = '1px';
		document.getElementById('mag_right').style.borderWidth = '1px';		
		document.getElementById('outcome').innerHTML=''		
		$('#outcome').hide()	
		$('#button_continue').hide();
		practice=true
		allow_instruct_to_press = true; 
		display_urns_and_mags(currenttrial_p,practice,1,0)
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials
		clean_tally();

	}else if(currentnumber==16){	
		document.getElementById('mag_right').style.borderWidth = '5px';	
		outcome='26'
		document.getElementById('instruct').innerHTML = '<p>You received another ‘X’, and therefore 26 points have entered the temporary tally board. Note, you do not get to see behind the equals signs at any point.</p> <p>Now you can choose on your own for the last 2 trials.</p><p>Press Continue.</p>'


		document.getElementById('outcome').innerHTML='X'
		$('#outcome').show()
		increment_tally(outcome)
		currenttrial_p=2
		currenttrial_within_5=2
		clean_tally();
		display_urns_and_mags(currenttrial_p,practice,1,0)
		allow_instruct_to_press = false; 
		$('#button_continue').show();
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials


//// Fourth Trial  (0)
	}else if(currentnumber==17){		
		document.getElementById('instruct').innerHTML = '<p>Here, there is also missing information in one box (this time, the box on the left). This time, a lot of information is missing -- you can only see four tokens.</p><p>One minor point is that the ‘O’s are shuffled to the left in each row to make it easier for you to see how many are in each bin. But this happens after the ‘=’ signs are put down. So in a row that is partly hidden like the bottom row here, the hidden tokens can be either ‘O’s OR ‘X’s.</p><p>Go ahead and make your choice.</p><p>Press either the right or left arrow key.</p>'
		document.getElementById('mag_left').style.borderWidth = '1px';	
		document.getElementById('mag_right').style.borderWidth = '1px';			
		practice=true
		$('#outcome').hide()
		$('#button_continue').hide();
		allow_instruct_to_press = true; 
		currenttrial_p=3
		currenttrial_within_5=3
		display_urns_and_mags(currenttrial_p,practice,0,0)
		clean_tally();


	}else if(currentnumber==18){	

		currenttrial_p=3
		currenttrial_within_5=3

		display_urns_and_mags(currenttrial_p,practice,0,0)
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.borderWidth = '5px';		
		mag = mag_left_p
		}else{
		document.getElementById('mag_right').style.borderWidth = '5px';	
		mag = mag_right_p
		}


		
		outcome = parseInt(mag[currenttrial_p].replace("'", "").replace("'",""))
		document.getElementById('instruct').innerHTML = '<p>An ‘O’ was drawn from the box you picked, so 0 points has been entered into the fourth slot in the temporary tally board.</p><p>Press Continue.</p>'
		document.getElementById('outcome').innerHTML='O'
		increment_tally(0)
		$('#outcome').show()

		allow_instruct_to_press = false; 
		$('#button_continue').show();
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials

		clean_tally();


//// Fifth Trial (X)
	}else if(currentnumber==19){		
		document.getElementById('instruct').innerHTML = '<p> Here again you can choose either side.</p><p>Press either the right or left arrow key.</p>'
		document.getElementById('mag_left').style.borderWidth = '1px';	
		document.getElementById('mag_right').style.borderWidth = '1px';		
		$('#outcome').hide()	
		$('#button_continue').hide();
		currenttrial_p=4
		currenttrial_within_5=4
		practice=true
		allow_instruct_to_press = true; 
		display_urns_and_mags(currenttrial_p,practice,0,0)
		clean_tally();

	}else if(currentnumber==20){	

		currenttrial_p=4
		currenttrial_within_5=4
		display_urns_and_mags(currenttrial_p,practice,0,0)
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.borderWidth = '5px';		
		mag = mag_left_p
		}else{
		document.getElementById('mag_right').style.borderWidth = '5px';	
		mag = mag_right_p
		}

		outcome = parseInt(mag[currenttrial_p].replace("'", "").replace("'",""))*sign
		str1 = 	'<p> You received another ‘X’, and therefore '
		str2 = outcome
		str1 = str1.concat(str2)
		document.getElementById('instruct').innerHTML = str1.concat(' points have entered the temporary tally board.</p> <p>Press Continue.</p>')
		document.getElementById('outcome').innerHTML='X'
		$('#outcome').show()
		increment_tally(outcome)
		
		allow_instruct_to_press = false; 
		$('#button_continue').show();
		$('#summary_text').hide();
		$('#outcome5').hide();
		randomchoice = 0
		nam = 'out'
		nam = nam.concat(String(randomchoice+1))
		document.getElementById(nam).style.border = 'None';
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials
		



//// 5 Trial Summary 
	}else if(currentnumber==21){		
		document.getElementById('instruct').innerHTML = '<p> As mentioned before, after 5 trials you will see a screen with just the temporary tally board, showing your outcomes for each trial in the block of 5.</p><p>Press Continue.</p>'
		/// Display text .. 
			var element = document.getElementById("summary_text");
			element.innerHTML = 'The computer will now choose one of your previous 5 outcomes.'
			$('#summary_text').show();
		hide_urns_and_mags()
		allow_instruct_to_press = false; 
		$('#button_continue').show();


	}else if(currentnumber==22){

		document.getElementById('instruct').innerHTML = '<p>The computer will randomly select one of these outcomes. If you won some points, these will be added to your scoreboard. </p><p> For example, here the computer chose the outcome associated with 75 points, which have been added to your total score in the top right.</p><p>Press Continue.</p>'

		randomchoice = 1
		outcome = received_mag_last_5[randomchoice]
		var element = document.getElementById("outcome5");
		element.innerHTML = outcome

		totalpoints+=parseInt(outcome)
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		$('#pointscounter').show()

		$('#outcome5').show() 
		nam = 'out'
		nam = nam.concat(String(randomchoice+1))
		document.getElementById(nam).style.border ='solid';
		document.getElementById(nam).style.borderWidth = '3px';
		change_background_color('gain')

		


//// Do some negative examples //// 


	}else if(currentnumber==23){
		document.getElementById('instruct').innerHTML='<p>Now we will walk through an example block of RED trials. On these trials, you will be trying to avoid losing points that you already have.</p><p>Press Continue.</p>'
		$('#button_continue').show();
		reset_tally()
		hide_tally()
		$('#summary_text').hide();
		$('#outcome5').hide()
		change_background_color('neutral')

///// 6th trial	

	}else if(currentnumber==24){	

		currenttrial_p=5
		currenttrial_within_5=0
		practice=true
		change_background_color('loss')
		document.getElementById('instruct').innerHTML = '<p> On this RED trial, notice that the numbers above the boxes are negative. This indicates points you might lose from your current total. Here, if an ‘X’ is drawn, the negative points will be entered in your temporary tally board. If that number is chosen at the end of the 5 trial block, those points will be subtracted from your total.</p><p>On this trial, the box on the right is more likely to result in a loss, because there are more ‘X’s, but the potential loss is smaller. </p><p>You can choose either side here.</p><p>Press either the right or left arrow key.</p>'
		display_urns_and_mags(currenttrial_p,practice,1,0)

		document.getElementById('mag_left').style.borderWidth = '1px';	
		document.getElementById('mag_right').style.borderWidth = '1px';		
		allow_instruct_to_press = true; 
		$('#button_continue').hide();
		clean_tally();



	}else if(currentnumber==25){	

	
		currenttrial_p=5
		currenttrial_within_5=0

		
		display_urns_and_mags(currenttrial_p,practice,1,0) // switch mag
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.borderWidth = '5px';		
		mag = mag_right_p
		}else{
		document.getElementById('mag_right').style.borderWidth = '5px';	
		mag = mag_left_p
		}

		outcome = parseInt(mag[currenttrial_p].replace("'", "").replace("'",""))
		str1 = 	'<p>An ‘X’ was drawn from the box you picked. You can see that '
		str2 = outcome
		str1 = str1.concat(str2)
		document.getElementById('instruct').innerHTML = str1.concat(' points have been entered into the first slot in the temporary tally board. </p><p> Press Continue.</p>')
		document.getElementById('outcome').innerHTML='X'
		increment_tally(outcome)
		$('#outcome').show()

		allow_instruct_to_press = false; 
		$('#button_continue').show();
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials

///// 7th trial	

	}else if(currentnumber==26){	
		$('#outcome').hide()
		currenttrial_p=6
		currenttrial_within_5=1	
		practice=true

		document.getElementById('instruct').innerHTML = '<p>On this trial, the box on the left has a less likely loss, but it is larger. Conversely, the box on the right has a more likely loss, but it is smaller.</p><p>Here, you can again choose either side. </p><p>Press either the right or left arrow key.</p>'
		display_urns_and_mags(currenttrial_p,practice,0,0)

		document.getElementById('mag_left').style.borderWidth = '1px';	
		document.getElementById('mag_right').style.borderWidth = '1px';	
		allow_instruct_to_press = true; 
		$('#button_continue').hide();
		clean_tally();


	}else if(currentnumber==27){		

		currenttrial_p=6
		currenttrial_within_5=1	

		display_urns_and_mags(currenttrial_p,practice,0,0) // switch mag
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.borderWidth = '5px';		
		mag = mag_left_p
		}else{
		document.getElementById('mag_right').style.borderWidth = '5px';	
		mag = mag_right_p
		}

		outcome = parseInt(mag[currenttrial_p].replace("'", "").replace("'",""))
		document.getElementById('instruct').innerHTML = '<p>An ‘O’ was drawn from the box you picked, so a loss of 0 points (i.e. no loss) has been entered into the second slot in the temporary tally board.</p><p>Press Continue.</p>'
		document.getElementById('outcome').innerHTML='O'
		increment_tally(0)
		$('#outcome').show()

		allow_instruct_to_press = false; 
		$('#button_continue').show();
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials

///// 8th trial	

	}else if(currentnumber==28){	
		$('#outcome').hide()
		currenttrial_p=7
		currenttrial_within_5=2
		practice=true

		document.getElementById('instruct').innerHTML = '<p> Here, the box on the right has a less likely loss and it is smaller. You should probably choose that side.</p><p>Press the right arrow key.</p>'
		display_urns_and_mags(currenttrial_p,practice,1,0)

		document.getElementById('mag_left').style.borderWidth = '1px';	
		document.getElementById('mag_right').style.borderWidth = '1px';		
		allow_instruct_to_press = true; 
		$('#button_continue').hide();
		clean_tally();



	}else if(currentnumber==29){		

		currenttrial_p=7
		currenttrial_within_5=2	

		display_urns_and_mags(currenttrial_p,practice,1,0) // switch mag
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.borderWidth = '5px';		
		mag = mag_right_p
		}else{
		document.getElementById('mag_right').style.borderWidth = '5px';	
		mag = mag_left_p
		}

		outcome = parseInt(mag[currenttrial_p].replace("'", "").replace("'",""))
		document.getElementById('instruct').innerHTML = '<p>Here, another ‘O’  was drawn, so a loss of 0 has been entered into your tally board.</p><p>Press Continue.</p>'
		document.getElementById('outcome').innerHTML='O'
		increment_tally(0)
		$('#outcome').show()

		allow_instruct_to_press = false; 
		$('#button_continue').show();
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials



//// 9th Trial 
	}else if(currentnumber==30){	
		currenttrial_p=8
		currenttrial_within_5=3	
		document.getElementById('instruct').innerHTML = '<p>Here is another example where some tokens are covered up. Based on what you can see, you have to estimate how likely it is an ‘X’ will be drawn from the box on the right.</p><p>You can choose either side here.</p><p>Press either the right or left arrow key.</p>'
		document.getElementById('mag_left').style.borderWidth = '1px';	
		document.getElementById('mag_right').style.borderWidth = '1px';			
		practice=true
		$('#outcome').hide()
		$('#button_continue').hide();
		allow_instruct_to_press = true; 

		display_urns_and_mags(currenttrial_p,practice,1,0) // switch mag
		clean_tally();


	}else if(currentnumber==31){	

		currenttrial_p=8
		currenttrial_within_5=3

		display_urns_and_mags(currenttrial_p,practice,0,0) // switch mag
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.borderWidth = '5px';		
		mag = mag_left_p
		}else{
		document.getElementById('mag_right').style.borderWidth = '5px';	
		mag = mag_right_p
		}

		
		outcome = parseInt(mag[currenttrial_p].replace("'", "").replace("'",""))
		document.getElementById('instruct').innerHTML = '<p>An ‘X’ was drawn from the box you picked, so a loss has been entered into the fourth slot in the temporary tally board.</p><p>Press Continue.</p>'
		document.getElementById('outcome').innerHTML='X'
		increment_tally(outcome)
		$('#outcome').show()
		allow_instruct_to_press = false; 
		$('#button_continue').show();
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials
		clean_tally();


//// 10th trial 
	}else if(currentnumber==32){	
		currenttrial_p=9
		currenttrial_within_5=4	
		document.getElementById('instruct').innerHTML = '<p> Here again you can choose either side.</p><p>Press either the right or left arrow key.</p>'
		document.getElementById('mag_left').style.borderWidth = '1px';	
		document.getElementById('mag_right').style.borderWidth = '1px';		
		$('#outcome').hide()	
		$('#button_continue').hide();
		practice=true
		allow_instruct_to_press = true; 
		display_urns_and_mags(currenttrial_p,practice,1,0) // switch mag
		clean_tally();

	}else if(currentnumber==33){	
		currenttrial_p=9
		currenttrial_within_5=4
		display_urns_and_mags(currenttrial_p,practice,1,0) // switch mag
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.borderWidth = '5px';		
		mag = mag_right_p
		}else{
		document.getElementById('mag_right').style.borderWidth = '5px';	
		mag = mag_left_p
		}

		outcome = parseInt(mag[currenttrial_p].replace("'", "").replace("'",""))*sign
		str1 = 	'<p> You received another ‘X’, and therefore '
		str2 = outcome
		str1 = str1.concat(str2)
		document.getElementById('instruct').innerHTML = str1.concat(' points have entered the temporary tally board. </p><p>Press Continue.</p>')
		document.getElementById('outcome').innerHTML='X'
		$('#outcome').show()
		increment_tally(outcome)
		
		allow_instruct_to_press = false; 
		$('#button_continue').show();
		$('#summary_text').hide();
		$('#outcome5').hide();
		randomchoice = 0
		nam = 'out'
		nam = nam.concat(String(randomchoice+1))
		document.getElementById(nam).style.border = 'None';
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials
		



//// 5 Trial Summary (loss) 
	}else if(currentnumber==34){		
		document.getElementById('instruct').innerHTML = '<p> Just like before, after 5 RED trials you will see a screen with just the temporary tally board, showing your outcomes for the previous 5 trials.</p><p>Press Continue.</p>'
		/// Display text .. 
			var element = document.getElementById("summary_text");
			element.innerHTML = 'The computer will now choose one of your previous 5 outcomes.'
			$('#summary_text').show();
		hide_urns_and_mags()
		allow_instruct_to_press = false; 
		$('#button_continue').show();


	}else if(currentnumber==35){




		randomchoice = 2
		outcome = received_mag_last_5[randomchoice]
		var element = document.getElementById("outcome5");
		element.innerHTML = outcome


		str1 = 	'<p>The computer will randomly select one of these outcomes. If a negative number is chosen, these points will be subtracted from your total score. </p><p> For example, here the computer chose the outcome associated with '
		str2 = outcome
		str1 = str1.concat(str2)
		document.getElementById('instruct').innerHTML = str1.concat(' points, which have been subtracted from your scoreboard in the top right.</p><p>Press Continue.</p>')



		totalpoints+=parseInt(outcome)
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		$('#pointscounter').show()

		$('#outcome5').show() 
		nam = 'out'
		nam = nam.concat(String(randomchoice+1))
		document.getElementById(nam).style.border ='solid';
		document.getElementById(nam).style.borderWidth = '3px';

	

//// Prepare them for 5 more practice trials //// 
	}else if(currentnumber==36){
		document.getElementById('instruct').innerHTML='<p>Now, we would like you to complete 20 more practice trials on your own. </p><p> Remember to respond as soon as you’ve made your decision.</p><p>If anything is still unclear, press the ‘Go Back’ button to go back through each screen or refresh your browser to go to the beginning of the instructions.</p><p>Press Continue and get started!</p>'
		reset_tally()		
		hide_tally()
		$('#summary_text').hide();
		$('#outcome5').hide()
		change_background_color('neutral')
		

//// Practice 10 more trials //// 
	}else if(currentnumber==37){
		reset_tally()
		currenttrial_p=10
		currenttrial_within_5=0	
		hide_tally()
		$('#summary_text').hide();
		$('#outcome5').hide()
		$('#button_continue').hide();	
		$('#button_previous').hide();
		document.getElementById('instruct').innerHTML=''	
		document.getElementById('exp_container').style.margin='auto';

		/*document.getElementById('exp_container').style.margin-left='None';*/
		
		practice=true
		timeout=setTimeout(function() {
			RunTrial(event);
		}, ITI-1250)

//// Practice 2 //// 
	}else if(currentnumber==38){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 3 //// 
	}else if(currentnumber==39){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 4 //// 
	}else if(currentnumber==40){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 5 //// 
	}else if(currentnumber==41){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// 5 Trial summary //// 
	}else if(currentnumber==42){		
		//document.getElementById('instruct').innerHTML = 'After each block of 5 trials, you will see a screen with just the temporary tally board, showing your outcomes for each trial in the block of 5.'
		//RunSummaryScreen() // this will time out and go to the next screen //
		allow_instruct_to_press = false; 
		practice=true
		//$('#button_continue').show();
		RunSummaryScreen(event)

//// Practice 6 //// 
	}else if(currentnumber==43){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// Practice 7 //// 
	}else if(currentnumber==44){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// Practice 8 //// 
	}else if(currentnumber==45){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 9 //// 
	}else if(currentnumber==46){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 10 //// 
	}else if(currentnumber==47){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// 5 Trial summary //// 
	}else if(currentnumber==48){		
		//document.getElementById('instruct').innerHTML = 'After each block of 5 trials, you will see a screen with just the temporary tally board, showing your outcomes for each trial in the block of 5.'
		//RunSummaryScreen() // this will time out and go to the next screen //
		allow_instruct_to_press = false; 
		practice=true
		//$('#button_continue').show();
		RunSummaryScreen(event)

//// Practice 11 //// 
	}else if(currentnumber==49){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// Practice 12 //// 
	}else if(currentnumber==50){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// Practice 13 //// 
	}else if(currentnumber==51){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 14 //// 
	}else if(currentnumber==52){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 15 //// 
	}else if(currentnumber==53){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// 5 Trial summary //// 
	}else if(currentnumber==54){		
		//document.getElementById('instruct').innerHTML = 'After each block of 5 trials, you will see a screen with just the temporary tally board, showing your outcomes for each trial in the block of 5.'
		//RunSummaryScreen() // this will time out and go to the next screen //
		allow_instruct_to_press = false; 
		practice=true
		//$('#button_continue').show();
		RunSummaryScreen(event)

//// Practice 16 //// 
	}else if(currentnumber==55){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// Practice 17 //// 
	}else if(currentnumber==56){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// Practice 18 //// 
	}else if(currentnumber==57){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 19 //// 
	}else if(currentnumber==58){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 20 //// 
	}else if(currentnumber==59){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// 5 Trial summary //// 
	}else if(currentnumber==60){		
		//document.getElementById('instruct').innerHTML = 'After each block of 5 trials, you will see a screen with just the temporary tally board, showing your outcomes for each trial in the block of 5.'
		//RunSummaryScreen() // this will time out and go to the next screen //
		allow_instruct_to_press = false; 
		practice=true
		//$('#button_continue').show();
		RunSummaryScreen(event)

//// Intsruction summary  //// 
	}else if(currentnumber==61){
		
		change_background_color('neutral')
		document.getElementById('exp_container').style.marginLeft='40%';
		$('#button_continue').show();
	
		practice=false

		document.getElementById('instruct').innerHTML='<p>Well done! You are now ready to start the task.</p><p> Remember that you want to maximize your total amount of points, which will determine your ranking and a bonus payment if your rank is high enough. To do this you want to make the best decision you can on every trial.</p><p> When deciding between the boxes on each trial, you should consider both the number of points associated with each box (number above the box) and how likely you would be to win or lose those points (how many ‘X’s are in the box).</p>'

		num_trials = num_trials_original
		var element = document.getElementById("trialcounter");
		element.innerHTML='Completed: '+0+'/'+num_trials
		if(outcome_type=='gain'){
		totalpoints = 0
		}else{
		totalpoints = 0
		}
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		$('#pointscounter').show()
		reset_tally()
		hide_tally()

		
	}else if(currentnumber==62){
		$('#button_continue').show();
		change_background_color('neutral')
		document.getElementById('instruct').innerHTML='<p>Select the box you want using the left and right arrow keys. You have up to 8 seconds to make your choice on each trial, but you should respond as soon as you’ve made your decision.</p><p>There will be 300 trials. You will get 5 breaks, one after each 50 trials.</p><p>STOP! Are you ready to start? This is a timed experiment, so once you click continue, you will not be able to go back. Press Continue to get started on the task. Good luck!</p>'
		
	}


	
	
	
}




////////////////// BREAK //////////////////


function RunBreak(event){
	$('#instruct').show()
	//document.getElementById('exp_container').style.margin='auto';
	document.getElementById('exp_container').style.marginLeft='40%';
	$('#button_continue').show()
	$('#button_previous').hide()
	document.getElementById('instruct').innerHTML='Take a break. When you are ready to begin, click continue.'
}

////////////////// END SCREEN //////////////////

function RunEndScreen(){
	//document.getElementById("thanks2").innerHTML='You have earned an extra: $'+totalpoints*.001
	//document.getElementById('exp_container').style.margin='auto';
	document.getElementById('exp_container').style.marginLeft='40%';
	$('#fixation').hide()
	
	$('#instruct').show()
	document.getElementById('instruct').innerHTML='<p> You have completed the experiment!</p> <p>Your bonus will be computed based on your performance relative to other participants. If you recieve a bonus, you will do so within 1 week.</p><p> Click below to return to the home page for your completion code.'
	$('#button_return_home').show();
	$('#button_continue').hide()
	canProceed = false 
// Store data (sends get query to django)
	finished=1
	$.get("?finished="+finished, function(response){});
	
	
	
	/// Genenerate finished key 
	
}


