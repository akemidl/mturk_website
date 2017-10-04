
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> Each item of this questionnaire is a statement that a person may either agree or disagree with." +
  " For each item, indicate how much you agree or disagree with what the item says."+
  " Please respond to all the items; do not leave any blank. Choose only one response to each statement."+
  " Please be as accurate and honest as you can be. Respond to each item as if it were the only item."+
  " That is, don't worry about being 'consistent' in your responses. Press enter to start. </p>"
};

// defining response scale
var choices = ["Very true for me", "Somewhat true for me", "Somewhat false for me", "Very false for me"];

//questionnaires
var questions = {
    type: 'survey-likert',
    check_completion: true,
    labels: [choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["A person's family is the most important thing in life", "Even if something bad is about to happen to me, I rarely experience fear or nervousness", "I go out of my way to get things I want", "When I'm doing well at something I love to keep at it", "I'm always willing to try something new if I think it will be fun", "How I dress is important to me"]},
      {questions: ["WHen I get something I want, I feel excited and energized", "Criticism or scolding hurts me quite a bit", "When I want something I usually go all out to get it", "I will often do things for no other reason than they might be fun", "It's hard for me to find teh time to do things such as get a haircut", "If I see a chance to get something I want, Imove in on it right away"]},
      {questions: ["I feel pretty worried or upset when I think or know somebody is angry at me", "When I see an opportunity for something I like I get excited right away", "I often act on the spur of the movement", "If I think something unpleasant is going to happen I usually get pretty 'worked up'", "I often wonder why people act the way they do", "When good things happen to me it affects me strongly"]},
      {questions: ["I feel worried when I think I have done poorly at something important", "I crave excitement and new sensations", "When I go after something I use a 'no holds barred' approach", "I have very few fears compared to my friends", "It would excite me to win a contest", "I worry about making mistakes"]},
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
