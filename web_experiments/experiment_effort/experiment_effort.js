

///// Functions ///
select_left = function(){
				console.log('registering extra key 1')
				$( "#stim_left" ).css( "border", "3px dotted black" );
				$( "#stim_right" ).css( "border", "none" );
			};
select_right = function(){
			console.log('registering extra key 2')
			$( "#stim_right" ).css( "border", "3px dotted black" );
			$( "#stim_left" ).css( "border", "none" );
		};

make_bar_rise = function (){
	var current_height = parseInt($("#bar").css('height').replace('px',''))
	console.log(current_height)
	current_height+=click_increment
	console.log(current_height)
	$("#bar").css({'height': String(current_height)+'px'})
	// make sure it doesn't go over.
	//XXX
};

make_two_bars = function(mag_left,effort_left,mag_right,effort_right){
	//// choice screen
  var two_bars =
  '<div id=surrounding_box style="position:relative">'+

   '<div id=stim_left style="width:75px;height:250px; position:absolute;left:30%">'+
  '<div id=mag_left style="position:absolute;top: 2%;text-align: center;">$'+String(mag_left)+'</div>'+
  '<div id=suroundingbar1 style="width:50px;height:200px;border:1px solid #000;position:relative;top: 20%; margin: auto; background-color:transparent;">'+
  '<div id=target1 style="position:absolute; top:'+String(effort_left)+'px; height:2px;width:50px;background-color:red"></div>'+
   '<div id=bar1 style="position:absolute; bottom:0px; height:10px;width:50px;border:1px solid #000;background-color:#000"></div></div>'+
  '</div>'+

   '<div id=stim_right style="width:75px;height:250px; position:absolute;right:30%">'+
  '<div id=mag_right style="position:absolute;top: 2%;text-align:right;">$'+String(mag_right)+'</div>'+
   '<div id=suroundingbar2 style="width:50px;height:200px;border:1px solid #000;position:relative;top: 20%;margin: auto; background-color:transparent;">'+
  '<div id=target2 style="position:absolute; top:'+String(effort_right)+'px; height:2px;width:50px;background-color:red"></div>'+
   '<div id=bar2 style="position:absolute; bottom:0px; height:10px;width:50px;border:1px solid #000;background-color:#000"></div></div>'+
  '</div>'+

  '</div>'
return(two_bars)

}


//// Global Variables ///
// How far can they go in 10 seconds?
// Let's say 50 clicks //
// The top is 200px
// The target should then by 100 if
var maximum_effort_clicks = 30 // clicks //
var click_increment = 2 // how many pixels per click (should try to keep this 2)
var maximum_effort_pixels = click_increment*maximum_effort_clicks

// XXX If this is greater than 200 make click increment 1, redo.

///////////////////////////////////////////////
///// SCHEDULE (READ IN or Calculate)  ///////

var num_trials = 5
var mags_left = [0.75, 0.55, 1.2, 0.3, 0.5]
var mags_right = [0.66, 1.00, 1.2, 0.99, 0.55]
var higher_effort_on_left= [1,1,0,1,0]
var trials_chosen_for_effort = [1,0,0,1,0]

make_effort_levels = function(){
	var efforts_left = [1.0*maximum_effort_pixels,
	                    0.8*maximum_effort_pixels,
	                    0.6*maximum_effort_pixels,
	                    0.8*maximum_effort_pixels,
	                    0.2*maximum_effort_pixels]

	var efforts_right = [0.4*maximum_effort_pixels,
	                    0.6*maximum_effort_pixels,
	                    0.8*maximum_effort_pixels,
	                    0.6*maximum_effort_pixels,
	                    0.6*maximum_effort_pixels]
}



/// XXX Make a copy of these lists,
/// then during the experiment, in the post-trial function if choices were high, high, high.. decrease money for high option



var center_bar =
'<div id=stim_center style="width:75px;height:250px; position:relative;margin:auto">'+
'<div id=mag_center style="position:absolute;top: 2%;text-align: center;">$0.75</div>'+
'<div id=suroundingbar style="width:50px;height:200px;border:1px solid #000;position:absolute;top: 20%;margin: auto; background-color:transparent;">'+
'<div id=target_center style="position:absolute; top:60px; height:2px;width:50px;background-color:red"></div>'+
'<div id=bar style="position:absolute; bottom:0px; height:10px;width:50px;border:1px solid #000;background-color:#000"></div>'+
'</div>'+
"<div id=countdown style='position:absolute;bottom:-20%;margin: auto;text-align: center'>10</div>"+
'</div>'

var center_bar_w_no_red =
'<div id=stim_center style="width:75px;height:250px; position:relative;margin:auto">'+
'<div id=suroundingbar style="width:50px;height:200px;border:1px solid #000;position:absolute;top: 20%;margin: auto; background-color:transparent;">'+
'<div id=bar style="position:absolute; bottom:0px; height:10px;width:50px;border:1px solid #000;background-color:#000"></div>'+
'</div>'+
"<div id=countdown style='position:absolute;bottom:-20%;margin: auto;text-align: center'>10</div>"+
'</div>'


/* create experiment timeline array */
var timeline = [];

////////////////////////////////
///// Initial Instructions /////

var instructions1 = {
  type: "instructions",
  pages: [
          "<p>Welcome back</p>"+
          "<p>In this experiment we are looking at how people make choices that involve expending efforts.",

					"<p>Since you are taking this experiment online, we are going to use the number of times you click a button on your keyboard as our proxy for effort."+
					"First, we want to find out the maximum number of times you can click 'enter' key in 10 seconds. You will see a bar that looks like the one below. After you clikc next, You will see the bar. Press 'enter' here a few times to see the bar rise. </p> "+
					center_bar_w_no_red+
					"<p> Are you ready? Click 'next' and then press as fast as you can!</p>"
			 ],
	  after_button_html:['',''],
		key_extra1: 'enter',
		key_extra1_func: make_bar_rise,
	  show_clickable_nav: true,
    timing_post_trial: 50,
		//allow_keys: false,
};
timeline.push(instructions1)

var effort_screen_example = {
  type: "repeated-press-gagne",
  duration: 10,
  choices: [13],
  increment: 2, // how many pixels it goes up by per click
  bar: center_bar_w_no_red, // needs to have a countdown
};

//timeline.push(effort_screen_example)

var instructions

var instructions2 = {
  type: "instructions",
  pages: [

		/// Show them feedback
		function() {
    var trials = jsPsych.data.getTrialsOfType('repeated-press-gagne')
		var first_effort = trials[0]
    return "<p>Great, thanks!<p><p>You pressed enter "+String(first_effort.number_responses)+" times in "+String(first_effort.duration)+
    "seconds</p>"},

		/// After
    "<p>From experience, we know that people sometimes are a bit conservative on their first try. So, to encourage you to press as fast as you can, we will award you a bonus of $0.50 if you can beat your previous number by 20% (ie. X more presses)."+
		"<p>When you are ready, press 'next' and click as fast as possible!</p>"
			 ]
  ,
	  show_clickable_nav: true,
    timing_post_trial: 50,
		allow_keys: false,
};
//timeline.push(instructions2)

var effort_screen_max_effort = {
  type: "repeated-press-gagne",
  duration: 10,
  choices: [13],
  increment: 2, // how many pixels it goes up by per click
  bar: center_bar_w_no_red, // needs to have a countdown
};

//timeline.push(effort_screen_max_effort)

var instructions3 = {
  type: "instructions",
  pages: [
		function() {
		var trials = jsPsych.data.getTrialsOfType('repeated-press-gagne')
		var second_effort = trials[1]
		var first_effort = trials[0]
		if(second_effort.number_responses/first_effort.number_responses>1.2){
			var phrase = "Since you made an improvemet. You'll be getting a bonus at the end!"
		}
		if(second_effort.number_responses/first_effort.number_responses>0.9){
			var phrase = "Although you clicked fewer times, you did very close to last time. So, you'll still be getting a bonus at the end!"
		}
		if(second_effort.number_responses/first_effort.number_responses<0.9){
			var phrase = 'Sorry, you didnt click fast enough to get a bonus. But that"s ok, you may still receive extra money at the end depending on your choice'
		}
		return "<p>Thanks again!<p><p>You pressed enter "+String(second_effort.number_responses)+" times in "+String(second_effort.duration)+
		"seconds."+phrase+"</p><p>Now we will move on to explain the rest of what you will be doing. Click 'next'"},
  ]
  ,
	  show_clickable_nav: true,
    timing_post_trial: 50,
		allow_keys: false,
};
//timeline.push(instructions3)


////// Calculate schedule after this point /////



var instructions4 = {
  type: "instructions",
  pages: [
		"<p>Now, we are interested to see how you make choices between.. .We will give you two bars like the ones shown below with money value over them."+
		" You get to choose between them. How is their maixmum represented. We’ve scaled it, so Your maximum is the top of the bar.."+
		make_two_bars(10,100,40,60)
		,
		"<p>We are going to give you many of these choices. Only a subset** will be chosen for you to actually exhert effort. <p>"+
		"For example, let’s say you chose the one on the right, which is 40% of your maximum effort,  and this trial was chosen by the computer for you to expend effort. On the next screen the bar will be presented alone and you will try to reach the red level to get rewarded. Click next to try. "+
		make_two_bars(10,100,40,60),
		"If you made it to the red level, great! You would be hypothetically be awarded the money from this choice. However, because we are asking you to do alot of these choices, we are only going to pay you for one of them. You will not know until the end what trial wsa chosen, so you’ll want to do the best you can on each trial. In this case, if this trial was chosen - you would be paid $1.2 on top of your hourly rate. ",
		"Now, we’d like you to do a few more effort trials to get a sense of how difficult each feels. This will help you make decisions. ",



  ],
		key_extra1: 'leftarrow',
		key_extra2: 'rightarrow',
		key_extra1_func: select_left,
	 key_extra2_func: select_right,
	  show_clickable_nav: true,
    timing_post_trial: 50,
		allow_keys:true,
};
timeline.push(instructions4)





////////////////////////////////////
///// MAIN TASK LOOP //////////////

for (t = 0; t < num_trials; t++){

	var choice_screen = {
	  type: 'alt-choice-gagne',
	  stimulus: make_two_bars(10,100,15,80), // mags_left[t],efforts_left[t],mags_right[t],efforts_right[t] // These need to be calculated
	  is_html: true,
	  timing_stim: -1,
	  timing_response: -1,
	  timing_post_trial: 750,
	  response_ends_trial: false,
	  key_extra1: 'leftarrow',
	  key_extra2: 'rightarrow',
	  key_end_trial: 'enter',
	  key_extra1_func: select_left,
	  key_extra2_func: select_right,
	  data: {trial_name: 'choosing_resp',t:t},
	};
	timeline.push(choice_screen)


	if(trials_chosen_for_effort[t]==1){
		//// if this trial was chosen screen ////
		var chosen_text = "This trial was select for you to do. Press enter when you are ready to click.."

		var trial_chosen_screen = {
		  type: "text",
		  text: chosen_text,
		}
		timeline.push(trial_chosen_screen)

		//// effort screen

		//// XXX Maybe make this into a function like belief update experiment

		var effort_screen = {
		  type: "repeated-press-gagne",
		  duration: 10,
		  choices: [13],
		  increment: click_increment, // how many pixels it goes up by per click
		  bar: center_bar, // needs to have a countdown
		  data: {t:t}, // store trial number
		  on_trial_start:function(){
		    console.log('calling this function')

		    /// Get last trials choice
		    var data = jsPsych.data.getData();
		    var ldata= data.length
		    var data_2m = data[ldata-2];

		    var last_selection = data_2m.extra_buttons_press[data_2m.extra_buttons_press.length-2]
		    var t_tmp = data_2m.t

		    chose_left = true
		    chose_right = false

		    if (last_selection=='extra_key_2_pressed'){
		      console.log('right side was last trial')
		      /// XXX At the moment it's just doing these, probably because they aren't defined?
		      console.log($("#target_center"))
		      $("#target_center").css('top','10px')
		      $("#mag_center").html('here')
		    }
		    if (last_selection=='extra_key_1_pressed'){
		      console.log('left side was last trial')
		      $("#target_center").css('top','10px')
		      $("#mag_center").html('here2')
		    }
		  },
		};

		timeline.push(effort_screen)
	}

///// results screen ////

}




/////////////////////////////
var end_block = {
    type: "text",
    text: "<p>Thanks! You have completed this part of the experiment. "+
    "Press 'Enter' on your keyboard and wait for a link to appear below. "+
    "This should take a 5-30 seconds. "+
    "Do not close your browser until this process is complete. </p>"+
    ""
    +"<p>(If you are doing this as a demo. Please just close the window <strong>without</strong> pressing Enter)</p>",
  data: {trial_name: 'text_end_screen'},
  on_finish: function(data){
                console.log('The trial just ended.');
                console.log(JSON.stringify(data))
                $(document).ready(function () {window.scrollTo(0,0);});
    }
};


timeline.push(end_block)


/*jsPsych.preloadImages(images, function(){ startExperiment(); });

//// START /////
function startExperiment(){*/
  jsPsych.init({
    timeline: timeline,
    //fullscreen: true,
    on_finish: function() {
      //save_data(jsPsych.data.getData());
    }
  })

//};
