
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p>A number of statements which people have used to describe themselves are " +
        "given below.</p><p>Read each statement and then markl the appropriate number to the right " +
        "of the statement to indicate how you <strong>feel right now </strong>, that is <strong>at the moment</strong>.</p>" +
        "<p>There are no right or wrong answers. Do not spend too much time on any one statement but give the answer whcih seems  " +
        "to describe your present feelings best.</p>"
};

// defining response scale
var choices = ["Not at all", "Somewhat", "Moderately so", "Very much so"];

//questionnaires
var questions = {
    type: 'survey-likert',
    check_completion: true,
    labels: [choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["I feel calm", "I feel secure", "I am tense"]},
      {questions: ["I feel strained", "I feel at ease", "I feel upset"]},
      /*{questions: ["I am presently worrying over possible misfortunes", "I feel satisfied", "I feel frightened"]},
      {questions: ["I feel comfortable", "I feel self-confident", "I feel nervous"]},
      {questions: ["I feel jittery", "I feel indecisive", "I am relaxed"]},
      {questions: ["I feel content", "I am worried", "I feel confused"]},
      {questions: ["I feel steady", "I feel pleasant"]},*/
    ]
}

/* define function to calculate scores, will be executed during data block */

function getSubjectData() {

  var trials = jsPsych.data.getTrialsOfType('single-stim');

  console.log(trials)


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

/* define exit block */
var exit_block = {
 type: "text",
 text: "<p> You have finished. Thank you! </p>"
};

// define block to display data
/*var data_block = {
  type: "text",
  text: function() {
    var subject_data = getSubjectData();
    return subject_data.accuracy;
  }
};

//push this back
/* create experiment timeline array */
var timeline = [instructions_block, questions, exit_block];

/* start the experiment */
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.displayData();
  }
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

/* create experiment timeline array
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

/* start the experiment
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
