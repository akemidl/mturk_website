/////////////////////////////
///////// Settings /////////
var stage1_trials = 5;

/////////////////////////////
////// MISC FUNCTIONS //////

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var text_insert = function(text, index, insert_value) {
	text = text.slice(0, index) + insert_value  + text.slice(index);
	return text
}


/////////////////////////////
///////// Trials /////////

/* create experiment timeline array */
var timeline = [];

var welcome_block = {
  type: "text",
  text: "Welcome back! Press any key to begin."
};

var instructions_block_backstory = {
  type: "instructions",
  pages: [
      "<p>Recall that you and your classmates are starting an internship for company ABC.</p>"+
        "<p>In the last session, you were shown pairs of your classmates and you had to choose one person from each pair to include on your team.</p>"+
        "<p>Your classmates were asked to do the same thing. </p>",
        "<p>At the end of last session, we divided participants into two groups: the 50% most popular to work with, and the 50% least popular to work with.</p> "+
        "<p>In this session, we are going to give you feedback on how many times you were chosen to work with. You will be asked to judge how likely it is that you are in the 50% most popular. </p> ",
        "We will give you feedback one person at a time. For example, you might receive:"+
        " <blockquote> 'Classmate #29 compared you and classmate #14. <strong>He/she</strong> was chosen to work with'.</blockquote>"+
        "<p> You will also briefly be shown your profile along side of their profile, with the chosen person outlined with a black box: </p> "+
        "<img src="+example_profile_image+" style='max-height: 300px; max-width: 500px;'>"+
        "<p>(note that this is just an example, not your profile)</p>",
        "After each piece of feedback, you will estimate how likely it is that you are among the 50% most popular. "+
        "You will use a slider that looks like this:</p>"+
        "<img src="+slider_image+" style='max-height: 300px; max-width: 500px;'>"+
        "<p>Selecting 10% means you think there’s a 10% chance you are in the most popular half of students. </p>"+
        "<p>Selecting 90% means you think there’s a 90% chance you are in the most popular half. </p>",
        "<strong>Bonus Payments: </strong> In addition to your hourly rate, you will receive a bonus payment based on how accurate your estimates are. "+
        "The procedure for determining your bonus is a bit complicated, "+
        "but by choosing the what you believe is true, you will maximize your chances of earning an extra $3.",
         "Click 'Next' to get started, or click 'Previous' to re-read the instructions."
        ]

  ,
  show_clickable_nav: true,
    timing_post_trial: 100
};


timeline.push(welcome_block);
timeline.push(instructions_block_backstory);


///////////////////////////////////////////////////

for (var i = 0; i < num_trials; i++) {

  // this variable is loaded in
  if (feedback[i]==1){
    feedback_str = 'you'
    which_side = '#stim_left_sess3'
  }else{
    feedback_str = 'classmate #'+pairs[i][1]
    which_side = '#stim_right_sess3'
  }
  //console.log('here')
  //console.log(feedback[i])
  console.log(which_side)
  /// String for telling them about their feedback
  if (i>0){

    //'<div>'+
    //'<p>Your classmate #24 was choosing betweeen you and another classmate #'+pairs[i][1]+' ...</p>'+
    //'</div>'+
    //'<hr>'+

    var stim1 =
  	'<div id="stim_left_sess3">'+
  	'<p>You: </p>'+
  	'<img src='+profile_chart_img_paths[i][0]+' style="max-height: 300px; max-width: 300px;">'+
  	'<p>Description: '+self_describes[i][0]+'</p>'+
  	'<p>Grades:</p>'+
  	'<ul>'+
  	'<li>Reading: '+sat_grades[i][0][0]+'</li>'+
  	'<li>Math: '+sat_grades[i][0][1]+'</li>'+
  	'<li>Writing: '+sat_grades[i][0][2]+'</li>'+
  	'<li>Class 1: '+sat_grades[i][0][3]+'</li>'+
  	'<li>Class 2: '+sat_grades[i][0][4]+'</li>'+
  	'<li>Class 3: '+sat_grades[i][0][5]+'</li>'+
  	'</ul>'+
  	'</div>'+
  	'<div id="stim_right_sess3">'+
  	'<p>Classmate: '+pairs[i][1]+'</p>'+
  	'<img src='+profile_chart_img_paths[i][1]+' style="max-height: 300px; max-width: 300px;">'+
  	'<p>Description: '+self_describes[i][1]+'</p>'+
  	'<p>Grades:</p>'+
  	'<ul>'+
  	'<li>Reading: '+sat_grades[i][1][0]+'</li>'+
  	'<li>Math: '+sat_grades[i][1][1]+'</li>'+
  	'<li>Writing: '+sat_grades[i][1][2]+'</li>'+
  	'<li>Class 1: '+sat_grades[i][1][3]+'</li>'+
  	'<li>Class 2: '+sat_grades[i][1][4]+'</li>'+
  	'<li>Class 3: '+sat_grades[i][1][5]+'</li>'+
  	'</ul>'+
  	'</div>'


    var stim2 =    '<div>'+
        '<p>Your classmate #24 chose <strong>'+feedback_str+'</strong>. '+
    'Now, how likely do you think it is that you are in the top 50% most popular?</p></div>'
    var timing_first_stim=2500;
  }else{
    var stim1 ='<div><p></p></div>'
    var stim2 ='<div><p>Before we give you any feedback, how likely do you think it is that you are in the top 50% most popular?</p></div>'
    var timing_first_stim = 200;
  }

  var trial_belief_elicitation = {
    type: 'similarity',
    prompt: "",
    stimuli: [stim1,stim2],
    is_html: true,
    timing_first_stim: timing_first_stim,
    timing_second_stim: -1,
    timing_image_gap:0,
    labels: [0.0,100.0],
    show_ticks:false,
    selected_side:which_side,
    on_trial_start: function() {
        /// show selection
        var t1_ = setTimeout(function() {

          var trial = jsPsych.currentTrial();
          which_side_local = trial['selected_side']
          $(which_side_local).css({"border-color": "#000000",
                       "border-width":"5px",
                       "border-style":"solid",
                     "padding":"7px"});

        }, 1500)

        /// preserve the last belief update
        var lastTrialData = jsPsych.data.getLastTrialData()
        var currentTrial = jsPsych.currentTrial()
        currentTrial.start_value=lastTrialData['sim_score']


    }
  };

  timeline.push(trial_belief_elicitation);

}

/////////////////////


var instructions_midway = {
  type: "instructions",
  pages: ["<p>Thanks!</p> "+
        "<p>For the next part of the session, we would like you to do the same thing for classmate #45. "+
        "You will see feedback just as before, only this time you will estimate the likelihood that classmate #45 is in the top 50% most popular.</p>",
         "Click 'Next' to get started, or click 'Previous' to re-read the instructions."
        ]
  ,
  show_clickable_nav: true,
    timing_post_trial: 200
};

timeline.push(instructions_midway)

/////////////////////////////

for (var i = 0; i < num_trials; i++) {

  // this variable is loaded in
  if (feedback[i]==1){
    feedback_str = 'classmate #45'
    which_side = '#stim_left_sess3'
  }else{
    feedback_str = 'classmate #'+pairs[i][1]
    which_side = '#stim_right_sess3'
  }
  //console.log('here')
  //console.log(feedback[i])
  console.log(which_side)
  /// String for telling them about their feedback
  if (i>0){


    var stim1 =
  	'<div id="stim_left_sess3">'+
  	'<p>Classmate 45#: </p>'+
  	'<img src='+profile_chart_img_paths[i][0]+' style="max-height: 300px; max-width: 300px;">'+
  	'<p>Description: '+self_describes[i][0]+'</p>'+
  	'<p>Grades:</p>'+
  	'<ul>'+
  	'<li>Reading: '+sat_grades[i][0][0]+'</li>'+
  	'<li>Math: '+sat_grades[i][0][1]+'</li>'+
  	'<li>Writing: '+sat_grades[i][0][2]+'</li>'+
  	'<li>Class 1: '+sat_grades[i][0][3]+'</li>'+
  	'<li>Class 2: '+sat_grades[i][0][4]+'</li>'+
  	'<li>Class 3: '+sat_grades[i][0][5]+'</li>'+
  	'</ul>'+
  	'</div>'+
  	'<div id="stim_right_sess3">'+
  	'<p>Candidate: '+pairs[i][1]+'</p>'+
  	'<img src='+profile_chart_img_paths[i][1]+' style="max-height: 300px; max-width: 300px;">'+
  	'<p>Description: '+self_describes[i][1]+'</p>'+
  	'<p>Grades:</p>'+
  	'<ul>'+
  	'<li>Reading: '+sat_grades[i][1][0]+'</li>'+
  	'<li>Math: '+sat_grades[i][1][1]+'</li>'+
  	'<li>Writing: '+sat_grades[i][1][2]+'</li>'+
  	'<li>Class 1: '+sat_grades[i][1][3]+'</li>'+
  	'<li>Class 2: '+sat_grades[i][1][4]+'</li>'+
  	'<li>Class 3: '+sat_grades[i][1][5]+'</li>'+
  	'</ul>'+
  	'</div>'


    var stim2 =    '<div>'+
        '<p>Your classmate #24 chose <strong>'+feedback_str+'</strong>. '+
    'Now, how likely do you think it is that classmate #45 is in the top 50% most popular?</p></div>'
    var timing_first_stim=2500;
  }else{
    var stim1 ='<div><p></p></div>'
    var stim2 ='<div><p>Before we give you any feedback, how likely do you think it is that classmate #45 is in the top 50% most popular?</p></div>'
    var timing_first_stim = 200;
  }

  var trial_belief_elicitation = {
    type: 'similarity',
    prompt: "",
    stimuli: [stim1,stim2],
    is_html: true,
    timing_first_stim: timing_first_stim,
    timing_second_stim: -1,
    timing_image_gap:0,
    labels: [0.0,100.0],
    show_ticks:false,
    selected_side:which_side,
    on_trial_start: function() {
        /// show selection
        var t1_ = setTimeout(function() {

          var trial = jsPsych.currentTrial();
          which_side_local = trial['selected_side']
          $(which_side_local).css({"border-color": "#000000",
                       "border-width":"5px",
                       "border-style":"solid",
                     "padding":"7px"});

        }, 1500)

        /// preserve the last belief update
        var lastTrialData = jsPsych.data.getLastTrialData()
        var currentTrial = jsPsych.currentTrial()
        currentTrial.start_value=lastTrialData['sim_score']


    }
  };

  timeline.push(trial_belief_elicitation);

}



/////////////////////////////
var end_block = {
  type: "text",
  text: "<p>Thanks! You have completed this part of the experiment. "+
  "Press 'Enter' on your keyboard and wait for a link to appear below. "+
  "This should take a 5-30 seconds. "+
  "Do not close your browser until this process is complete. </p>"+
  ""
  +"<p>(If you are doing this as a demo. Please just close the window <strong>without</strong> pressing Enter)</p>"
};


timeline.push(end_block);

//////////////////////////////


function save_data(data){
   var data_table = "table_beliefupdate_1"; // change this for different experiments
   value = 'test_value'
   $.ajax({
      type:'get',
      cache: false,
      data: {
          table: data_table,
          json: JSON.stringify(data),
          opt_data: {key: value}
      },
      success: function(output) { console.log(output);
        var el = jsPsych.getDisplayElement();
				el.append('<div><a id="button_return_home" href="/">Return Home</a></div>')
      } // write the result to javascript console
   });
}

/*jsPsych.preloadImages(images, function(){ startExperiment(); });

//// START /////
function startExperiment(){*/
  jsPsych.init({
    timeline: timeline,
		//show_progress_bar: true,
    //fullscreen: true,
    on_finish: function() {
      save_data(jsPsych.data.getData());
    }
  })
