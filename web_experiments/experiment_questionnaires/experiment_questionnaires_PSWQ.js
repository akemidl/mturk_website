
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> Tick the number that best describes how typical or characteristic each of the items is of you. There are no right or wrong answers." +
  " Press enter to start. </p>"
};

// defining response scale
var choices = ["1 Not at all typical", "2", "3 Somewhat typical", "4", "5 Very typical"];

//questionnaires
var questions = {
    type: 'survey-likert',
    check_completion: true,
    labels: [choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["If I don’t have enough time to do everything, I don’t worry about it",
      "My worries overwhelm me",
      "I don’t tend to worry about things",
      "Many situations make me worry"]},
      {questions: ["I know I shouldn’t worry about things, but I just can’t help it",
      "When I am under pressure, I worry a lot",
      "I am always worrying about something",
      "I find it easy to dismiss worrisome thoughts"]},
      {questions: ["As soon as I finish one task, I start to worry about everything else I have to do",
      "I never worry about anything",
      "When there is nothing more I can do about a concern, I don’t worry about it anymore",
      "I’ve been a worrier all my life"]},
      {questions: ["I notice that I have been worrying about things",
      "Once I start worrying, I can’t stop",
      "I worry all the time",
      "I worry about projects until they are done"]},
    ]
}

/* define exit block */
var exit_block = {
 type: "text",
 text: "<p> You have finished. Thank you! </p>"
};

//push this back
/* create experiment timeline array */
var timeline = [instructions_block, questions, exit_block];

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
