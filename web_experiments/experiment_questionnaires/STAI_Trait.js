
 /* define instructions block */
var preamble_stai_trait = "<p>Here, we've listed a number of statements which people have used to describe themselves.</p>"+
      "<p>Read each statement and then use the buttons " +
      "below the statement to indicate how you <strong> generally feel </strong>.</p>" +
      "<p>There are no right or wrong answers. Do not spend too much time on any one statement " +
      "but give the answer which seems to describe how you generally feel.</p>"

var questions_stai_trait = [
      "I feel pleasant",
      "I feel nervous and restless",
      "I feel satisfied with myself",
      "I wish I could be as happy as others seem to be",
      "I feel like a failure",
      "I feel rested",
      "I am calm, cool and collected",
      "I feel that difficulties are piling up so that I cannot overcome them",
      "I worry too much over something that really doesn’t matter",
      "I am happy",
      "I have disturbing thoughts",
      "I lack self-confidence",
      "I feel secure",
      "I make decisions easily",
      "I feel inadequate",
      "I am content",
      "Some unimportant thought runs through my mind and bothers me",
      "I take disappointments so keenly that I can’t put them out of my mind",
      "I am a steady person",
      "I get in a state of tension or turmoil as I think over my recent concerns and interest"
    ]


var choices_individual_stai_trait = ["Almost never", "Sometimes", "Often", "Almost always"];
var choices_stai_trait= []
for (i = 0; i < questions_stai_trait.length; i++){
    choices_stai_trait[i]=choices_individual_stai_trait
};
