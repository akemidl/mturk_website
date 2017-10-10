


/////// DAS_A /////////

var preamble_DAS_A =
"<p>Below, we've listed different attitudes or beliefs which people sometimes hold. "+
"Read each statement carefully and decide how much you agree or disagree with the statement.</p> "+
"<p>For each of the attitudes, click the button above the answer that best describes how you think. Because people are different, there are no right or wrong answers to these statements.</p>"+
"<p>To decide whether a given attitude is typical of your way of looking at things, simply keep in mind what you are like most of the time.</p>"

var questions_DAS_A = [
  "It is difficult to be happy unless one is good looking, intelligent, rich, and creative.",
  "Happiness is more a matter of my attitude towards myself than the way other people feel about me.",
  "People will probably think less of me if I make a mistake.",
  "If I do not do well all the time, people will not respect me.",
  "Taking even a small risk is foolish because the loss is likely to be a disaster.",
  "It is possible to gain another person's respect without being especially talented at anything.",
  "I cannot be happy unless most people I know admire me.",
  "If a person asks for help, it is a sign of weakness.",
  "If I do not do as well as other people, it means I am an inferior human being.",
  "If I fail at my work, then I am a failure as a person.",
  "If you cannot do something well, then there is little point in doing it at all.",
  "Making mistakes is fine because I can learn from them.",
  "People never make mistakes.",
  "If someone disagrees with me, it probably means he does not like me.",
  "If I fail partly, it is as bad as being a complete failure.",
  "If other people know what you are really like, they will think less of you.",
  "I am nothing if a person I love does not love me.",
  "One can get pleasure from an activity regardless of the end result.",
  "People should have a reasonable likelihood of success before undertaking anything.",
  "My value as a person depends greatly on what others think of me.", // Q19
  "If I don't set the highest standards for myself, then I am likely to end up a second-rate person.",
  "If I am to be a worthwhile person, I must be truly outstanding in at least one major respect.",
  "People who have good ideas are more worthy than those who do not.",
  "I should be upset if I make a mistake.",
  "The earth is not flat.",
  "My own opinions of myself are more important than other's opinions of me.",
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
