
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> The following statements refer to experiences that many people have in their everyday lives."+
  "Tick the answer that best describes <strong> HOW MUCH </strong> that experience has <strong>DISTRESSED or BOTHERED you during the PAST MONTH</strong></p>"
};

// defining response scale
var choices = ["Not at all", "A little", "Moderately", "A lot", "Extremely"];

//questionnaires
var questions = {
    type: 'survey-likert',
    labels: [choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["I have saved up so many things that they get in the way", "I check things more often than necessary", "I get upset if objects are not arranged properly", "I feel compelled to count while Iam doing things", "I find it difficult to touch an object when I know it has been touched by strangers or certain people", "I find it difficult to control my own thoughts"]},
      {questions: ["I collect things I don't need", "I repeatedly check doors, windows, drawers, etc.", "I get upset when others change the way I have arranged things", "I feel I have to repeat certain numbers", "I sometimes have to wash or clean myself simply because I feel contaminated", "I am upset by unpleasant thoughts that come into my mind against my will"]},
      {questions: ["I avoid throwing things away because I am afraid I might need them later", "I repeatedly check gas and water taps and light switches after turning them off", "I need things to be arranged in a particular order", "I feel that there are good and bad numbers", "I wash My hands more often and longer than necessary", "I frequently get naty thoughts and have difficulty in getting rid of them"]},
    ]
}

//push this back
/* create experiment timeline array */
var timeline = [instructions_block, questions];

/* start the experiment */
jsPsych.init({
  timeline: timeline
});





/* define debrief block
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
