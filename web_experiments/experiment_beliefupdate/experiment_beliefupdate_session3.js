/////////////////////////////
///////// Settings /////////

/// various counter balances...
/// whether its most popular or least
/// whether the belief anchor starts at 0 or 100%.

/// for demo
num_trials = 5

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
//timeline.push(welcome_block);

example_stim = html_for_pairwise(pairs[0],profile_chart_img_paths[0],
  self_describes[0],sat_grades[0],opening_instructions='',if_you=true,include=124)
example_slider = '<img src='+slider_image+' height="14%" width="100%">'

console.log(example_stim)

var instructions_block_backstory = {
  type: "instructions",
  pages: [
          "<p>Welcome back! Recall that in the last session, you were shown pairs of your classmates and asked who you would rather work with. "+
          "Your classmates were asked to do the same thing. </p>"+
          "<p>After everyone completed the last session, we divided participants into two halves: the most popular and the least popular to work with.</p> "+
          "<p>For this session, we have randomly selected 20 pairs in which you were one of the candidates. For each pair, we will show "+
          "you whether you were chosen or not. Your job is use this feedback to judge how likely it is that you are in the more popular half.</p> ",

          "<p>First, we will show you your profile along side of their profile. We have omitted the personal description for the sake of anonymity</p>",

          "<p>After a few seconds, we will show whether you or they were chosen to work with. The chosen person's profile will be outlined in black.</p> "+
          "<p>For each pair, you'll be able to look at the feedback as long as you'd like. You will then press 'Enter' to move on.</p>",

          "<p>After each piece of feedback, you will estimate how likely it is that you are among the half more frequently chosen to work with. "+
          "You will use a slider that looks like this:</p>"+
          example_slider+
          "<p>Selecting 10% means you think there’s a 10% chance you are in the more popular half of students. </p>"+
          "<p>Selecting 90% means you think there’s a 90% chance you are in the more popular half. </p>",

          "<p>In addition to your hourly rate, you will receive a bonus payment based on how accurate your estimates are. This is how it works: </p>"+
          "<p>Let's say that you think you are in the more popular half with 90% probability, and you set the slider accordingly.</p>"+
          "<ul><li> We then draw a random number from 0-100.</li>"+
          "<li>If the random number is less than 90, you'll get $5 if you are truly in the more popular half.</li>"+
          "<li>If the random number is greater than 90, you'll get $5 with probability .9."+
          "</ul>"+
          "<p>Although it sounds a bit complicated, this method encourages you to estimate what you really believe to be true. It is meant to dissuade you from being overly confident or conservative in your estimate.</p>"+
          "<p>If that all makes sense, click 'Next' to get started. You can click 'Previous' to re-read the instructions.</p>"
       ],
        after_button_html:['',example_stim,example_stim,'',''],
        functions_for_each_screen:['','','select_right()','',''],
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
    feedback_str = 'You were chosen over classmate '+pairs[i][1]+'.'
    which_side = '#stim_left'
  }else{
    feedback_str = 'Classmate '+pairs[i][1]+' was chosen over you.'
    which_side = '#stim_right'
  }

  console.log(which_side)

  /// String for telling them about their feedback
  if (i>0){
    var stim1 = '<div id="feedback_string" style="visibility: hidden;"><p>'+feedback_str+'</p><p>Press "Enter" when you are done looking at the comparison</p></div>'+
    html_for_pairwise(pairs[i],profile_chart_img_paths[i],self_describes[i],sat_grades[i],opening_instructions='',if_you=true,include=124)
    var stim2 ='<div>Now, how likely do you think it is that you are in the more popular half?</p></div>'
    var timing_first_stim=-1;
  }else{
    var stim1 ='<div><p></p></div>'
    var stim2 ='<div><p>Before we give you any feedback, how likely do you think it is that you are in the more popular half?</p></div>'
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
    time_before_choice:1500, // needs to match below
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
        "You will see feedback just as before, only this time you will estimate the likelihood that classmate 51235187 is in the more popular half.</p>"
        ]
  ,
  show_clickable_nav: true,
    timing_post_trial: 200
};

timeline.push(instructions_midway)

/////////////////////////////
i=0
for (var i = 0; i < num_trials; i++) {

  // this variable is loaded in
  if (feedback[i]==1){
    feedback_str = 'Classmate 51235187 was chosen over classmate '+String(pairs[i][1])+'.'
    which_side = '#stim_left'
  }else{
    feedback_str = 'Classmate '+String(pairs[i][1])+' was chosen over classmate 51235187.'
    which_side = '#stim_right'
  }

  /// String for telling them about their feedback
  if (i>0){
    var stim1 = '<div id="feedback_string2" style="visibility: hidden;"><p>'+feedback_str+'</p><p>Press "Enter" when you are done looking at the comparison.</p></div>'+
    html_for_pairwise(pairs[i],profile_chart_img_paths[i],self_describes[i],sat_grades[i],opening_instructions='',if_you='51235187',include=124)
    var stim2 ='<div>Now, how likely do you think it is that classmate 51235187 are in the more popular half?</p></div>'
    var timing_first_stim=-1;
  }else{
    var stim1 ='<div><p></p></div>'
    var stim2 ='<div><p>Before seeing any feedback, how likely do you think it is that classmate 51235187 is in the more popular half?</p></div>'
    var timing_first_stim = 200;
  }
  console.log('here')
  console.log(stim1)

  var trial_belief_elicitation2 = {
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
    choices:['enter'],
    time_before_choice:1500, // needs to match below
    on_trial_start: function() {
        /// show selection
        var t1_ = setTimeout(function() {

          var trial = jsPsych.currentTrial();
          which_side_local = trial['selected_side']
          $(which_side_local).css({"border-color": "#000000",
                       "border-width":"5px",
                       "border-style":"solid",
                     "padding":"7px"});
          $('#feedback_string2').css({"visibility":"inherit"})

        }, 1500)

        /// preserve the last belief update
        var lastTrialData = jsPsych.data.getLastTrialData()
        var currentTrial = jsPsych.currentTrial()
        currentTrial.start_value=lastTrialData['sim_score']


    }
  };

  timeline.push(trial_belief_elicitation2);

}


/////////////////////////////
var intro_to_debrief= {
  type: "instructions",
  pages: ["<p>Thanks! You're almost done. We just have a few more questions for you.</p>"],
  show_clickable_nav: true,
};

timeline.push(intro_to_debrief);


/////////////////////////////
var feedback_question1 = {
  type: "survey-multi-choice",
  questions: ['Would you like to know what type of information people most often used while selecting who to work with?'],
  options: [['yes','no thanks']],
};


var feedback_result1 = {
  type: "instructions",
  pages:
  function() {
  var lasttrialdata = jsPsych.data.getLastTrialData();
  console.log(lasttrialdata)
  if (lasttrialdata['responses']=='{"Q0":"yes"}'){
    return(["<p>It turns out that people most often used grades to make their choice.</p>"])
  }else{
    return(["Click next."])
  }
},
  show_clickable_nav: true,
};
/// get answer from previous trial

timeline.push(feedback_question1);
timeline.push(feedback_result1);

///////
var feedback_question2 = {
  type: "survey-multi-choice",
  questions: ['Would you like to know your exact rank in terms of how many times you were chosen to work with?'],
  options: [['yes','no thanks']],
};

/// get response.. pass it along ..

var feedback_result2 = {
  type: "instructions",
  pages:
    function() {
    var lasttrialdata = jsPsych.data.getLastTrialData();
    console.log(lasttrialdata)
    if (lasttrialdata['responses']=='{"Q0":"yes"}'){
      return(["<p>You were ranked 36th out of 60 participants. (1st = being the most frequently chosen)</p>"])
    }else{
      return(["Click next."])
    }
  },
  show_clickable_nav: true
};


timeline.push(feedback_question2);
timeline.push(feedback_result2);

//////////////////////////////

var debrief_block = {
  type: "instructions",
  pages: ["During the experiment today, you may have received mostly positive or negative feedback. "+
  "In either case, this was a small sample size, so we recommend that you don't draw any strong conclusions from this feedback. If you are interested, the experimenter can provide you with some campus resources for fine-tuning your resume."],
  show_clickable_nav: true,
};

timeline.push(debrief_block);
//////////////////////////////

/////////////////////////////
var end_block = {
  type: "text",
  text:
  "<p> Thanks for participating in our experiment. You're are all done!</p>"+
  "<p> Press 'enter' on your keyboard and wait for a link to appear below. "+
  "This should take a 5-30 seconds. "+
  "Do not close your browser until this process is complete. </p>"+
  ""
  +"<p>(If you are doing this as a demo. Please just close the window <strong>without</strong> pressing 'enter')</p>"
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
    fullscreen: true,
    on_finish: function() {
      save_data(jsPsych.data.getData());
    }
  })
