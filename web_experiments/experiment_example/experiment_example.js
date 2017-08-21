
var welcome_block = {
  type: "text",
  text: "Welcome to the experiment. Press any key to begin."
};

 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p>In this experiment, a circle will appear in the center " +
      "of the screen.</p><p>If the circle is <strong>blue</strong>, " +
      "press the letter F on the keyboard as fast as you can.</p>" +
      "<p>If the circle is <strong>orange</strong>, do not press " +
      "any key.</p>" +
      "<div class='left center-content'><img src="+image1_path+"></img>" +
      "<p class='small'><strong>Press the F key</strong></p></div>" +
      "<div class='right center-content'><img src="+image2_path+"></img>" +
      "<p class='small'><strong>Do not press a key</strong></p></div>" +
      "<p>Press any key to begin.</p>",
    timing_post_trial: 2000
};

/* define test block */
var test_stimuli = [
  {stimulus: image1_path,data: { response: 'go' }},
  {stimulus: image2_path,data: { response: 'no-go' }}
];

var all_trials = jsPsych.randomization.repeat(test_stimuli, 2);

var post_trial_gap = function() {
return Math.floor( Math.random() * 1500 ) + 750;
}


var test_block = {
  type: 'single-stim',
  choices: ['F'],
  timing_response: 1500,
  timing_post_trial: post_trial_gap,
  on_finish: function(data){
      var correct = false;
      if(data.response == 'go' && data.rt > -1){
        correct = true;
      } else if(data.response == 'no-go' && data.rt == -1){
        correct = true;
      }
      jsPsych.data.addDataToLastTrial({correct: correct});
    },
  timeline: all_trials
};

/* define debrief block */
function getSubjectData() {

  var trials = jsPsych.data.getTrialsOfType('single-stim');

  var sum_rt = 0;
  var correct_trial_count = 0;
  var correct_rt_count = 0;
  for (var i = 0; i < trials.length; i++) {
    if (trials[i].correct == true) {
      correct_trial_count++;
      if(trials[i].rt > -1){
        sum_rt += trials[i].rt;
        correct_rt_count++;
      }
    }
  }
  return {
    rt: Math.floor(sum_rt / correct_rt_count),
    accuracy: Math.floor(correct_trial_count / trials.length * 100)
  }
}

var debrief_block = {
  type: "text",
  text: function() {
    var subject_data = getSubjectData();
    return "<p>You responded correctly on "+subject_data.accuracy+"% of "+
    "the trials.</p><p>Your average response time was <strong>" +
    subject_data.rt + "ms</strong>. Press any key to complete the "+
    "experiment. Thank you!</p>";
  }
};

/* create experiment timeline array */
var timeline = [];
timeline.push(welcome_block);
timeline.push(instructions_block);
timeline.push(test_block);
timeline.push(debrief_block);

function save_data(data){
   var data_table = "my_experiment_table"; // change this for different experiments
   value = 'test_value'
   $.ajax({
      type:'get',
      cache: false,
      data: {
          table: data_table,
          json: JSON.stringify(data),
          opt_data: {key: value}
      },
      success: function(output) { console.log(output); } // write the result to javascript console
   });
}

/* start the experiment */
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    save_data(jsPsych.data.getData());
    console.log('This task is over! Return to main page');
  }
});
/*
  jsPsych.init({
    timeline: timeline,
    on_finish: function() {
      jsPsych.data.displayData();
    }
  });  */
