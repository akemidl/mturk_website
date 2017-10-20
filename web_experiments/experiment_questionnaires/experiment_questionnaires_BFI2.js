
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> Here are a number of characteristics that may or may not apply to you. "+
  "For example, do you agree that 'you are someone who likes to spend time with others'? "+
  "Please indicate the extend to which you agree or disagree with each statement. Press enter to start.</p>"
};

// defining response scale
var choices = ["Disagree strongly", "Disagree a little", "Neutral; no opinion", "Agree a little", "Agree strongly"];

//questionnaires
var questions = {
    type: 'survey-likert',
    check_completion: true,
    labels: [choices, choices, choices, choices, choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["I am someone who is outgoing, sociable", "I am someone who is compassionate, has a soft heart", "I am someone who tends to be disorganized", "I am someone who is relaxed, handles stress well", "I am someone who has few artistics interests", "I am someone who has an assertive personality", "I am someone who is respectful, treats others with respect", "I am someone who tends to be lazy", "I am someone who stays optimistic after experiencing a setback", "I am someone who is curious about many different things"]},
      {questions: ["I am someone who rarely feels excited or eager", "I am someone who tends to find fault with others", "I am someone who is dependable, steady", "I am someone who is moody, has up and down mood swings", "I am someone who is inventive, finds clear ways to do things", "I am someone who tends to be quiet", "I am someone who feels little sympathy for others", "I am someone who is systematic, likes to keep things in order", "I am someone who can be tense", "I am someone who is fascinated by art, music, or literature"]},
      {questions: ["I am someone who is dominant, acts as a leader", "I am someone who starts arguments with others", "I am someone who has difficulty starting on tasks", "I am someone who feels secure, comfortable with self", "I am someone who avoids intellectual, philosophical discussions", "I am someone who is less active than other people", "I am someone who has a forgiving nature", "I am someone who can be somewhat careless", "I am someone who is emotionally stable, not easily upset", "I am someone who has little creativity"]},
      {questions: ["I am someone who is sometimes shy introverted", "I am someone who is helpful and unselfish with others", "I am someone who keeps things neat and tidy", "I am someone who worries a lot", "I am someone who values art and beauty", "I am someone who finds it hard to influence people", "I am someone who is sometimes rude to others", "I am someone who is efficient, gets things done", "I am someone who often feels sad", "I am someone who is complex, a deep thinker"]},
      {questions: ["I am someone who is full of energy", "I am someone who is suspicious of others' intentions", "I am someone who is reliable, can always be counted on", "I am someone who keeps their emotions under control", "I am someone who has difficulty imagining things", "I am someone who is talkative", "I am someone who can be cold and uncaring", "I am someone who leaves a mess, doesn't clean up", "I am someone who rarely feels anxious or afraid", "I am someone who thinks poetry and plays are boring"]},
      {questions: ["I am someone who prefers to have others take charge", "I am someone who is polite, courteous to others", "I am someone who works until the task is finished", "I am someone who tends to feel depressed, blue", "I am someone who has little interest in abstract ideas", "I am someone who shows a lot of enthusiasm", "I am someone who assumes the best about people", "I am someone who sometimes behaves irresponsibly", "I am someone who is temperamental, gets emotional easily", "I am someone who is original, comes up with new ideas"]},
    ],
    on_finish: function(data) {
      $(document).ready(function() {window.scrollTo(0,0);});
      return
    },
}

/* define exit block */
var exit_block = {
 type: "text",
 text: "<p> You have finished. Thank you! </p>"
};

//add questionnaire to data
jsPsych.data.addProperties({questionnaire: "BFI2"})

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
