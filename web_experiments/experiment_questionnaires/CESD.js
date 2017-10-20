
 /* define instructions block */
var preamble_cesd = "<p>Here, we've listed of some of the ways you may have felt or behaved. " +
"Please indicate how often you have felt this way during the past week."

var preamble_cesd_nextpage = "<p>On the next page, we've listed of some of the ways you may have felt or behaved. " +
"Please indicate how often you have felt this way during the past week."


//questionnaires
var questions_cesd =[
  "I was bothered by things that usually don’t bother me",
  "I did not feel like eating; my appetite was poor",
  "I felt that I could not shake off the blues even with help from my family",
  "I felt that I was just as good as other people",
  "I had trouble keeping my mind on what I was doing",
  "I felt depressed",
  "I felt that everything I did was an effort",
  "I felt hopeful about the future",
  "I thought my life had been a failure",
  "I felt fearful",
  "My sleep was restless",
  "I was happy",
  "I talked less than usual",
  "I felt lonely",
  "People were unfriendly",
  "I enjoyed life",
  "I had crying spells",
  "I felt sad",
  "I felt that people disliked me",
  "I could not 'get going'"
]

var choices_individual_cesd = ["Rarely or none of the time </br> (less than one day)", "Some or a little of the time </br> (1-2 days)", "Occasionally or a moderate amount of time </br> (3-4 days)", "All of the time </br> (5-7 days)"];
var choices_cesd= []
for (i = 0; i < questions_cesd.length; i++){
    choices_cesd[i]=choices_individual_cesd
}
