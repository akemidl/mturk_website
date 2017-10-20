

////////
var preamble_world_assumptions = "Please indicate your agreement with the following statements on a scale ranging from 1—Strongly Disagree to 6—Strongly Agree."

var questions_world_assumptions =[
  "Misfortune is least likely to strike worthy decent people.",
  "People are naturally unfriendly and unkind.",
  "Bad events are distributed to people at random.",
  "Human nature is basically good.",
  "The good things that happen in this world far outnumber the bad.",
  "The course of our lives is largely determined by chance.",
  "Generally, people deserve what they get in this world.",
  "I often think that I am no good at all.",
  "There is more good than evil in this world.",
  "I am basically a lucky person.",
  "People's misfortunates result from mistakes they've made.",
  "People don't really care about what happens to the next person.",
  "I usually behave in ways that are likely to maximize good results for me.",
  "People will experience good fortunate if they themselves are good.",
  "Life is too full of uncertainties that are determined by chance.",
  "When I think about it, I consider myself very lucky.",
  "I almost always make an effort to prevent bad things from happening to me.",
  "I have a low opinion of myself.",
  "By and large, good people get what they deserve in this world.",
  "Through our actions we can prevent bad things from happening to us.",
  "Looking at my life, I recognize that chance events have worked out well for me.",
  "If people took preventive actions, most misfortune could be avoided.",
  "In general, life is mostly a gamble.",
  "The world is a good place.",
  "People are basically kind and helpful.",
  "I usually behave so as to bring about the greatest good for me.",
  "I am very satisfied with the kind of person I am.",
  "When bad things happen, it is typically because people have not taken the necessary actions to protect themselves.",
  "If you look closely enough, you will see that the world is full of goodness.",
  "I have reason to be ashamed of my personal character.",
  "I am luckier than most people."
]

var choices_individual_world_assumptions = ['1 </br> strongly disagree','2','3','4','5','6 </br> strongly agree']
//var choices_individual_world_assumptions = ['strongly disagree','disagree','disagree somewhat','agree somewhat','agree','strongly agree']
var choices_world_assumptions= []
for (i = 0; i < questions_world_assumptions.length; i++){
    choices_world_assumptions[i]=choices_individual_world_assumptions
}
