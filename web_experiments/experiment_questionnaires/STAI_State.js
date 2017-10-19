
 /* define instructions block */
var preamble_stai_state = "<p>Here, we've listed a number of statements which people have used to describe themselves.</p>" +
      "<p>Read each statement and then use the buttons below the statement " +
      "to indicate how you <strong>feel right now </strong>, that is <strong>at the moment</strong>.</p>" +
      "<p>There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems  " +
      "to describe your present feelings best.</p>"

var preamble_stai_state_nextpage = "<p>On the next page, we've listed a number of statements which people have used to describe themselves.</p>" +
      "<p>Read each statement and then use the buttons below the statement " +
      "to indicate how you <strong>feel right now </strong>, that is <strong>at the moment</strong>.</p>" +
      "<p>There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems  " +
      "to describe your present feelings best.</p>"


//questionnaires
var questions_stai_state = ["I feel calm", "I feel secure", "I am tense",
"I feel strained", "I feel at ease", "I feel upset",
"I am presently worrying over possible misfortunes", "I feel satisfied", "I feel frightened",
"I feel comfortable", "I feel self-confident", "I feel nervous",
"I feel jittery", "I feel indecisive", "I am relaxed",
"I feel content", "I am worried", "I feel confused",
"I feel steady", "I feel pleasant"]

// defining response scale
var choices_individual_stai_state = ["Not at all", "Somewhat", "Moderately so", "Very much so"];
var choices_stai_state= []
for (i = 0; i < questions_stai_state.length; i++){
    choices_stai_state[i]=choices_individual_stai_state
}
