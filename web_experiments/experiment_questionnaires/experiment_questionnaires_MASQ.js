
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> Below is a list of feelings, sensations, problems, and experiences that people " +
  "sometimes have. Read each item and then mark the appropriate choice in the button next to " +
  "that item. Use the choice that best describes how much you have felt or experienced things "+
  "this way <strong>during the past week, including today</strong>. </p>"
};

// defining response scale
var choices = ["not at all", "a little bit", "moderately", "quite a bit", "extremely"];

//questionnaires
var questions = {
    type: 'survey-likert',
    labels: [choices, choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["Felt cheerful", "Felt afraid", "Startled easily", "Felt confused", "Slept very well", "Felt sad", "Felt very alert", "Felt discouraged", "Felt nauseous", "Felt like crying"]},
      {questions: ["Felt successful", "Had diarrhea", "Felt worthless", "Felt really happy", "Felt nervous", "Felt depressed", "Felt irritable", "Felt optimistic", "Felt faint", "Felt uneasy"]},
      {questions: ["Felt really bored","Felt hopeless","Felt like I was having a lot of fun","Blamed myself for a lot of things","Felt numbness or tingling in my body","Felt withdrawn from other people","Seemed to move quickly and easily","Was afraid I was going to lose control","Felt dissatisfied with everything","Looked forward to things with enjoyment"]},
      {questions: ["Had trouble remembering things", "Felt like I didnt need much sleep", "Felt like nothing was very enjoyable", "Felt like something awful was going to happen", "Felt like I had accomplished a lot", "Felt like I had a lot of interesting things to do", "Did not have much of an appetite", "Felt like being with other people", "Felt like it took extra effort to get started", "Felt like I had a lot to look forward to"]},
      {questions: ["Thoughts and ideas came to me very easily", "Felt pessimistic about the future", "Felt like I could do everything I needed to do", "Felt like there wasn't anything interesting or fun to do", "Had pain in my chest", "Felt really talkative", "Felt like a failure", "Had hot or cold spells", "Was proud of myself", "Felt very restless"]},
      {questions: ["Had trouble falling asleep", "Felt dizzy or lightheaded", "Felt unattractive", "Felt very clearheaded", "Was short of breath", "Felt sluggish or tired", "Hands were shaky", "Felt really 'up'or lively", "Was unable to relax", "Felt like being by myself"]},
      {questions: ["Felt like I was choking", "Was able to laugh easily", "Had an upset stomach", "Felt inferior to others", "Had a lump in my throat", "Felt really slowed down", "Had a very dry mouth", "Felt confident about myself", "Muscles twitched or trembled", "Had trouble making decisions"]},
      {questions: ["Felt like I was going crazy", "Felt like I had a lot of energy", "Was afraid I was going to die", "Was disappointed in myself", "Heart was racing or pounding", "Had trouble concentrating", "Felt tense or high-strung", "Felt hopeful about the future", "Was trembling or shaking", "Had trouble paying attention"]},
      {questions: ["Muscles were tense or sore", "Felt keyed up, on edge", "Had trouble staying asleep", "Worried a lot about things", "Had to urinate frequently", "Felt really good about myself", "Had trouble swallowing", "Hands were cold or sweaty","Thought about death or suicide","Got tired or fatigued easily"]},
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
