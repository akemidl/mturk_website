
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p>A number of statements which people have used to describe themselves are " +
        "given below.</p><p>Read each statement and then mark the appropriate statement " +
        "on the four-point scale to indicate how you <strong>feel right now </strong>, that is <strong>at the moment</strong>.</p>" +
        "<p>There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems  " +
        "to describe your present feelings best. Press enter to start.</p>"
};

// defining response scale
var choices = ["Not at all", "Somewhat", "Moderately so", "Very much so"];

/*var scores = []; //create empty array to store responses of every trial

function getSubjectScore() {

  var data = jsPsych.data.getData();

  var scores = scores.push(responses.Q1)

  return {
    responses: scores
  }
} */

//questionnaires
var questions = {
    type: 'survey-likert',
    check_completion: true,
    //labels: [choices, choices, choices], // need one scale for every question on a page
    labels: [choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    on_finish: function(data) {
      var responses = JSON.parse(data.responses);
      var State_Anxiety = 5 - (1 + Number(responses.Q0)) + 5 - (1+Number(responses.Q1)) + (1+ Number(responses.Q2)) + (1 + Number(responses.Q3)) + 5-(1 + Number(responses.Q4)) + (1 + Number(responses.Q5)) +
      (1 + Number(responses.Q6))+ 5-(1 + Number(responses.Q7))+ (1 + Number(responses.Q8))+ 5-(1 + Number(responses.Q9))+ 5-(1 + Number(responses.Q10))+ (1 + Number(responses.Q11))
      + (1 + Number(responses.Q12))+ (1 + Number(responses.Q13))+ 5-(1 + Number(responses.Q14))+ 5-(1 + Number(responses.Q15))+ (1 + Number(responses.Q16))+ (1 + Number(responses.Q17))
      + 5-(1 + Number(responses.Q18))+ 5-(1 + Number(responses.Q19)) // scores are string, convert to double
      jsPsych.data.addDataToLastTrial({State_Anxiety: State_Anxiety});
      console.log(State_Anxiety)
      $(document).ready(function() {window.scrollTo(0,0);});
      return data.score
    },
    questions: ["I feel calm", "I feel secure", "I am tense", "I feel strained", "I feel at ease", "I feel upset", "I am presently worrying over possible misfortunes",
     "I feel satisfied", "I feel frightened", "I feel comfortable", "I feel self-confident", "I feel nervous", "I feel jittery", "I feel indecisive", "I am relaxed", "I feel content", "I am worried", "I feel confused", "I feel steady", "I feel pleasant"],
    /*timeline:[
      {questions: ["I feel calm", "I feel secure", "I am tense"]},
      {questions: ["I feel strained", "I feel at ease", "I feel upset"]},
      /*{questions: ["I am presently worrying over possible misfortunes", "I feel satisfied", "I feel frightened"]},
      {questions: ["I feel comfortable", "I feel self-confident", "I feel nervous"]},
      {questions: ["I feel jittery", "I feel indecisive", "I am relaxed"]},
      {questions: ["I feel content", "I am worried", "I feel confused"]},
      {questions: ["I feel steady", "I feel pleasant"]},*/
    //]
};

/* define exit block */
var exit_block = {
 type: "text",
 text: "<p> You have finished. Thank you! </p>"
};

/* create experiment timeline array */
var timeline = [instructions_block, questions, exit_block];

//add questionnaire to data
jsPsych.data.addProperties({questionnaire: "STAI_State"})

/* start the experiment */
jsPsych.init({
  timeline: timeline,
});
