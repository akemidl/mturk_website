
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> Tick the number that best describes how typical or characteristic each of the items is of you. There are no right or wrong answers." +
  " Press enter to start. </p>"
};

// defining response scale
var choices = ["1 <br>Not at all typical", "2", "3 <br>Somewhat typical", "4", "5 <br>Very typical"];

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
jsPsych.data.addProperties({questionnaire: "PSWQ"})

//push this back
/* create experiment timeline array */
var timeline = [instructions_block, questions, exit_block];

/* start the experiment */
jsPsych.init({
  timeline: timeline
});
