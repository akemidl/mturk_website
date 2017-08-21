//cleaned up final version of expt
/*parameters need for expt*/
var flakes=[]; //array will fill with dots later...
var rb_array_thistrial=[];
var rc_array_thistrial=[];
var speed_array_thistrial=[];
var num_dots=1000; //number of dots on screen at any time...
var outcome_done=false; //this gets changed to true when they press enter for their response and we show the outcome...
var canRespondbuttons=false;
var canProceed = true // allowed to go to next event
var canrunfirstthing=true
var nottooslow=true;
var last_pressed='none';
var RT=0;
var currentTime=0;
var startTrialTime=0;
var current_context='blah';
// Counters
var tnum=0;
var currentevent = -1;
var currenttrial_t = 0 //this is the counter for the training block trials...
var numbertrials_elapsed=0;
var checktime=setInterval(function(){},100); //how often we loop over and check how long the trial is taking. If too long then it times out and we move to the next trial...
var finished = 0; //this will be incremented to 1 when they reach the end screen (then other python and html scripts give the completion code when this is true...)

/*create event array*/ //need to change this...
var trials_counter=0;
var total_instruction_screens=0; //12
var num_summaryscreen=1;

//make these the same for now the way we have set up the event arrays and the make coloured dots trials...
var num_practicetrials=40;
var num_blocktrials=40;
var num_catchtrials=8;
var num_total_trials=4*num_practicetrials+4*num_blocktrials;  //for the context array...not including catch screens.

var radius_circle=3;
var increment=1; //set here but will change later depending on block...
var reward_level_width="blank";
var reward_level_number=0;
var reaction_times=[];

var event_array=[];
  for (i = 0; i <total_instruction_screens; i++) {
  	var event_array = event_array.concat('instruct-'+i.toString())
  }

//blocks to learn the category boundary: note that doing it in blocks but only numbering differently after the trial number so we can more easily index later...
  for (i = 0; i <num_practicetrials; i++) {
    var event_array = event_array.concat('practicetrial_catboundary_colour-'+i.toString()+'_1')
  }

  for (i = 0; i <num_practicetrials; i++) {
    var event_array = event_array.concat('practicetrial_catboundary_speed-'+i.toString()+'_1')
  }

  for (i = 0; i <num_practicetrials; i++) {
    var event_array = event_array.concat('practicetrial_catboundary_colour-'+i.toString()+'_2')
  }

  for (i = 0; i <num_practicetrials; i++) {
    var event_array = event_array.concat('practicetrial_catboundary_speed-'+i.toString()+'_2')
  }

//blocks to test effect of attention on performance
//colour block with speed catch trials
  //generate random numbers to use for the blocks...
var random_numbers_array=[];
var rand=0;

var random_numbers_array = []
while(random_numbers_array.length < num_catchtrials){
    var rand = Math.ceil(Math.random()*num_blocktrials)
    if(random_numbers_array.indexOf(rand) > -1) continue;
    random_numbers_array.push(rand);
}

//need to order the random numbers array in ascending order so will go through them each as i increments...
random_numbers_array.sort(function(a, b){return a-b});
console.log(random_numbers_array);

var a=0; //reset a so will take the first one in the array and then go through them all...

for (i=0;i<num_blocktrials;i++){

  if (i==random_numbers_array[a])//one of the random numbers we have generated...
    {var event_array=event_array.concat('blocktrialcolour-'+i.toString()+'_1'); //first add the normal block
      var event_array=event_array.concat('speed_incolourblock-'+i.toString()+'_1'); //then have the extra speed catch trial...
      a+=1; //increment a so will then look for the next value in the random_numbers_array to compare with i...
  }else  {var event_array=event_array.concat('blocktrialcolour-'+i.toString()+'_1')}
    //At the moment taking out the breaks after the block trials...
      if(i % num_blocktrials ==(num_blocktrials-1)){ //this is saying that if the remainder of i/num_trials_eachblock=(num_trials_eachblock-1). This is coz i starts from 0...
      	var event_array = event_array.concat('break')
      }
}

//speed block with colour catch trials
//generate random numbers to use for the blocks...
var random_numbers_array=[];
var rand=0;

while(random_numbers_array.length < num_catchtrials){
    var rand = Math.ceil(Math.random()*num_blocktrials)
    if(random_numbers_array.indexOf(rand) > -1) continue;
    random_numbers_array.push(rand);
}
//need to order the random numbers array in ascending order so will go through them each as i increments...
random_numbers_array.sort(function(a, b){return a-b});
console.log(random_numbers_array);
var a=0; //reset a so will take the first one in the array and then go through them all...

for (i=0;i<num_blocktrials;i++){

if (i==random_numbers_array[a])//one of the random numbers we have generated...
  {var event_array=event_array.concat('blocktrialspeed-'+i.toString()+'_1'); //first add the normal block
    var event_array=event_array.concat('colour_inspeedblock-'+i.toString()+'_1'); //then have the extra speed catch trial...
    a+=1; //increment a so will then look for the next value in the random_numbers_array to compare with i...
  } else {var event_array=event_array.concat('blocktrialspeed-'+i.toString()+'_1')};
    //At the moment taking out the breaks after the block trials...
      if(i % num_blocktrials ==(num_blocktrials-1)){ //this is saying that if the remainder of i/num_trials_eachblock=(num_trials_eachblock-1). This is coz i starts from 0...
      	var event_array = event_array.concat('break')
      }
}

//colour block with speed catch trials
//generate random numbers to use for the blocks...
var random_numbers_array=[];
var rand=0;
while(random_numbers_array.length < num_catchtrials){
    var rand = Math.ceil(Math.random()*num_blocktrials)
    if(random_numbers_array.indexOf(rand) > -1) continue;
    random_numbers_array.push(rand);
}
// for (a=0; a<num_catchtrials; a++){
//   //note that we might be doubling up on trials...then don't end up with as many catch trials for that block?
//   rand=Math.floor(Math.random() * (num_blocktrials-1)); //random number from 0 to (num_blocktrials-1)...these are the indices of the trials in the blocks where we might want to run the extra catch screen...
//   random_numbers_array.push(rand);
// }
//need to order the random numbers array in ascending order so will go through them each as i increments...
random_numbers_array.sort(function(a, b){return a-b});
//console.log(random_numbers_array);
var a=0; //reset a so will take the first one in the array and then go through them all...

for (i=0;i<num_blocktrials;i++){

if (i==random_numbers_array[a])//one of the random numbers we have generated...
  {var event_array=event_array.concat('blocktrialcolour-'+i.toString()+'_2'); //first add the normal block
    var event_array=event_array.concat('speed_incolourblock-'+i.toString()+'_2'); //then have the extra speed catch trial...
    a+=1; //increment a so will then look for the next value in the random_numbers_array to compare with i...
}else  {var event_array=event_array.concat('blocktrialcolour-'+i.toString()+'_2')}
    //At the moment taking out the breaks after the block trials...
      if(i % num_blocktrials ==(num_blocktrials-1)){ //this is saying that if the remainder of i/num_trials_eachblock=(num_trials_eachblock-1). This is coz i starts from 0...
      	var event_array = event_array.concat('break')
      }
}

//speed block with colour catch trials
var random_numbers_array=[];
var rand=0;
while(random_numbers_array.length < num_catchtrials){
    var rand = Math.ceil(Math.random()*num_blocktrials)
    if(random_numbers_array.indexOf(rand) > -1) continue;
    random_numbers_array.push(rand);
}
//need to order the random numbers array in ascending order so will go through them each as i increments...
random_numbers_array.sort(function(a, b){return a-b});
//console.log(random_numbers_array);
var a=0; //reset a so will take the first one in the array and then go through them all...

for (i=0;i<num_blocktrials;i++){

if (i==random_numbers_array[a])//one of the random numbers we have generated...
  {var event_array=event_array.concat('blocktrialspeed-'+i.toString()+'_2'); //first add the normal block
    var event_array=event_array.concat('colour_inspeedblock-'+i.toString()+'_2'); //then have the extra speed catch trial...
    a+=1; //increment a so will then look for the next value in the random_numbers_array to compare with i...
  } else {var event_array=event_array.concat('blocktrialspeed-'+i.toString()+'_2')};
    //At the moment taking out the breaks after the block trials...
      if(i % num_blocktrials ==(num_blocktrials-1)){ //this is saying that if the remainder of i/num_trials_eachblock=(num_trials_eachblock-1). This is coz i starts from 0...
      	var event_array = event_array.concat('break')
      }
}

var event_array = event_array.concat('endscreen');
var eventt = event_array[0] //setting this, will use and increment later...
//console.log(event_array)

  //variables to give a lifetime to the dots so they die a natural death after a random interval...
  var minlife=10;
  var maxlife=60;
  var liferange=maxlife-minlife;

  //difficulty variables--change these to get the performance measures we need working...
  var colour_difficulty=0.2; //difficulty measure...
  var colour_spread=30; //std dev of Gaussian from which colour for individual dots is drawn...
  var sspread=0.2; //std dev of Gaussian from which speed for individual dots is drawn...
  var mean_speed=20; //20 how fast reanimate...

  //Probably not going to use this anyway...will set without shuffling so we have the same order of red and blue on each side across the blocks...
    var choicebutton_side_array=[]; //0 for red on left, 1 for red on right, from choicebutton_side.js...NOW HAVE ALL LIKE THIS...
      for (i=0;i<num_total_trials;i++){
        choicebutton_side_array.push(choicebutton_side_tmp[i])
      };
      //console.log(choicebutton_side_array)
      var colour_eachdot=[];
      var speed_eachdot=[];

  function MakeColourEachDot(){
        colour_eachdot=[];
        for (i = 0; i <num_blocktrials; i++) {
          var colour_tmp=(0.5+rb_40[i]*0.5*colour_difficulty/1000); //transforming the input from rb_array
          var speed_tmp=1.5+speed_array_40[i]/2000; //transforming the input from speed_array
          colour_eachdot.push(colour_tmp); //actually probably want to set these and then work back to what the colour and speed values will be...
          speed_eachdot.push(speed_tmp);
          }
      };

      //These are the values I am using to set the position of the category boundary. Should I actually do it based on the slider range??
        //Need to come and change these once I have set the new range of values for colour and speed to make it harder

      //could set value for cat boundary and then just make range around that (just not symmetric)
      var colour_eachdot_min=0.45; //This is based on going from -500 to 500 for the rb_array...
      var colour_eachdot_max=0.55;

      var speed_eachdot_min=1.25; //calculated using -500
      var speed_eachdot_max=1.75; //calculated using 500

      var colour_range=colour_eachdot_max-colour_eachdot_min;
      var speed_range=speed_eachdot_max-speed_eachdot_min;
      //console.log(colour_range);
      //console.log(speed_range);
      var true_outcome_speed=[];
      var true_outcome_colour=[];

      //one category boundary for the whole time now that they've already learned...
      var category_boundary_colour=colour_eachdot_min+colour_range/2; //putting the category boundary at 33% for now...
      var category_boundary_speed=speed_eachdot_min+speed_range/2; //putting the category boundary at 66% for now...

var num_trials_thisblock=0;

//Timings- might not need all of these??
var decisionlim = 8000 // not currently using...
var ITI = 3000 //not sure if using...
var startTrialTime = 0; //using
var contextscreen_start=0; //1000 how long after trial starts the context screen is started...using
var moving_dots_start=1000; //3000 using
var moving_dots_timeout=500; //5000 using
var outcomebuttonshow_duration=500;
var howlong=0; //how long the trial has been running-updating using checktime...
var showsubjectchoicetime=280;
var squareflashtime=200;



//Put instructions function in here later when we've got it all working...

function RunTimeoutScreen(){
  //console.log('runningtimeoutscreen')
  $('#first_div').show();
  $('#button_previous').hide();
  $('#button_continue').show();
}

       ////////////////// BREAK //////////////////
function RunBreak(event){
         document.getElementById('instruct').innerHTML='Take a break. When you are ready to begin, click continue.'
         $('#first_div').show()
         $('#second_div').show()
         $('#third_div').hide()
         $('#fourth_div').hide()
         $('#container').hide()
         $('#instruct').show()
         $('#button_continue').show() //when click this should increment the Proceed function to the next trial...
         $('#button_previous').hide()
       }

       ////////////////// END SCREEN //////////////////
function RunEndScreen(){
         //document.getElementById("thanks2").innerHTML='You have earned an extra: $'+totalpoints*.001
         $('#first_div').hide()
         $('#second_div').hide()
         $('#third_div').hide()
         $('#fourth_div').hide()
         $('#container').hide()
         $('#thanks').show()
         $('#thanks2').show()
         $('#instruct').hide()
         $('#button_return_home').show();
         $('#button_continue').hide()
         canProceed = false
       // Store data (sends get query to django)
         finished=1
         $.get("?finished="+finished, function(response){});
       };

       //Functions defined that we are then stepping through and using when we run the trial...
               //Functions for the moving dots...
                 //Function to push a new snowflake to the flakes array

      function addFlake(cW,cH){
                   for (i=0;i<num_dots;i++){
                        console.log('adding_flakes')
                         var x=Math.floor(Math.random() * cW) + 1;
                         var y=Math.floor(Math.random() * cH) + 1;
                         var s=(speed_eachdot[currenttrial_t]+sspread*speed_eachdot[currenttrial_t]*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random()));
                         var rc=Math.round(255*colour_eachdot[currenttrial_t]+colour_spread*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random()));
                           if (rc>255){rc=255}; //colour must be between 0-255
                           if (rc<0){rc=0};
                         //console.log(s); console.log(rc);

                         var rb=255-rc; /*blue color-want it to be between 1 and 255 at the moment...*/
                         var rot=Math.random(); //not making them go in different direction at the moment but could do later if we wanted to...
                         var ang=Math.floor(Math.random()*2+1); /*how much moving in x direction as well? Can change overall angle?*/
                         //var ext=Math.round(Math.random()*liferange)+minlife; //setting lifetime for flake between minlife and maxlife...
                         //console.log(x,y,s,rc,rb,rot,ang) //,ext
                       flakes.push({"x":x,"y":y,"s":s,"rc":rc, "rb":rb, "rot":rot, "ang":ang}); //, "ext":ext
                       rb_array_thistrial.push(rb);
                       rc_array_thistrial.push(rc);
                       speed_array_thistrial.push(s);
                             if (i==num_dots){
                             console.log(flakes[1].rb);
                               };
                     }; //for if loop
               }; /*for addFlake*/

               //Functions for the canvas

               //cut canvas into a circle

//defining here so can use in the functions...
$('#mycanvas').attr("width",$(window).width());
$('#mycanvas').attr("height",$('#containing_container').height()*0.5);
var ctx=document.getElementById('mycanvas').getContext('2d');
//ctx.canvas.height = window.innerHeight/2;
var cW=ctx.canvas.width, cH=ctx.canvas.height;
var radius_canvas=Math.min(cW/radius_circle,cH/radius_circle);


function clipCanvas(){
  if (eventt.indexOf('instruct')==0){
    $('#mycanvas').attr("width",$('#containing_container').width());
    $('#mycanvas').attr("height",$('#containing_container').height()*0.5);
    ctx=document.getElementById('mycanvas').getContext('2d');
    cW=ctx.canvas.width, cH=ctx.canvas.height;
    radius_canvas=Math.min(cW/radius_circle,cH/radius_circle);
  };
                     ctx.beginPath();
                     ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,radius_canvas,0,Math.PI*2, false);
                     ctx.lineWidth = 1;
                     ctx.strokeStyle = 'black';
                     ctx.stroke();
                     ctx.clip();
                   };

function canvas_circle(){
  if (eventt.indexOf('instruct')==0){
    $('#mycanvas').attr("width",$('#containing_container').width());
    $('#mycanvas').attr("height",$('#containing_container').height()*0.5);
    ctx=document.getElementById('mycanvas').getContext('2d');
    cW=ctx.canvas.width, cH=ctx.canvas.height;
    radius_canvas=Math.min(cW/radius_circle,cH/radius_circle);
  };
                         ctx.clearRect(0,0,cW,cH);
                         /*cut canvas to be a circle*/
                         ctx.beginPath();
                         ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,radius_canvas,0,Math.PI*2, false);
                         ctx.fillStyle = "white";
                         ctx.fill();

                     // line color
                         ctx.lineWidth = 1;
                         ctx.strokeStyle = 'black';
                         ctx.stroke();
                         ctx.restore();
                       };


  function moving_dots(mean_speed, flakes){
                         //console.log('here')

                       /* we want to now loop over the flakes array to make the snowflakes move down screen by changing y value */
            function snow (){
                  for(var i=0; i<flakes.length; i++){
                               ctx.fillStyle="rgba(" +flakes[i].rc + ",0," +flakes[i].rb + ",0.75)" /*makes it white and opaque*/
                               /*ctx.rotate(flakes[i].rot);*/ /*this makes them move wildly*/
                               ctx.beginPath(); /*start a new arc shape for each snowflake*/

                               /*arc is for drawing a circle here for a snowflake...*/
                               /*arc(x,y,radius,startAngle,endAngle (these are for how you draw them),anticlockwise)*/
                               /*note that changing the number you multiply y by also changes the speed, so could make this a variable to change for different ones...*/
                               /*does this update the variables stored in flakes and how??*/
                               ctx.arc(flakes[i].x,flakes[i].y+=flakes[i].s,4,0,Math.PI*2, false); /*adding to the y position to get downwards movement*/
                               ctx.closePath();
                               ctx.fill(); /*or could use .fillRect() but it needs 4 inputs...*/

                               /*remove snowflakes after move off canvas*/
                               /*can change to remove after a certain random time period...*/
                               /*or remove if they go outside certain area...*/
                               if (flakes[i].y>(cH/2+radius_canvas)) {
                                     flakes[i].y=(cH/2-radius_canvas);
                                     flakes[i].x=Math.floor(Math.random() * cW) + 1;
                                   } /*for if loop*/
                                   }; /*for for loop*/
                             }; /*for snow*/

              function animate(){
                                   ctx.save(); /*saving the last image in the animation stack*/
                                   ctx.clearRect(0,0,cW,cH); /*Without this the snow just fills up the window.note that if have this in, seem to be able to change the size of the window flexibly...*/
                                     /*ctx.drawImage(bg,0,0);*/
                                     clipCanvas(); /*everything draw after this will now be clipped into the circle*/
                                     /*ctx.fillStyle="red";ctx.fillRect(0,0,cW,cH);*/ /*If have this and don't have the clear rectangle then still works???*/
                                     /*ctx.rotate(0.3); *//*can rotate where the snow about to put in is falling. BUT, also need to change where it comes in and leaves...*/
                                     snow(); /*can do this for each particle to get moving in lots of different directions?*/
                                     ctx.restore(); /*restoring the last image of the animation stack...*/
                                   }; /*for animate function*/

                                   var animateInterval=setInterval(animate,mean_speed); /*can change this interval to get them falling faster or slower overall...*/
                                       //stop the dots
                      setTimeout(function(){
                                         clearInterval(animateInterval);
                                       //make the circle grey
                                         canvas_circle();
                                       //Need to then do diff things depending on trial type...

                              //Might need to put stuff in here to run the trials we want to do during the instruction screens...

                              canRespondbuttons=true;
                              document.getElementById('button_text_para').innerHTML="Press left arrow key for left, right arrow key for right";
                              $('#button_text_para').css('color','black');

                          }, moving_dots_timeout); //for setTimeout

          }; /* for moving_dots*/


/////////////////
  //change this later so it codes for colour of the buttons based on whether a speed or colour trial...
function choice_buttons(){
              console.log('currenttrial_t'); console.log(currenttrial_t)
          //change the colour of the buttons depending on whether it is a speed or a colour trial...
                if (current_context.indexOf('speed') >= 0){
                    //console.log('buttons=orange and green');
                    document.getElementById("left_choice").style.background="orange";
                    document.getElementById("left_choice").style.backgroundClip="content-box";
                    document.getElementById("right_choice").style.background="green";
                    document.getElementById("right_choice").style.backgroundClip="content-box";
                }else if(current_context.indexOf('colour') >= 0){
                    //console.log('buttons=red and blue');
                    document.getElementById("left_choice").style.background="blue";
                    document.getElementById("left_choice").style.backgroundClip="content-box";
                    document.getElementById("right_choice").style.background="red";
                    document.getElementById("right_choice").style.backgroundClip="content-box";
                };

              //At this stage we don't want to show the outcome border...only add this in later...
              //remove border colour here...
              document.getElementById("left_choice").style.border="5px solid transparent";
              document.getElementById("right_choice").style.border="5px solid transparent";

              //add text for the buttons
              document.getElementById('button_text_para').innerHTML="placeholder";
              $('#button_text_para').css('color','transparent');

              $('#outcome_circle').hide()
              $('#left_choice').show()
              $('#right_choice').show()
              $('#fourth_div').show()

        };

        //Function to save the subject's choice in an array...
    var choicemade_array=[];
function save_choicebutton(){
              console.log('currenttrial_t'); console.log(currenttrial_t)
              choicemade_array.push(last_pressed);
          };

        //Function to show the outcome based on their response and what is correct for that trial...
          //Now changing so just showing the border around the correct one rather than the outcome circle...
            //Just depends on what is correct and which side that colour is on, not what they chose anymore...
          var correct=[];
var outcomebuttons=function(response){
          outcome_done=true;
          console.log('currenttrial_t:'); console.log(currenttrial_t)
          console.log('speed_eachdot[currenttrial_t]:'); console.log(speed_eachdot[currenttrial_t])
          console.log('colour_eachdot[currenttrial_t]:'); console.log(colour_eachdot[currenttrial_t]);
          //this is the function to get all of the variables we want to save on each trial...
            //set values for the variables for the slider that we don't need to save on this trial...
            sliderposition_tmp="not_applicable";
          //log that they responded
            if (response=='responded'){

               if (last_pressed=='left'){
                 console.log('getting in last pressed left')
                 //blue is on left then, have for all trials now...
                      //if choicebutton_side_array==0, then it is a speed trial...
                      if (speed_eachdot[currenttrial_t]>=category_boundary_speed & (current_context.indexOf('speed') >= 0)){
                      //slow is on left, they pressed left (slow), correct is fast (speed is greater than the cat boundary), so correct is right....
                        console.log('first_if')
                        console.log('category_boundary_speed:'); console.log(category_boundary_speed)
                        console.log('speed_eachdot[currenttrial_t]:'); console.log(speed_eachdot[currenttrial_t])
                        correct.push('incorrect');
                        console.log('correct[numbertrials_elapsed]:'); console.log(correct[numbertrials_elapsed])
                        //highlight correct one, which is red, which is on left
                        document.getElementById("right_choice").style.border="5px solid black"; //need to turn off for next trial...
                        //document.getElementById("outcome_circle").style.background = "green"; //change css of outcome circle here to green

                    } else if (speed_eachdot[currenttrial_t]<category_boundary_speed & (current_context.indexOf('speed') >= 0)){
                    //slow is on left, they pressed left (slow), correct is slow (which is on left)
                      console.log('second_if')
                      console.log('category_boundary_speed:'); console.log(category_boundary_speed)
                      console.log('speed_eachdot[currenttrial_t]:'); console.log(speed_eachdot[currenttrial_t])
                      correct.push('correct');
                      {reward_level_number+=increment}
                      reward_level_width=reward_level_number+"%"
                      console.log(reward_level_width)
                      $('#reward_level').css('width',reward_level_width)
                      console.log('correct[numbertrials_elapsed]:'); console.log(correct[numbertrials_elapsed])
                      document.getElementById("left_choice").style.border="5px solid black";

                    //blue is on right, don't have this for any trials now...
                  } else if (colour_eachdot[currenttrial_t]<category_boundary_colour & (current_context.indexOf('colour') >= 0)){
                    //red is on right, they pressed left (blue), correct is blue (on left)
                      console.log('third_if')
                      console.log('category_boundary_colour:'); console.log(category_boundary_colour)
                      console.log('colour_eachdot[currenttrial_t]:'); console.log(colour_eachdot[currenttrial_t])
                      correct.push('correct');
                      console.log('correct[numbertrials_elapsed]:'); console.log(correct[numbertrials_elapsed])
                      {reward_level_number+=increment}
                      reward_level_width=reward_level_number+"%"
                      console.log(reward_level_width)
                      $('#reward_level').css('width',reward_level_width)
                      document.getElementById("left_choice").style.border="5px solid black";

                    } else if (colour_eachdot[currenttrial_t]>=category_boundary_colour & (current_context.indexOf('colour') >= 0)){
                    //red is on right, they pressed left (blue), correct is red (on right)
                    console.log('fourth_if')
                    console.log('category_boundary_colour'); console.log(category_boundary_colour)
                    console.log('colour_eachdot[currenttrial_t]:'); console.log(colour_eachdot[currenttrial_t])
                    correct.push('incorrect');
                    console.log('correct[numbertrials_elapsed]:'); console.log(correct[numbertrials_elapsed])
                    document.getElementById("right_choice").style.border="5px solid black";
                    }

              } else if (last_pressed=='right'){
                console.log('getting in last pressed right')
                console.log('category_boundary_speed:'); console.log(category_boundary_speed)
                console.log('speed_eachdot[currenttrial_t]:'); console.log(speed_eachdot[currenttrial_t])
                console.log('category_boundary_colour:'); console.log(category_boundary_colour)
                console.log('colour_eachdot[currenttrial_t]:'); console.log(colour_eachdot[currenttrial_t])
                console.log( choicebutton_side_array[numbertrials_elapsed])

                  if (speed_eachdot[currenttrial_t]>=category_boundary_speed & (current_context.indexOf('speed') >= 0)){
                    //slow is on left, they pressed right, correct is fast (right)
                    console.log('fifth_if')
                    console.log('category_boundary_speed:'); console.log(category_boundary_speed)
                    console.log('speed_eachdot[currenttrial_t]:'); console.log(speed_eachdot[currenttrial_t])
                    correct.push('correct');
                    {reward_level_number+=increment}
                    reward_level_width=reward_level_number+"%"
                    console.log(reward_level_width)
                    $('#reward_level').css('width',reward_level_width)
                    console.log('correct[numbertrials_elapsed]:'); console.log(correct[numbertrials_elapsed])
                    document.getElementById("right_choice").style.border="5px solid black";

                  } else if (speed_eachdot[currenttrial_t]<category_boundary_speed & (current_context.indexOf('speed') >= 0)){
                  //slow is on left, they pressed right, correct is slow (left)
                  console.log('sixth_if')
                  console.log('category_boundary_speed:'); console.log(category_boundary_speed)
                  console.log('speed_eachdot[currenttrial_t]:'); console.log(speed_eachdot[currenttrial_t])
                  correct.push('incorrect');
                  console.log('correct[numbertrials_elapsed]:'); console.log(correct[numbertrials_elapsed])
                  $('#reward_level').css('width',reward_level_width)
                  document.getElementById("left_choice").style.border="5px solid black";

                    //colour
                } else if (colour_eachdot[currenttrial_t]<category_boundary_colour & (current_context.indexOf('colour') >= 0)){
                  //red is on right, they pressed right, correct is blue (on left)
                  console.log('seventh_if')
                  console.log('category_boundary_colour'); console.log(category_boundary_colour)
                  console.log('colour_eachdot[currenttrial_t]:'); console.log(colour_eachdot[currenttrial_t])
                  correct.push('incorrect');
                  console.log('correct[numbertrials_elapsed]:'); console.log(correct[numbertrials_elapsed])
                  document.getElementById("left_choice").style.border="5px solid black";

                } else if (colour_eachdot[currenttrial_t]>=category_boundary_colour & (current_context.indexOf('colour') >= 0)){
                  //red is on right, they pressed right, correct is red (right)
                    console.log('eighth_if')
                    console.log('category_boundary_colour'); console.log(category_boundary_colour)
                    console.log('colour_eachdot[currenttrial_t]:'); console.log(colour_eachdot[currenttrial_t])
                    correct.push('correct');
                    console.log('correct[numbertrials_elapsed]:'); console.log(correct[numbertrials_elapsed])
                    {reward_level_number+=increment}
                    reward_level_width=reward_level_number+"%"
                    console.log(reward_level_width)
                    $('#reward_level').css('width',reward_level_width)
                    document.getElementById("right_choice").style.border="5px solid black";
                  }

                };

                $('#right_choice').show();
                $('#left_choice').show();
                //$('#fourth_div').show()
                  // console.log(correct[numbertrials_elapsed])
                  // console.log(numbertrials_elapsed)
                  // console.log(reaction_times[numbertrials_elapsed])
                  // console.log(reaction_times)
                clearInterval(checktime);
                console.log("?response="+response+ "&rt="+reaction_times[numbertrials_elapsed]+"&trial_type="+ eventt+ "&currenttrial="+currenttrial_t+ "&numbertrials_elapsed="+numbertrials_elapsed+ "&speed_eachdot=" +speed_eachdot[currenttrial_t] + "&colour_eachdot=" +colour_eachdot[currenttrial_t]+ "&true_outcome_colour=" +true_outcome_colour[currenttrial_t]+ "&true_outcome_speed=" +true_outcome_speed[currenttrial_t]  + "&trialstart="+startTrialTime + "&choicebutton_side="+ choicebutton_side_array[numbertrials_elapsed] + "&choicemade_array="+ choicemade_array[currenttrial_t]+"&correct=" + correct[numbertrials_elapsed] + "&category_boundary_colour=" + category_boundary_colour + "&category_boundary_speed=" + category_boundary_speed +"&last_pressed=" +last_pressed+"&random_numbers_array="+random_numbers_array); //+"&speed_array_thistrial=" +speed_array_thistrial+"&rc_array_thistrial=" +rc_array_thistrial+"&rb_array_thistrial=" +rb_array_thistrial
                $.get("?response="+response+ "&rt="+reaction_times[numbertrials_elapsed]+"&trial_type="+ eventt+ "&currenttrial="+currenttrial_t+ "&numbertrials_elapsed="+numbertrials_elapsed+ "&speed_eachdot=" +speed_eachdot[currenttrial_t] + "&colour_eachdot=" +colour_eachdot[currenttrial_t]+ "&true_outcome_colour=" +true_outcome_colour[currenttrial_t]+ "&true_outcome_speed=" +true_outcome_speed[currenttrial_t]  + "&trialstart="+startTrialTime + "&choicebutton_side="+ choicebutton_side_array[numbertrials_elapsed] + "&choicemade_array="+ choicemade_array[currenttrial_t]+"&correct=" + correct[numbertrials_elapsed] + "&category_boundary_colour=" + category_boundary_colour + "&category_boundary_speed=" + category_boundary_speed +"&last_pressed=" +last_pressed+"&random_numbers_array="+random_numbers_array, function(response){});//+"&speed_array_thistrial=" +speed_array_thistrial+"&rc_array_thistrial=" +rc_array_thistrial+"&rb_array_thistrial=" +rb_array_thistrial
              };
                // deal with no response
                if(response=='noresp'){
                  console.log('NO RESPONSE')
                  clearInterval(checktime);
                  correct.push('buttontrial_noresp');
                  reaction_times.push('noresp');
                  console.log('correct[numbertrials_elapsed]:'); console.log(correct[numbertrials_elapsed])
                  console.log('numbertrials_elapsed'); console.log(numbertrials_elapsed)
                  // console.log(reaction_times[numbertrials_elapsed])
                  // console.log(reaction_times)
                  choicemade_array.push('noresp');
                  //console.log(choicemade_array[currenttrial_t]) //only doing this on button press trials, not the slider trials, so want from the current trial, not the number of trials right from the start...
                  console.log("?response="+response+ "&rt="+reaction_times[numbertrials_elapsed]+"&trial_type="+ eventt+ "&currenttrial="+currenttrial_t+ "&numbertrials_elapsed="+numbertrials_elapsed+ "&speed_eachdot=" +speed_eachdot[currenttrial_t] + "&colour_eachdot=" +colour_eachdot[currenttrial_t]+ "&true_outcome_colour=" +true_outcome_colour[currenttrial_t]+ "&true_outcome_speed=" +true_outcome_speed[currenttrial_t]  + "&trialstart="+startTrialTime + "&choicebutton_side="+ choicebutton_side_array[numbertrials_elapsed] + "&choicemade_array="+ choicemade_array[currenttrial_t]+"&correct=" + correct[numbertrials_elapsed] + "&category_boundary_colour=" + category_boundary_colour + "&category_boundary_speed=" + category_boundary_speed +"&last_pressed=" +last_pressed+"&random_numbers_array="+random_numbers_array);//+"&speed_array_thistrial=" +speed_array_thistrial+"&rc_array_thistrial=" +rc_array_thistrial+"&rb_array_thistrial=" +rb_array_thistrial
                  $.get("?response="+response+ "&rt="+reaction_times[numbertrials_elapsed]+"&trial_type="+ eventt+ "&currenttrial="+currenttrial_t+ "&numbertrials_elapsed="+numbertrials_elapsed+ "&speed_eachdot=" +speed_eachdot[currenttrial_t] + "&colour_eachdot=" +colour_eachdot[currenttrial_t]+ "&true_outcome_colour=" +true_outcome_colour[currenttrial_t]+ "&true_outcome_speed=" +true_outcome_speed[currenttrial_t]  + "&trialstart="+startTrialTime + "&choicebutton_side="+ choicebutton_side_array[numbertrials_elapsed] + "&choicemade_array="+ choicemade_array[currenttrial_t]+"&correct=" + correct[numbertrials_elapsed] + "&category_boundary_colour=" + category_boundary_colour + "&category_boundary_speed=" + category_boundary_speed +"&last_pressed=" +last_pressed+"&random_numbers_array="+random_numbers_array, function(response){});//+"&speed_array_thistrial=" +speed_array_thistrial+"&rc_array_thistrial=" +rc_array_thistrial+"&rb_array_thistrial=" +rb_array_thistrial
                }

                T4 =setTimeout(function() {
                  //set here so only increment if not a catch trial
                  if (eventt.indexOf('colour_inspeedblock')!=0 && eventt.indexOf('speed_incolourblock')!=0)
                      {console.log('not a catch trial');
                      console.log('currenttrial_t'); console.log(currenttrial_t)
                      currenttrial_t+=1;
                      numbertrials_elapsed+=1;
                      console.log('currenttrial_t after incrementing'); console.log(currenttrial_t)

                  } else {console.log('catch trial');
                          console.log('currenttrial_t'); console.log(currenttrial_t)
                          currenttrial_t+=1; //we took one off when ran the extra screen so that would give feedback based on the correct array. Now need to add again.
                          console.log('currenttrial_t after incrementing');console.log(currenttrial_t)
                  };

                  tnum=currenttrial_t;
                  trials_counter=num_blocktrials; //might want to change this?
                    var element = document.getElementById("trialcounter");
                    element.innerHTML='Completed: '+tnum+'/'+trials_counter

                    canProceed=true;

                    if (nottooslow==true)
                    {Proceed('next');}

                    else if (nottooslow==false)
                      {console.log('runtimeoutscreen');RunTimeoutScreen();};

                },outcomebuttonshow_duration); //time to show outcome for...
            };


  //Function to run what we want for the category boundary trials...
  RunBlockTrial=function(currenttrial_t){
              if (choicebutton_side_array[numbertrials_elapsed]==0){
                  current_context='speed';
              } else if (choicebutton_side_array[numbertrials_elapsed]==1){
                  current_context='colour';
              };
              console.log(current_context)

              nottooslow=true;
              $('#third_div').show();
              $('#fourth_div').show();
              canProceed = false;
              outcome_done=false; //set so they haven't entered a response yet...
              howlong=0; //how long the trial has run for...updating lower down...
              startTrialTime = new Date().getTime();   // trial start time for recording RT
              timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
              canRespondbuttons=false;
              choice_buttons(); //want the choice buttons to be on screen now for the whole trial...

              //Timeout for showing moving dots on each trial...
                  //on the context trials still want to show the moving dots, will just have to make sure we have the correct spread of variables
                  //so they can learn the category boundary and we can test the category boundary...
              var T1=setTimeout(function(){
                //console.log('moving_dots')
                $("#button_return_home").hide();
                $("#thanks").hide();
                $('#second_div').hide(); //hiding the instructions
                var ctx=document.getElementById('mycanvas');
                var cW=ctx.width, cH=ctx.height;
                //console.log(cW);
                flakes=[];
                addFlake(cW,cH);
                console.log(flakes[1])
                console.log('currenttrial_t:'); console.log(currenttrial_t)
                console.log('colour_eachdot[currenttrial_t]:'); console.log(colour_eachdot[currenttrial_t])
                console.log('speed_eachdot[currenttrial_t]:'); console.log(speed_eachdot[currenttrial_t])
                moving_dots(mean_speed,flakes);}
                ,moving_dots_start);

              //used to have timeout here for removing canvas on each trial and starting buttons, but all in moving dots or earlier now...

              //check the time every 100ms and if taking too long, then want to move on to next trial...
              checktime=setInterval(function(){
                //timeout for taking too long to enter on slider...
                currentTime = new Date().getTime();
                howlong = currentTime - startTrialTime;
                //console.log('inloop')
                  if (howlong-moving_dots_timeout>decisionlim && timeout_needed==true && outcome_done==false)
                      {save_choicebutton();
                       document.getElementById('button_text_para').innerHTML="TOO SLOW!!"
                       nottooslow=false;
                       canRespondbuttons=false;
                       $('#button_text_para').css('color','black');
                       $('#button_text_para').show();
                       outcomebuttons('noresp');
                       //RunTimeoutScreen();
                     };
                   }, 100);
  };


Run_ColourinSpeed_trial=function(currenttrial_t){
            //currenttrial_t+=-1; //going back to the speed of the trial we want to have the outcome information based on...
            console.log('currenttrial_t'); console.log(currenttrial_t)
            current_context='colour'; //overwriting what had from the choicebutton_side_array defining the context for the earlier part of this trial...
            nottooslow=true;
            $('#third_div').show();
            $('#fourth_div').show();
            canProceed = false;
            outcome_done=false; //set so they haven't entered a response yet...
            howlong=0; //how long the trial has run for...updating lower down...
            startTrialTime = new Date().getTime();   // trial start time for recording RT
            timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
            canRespondbuttons=true;
            console.log('currenttrial_t'); console.log(currenttrial_t)
            choice_buttons(); //want the choice buttons to be on screen now for the whole trial...

            //used to have timeout here for removing canvas on each trial and starting buttons, but all in moving dots or earlier now...

            //check the time every 100ms and if taking too long, then want to move on to next trial...
            checktime=setInterval(function(){
              //timeout for taking too long to enter on slider...
              currentTime = new Date().getTime();
              howlong = currentTime - startTrialTime;
              //console.log('inloop')
                if (howlong-moving_dots_timeout>decisionlim && timeout_needed==true && outcome_done==false)
                    {save_choicebutton();
                     document.getElementById('button_text_para').innerHTML="TOO SLOW!!"
                     nottooslow=false;
                     canRespondbuttons=false;
                     $('#button_text_para').css('color','black');
                     $('#button_text_para').show();
                     outcomebuttons('noresp');
                     //RunTimeoutScreen();
                   };
                 }, 100);
};

Run_SpeedinColour_trial=function(currenttrial_t){
            //currenttrial_t+=-1; //going back to the speed of the trial we want to have the outcome information based on...
            console.log('currenttrial_t'); console.log(currenttrial_t)
            current_context='speed';
            nottooslow=true;
            $('#third_div').show();
            $('#fourth_div').show();
            canProceed = false;
            outcome_done=false; //set so they haven't entered a response yet...
            howlong=0; //how long the trial has run for...updating lower down...
            startTrialTime = new Date().getTime();   // trial start time for recording RT
            timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
            canRespondbuttons=true;
            console.log('currenttrial_t'); console.log(currenttrial_t)
            choice_buttons(); //want the choice buttons to be on screen now for the whole trial...

            //used to have timeout here for removing canvas on each trial and starting buttons, but all in moving dots or earlier now...

            //check the time every 100ms and if taking too long, then want to move on to next trial...
            checktime=setInterval(function(){
              //timeout for taking too long to enter on slider...
              currentTime = new Date().getTime();
              howlong = currentTime - startTrialTime;
              //console.log('inloop')
                if (howlong-moving_dots_timeout>decisionlim && timeout_needed==true && outcome_done==false)
                    {save_choicebutton();
                     document.getElementById('button_text_para').innerHTML="TOO SLOW!!"
                     nottooslow=false;
                     canRespondbuttons=false;
                     $('#button_text_para').css('color','black');
                     $('#button_text_para').show();
                     outcomebuttons('noresp');
                     //RunTimeoutScreen();
                   };
                 }, 100);
};

//need to give different parameters now to choice buttons and outcomebuttons....
    //change the colour of the buttons and give outcome and saving correct or not based on speed parameters rather than colour parameters...

//function to shuffle the order of the trials presented to subjects...
  Array.prototype.shuffle = function() {
      var input = this;

      for (var i = input.length-1; i >=0; i--) {

          var randomIndex = Math.floor(Math.random()*(i+1));
          var itemAtIndex = input[randomIndex];

          input[randomIndex] = input[i];
          input[i] = itemAtIndex;
      }
      return input;
  }




  //Works out which type of trial we want, and then runs the appropriate function to do that...whether instructions or a trial of a particular type...
    function Proceed(e){
      	if (canProceed==true){ //can only go to the next event if haven't reached end screen, or are not in the middle of a trial...
          //console.log(numbertrials_elapsed)
          	// increment the event counter
        		if(e=='next'){currentevent+=1}
        		if(e=='previous'){currentevent-=1}
        		if(currentevent<0){currentevent=0} /*can't go to negative events*/

        		// get the name of the current event
        		eventt=String(event_array[currentevent])
        		console.log('event: ') /*just for us to keep track of where we are...*/
        		console.log(eventt)

        		//// Do current event
        		if (eventt.indexOf('instruct')==0){
              $('#button_continue').show()
              $('#button_previous').show()
              $('#instruct').show()
              $('#test_para').hide()
              $('#container').hide()
              $('#third_div').hide()
              $('#fourth_div').hide()
              $('#button_return_home').hide();
              $('#thanks').hide();
              $('#thanks1').hide();
              RunInstruct(eventt);

          } else if (eventt.indexOf('practicetrial_catboundary_colour')==0){
            if (eventt.indexOf('practicetrial_catboundary_colour-0')==0){
              currenttrial_t=0; //now it won't run from the start of the block of 80 or whatever, but it doesn't matter, as we want the trials counted on the screen to be correct...
              reward_level_number=0;
              increment=100/num_blocktrials;
              reward_level_width=reward_level_number+"%"
              $('#reward_level').css('width',reward_level_width)
              $('#reward_bar').show();
              //Reset all of the relevant arrays that we will be overwriting anyway, but don't want to get confused. Should be ok as we are saving trial by trial
              choicemade_array=[];
              //from the Positions_outcomebar function...
              true_outcome_speed=[];
              true_outcome_colour=[];
              //console.log('');
              MakeColourEachDot();
              colour_eachdot.shuffle(); //shuffling the values for the colours so unique to this block and subject.
              speed_eachdot.shuffle(); //shuffling the values for the speeds so unique to this block and subject.
            };

          $('#instruct').hide()
          $('#button_continue').hide()
          $('#button_previous').hide()
          $('#second_div').hide()
          $('#container').hide()
          $("#button_return_home").hide();
          $("#thanks").hide();
          //$('#fourth_div').show() //now we actually want to show the buttons...but maybe do after we have called the other functions to change the colour and position of the buttons on each trial?
          RunBlockTrial(currenttrial_t);

        } else if (eventt.indexOf('practicetrial_catboundary_speed')==0){
          if (eventt.indexOf('practicetrial_catboundary_speed-0')==0){
            currenttrial_t=0; //now it won't run from the start of the block of 80 or whatever, but it doesn't matter, as we want the trials counted on the screen to be correct...
            reward_level_number=0;
            increment=100/num_blocktrials;
            console.log('increment:'); console.log(increment)
            reward_level_width=reward_level_number+"%"
            $('#reward_level').css('width',reward_level_width)
            $('#reward_bar').show();
            //Reset all of the relevant arrays that we will be overwriting anyway, but don't want to get confused. Should be ok as we are saving trial by trial
            choicemade_array=[];
            //from the Positions_outcomebar function...
            true_outcome_speed=[];
            true_outcome_colour=[];
            //console.log('');
            MakeColourEachDot();
            colour_eachdot.shuffle(); //shuffling the values for the colours so unique to this block and subject.
            speed_eachdot.shuffle(); //shuffling the values for the speeds so unique to this block and subject.
            //Note that we might want to change other parameters to make it clear it's a colour trial??
          };

        $('#instruct').hide()
        $('#button_continue').hide()
        $('#button_previous').hide()
        $('#second_div').hide()
        $('#container').hide()
        $("#button_return_home").hide();
        $("#thanks").hide();
        //$('#fourth_div').show() //now we actually want to show the buttons...but maybe do after we have called the other functions to change the colour and position of the buttons on each trial?
        RunBlockTrial(currenttrial_t);

      } else if (eventt.indexOf('blocktrialcolour')==0){
              //if it's the first one in the block, we want to shuffle the colour array...
              if (eventt.indexOf('blocktrialcolour-0')==0){
                currenttrial_t=0;
                tnum=currenttrial_t;
                reward_level_number=0;
                increment=100/(num_blocktrials+num_catchtrials);
                reward_level_width=reward_level_number+"%"
                $('#reward_level').css('width',reward_level_width)
                $('#reward_bar').show();

                trials_counter= num_blocktrials
                  var element = document.getElementById("trialcounter");
                  element.innerHTML='Completed: '+tnum+'/'+trials_counter

                //Reset all of the relevant arrays that we will be overwriting anyway, but don't want to get confused. Should be ok as we are saving trial by trial
                choicemade_array=[];
                //from the Positions_outcomebar function...
                true_outcome_speed=[];
                true_outcome_colour=[];

                MakeColourEachDot();
                colour_eachdot.shuffle(); //shuffling the values for the colours so unique to this block and subject.
                speed_eachdot.shuffle(); //shuffling the values for the speeds so unique to this block and subject.
              };

              $('#instruct').hide()
        			$('#button_continue').hide()
        			$('#button_previous').hide()
              $('#second_div').hide()
              $('#container').hide()
              $("#button_return_home").hide();
              $("#thanks").hide();
              RunBlockTrial(currenttrial_t);


      } else if (eventt.indexOf('blocktrialspeed')==0){
              //if it's the first one in the block, we want to shuffle the colour array...
              if (eventt.indexOf('blocktrialspeed-0')==0){
                currenttrial_t=0;
                tnum=currenttrial_t;
                reward_level_number=0;
                increment=100/(num_blocktrials+num_catchtrials);
                reward_level_width=reward_level_number+"%"
                $('#reward_level').css('width',reward_level_width)
                $('#reward_bar').show();

                trials_counter= num_blocktrials
                  var element = document.getElementById("trialcounter");
                  element.innerHTML='Completed: '+tnum+'/'+trials_counter

                //Reset all of the relevant arrays that we will be overwriting anyway, but don't want to get confused. Should be ok as we are saving trial by trial
                choicemade_array=[];
                //from the Positions_outcomebar function...
                true_outcome_speed=[];
                true_outcome_colour=[];
                MakeColourEachDot();
                colour_eachdot.shuffle(); //shuffling the values for the colours so unique to this block and subject.
                speed_eachdot.shuffle(); //shuffling the values for the speeds so unique to this block and subject.
              };

              $('#instruct').hide()
              $('#button_continue').hide()
              $('#button_previous').hide()
              $('#second_div').hide()
              $('#container').hide()
              $("#button_return_home").hide();
              $("#thanks").hide();
              RunBlockTrial(currenttrial_t);

          } else if (eventt.indexOf('colour_inspeedblock')==0){
              currenttrial_t-=1;
              console.log('currenttrial_t:'); console.log(currenttrial_t);
              Run_ColourinSpeed_trial(currenttrial_t);

          } else if (eventt.indexOf('speed_incolourblock')==0){
                currenttrial_t-=1;
                console.log('currenttrial_t:'); console.log(currenttrial_t);
                Run_SpeedinColour_trial(currenttrial_t);

          } else if(eventt.indexOf('break')==0){
            $("#button_return_home").hide();
            $("#thanks").hide();
              RunBreak();
          } else if (eventt.indexOf('endscreen')==0){
              RunEndScreen();
            };
          };
        };

//Four types of blocks that we want to run:
      //Training blocks where they are just learning the category boundary
          //speed
//practicetrial_catboundary_speed-

//Want to run the cat boundary blocks. But the correct and the outcome needs to be adjusted for whether based on colour or speed
    //make another function for the correct etc for speed as well as for colour now...

          //colour
//practicetrial_catboundary_colour-


      //Testing blocks where:

          //we are testing on colour but probing on speed



          //we are testing on speed and probing on colour

/////////////////////////////////////////////////////////////////////////////////////////////
        //Button pressed functions...
                    //Function called whenever there is a 'keyup' event...
                      //Need to adjust KeyUp to have something when they are leaving the slider...
                    function KeyUp(e){
                    //console.log('KeyUp entered')
                    //console.log(e.keyCode)

                    //for the responses for the buttons...
                    if (canRespondbuttons==true && e.keyCode==39) { //39 is the keycode for right arrow press, need to put in instructions...
                        //console.log('pressed right')
                        last_pressed='right'
                        //reaction time
                          currentTime = new Date().getTime();
                          RT = currentTime - startTrialTime;
                          reaction_times.push(RT);
                        //make choice square flash;
                        //making it bigger and adjusting the size of the circle container similtaneously so all fits.
                            ///STILL NEED TO MOVE IT UP AT THE SAME TIME SO DOESN'T JUST GROW AT THE BOTTOM...
                        document.getElementById("right_choice").style.height="85%";document.getElementById("right_choice").style.width="45%";
                        document.getElementById("circle_container").style.width="0%";
                        save_choicebutton();

                        //Put the one they chose back to normal size
                        var T3=setTimeout(function(){
                          document.getElementById("right_choice").style.height="50%";document.getElementById("right_choice").style.width="30%";
                          document.getElementById("circle_container").style.width="0%";
                          },squareflashtime);

                        //As we want to flash what they chose first, we don't want the outcome to happen straight away...
                        var T4=setTimeout(function(){
                              outcomebuttons('responded');
                          },showsubjectchoicetime);

                        timeout_needed=false;

                    } else if (canRespondbuttons==true && e.keyCode==37 ) { //37 is the code for left arrow, need to put in instructions...
                      //console.log('pressed left')
                      last_pressed='left'
                      //reaction time
                        currentTime = new Date().getTime();
                        RT = currentTime - startTrialTime;
                        reaction_times.push(RT);
                      save_choicebutton();

                      //make choice square flash;
                      //making it bigger and adjusting the size of the circle container similtaneously so all fits.
                          ///STILL NEED TO MOVE IT UP AT THE SAME TIME SO DOESN'T JUST GROW AT THE BOTTOM...
                      document.getElementById("left_choice").style.height="85%";document.getElementById("left_choice").style.width="45%";
                      document.getElementById("circle_container").style.width="0%";

                      //Put the one they chose back to normal size
                      var T3=setTimeout(function(){
                        document.getElementById("left_choice").style.height="50%";document.getElementById("left_choice").style.width="30%";
                        document.getElementById("circle_container").style.width="0%";
                        },squareflashtime);

                      //As we want to flash what they chose first, we don't want the outcome to happen straight away...
                      var T4=setTimeout(function(){
                            outcomebuttons('responded');
                        },showsubjectchoicetime);

                      timeout_needed=false;
                    };
                };

////////////////////////////////////////////////////////////////////////////////////////////
  //From Jonathan...
  function requestFullScreen(element) {
                        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
                        if (requestMethod) {
                            requestMethod.call(element);
                            //console.log('first if request full screen')
                            if (canrunfirstthing==true)
                            {first_thing(); canrunfirstthing=false;};
                        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                            var wscript = new ActiveXObject("WScript.Shell");
                            if (wscript !== null) {
                                wscript.SendKeys("{F11}");
                            first_thing();
                            }
                        }
                    }

                          //When the website loads, this is the first thing that is called...
                            $(document).ready(function(){
                              //console.log('in document ready')
                              $("#full_screen_button" ).click(function(){requestFullScreen(containing_container)});
                              $("#containing_container").hide();
                            });

  function first_thing(){
                        //console.log('first_thing')
                        $("#still_motion_dots").hide();
                        //set the min and max width of the containing container to be equal to the window...
                        $("#containing_container").css('min-width',$(window).width());
                        $("#containing_container").css('max-width',$(window).width());

                        //add functions that get called by key presses or button presses
                            $("#button_continue" ).click(function() {canProceed=true; Proceed('next');});
                            $("#button_previous" ).click(function() {canProceed=true;Proceed('previous');});
                            $(document).bind('keyup',KeyUp); //someone pressed enter??

                          //add mouse click for the slider
                          $("#slidebar").dblclick(function() {slidebar_dblclick();});

                          $('#progress_div').show()
                            canProceed=true;
                          $("#containing_container").show();

                          MakeColourEachDot(); //make the dot colours so can use for the practice and demo trials...

                            Proceed('next'); //We want to go to Proceed next as the first thing that happens when we load page...

                };



//generate random numbers to assign extra catch screen to some of the trials...
