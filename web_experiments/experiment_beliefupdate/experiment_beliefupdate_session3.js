/////////////////////////////
///////// Settings /////////

/// various counter balances...
/// whether its most popular or least
/// whether the belief anchor starts at 0 or 100%.



/////////////////////////////
////// MISC FUNCTIONS //////

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


/////////////////////////////
///////// Trials /////////

/* create experiment timeline array */
var timeline = [];

var welcome_block = {
  type: "text",
  text: "Welcome back! Press any key to begin."
};
timeline.push(welcome_block);

example_stim = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='')
example_slider = '<img src='+slider_image+' height="40px" width="200px">'

var instructions_block_backstory = {
  type: "instructions",
  pages: [  "<p>Recall that you and your classmates are starting an internship for company ABC.</p>"+
          "<p>In the last session, you were shown pairs of your classmates and you had to choose one person from each pair to include on your team.</p>"+
          "<p>Your classmates were asked to do the same thing. </p>",

          "<p>At the end of last session, we divided participants into two groups: the 50% most popular to work with, and the 50% least popular to work with.</p> "+
          "<p>In this session, we are going to give you feedback on how many times you were chosen to work with. You will be asked to judge how likely it is that you are in the 50% most popular. </p> ",

          "<p> You will also briefly be shown your profile along side of their profile, *** with the chosen person outlined with a black box: </p> ",

        ".. when you are done looking at the feedback, you can press enter. ",
      //  " <blockquote> 'Classmate #29 compared you and classmate #14. <strong>He/she</strong> was chosen to work with'.</blockquote>"+

        "After each piece of feedback, you will estimate how likely it is that you are among the 50% most popular. "+
        "You will use a slider that looks like this.</p>"+
        example_slider+
        "<p>Selecting 10% means you think there’s a 10% chance you are in the most popular half of students. </p>"+
        "<p>Selecting 90% means you think there’s a 90% chance you are in the most popular half. </p>",
        "<strong>Bonus Payments: </strong> In addition to your hourly rate, you will receive a bonus payment based on how accurate your estimates are. "+
        "We use an algorithm to determine your bonus. However, to maximize your chances of earning an extra $5, all you have to do is choose what you believe to be most likely. "+,
         "Click 'Next' to get started, or click 'Previous' to re-read the instructions."
       ],
        after_button_html:['','',example_stim,example_stim,'',''],
        show_clickable_nav: true,
          timing_post_trial: 50,
      		allow_backward: true,
      	 on_finish: function(data) {
      		 console.log('The trial just ended.');
      		 console.log(JSON.stringify(data));
      	 }
};

timeline.push(instructions_block_backstory);


///////////////////////////////////////////////////

for (var i = 0; i < num_trials; i++) {

  // this variable is loaded in
  if (feedback[i]==1){
    feedback_str = '<strong>you</strong> over '+pairs[i][1]+''
    which_side = '#stim_left'
  }else{
    feedback_str = '<strong>'+pairs[i][1]+'</strong> over you.'
    which_side = '#stim_right'
  }

  console.log(which_side)

  /// String for telling them about their feedback
  if (i>0){
    var stim1 = '<div id="feedback_string" style="visibility: hidden;"><p>Your classmate chose '+feedback_str+'</p><p style="font-size:12;"> (press "Enter" when you are done looking at the comparison) </p></div>'+
    html_for_pairwise(pairs[i],profile_chart_img_paths[i],self_describes[i],sat_grades[i],opening_instructions='',if_you=true)
    var stim2 ='<div>Now, how likely do you think it is that you are in the 50% most popular?</p></div>'
    var timing_first_stim=-1;
  }else{
    var stim1 ='<div><p></p></div>'
    var stim2 ='<div><p>Before we give you any feedback, how likely do you think it is that you are in the top 50% most popular?</p></div>'
    var timing_first_stim = 200;
  }

///// ALLOW THEM TO SEE THE PERSON"S PROFILE AS LONG AS THEY WANT !!!!

  var trial_belief_elicitation = {
    type: 'similarity',
    prompt: "",
    stimuli: [stim1,stim2],
    is_html: true,
    timing_first_stim: timing_first_stim, // either can use timing or enter..
    timing_second_stim: -1,
    timing_image_gap:0,
    labels: [0.0,100.0],
    show_ticks:false,
    selected_side:which_side,
    choices:['enter'],
    on_trial_start: function() {
        /// show selection
        var t1_ = setTimeout(function() {
          var trial = jsPsych.currentTrial();
          which_side_local = trial['selected_side']
          $(which_side_local).css({"border-color": "#000000",
                       "border-width":"5px",
                       "border-style":"solid",
                     "padding":"7px"});
          $('#feedback_string').css({"visibility":"inherit"})
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
        "<p>For the next part of the session, we would like you to do the same thing for classmate 51235187. "+
        "You will see feedback just as before, only this time you will estimate the likelihood that classmate 51235187 is in the top 1/2 .. most popular.</p>",
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

    opening_instructions=''
    stim1 = html_for_pairwise(pairs[i],profile_chart_img_paths[i],self_describes[i],sat_grades[i],opening_instructions=opening_instructions)

    var stim2 =    '<div>'+
        '<p>Your classmate #24 chose <strong>'+feedback_str+'</strong>. '+
    'Now, how likely do you think it is that classmate #45 is in the top 50% most popular?</p></div>'
    var timing_first_stim=5;
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
