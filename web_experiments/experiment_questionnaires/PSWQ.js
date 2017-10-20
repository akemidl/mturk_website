
 /* define instructions block */
var preamble_pswq= "<p>Here, click the button above the answer that best describes how typical or characteristic each of the items is of you. There are no right or wrong answers." +
  "</p>"

var preamble_pswq_custom1= "<p>On the next page, click the button above the answer that best describes how typical or characteristic each of the items is of you. There are no right or wrong answers." +
    "</p>"

//questionnaires
var questions_pswq = [
      "If I don’t have enough time to do everything, I don’t worry about it.",
      "My worries overwhelm me.",
      "I don’t tend to worry about things.",
      "Many situations make me worry.",
      "I know I shouldn’t worry about things, but I just can’t help it.",
      "When I am under pressure, I worry a lot.",
      "I am always worrying about something.",
      "I find it easy to dismiss worrisome thoughts.",
      "As soon as I finish one task, I start to worry about everything else I have to do.",
      "I never worry about anything.",
      "When there is nothing more I can do about a concern, I don’t worry about it anymore.",
      "I’ve been a worrier all my life.",
      "I notice that I have been worrying about things.",
      "Once I start worrying, I can’t stop.",
      "I worry all the time.",
      "I worry about projects until they are done."
    ]

// defining response scale
var choices_individual_pswq = ["1 </br> Not at all typical", "2", "3 </br> Somewhat typical", "4", "5 </br> Very typical"];
var choices_pswq= []
for (i = 0; i < questions_pswq.length; i++){
    choices_pswq[i]=choices_individual_pswq
}
