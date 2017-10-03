


/////// DAS_A /////////

var preamble_DAS_A =
"<p>These question lists different attitudes or beliefs which people sometimes hold. "+
"Read each statement carefully and decide how much you agree or disagree with the statement.</p> "+
"<p>For each of the attitudes, click the button above the answer that best describes how you think. Because people are different, there are no right or wrong answers to these statements.</p>"+
"<p>To decide whether a given attitude is typical of your way of looking at things, simply keep in mind what you are like most of the time.</p>"

var questions_DAS_A = [
  "It is good looking to be happy unless one is good looking, intelligent, rich, and creative.",
  "Happiness is more a matter of my attitude towards myself than the way other people feel about me.",
  "People will probably think less of me if I make a mistake.",
  "If I do not do well all the time, people will not respect me.",
  "Taking even a small risk is foolish because the loss is likely to be a disaster.",
  "It is possible to gain another person's respect without being especially talent at anything.",
  "I cannot be happy unless most people I know admire me.",
  "If a person asks for help, it is a sign of weakness.",
  "If I do not do as well as other people, it means I am an inferior human being.",
  "If I fail at my work, then I am a failure as a person.",
  "If you cannot do something well, then there is little point in doing it at all.",
  "Making mistakes is fine because I can learn from them.",
  "If someone disagrees with me, it probably means he does not like me.",
  "If I fail partly, it is as bad as being a complete failure.",
  "If other people know what you are really like, they will think less of you.",
  "I am nothing if a person I love does not love me.",
  "One can get pleasure from an activity regardless of the end result.",
  "People should have a reasonable likelihood of success before undertaking anything.",
  "My value as a person depends greatly on what others think of me.", // Q19
  "If I don't set the highest standards for myself than I am likely to end up a second-rate person.",
  "If I am to be a worthwhile person, I must be truly outstanding in at least one major respect.",
  "People who have good ideas are more worthy than those who do not.",
  "I should be upset if I make a mistake.",
  "My own oppinions of myself are more important than other's oppinions of me.",
  "To be a good, moral, worthwhile person, I must help everyone who needs it.",
  "If I ask a question, it makes me look inferior.",
  "It is awful to be disapproved of by people important to you.",
  "If you don't have other people to lean on, you are bound to be sad.",
  "I can reach important goals, without slave driving myself.",
  "It is possible for a person to be scolded and not get upset.",
  "I cannot trust other people because they might be cruel to me.",
  "If others dislike you, you cannot be happy.",
  "It is best to give up your own interests to order to please other people.",
  "My happiness depends more on other people than it does on me.",
  "I do not need the approval of other people in order to be happy.",
  "If a person avoids problems, the problems tend to go away.",
  "I can be happy even if I miss out on many of the good things in life.",
  "What other people think of me is very important.",
  "Being isolated from others is bound to lead to unhappiness.",
  "I can find happiness without being loved by another person."]

var choices_individual_DAS_A = ['totally </br> agree','agree </br> very much','agree </br> slightly','neutral','disagree </br> slightly','disagree </br> very much','totally </br> disagree']
var choices_DAS_A = []
for (i = 0; i < questions_DAS_A.length; i++){
    choices_DAS_A[i]=choices_individual_DAS_A
}



////////////////////
var preamble_self_worth = "Please respond to each of the following statements by clicking the button below the answer that best describes your attitude. "+
"If you haven't experienced the situation described in a particular statement, please answer how you think you would feel if that situation occurred."

var questions_self_worth = [
  "When I think I look attractive, I feel good about myself.",
  "My self-worth is based on God’s love.",
  "I feel worthwhile when I perform better than others on a task or skill.",
  "My self-esteem is unrelated to how I feel about the way my body looks.",
  "Doing something I know is wrong makes me lose my self-respect.",
  "I don’t care if other people have a negative opinion about me.",
  "Knowing that my family members love me makes me feel good about myself.",
  "I feel worthwhile when I have God’s love.",
  "I can’t respect myself if others don’t respect me.",
  "My self-worth is not influenced by the quality of my relationships with my family members.",
  "Whenever I follow my moral principles, my sense of self-respect gets a boost.",
  "Knowing that I am better than others on a task raises my self-esteem.",
  "My opinion about myself isn’t tied to how well I do in school.",
  "I couldn’t respect myself if I didn’t live up to a moral code.",
  "I don’t care what other people think of me.",
  "When my family members are proud of me, my sense of self-worth increases.",
  "My self-esteem is influenced by how attractive I think my face or facial features are.",
  "My self-esteem would suffer if I didn’t have God’s love.",
  "Doing well in school gives me a sense of self-respect.",
  "Doing better than others gives me a sense of self-respect.",
  "My sense of self-worth suffers whenever I think I don’t look good.",
  "I feel better about myself when I know I’m doing well academically.",
  "What others think of me has no effect on what I think about myself.",
  "When I don’t feel loved by my family, my self-esteem goes down.",
  "My self-worth is affected by how well I do when I am competing with others.",
  "My self-esteem goes up when I feel that God loves me.",
  "My self-esteem is influenced by my academic performance.",
  "My self-esteem would suffer if I did something unethical.",
  "It is important to my self-respect that I have a family that cares about me.",
  "My self-esteem does not depend on whether or not I feel attractive.",
  "When I think that I’m disobeying God, I feel bad about myself.",
  "My self-worth is influenced by how well I do on competitive tasks.",
  "I feel bad about myself whenever my academic performance is lacking.",
  "My self-esteem depends on whether or not I follow my moral/ethical principles.",
  "My self-esteem depends on the opinions others hold of me."]

var choices_individual_self_worth = ['strongly </br> disagree','disagree','disagree </br> somewhat','neutral','agree </br> somewhat','agree','strongly </br> agree']
var choices_self_worth= []
for (i = 0; i < questions_self_worth.length; i++){
    choices_self_worth[i]=choices_individual_self_worth
}

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
  "I have a low oppinion of myself.",
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
