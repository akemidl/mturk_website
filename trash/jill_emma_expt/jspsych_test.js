
$(document).ready(function(){

var welcome_block={
  type: "text".
  test: "Welcome to the expt. Please press any key to continue"
};

/*creating an array to hold the blocks of our experiment*/
var timeline=[];
timeline.push(welcome_block);

/*tell jsPsych to run the expt by calling the jsPsych.init() function and passing the array that specifies the timeline of
experiment blocks. These are the different screens to be displayed*/

jsPsych.init({timeline.timeline});

var instructions_block={
    type="text",
    text="<p>these are some trial instructions. Here I will make this <strong>bold</strong></p><p> this is a new paragraph of instructions.</p> "

timeline.push(instructions_block);

};

});
