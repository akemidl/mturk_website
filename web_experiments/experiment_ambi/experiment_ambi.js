
console.log(outcome_type)
if(outcome_type=='gain'){

 var totalpoints = 0
 var sign = 1.0

}else if(outcome_type=='loss'){
 var totalpoints = 5000
 var sign = -1.0

}


//XOlist

XOlist = XOlist.replace('[', "").replace(']', "").replace(/"/g,'')
//console.log(XOlist.split(',')) //(/,/g, ""))

// debuggin the input variables. 
//console.log(parseFloat(prop_left_t[10].replace("'","").replace("'",""))*50)




// Counters
var currentevent = 0
var currenttrial_t = 0
var currenttrial_p = 0 
var currenttrial_within_5 = 0 


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
total_instruct = 32
//total_instruct = 1 /// TESTING TRIALS

num_trials=200
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
	for (trial = 0; trial <200; trial++){

		// for each trial create 2 10x5 urns
		urn_left = []
		urn_right = []
		within_urn_counter_r = 0
		within_urn_counter_l = 0
		for  (row = 0; row <20; row++){

			// create a row
			var row_array = []
			for  (column = 0; column<5; column++){
				one_or_zero = parseInt(XOlist[iii])
				if(one_or_zero==0){row_array[column]='O'}
				if(one_or_zero==1){row_array[column]='X'}

				// if row is greater than 10 use the within left urn counter and reveal
				if(row<10){
					if(within_urn_counter_r>=parseFloat(revealed_right_t[trial].replace("'","").replace("'",""))*50){row_array[column]='='}
					within_urn_counter_r+=1
				}
				else{
					if(within_urn_counter_l>=parseFloat(revealed_left_t[trial].replace("'","").replace("'",""))*50){row_array[column]='='}
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
		urn_storage_r[trial]=urn_right
		urn_storage_l[trial]=urn_left
	}
	//console.log(urn_storage_r)
	//	console.log(urn_storage_l)
	

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
				if(one_or_zero==0){row_array[column]='O'}
				if(one_or_zero==1){row_array[column]='X'}

			
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

   // mags
   var element = document.getElementById("mag_left");
   element.innerHTML = parseInt(mag_left[trial].replace("'", "").replace("'",""))*sign
   var element = document.getElementById("mag_right");
   element.innerHTML=  parseInt(mag_right[trial].replace("'", "").replace("'",""))*sign

   // switch mag for one instruction trial
   if (switchmag==1){
   var element = document.getElementById("mag_right");
   element.innerHTML = parseInt(mag_left[trial].replace("'", "").replace("'",""))*sign
   var element = document.getElementById("mag_left");
   element.innerHTML=  parseInt(mag_right[trial].replace("'", "").replace("'",""))*sign
   }

   $('#mag_left').show();
   $('#mag_right').show();	

}


function hide_urns_and_mags(){
   $('#mag_left').hide();
   $('#mag_right').hide();	
   $('#urn_left').hide();
   $('#urn_right').hide();
   document.getElementById('mag_right').style.border = 'None';
   document.getElementById('mag_left').style.border = 'None';
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
			document.getElementById('mag_left').style.border = '.1em solid black';
		}else if (response=='right'){
			document.getElementById('mag_right').style.border = '.1em solid black';
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
		if(outcome=='X'){
			received_mag = 0
		}
	
	


	// get RT
		var currentTime = new Date().getTime();
		var RT = currentTime - startTrialTime;
	


	

	// Store data (sends get query to django)


		$.get("?resp="+response+"&rt="+RT+"&totalpoints="+totalpoints+"&currenttrial="+currenttrial+"&outcome="+outcome+"&received_mag="+received_mag+"&trialstart="+startTrialTime+"&noresp="+noresp+"&prop_left="+prop_left[currenttrial]+"&prop_right="+prop_right[currenttrial]+"&revealed_right="+revealed_right[currenttrial]+"&revealed_left="+revealed_left[currenttrial]+"&mag_left="+mag_left[currenttrial]+"&mag_right="+mag_right[currenttrial]+"&five_trial_outcome="+five_trial_outcome+"&practice="+practice+"&revealed_o_r="+revealed_o_r+"&revealed_o_l="+revealed_o_l+"&revealed_x_r="+revealed_x_r+"&revealed_x_l="+revealed_x_l, function(response){});



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
			document.getElementById('mag_left').style.border = 'None';
			document.getElementById('mag_right').style.border = 'None';
			
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
		document.getElementById(nam).style.border = '.1em solid black';
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





/////////////////// INTRUCTIONS //////////////////////////////


function RunInstruct(event){
	var currentnumber = parseInt(event.split('-')[1])// get number 
	console.log('current number for instruct event')	
	console.log(currentnumber)




//// Welcome Screen 
	if(currentnumber==1){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p> In this study, you will make a series of choices to try to maximize the amount of points you get.  Your points will be shown in the upper right corner.</p><p>Press Continue.</p>' //  Points will be converted to money at the end of the experiment.
		}else{
		document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p> In this study, you will make a series of choices to try to minimize the number of points you lose from your starting total of 5000.  Your points will be shown in the upper right corner. </p><p>Press Continue.</p>' // The points you have left at the end of the experiment will be converted to money.
		}
		$('#button_previous').hide();
		$('#button_continue').show();
		$('#fixation').hide();

		// set number of trials to 10 practice trials
		num_trials = 10
		var element = document.getElementById("trialcounter");
		element.innerHTML='Completed: '+0+'/'+num_trials
		

		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		$('#pointscounter').show()


//// First Trial 
	}else if(currentnumber==2){

		currenttrial_p=0
		currenttrial_within_5=0
		practice=true
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='<p>On each trial you will see two boxes, one on the left and one on the right. Each box contains ‘X’s and ‘O’s. The ratio of ‘X’s and ‘O’s varies independently between the two boxes and changes on every trial. Above each box is a number, which indicates the reward (number of points) associated with that box. This is also set independently for each box, on each trial.</p>'
		display_urns_and_mags(currenttrial_p,practice,0,0)
		}else{
		document.getElementById('instruct').innerHTML='<p>On each trial you will see two boxes, one on the left and one on the right. Each box contains ‘X’s and ‘O’s. The ratio of ‘X’s and ‘O’s varies independently between the two boxes and changes on every trial. Above each box is a number, which indicates the loss (number of points subtracted from your total) associated with that box. This is also set independently for each box, on each trial.</p>'
		display_urns_and_mags(currenttrial_p,practice,1,1)
		}
		
		

		$('#trialcounter').show()
		$('#button_previous').show();
		

	}else if(currentnumber==3){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='<p>You need to choose one of the boxes on each trial. To make your choice, consider two things. The first is how likely it will be that you will get a reward. This is determined by the number of ‘O’s in the box. Once you have made your choice, the computer randomly draws a token (an ‘X’ or ‘O’) from the box you chose. If an ‘O’ is drawn, you may go on to receive a reward. If an ‘X’ is drawn, you won’t receive a reward. So the more ‘O’s that are in the box, the more likely it is that you could receive a reward.</p>'
		}else{
		document.getElementById('instruct').innerHTML='<p>You need to choose one of the boxes on each trial. To make your choice, consider two things. The first is how likely it will be that you will lose points. This is determined by the number of ‘O’s in the box. Once you have made your choice, the computer randomly draws a token (an ‘X’ or ‘O’) from the box you chose. If an ‘O’ is drawn, you lose points. If an ‘X’ is drawn, your total will remain the same. So the more ‘O’s that are in the box, the more likely it is that you could lose points.</p>'
		}
		
	}else if(currentnumber==4){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='<p>The second thing you need to consider is how big the reward would be if you did receive it. The size of reward (number of points) is the number above the box, which will be between 1 and 150.</p> <p> On some trials you may have to trade-off between the probability that an ‘O’ will be drawn, and how many points you would receive if it is. How you do this is up to you. For example here, the box on the left has a lot less ‘O’s, but the number of points is higher. Conversely, you are more likely to get an ‘O’ if you choose the box on the right but this is linked to less points. </p>'
		}else{
		document.getElementById('instruct').innerHTML='<p>The second thing you need to consider is how big the loss would be if you did receive it. The size of loss (number of points) is the number above the box, which will be between -1 and -150.</p> <p> On some trials you may have to trade-off between the probability that an ‘O’ will be drawn, and how many points you would lose if it is. How you do this is up to you. For example here, the box on the left has a lot more ‘O’s, but the size of the loss is smaller. Conversely, you are less likely to get an ‘O’ if you choose the box on the right but this is linked to a larger loss. </p>'
		}
		$('#button_continue').show();


	}else if(currentnumber==5){
	
		document.getElementById('instruct').innerHTML = '<p> In the experiment you can chose the box on the left by pressing the left arrow key, and the box on the right by pressing the right arrow key. (The arrow keys are at the bottom right of your keyboard).</p><p>Just for this example, let’s pick the one on the right by pressing the right arrow key.</p>'
		$('#button_continue').hide();
		allow_instruct_to_press = true; 
		document.getElementById('mag_right').style.border = 'None';

	}else if(currentnumber==6){
	
		document.getElementById('instruct').innerHTML = '<p>Your choice of box is highlighted by the black square.</p><p>You have up to 8 seconds to choose between the boxes on each trial. Once you’ve decided, respond as quickly as you can. If you fail to respond within the time limit, the computer will make a random choice for you. </p><p>Press Continue</p>'
		document.getElementById('mag_right').style.border = '.1em solid black';
		allow_instruct_to_press = false;
		document.getElementById('outcome').innerHTML=''
		$('#button_continue').show();
		currenttrial_p=0
		currenttrial_within_5=0
		$('#button_continue').show();
		reset_tally()

	}else if(currentnumber==7){
		
		document.getElementById('instruct').innerHTML=''
		document.getElementById('outcome').innerHTML='O'
		$('#button_continue').hide();
		currenttrial_p=0
		currenttrial_within_5=0
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='<p>After you make your choice, a token will be drawn from the box. In this case it is an ‘O’, associated with 11 points. This outcome will be added to the first slot of your temporary tally board in the top-middle of the screen.</p>'
		display_urns_and_mags(currenttrial_p,practice,0,0)
		outcome = '11'
		}else{
		document.getElementById('instruct').innerHTML='<p>After you make your choice, a token will be drawn from the box. In this case it is an ‘O’, associated with -11 points. This outcome will be added to the first slot of your temporary tally board in the top-middle of the screen.</p>'
		display_urns_and_mags(currenttrial_p,practice,1,1)
		outcome= '-37'
		}

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
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML = '<p>Trials happen in blocks of 5. At the end of each block, one of the outcomes will be selected at random and the points will be added to your total score in the top right corner of the screen. The outcome associated with each trial (stored in the temporary tally board) is equally likely to be chosen. This means you should aim for the best outcome you can on each trial. </p><p>For example, if the outcomes from a block were three ‘X’s, one ‘O’ of magnitude 11 and one ‘O’ of magnitude 30, you’d have a 3/5 chance of getting zero points added to your score, a 1/5 chance of getting 11 points added to your score and a 1/5 chance of getting 30 points added to your score.</p>'
		}else{
		document.getElementById('instruct').innerHTML = '<p>Trials happen in blocks of 5. At the end of each block, one of the outcomes will be selected at random and the points will be subtracted from your total score in the top right corner of the screen. The outcome associated with each trial (stored in the temporary tally board) is equally likely to be chosen. This means you should aim for the best outcome you can on each trial. </p><p>For example, if the outcomes from a block were three ‘X’s, one ‘O’ of magnitude -11 and one ‘O’ of magnitude -30, you’d have a 3/5 chance of getting zero points subtracted from your score, a 1/5 chance of getting 11 points subtracted your score and a 1/5 chance of getting 30 points subtracted to your score.</p>'
		}
		document.getElementById('mag_right').style.border = '.1em solid black';
		allow_instruct_to_press = false;
		$('#button_continue').show();
		$('#outcome').hide();
		currenttrial_p=0
		currenttrial_within_5=0
	}else if(currentnumber==9){
		hide_urns_and_mags()
		document.getElementById('instruct').innerHTML = '<p>Remember the boxes change independently on every trial, so you can’t use information about whether you got an ‘O’ or not to guide your behavior on the next trial.</p><p>Press continue and we will walk through the remaining 4 trials in this example block</p>'
		document.getElementById('mag_right').style.border = '.1em solid black';
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
		if(outcome_type=='gain'){	
		document.getElementById('instruct').innerHTML = 'Here is the second  trial. In this one, both boxes have a lot of ‘O’s. However the magnitude is much bigger for the box on the right. So you might want to choose this one. Let’s assume you did. Press the right arrow to continue.'
		display_urns_and_mags(currenttrial_p,practice,0,0)
		}else{
		document.getElementById('instruct').innerHTML = 'Here is the second  trial. In this one, both boxes have a lot of ‘O’s. However the magnitude is much bigger for the box on the left. So you might want to choose the one on the right. Let’s assume you did. Press the right arrow to continue.'
		display_urns_and_mags(currenttrial_p,practice,1,0)
		}
		document.getElementById('mag_left').style.border = 'None';
		document.getElementById('mag_right').style.border = 'None';	
		allow_instruct_to_press = true; 
		$('#button_continue').hide();
		clean_tally();



	}else if(currentnumber==11){		
		document.getElementById('mag_right').style.border = '.1em solid black';
		currenttrial_p=1
		currenttrial_within_5=1	
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML = 'Here the outcome was an ‘O’, so the 2nd slot in the temporary tally board changes to show 75 points (the magnitude linked to the box you chose).'
		outcome='75'
		display_urns_and_mags(currenttrial_p,practice,0,0) // 
		}else{
		document.getElementById('instruct').innerHTML = 'Here the outcome was an ‘O’, so the 2nd slot in the temporary tally board changes to show -6 points (the magnitude linked to the box you chose).'
		outcome='-6'
		display_urns_and_mags(currenttrial_p,practice,1,0) // switch magnitudes around
		}
		document.getElementById('outcome').innerHTML='O'
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
		document.getElementById('instruct').innerHTML = 'This third example is another type of trial you will encounter. Some of the tokens in one of the boxes are covered up by ‘=’ signs.  So you do not know whether there is an ‘X’ or an ‘O’ underneath each one. There are still 50 tokens in the box with a predefined proportion of ‘X’s and ‘O’s. The ones uncovered have been picked at random, so they are a random sample of what is in the box. In this case, you can see 20 out of the 50 tokens. These give you some information about what is in the box.'
		document.getElementById('mag_left').style.border = 'None';
		document.getElementById('mag_right').style.border = 'None';	
		document.getElementById('outcome').innerHTML=''		
		$('#outcome').hide()	
		currenttrial_p=2
		currenttrial_within_5=2
		if(outcome_type=='gain'){
		display_urns_and_mags(currenttrial_p,practice,1,0)
		}else{
		display_urns_and_mags(currenttrial_p,practice,0,0)
		}

	}else if(currentnumber==13){		
		document.getElementById('instruct').innerHTML = 'Remember, the tokens uncovered were chosen randomly. If the computer did it again, it might pick a different ratio of ‘O’s and ‘X’s even though you’re drawing from the same box with the same predefined underlying number of ‘X’s and ‘O’s. So you have to infer the actual proportion from the sample you see.'


	}else if(currentnumber==14){		
		document.getElementById('instruct').innerHTML = '<p>The more tokens you can see, the more information you have and the more likely it will be that the ratio of ‘O’s to ‘X’s in what you can see is closer to the actual proportion of ‘X’s to ‘O’s in the box.</p>'
		currenttrial_p=2
		currenttrial_within_5=2
		if(outcome_type=='gain'){
		display_urns_and_mags(currenttrial_p,practice,1,0)
		}else{
		display_urns_and_mags(currenttrial_p,practice,0,0)
		}
		document.getElementById('mag_left').style.border = 'None';
		document.getElementById('mag_right').style.border = 'None';	
		document.getElementById('outcome').innerHTML=''		
		$('#outcome').hide()	
		$('#button_continue').show();


	}else if(currentnumber==15){		
		document.getElementById('instruct').innerHTML = '<p>One final, minor point is that the ‘X’s are shuffled to the left in each row to make it easier for you to see how many are in each bin. But this happens after the ‘=’ signs are put down. So in a row that is partly hidden, the hidden tokens can be either ‘X’s OR ‘O’s.</p><p> Okay, so let’s assume you chose the one on the right. Press the rightward arrow key.</p>'
		currenttrial_p=2
		currenttrial_within_5=2

		document.getElementById('mag_left').style.border = 'None';
		document.getElementById('mag_right').style.border = 'None';	
		document.getElementById('outcome').innerHTML=''		
		$('#outcome').hide()	
		$('#button_continue').hide();
		practice=true
		allow_instruct_to_press = true; 
		if(outcome_type=='gain'){
		display_urns_and_mags(currenttrial_p,practice,1,0)
		}else{
		display_urns_and_mags(currenttrial_p,practice,0,0)
		}
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials
		clean_tally();

	}else if(currentnumber==16){	
		document.getElementById('mag_right').style.border = '.1em solid black';
		if(outcome_type=='gain'){
		outcome='26'
		document.getElementById('instruct').innerHTML = '<p>You received another ‘O’, and therefore 26 points have entered the temporary tally board. Note, you do not get to see behind the equals signs at any point.</p> <p>Now you can choose on your own for the last 2 trials.</p>'
		}else{
		outcome='-21'
		document.getElementById('instruct').innerHTML = '<p>You received another ‘O’, and therefore -21 points have entered the temporary tally board. Note, you do not get to see behind the equals signs at any point.</p> <p>Now you can choose on your own for the last 2 trials.</p>'

		}

		document.getElementById('outcome').innerHTML='O'
		$('#outcome').show()
		increment_tally(outcome)
		currenttrial_p=2
		currenttrial_within_5=2
		clean_tally();
		if(outcome_type=='gain'){
		display_urns_and_mags(currenttrial_p,practice,1,0)
		}else{
		display_urns_and_mags(currenttrial_p,practice,0,0)
		}
		allow_instruct_to_press = false; 
		$('#button_continue').show();
		var element = document.getElementById("trialcounter");
		tnum=currenttrial_p
		tnum+=1
		element.innerHTML='Completed: '+tnum+'/'+num_trials


//// Fourth Trial  (0)
	}else if(currentnumber==17){		
		document.getElementById('instruct').innerHTML = '<p>Here, there is also missing information in one box (this time, the box on the left). This time, a lot of information is missing -- you can only see four tokens. Based on what you can see you need to decide whether to pick the box on the left or the box on the right.</p><p>Go ahead and make your choice.</p>'
		document.getElementById('mag_left').style.border = 'None';
		document.getElementById('mag_right').style.border = 'None';		
		practice=true
		$('#outcome').hide()
		$('#button_continue').hide();
		allow_instruct_to_press = true; 
		currenttrial_p=3
		currenttrial_within_5=3
		if(outcome_type=='gain'){
		display_urns_and_mags(currenttrial_p,practice,0,0)
		}else{
		display_urns_and_mags(currenttrial_p,practice,1,0) // switch mag
		}
		clean_tally();


	}else if(currentnumber==18){	

		currenttrial_p=3
		currenttrial_within_5=3
		if(outcome_type=='gain'){
		display_urns_and_mags(currenttrial_p,practice,0,0)
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.border = '.1em solid black';	
		mag = mag_left_p
		}else{
		document.getElementById('mag_right').style.border = '.1em solid black';
		mag = mag_right_p
		}
		}else{
		display_urns_and_mags(currenttrial_p,practice,1,0) // switch mag
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.border = '.1em solid black';	
		mag = mag_right_p
		}else{
		document.getElementById('mag_right').style.border = '.1em solid black';
		mag = mag_left_p
		}
		}


		
		outcome = parseInt(mag[currenttrial_p].replace("'", "").replace("'",""))
		document.getElementById('instruct').innerHTML = '<p>An ‘X’ was drawn from the box you picked, so 0 points has been entered into the fourth slot in the temporary tally board.</p><p> Press Continue to get the fifth trial from this example block.</p>'
		document.getElementById('outcome').innerHTML='X'
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
		document.getElementById('instruct').innerHTML = 'Here again you can choose either side.'
		document.getElementById('mag_left').style.border = 'None';
		document.getElementById('mag_right').style.border = 'None';	
		$('#outcome').hide()	
		$('#button_continue').hide();
		currenttrial_p=4
		currenttrial_within_5=4
		practice=true
		allow_instruct_to_press = true; 
		if(outcome_type=='gain'){
		display_urns_and_mags(currenttrial_p,practice,0,0)
		}else{
		display_urns_and_mags(currenttrial_p,practice,1,0) // switch mag
		}


		clean_tally();

	}else if(currentnumber==20){	

		currenttrial_p=4
		currenttrial_within_5=4
		if(outcome_type=='gain'){
		display_urns_and_mags(currenttrial_p,practice,0,0)
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.border = '.1em solid black';	
		mag = mag_left_p
		}else{
		document.getElementById('mag_right').style.border = '.1em solid black';
		mag = mag_right_p
		}
		}else{
		display_urns_and_mags(currenttrial_p,practice,1,0) // switch mag
		if (last_pressed=='left'){
		document.getElementById('mag_left').style.border = '.1em solid black';	
		mag = mag_right_p
		}else{
		document.getElementById('mag_right').style.border = '.1em solid black';
		mag = mag_left_p
		}
		}




		outcome = parseInt(mag[currenttrial_p].replace("'", "").replace("'",""))*sign
		str1 = 	'You received another ‘O’, and therefore '
		str2 = outcome
		str1 = str1.concat(str2)
		document.getElementById('instruct').innerHTML = str1.concat(' points have entered the temporary tally board')
		document.getElementById('outcome').innerHTML='O'
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
		document.getElementById('instruct').innerHTML = 'As mentioned before, after 5 trials you will see a screen with just the temporary tally board, showing your outcomes for each trial in the block of 5.'
		/// Display text .. 
			var element = document.getElementById("summary_text");
			element.innerHTML = 'The computer will now choose one of your previous 5 outcomes.'
			$('#summary_text').show();
		hide_urns_and_mags()
		allow_instruct_to_press = false; 
		$('#button_continue').show();


	}else if(currentnumber==22){
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML = '<p>The computer will randomly select one of these outcomes. If you won some points, these will be added to your scoreboard. </p><p> For example, here the computer chose the outcome associated with 11 points, which have been added to your scoreboard in the top right.</p>'
		}else{
		document.getElementById('instruct').innerHTML = '<p>The computer will randomly select one of these outcomes. If you lost some points, these will be subtracted from your scoreboard. </p><p> For example, here the computer chose the outcome associated with -11 points, which have been subtracted from your scoreboard in the top right.</p>'
		}

		randomchoice = 0
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
		document.getElementById(nam).style.border = '.1em solid black';


		


//// Prepare them for 5 more practice trials //// 
	}else if(currentnumber==23){
		document.getElementById('instruct').innerHTML='<p>Now, we would like you to complete 5 more practice trials on your own. Remember to respond as soon as you’ve made your decision.</p><p>If anything is still unclear, press the ‘Go Back’ button to go back through each screen or refresh your browser to go to the beginning of the instructions.</p><p>Press continue and get started!</p>'
			
		
		
		
		
		
		

//// Practice 6 //// 
	}else if(currentnumber==24){
		reset_tally()
		currenttrial_p=5
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

//// Practice 7 //// 
	}else if(currentnumber==25){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 8 //// 
	}else if(currentnumber==26){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 9 //// 
	}else if(currentnumber==27){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);
//// Practice 10 //// 
	}else if(currentnumber==28){
		document.getElementById('instruct').innerHTML=''
		practice=true
		RunTrial(event);

//// 5 Trial summary //// 
	}else if(currentnumber==29){		
		//document.getElementById('instruct').innerHTML = 'After each block of 5 trials, you will see a screen with just the temporary tally board, showing your outcomes for each trial in the block of 5.'
		//RunSummaryScreen() // this will time out and go to the next screen //
		allow_instruct_to_press = false; 
		practice=true
		//$('#button_continue').show();
		RunSummaryScreen(event)

//// Intsruction summary  //// 
	}else if(currentnumber==30){
		
		document.getElementById('exp_container').style.marginLeft='40%';
		$('#button_continue').show();
	
		practice=false
		if(outcome_type=='gain'){
		document.getElementById('instruct').innerHTML='<p>Well done! You are now ready to start the task.</p><p> Remember that you want to maximise the amount of points you receive in your scoreboard, which will be converted to money at the end of the experiment. To do this you want to make the best decision you can on every trial.</p><p> When deciding between the boxes on each trial, you should consider both the number of points associated with each box (number above the box) and how likely you would be to get those points (how many ‘O’s are in the box). Select the box you want using the left and right arrow keys. You have up to 8 seconds to make your choice on each trial, but you should respond as soon as you’ve made your decision.</p>'
		}else{
		document.getElementById('instruct').innerHTML='<p>Well done! You are now ready to start the task.</p><p> Remember that you want to minimize the amount of points you lose from the number in your scoreboard, which will be converted to money at the end of the experiment. To do this you want to make the best decision you can on every trial.</p><p> When deciding between the boxes on each trial, you should consider you should consider both the size of potential loss associated with each box (number above the box) and how likely you would be to lose those points (how many ‘O’s are in the box). Select the box you want using the left and right arrow keys. You have up to 8 seconds to make your choice on each trial, but you should respond as soon as you’ve made your decision.</p>'
		}
		num_trials = num_trials_original
		var element = document.getElementById("trialcounter");
		element.innerHTML='Completed: '+0+'/'+num_trials
		if(outcome_type=='gain'){
		totalpoints = 0 
		}else{
		totalpoints = 5000
		}
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		$('#pointscounter').show()
		reset_tally()
		hide_tally()

		
	}else if(currentnumber==31){
		$('#button_continue').show();
		document.getElementById('instruct').innerHTML='<p>On some trials there will be missing information for one box, where some of the tokens are covered up with ‘=’ signs, and hence you can only see some of the tokens in that box, randomly chosen from the box as a whole. You must do the best you can with the information that you have.</p><p>There will be 200 trials. You will get to take 3 breaks, one after each 50 trials.</p><p>STOP! Are you ready to start? This is a timed experiment, so once you click continue, you will not be able to go back.Press ‘Continue’ to get started on the task. Good luck!</p>'
		
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
	$('#thanks').show()
	$('#thanks2').show()	
	$('#instruct').hide()
	$('#button_return_home').show();
	$('#button_continue').hide()
	canProceed = false 
// Store data (sends get query to django)
	finished=1
	$.get("?finished="+finished, function(response){});
	
	
	
	/// Genenerate finished key 
	
}


