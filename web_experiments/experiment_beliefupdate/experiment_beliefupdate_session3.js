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



example_stim = html_for_pairwise(pairs[0],profile_chart_img_paths[0],
  self_describes[0],sat_grades[0],opening_instructions='',if_you=true,include=124)
//example_slider = '<img src='+slider_image+' height="14%" width="100%">'

console.log(example_stim)

var etrial = {
  intervals: 100,
  labels: [0.0,100.0],
  show_ticks:false,
}
console.log('here')
//console.log(show_response_slider("<div></div>",etrial))

function add_js_to_slider(){
  $("#slider").slider({
    value: Math.ceil(100 / 2),
    min: 0,
    max: 100,
    step: 1,
    change: function( event, ui ) {
        var sliderbutton = $("#sliderbutton")
        $("#sliderbutton").css({"visibility":"visible"})

        console.log(sliderbutton)
        console.log(sliderbutton[0])
        //sliderbutton[0].show()
        var score = $("#slider").slider("value");
        console.log('recognizing slider value')
        $("#slider_value").html(String(score)+'% Probability')
    }
  });
}

var instructions_block_backstory = {
  type: "instructions",
  pages: [
          "<p>Welcome back! Recall that in the last session, you were shown pairs of other UCB students and asked who you would rather work with. "+
          "The other participants were asked to do the same thing. </p>"+
          "<p>After everyone completed the last session, we divided participants into two halves: the most popular and the least popular to work with.</p> "+
          "<p>For this session, we have randomly selected 20 pairs in which you were one of the candidates. For each pair, we will show "+
          "you whether you were chosen or not. Your job is use this feedback to judge how likely it is that you are in the more popular half.</p> ",

          "<p>For each of the randomly selected pairs, "+
          "your profile will be presented alongside the other profile from the pair as demonstrated below. Your profile shown here was created based on your answers in session 1. The other profile shown here is made up for this example, but all others you see will be real. "+
          "We will omit the personal description for the sake of anonymity. </p>"+
          "<p>Click 'next' when you are done looking at the two profiles.</p>",

          "<p>After a few seconds, we will give you feedback as to whether you or the other participant were chosen to be worked with. "+
          "</p>"+
          "<p>Click 'next' to see example feedback.</p>",

          "<p>If you had been selected, your profile will be outlined in black as demonstrated below.</p>" ,
          "<p>If the other participant had been selected, their profile would be outlined in black.</p>" ,

          "<p>For each pair, you'll be able to look at the feedback as long as you'd like. You will then press 'enter' to move on.</p>",

          "<p>After each piece of feedback, you will estimate how likely it is that you are in the more popular half to be worked with. "+
          "To do so, you will be using a slider. First, click anywhere on the white bar below for the slider to appear. Then, try moving the slider around to see the number underneath change.</p>"+

          '<div id="slider" class="sim ui-slider ui-slider-horizontal ui-widget '+
          'ui-widget-content ui-corner-all" aria-disabled="false">'+
          '<a id="sliderbutton" class="ui-slider-handle ui-state-default ui-corner-all" '+
          'href="#" style="left: 0%;visibility: hidden;"></a></div>'+

          '<ul id="sliderlabels" class="sliderlabels" '+
          'style="width: 100%; height: 3em; margin: 10px 0px 0px; '+
          'padding: 0px; display: block; position: relative;">'+

          '<li style="display: inline-block; width: 399px; margin: 0px; '+
          'padding: 0px; text-align: center; position: '+
          'absolute; left: -199.5px;">0</li>'+

          '<li style="display: inline-block; width: 399px; '+
          'margin: 0px; padding: 0px; text-align: center; '+
          'position: absolute; left: 598.5px;">100</li></ul>'+

          '<div id="slider_value">0% Probability</div>'+


          "<p>This number corresponds to how likely you think it is that you are in the more popular half. Selecting 10% means you think there’s a 10% chance you are in the more popular half of students. "+
          "Selecting 90% means you think there’s a 90% chance you are in the more popular half of students. </p>",

          "<p>In addition to your hourly rate, you may receive a bonus payment up to $5. We determine your bonus by calculating the accuracy of your estimate on a randomly selected trial. In order to maximize your chances of receiving a bonus, you just need to choose estimates that you believe are accurate. If you would like to know the details of the algorithm used to calculate the bonus, please ask the experimenter at the end of the experiment.</p>"+
          "<p>If the instructions make sense, click 'next' to get started. You can click 'previous' to re-read the instructions.</p>"
       ],
        after_button_html:['',example_stim,'',example_stim,example_stim,'',''],
        functions_for_each_screen:['','','','select_left()','select_right()','','add_js_to_slider()'],
        show_clickable_nav: true,
          timing_post_trial: 50,
          iti:0,
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
    feedback_str = 'You were chosen over candidate '+pairs[i][1]+'.'
    which_side = '#stim_left'
  }else{
    feedback_str = 'Candidate '+pairs[i][1]+' was chosen over you.'
    which_side = '#stim_right'
  }

  console.log(which_side)

  /// String for telling them about their feedback
  if (i>0){
    var stim1 = '<div id="feedback_string" style="visibility: hidden;"><p>'+feedback_str+'</p><p>Press "enter" when you are done looking at the comparison</p></div>'+
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
        "<p>For the next part of the session, we would like you to do the same thing for candidate 51235187. "+
        "You will see feedback just as before, only this time you will estimate the likelihood that candidate 51235187 is in the more popular half.</p>"
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
    feedback_str = 'Candidate 51235187 was chosen over candidate '+String(pairs[i][1])+'.'
    which_side = '#stim_left'
  }else{
    feedback_str = 'Candidate '+String(pairs[i][1])+' was chosen over candidate 51235187.'
    which_side = '#stim_right'
  }

  /// String for telling them about their feedback
  if (i>0){
    var stim1 = '<div id="feedback_string2" style="visibility: hidden;"><p>'+feedback_str+'</p><p>Press "enter" when you are done looking at the comparison.</p></div>'+
    html_for_pairwise(pairs[i],profile_chart_img_paths[i],self_describes[i],sat_grades[i],opening_instructions='',if_you='51235187',include=124)
    var stim2 ='<div>Now, how likely do you think it is that candidate 51235187 is in the more popular half?</p></div>'
    var timing_first_stim=-1;
  }else{
    var stim1 ='<div><p></p></div>'
    var stim2 ='<div><p>Before seeing any feedback, how likely do you think it is that candidate 51235187 is in the more popular half?</p></div>'
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
      return(["<p>You were ranked 36th out of 60 participants. (1 = chosen to work with most often )</p>"])
    }else{
      return(["Click next."])
    }
  },
  show_clickable_nav: true,
  on_finish: function(data){
    //save_data(jsPsych.data.getData())
    $(document).ready(function () {window.scrollTo(0,0);});}
};


timeline.push(feedback_question2);
timeline.push(feedback_result2);

//////////////////////////////

var debrief_block = {
  type: "instructions",
  pages: ["During the experiment today, you may have received mostly positive or negative feedback."+
  " In either case, this was a small sample size, so we recommend that you don't draw any strong conclusions from this feedback."+
  " If you would like to discuss how you feel having done this part of the experiment, would like to ask more questions about it, "+
  "or would like to be pointed towards campus resources for improving your resume please let the experimenter know."],
  show_clickable_nav: true,
};

timeline.push(debrief_block);
//////////////////////////////

/////////////////////////////
var end_block = {
  type: "text",
  text:
  "<p> Thanks for participating in our experiment! Please let your experimenter know that you have finished.</p>",
  allow_keys:false,
};


timeline.push(end_block);

//////////////////////////////


function save_data(data){
   var data_table = "table_beliefupdate_1"; // don't need to change apparently
   value = 'test_value'
   $.ajax({
      type:'get',
      cache: false,
      data: {
          table: data_table,
          json: JSON.stringify(data),
          opt_data: {key: value}
      },
      success: function(output) {
        //var el = jsPsych.getDisplayElement();
				//el.append('<div><a id="button_return_home" href="/">Return Home</a></div>')
      },
      error: function(output) {
        //var el = jsPsych.getDisplayElement();
        //el.append('<div><a id="button_return_home" href="/">Return Home (Please let your experimenter know that your data did not save properly))</a></div>')
      },
   });
}


console.log(profile_chart_img_paths)
jsPsych.pluginAPI.preloadImages(profile_chart_img_paths, function(){ startExperiment(); });

//// START /////
function startExperiment(){//*/
  jsPsych.init({
    timeline: timeline,
		//show_progress_bar: true,
    fullscreen: false,
    auto_preload:false,
    on_finish: function() {
      //save_data(jsPsych.data.getData());
    }
  })};
