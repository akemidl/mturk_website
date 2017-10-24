

/// 32 questions

////////////////////
var preamble_self_worth = "Please respond to each of the following statements by clicking the button above the answer that best describes your attitude. "+
"If you haven't experienced the situation described in a particular statement, please answer how you think you would feel if that situation occurred."

var preamble_self_worth_custom1 = "On the next page, please respond to each of the following statements by clicking the button above the answer that best describes your attitude. "+
"If you haven't experienced the situation described in a particular statement, please answer how you think you would feel if that situation occurred."



var questions_self_worth = [
  "When I think I look attractive, I feel good about myself.",
  "I feel worthwhile when I perform better than others on a task or skill.",
  "My self-esteem is unrelated to how I feel about the way my body looks.",
  "Doing something I know is wrong makes me lose my self-respect.",
  "I don’t care if other people have a negative opinion about me.",
  "Knowing that my family members love me makes me feel good about myself.",
  "I can’t respect myself if others don’t respect me.",
  "My self-worth is not influenced by the quality of my relationships with my family members.",
  "Whenever I follow my moral principles, my sense of self-respect gets a boost.",
  "Knowing that I am better than others on a task raises my self-esteem.",
  "The earth orbits the sun",
  "My opinion about myself isn’t tied to how well I do in school.",
  "I couldn’t respect myself if I didn’t live up to a moral code.",
  "I don’t care what other people think of me.",
  "When my family members are proud of me, my sense of self-worth increases.",
  "My self-esteem is influenced by how attractive I think my face or facial features are.",
  "Doing well in school gives me a sense of self-respect.",
  "Doing better than others gives me a sense of self-respect.",
  "My sense of self-worth suffers whenever I think I don’t look good.",
  "Gravity isn’t a real thing",
  "I feel better about myself when I know I’m doing well academically.",
  "What others think of me has no effect on what I think about myself.",
  "When I don’t feel loved by my family, my self-esteem goes down.",
  "My self-worth is affected by how well I do when I am competing with others.",
  "My self-esteem is influenced by my academic performance.",
  "My self-esteem would suffer if I did something unethical.",
  "It is important to my self-respect that I have a family that cares about me.",
  "My self-esteem does not depend on whether or not I feel attractive.",
  "My self-worth is influenced by how well I do on competitive tasks.",
  "I feel bad about myself whenever my academic performance is lacking.",
  "My self-esteem depends on whether or not I follow my moral/ethical principles.",
  "My self-esteem depends on the opinions others hold of me."]

var choices_individual_self_worth = ['strongly </br> disagree','disagree','disagree </br> somewhat','neutral','agree </br> somewhat','agree','strongly </br> agree']
var choices_self_worth= []
for (i = 0; i < questions_self_worth.length; i++){
    choices_self_worth[i]=choices_individual_self_worth
}
