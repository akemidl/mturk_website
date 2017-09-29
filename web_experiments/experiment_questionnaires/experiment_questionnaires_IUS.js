
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> You will find below a series of statements which describe how people may react to the uncertainties of life."+
  "Please use the scale below to describe to what extent each item is characteristic of you. Please indicate a number "+
  "(1 to 5) that describes you best. </p>"
};

// defining response scale
var choices = ["Not at all characteristic of me", "A little characteristic of me", "Somewhat characteristic of me", "Mostly characteristic of me", "Entirely characteristic of me"];

//questionnaires
var questions = {
    type: 'survey-likert',
    labels: [choices, choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["Uncertainty stops me from having a firm opinion",
      "Being uncertain means that a person is disorganized",
      "Uncertainty makes life intolerable",
      "It's unfair not having any guarantees in life",
      "My mind can't be relaxed if I don't know what will happen tomorrow",
      "Uncertainty makes me uneasy, anxious, or stressed",
      "Unforeseen events upset me greatly"]},
      {questions: ["It frustrates me not having all the information I need",
      "Uncertainty keeps me from living a full life",
      "One should always look ahead so as to avoid surprises",
      "A small unforeseen event can spoil everything, even with the best of planning",
      "When it's time to act, uncertainty paralyses me",
      "Being uncertain means that I am not first rate",
      "When I am uncertain, I can't go forward"]},
      {questions: ["When I am uncertain I can't function very well",
      "Unlike me, others always seem to know where they are going with their lives",
      "Uncertainty makes me vulnerable, unhappy, or sad",
      "I always want to know what the future has in store for me",
      "I can't stand being taken by surprise",
      "The smallest doubt can stop me from acting",
      "I should be able to organize everything in advance"]},
      {questions: ["Being uncertain means that I lack confidence",
      "I think it's unfair that other people seem sure about their future",
      "Uncertainty keeps me from sleeping soundly",
      "I must get away from all uncertain situations",
      "The ambiguities in life stress me",
      "I can't stand being undecided about my future"]},
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
