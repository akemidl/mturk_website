
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p>A number of statements which people have used to describe themselves " +
        "are given below. </p><p>Read each statement and then mark the appropriate " +
        "statement on the four-point scale to indicate how you <strong> generally feel </strong>.</p>" +
        "<p>There are no right or wrong answers. Do not spend too much time on any one statement " +
        "but give the answer which seems to describe how you generally feel. Press enter to start.</p>"
};

// defining response scale
var choices = ["Almost never", "Sometimes", "Often", "Almost always"];

var questions = {
    type: 'survey-likert',
    //labels: [choices, choices, choices], // need one scale for every question on a page
    labels: [choices, choices, choices,choices, choices, choices,choices, choices, choices,choices, choices, choices,choices, choices, choices,choices, choices, choices,choices, choices], // need one scale for every question on a page
    on_finish: function(data) {
      var responses = JSON.parse(data.responses);
      var Trait_Anxiety = 5 - (1 + Number(responses.Q0)) + (1+Number(responses.Q1)) + 5-(1+ Number(responses.Q2)) + (1 + Number(responses.Q3)) + (1 + Number(responses.Q4)) + 5-(1 + Number(responses.Q5)) +
      5-(1 + Number(responses.Q6))+ (1 + Number(responses.Q7))+ (1 + Number(responses.Q8))+ 5-(1 + Number(responses.Q9))+ (1 + Number(responses.Q10))+ (1 + Number(responses.Q11))
      + 5-(1 + Number(responses.Q12))+ 5-(1 + Number(responses.Q13))+ (1 + Number(responses.Q14))+ 5-(1 + Number(responses.Q15))+ (1 + Number(responses.Q16))+ (1 + Number(responses.Q17))
      + 5-(1 + Number(responses.Q18))+ (1 + Number(responses.Q19)) // scores are string, convert to double
      jsPsych.data.addDataToLastTrial({Trait_Anxiety: Trait_Anxiety});
      console.log(Trait_Anxiety)
      $(document).ready(function() {window.scrollTo(0,0);});
      return data.Trait_Anxiety
    },
    questions: ["I feel pleasant", "I feel nervous and restless", "I feel satisfied with myself", "I wish I could be as happy as others seem to be", "I feel like a failure", "I feel rested", "I am calm, cool, and collected", "I feel that difficulties are piling up so that I cannot overcome them", "I worry too much over something that really doesn’t matter", "I am happy", "I have disturbing thoughts", "I lack self-confidence", "I feel secure", "I make decisions easily", "I feel inadequate",
    "I am content", "Some unimportant thought runs through my mind and bothers me", "I take disappointments so keenly that I can’t put them out of my mind", "I am a steady person", "I get in a state of tension or turmoil as I think over my recent concerns and interest"],
    /*timeline:[
      {questions: ["I feel pleasant", "I feel nervous and restless", "I feel satisfied with myself"]},
      {questions: ["I wish I could be as happy as others seem to be", "I feel like a failure", "I feel rested"]},
      {questions: ["I am calm, cool, and collected", "I feel that difficulties are piling up so that I cannot overcome them", "I worry too much over something that really doesn’t matter"]},
      {questions: ["I am happy", "I have disturbing thoughts", "I lack self-confidence"]},
      {questions: ["I feel secure", "I make decisions easily", "I feel inadequate"]},
      {questions: ["I am content", "Some unimportant thought runs through my mind and bothers me", "I take disappointments so keenly that I can’t put them out of my mind"]},
      {questions: ["I am a steady person", "I get in a state of tension or turmoil as I think over my recent concerns and interest"]},
    ]*/
};

/* define exit block */
var exit_block = {
 type: "text",
 text: "<p> You have finished. Thank you! </p>"
};
//questionnaires

//push this back
/* create experiment timeline array */
var timeline = [instructions_block, questions, exit_block];

//add questionnaire to data
jsPsych.data.addProperties({questionnaire: "STAI_Trait"})

/* start the experiment */
jsPsych.init({
  timeline: timeline
  //on_finish: function() {
    //jsPsych.data.displayData()},
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
