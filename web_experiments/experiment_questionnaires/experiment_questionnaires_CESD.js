
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> Below is a list of some of the ways you may have felt or behaved. " +
  "Please indicate how often you have felt this way during the past week.</p>"
};

// defining response scale
var choices = ["Rarely or none of the time (less than one day)", "Some or a little of the time (1-2 days)", "Occasionally or a moderate amount of time (3-4 days)", "All of the time (5-7 days)"];

//questionnaires
var questions = {
    type: 'survey-likert',
    labels: [choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["I was bothered by things that usually don’t bother me", "I did not feel like eating; my appetite was poor", "I felt that I could not shake off the blues even with help from my family", "I felt that I was just as good as other people"]},
      {questions: ["I had trouble keeping my mind on what I was doing", "I felt depressed", "I felt that everything I did was an effort", "I felt hopeful about the future"]},
      {questions: ["I thought my life had been a failure", "I felt fearful", "My sleep was restless", "I was happy"]},
      {questions: ["I talked less than usual", "I felt lonely", "People were unfriendly", "I enjoyed life"]},
      {questions: ["I had crying spells", "I felt sad", "I felt that people disliked me", "I could not 'get going'"]},
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
