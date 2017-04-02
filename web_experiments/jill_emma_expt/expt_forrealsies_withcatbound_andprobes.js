
//Cleaned up version of expt_4realsies, with added blocks for the category boundary and the other stuff...

/*parameters need for expt*/
var flakes=[]; //array will fill with dots later...
var num_dots=200; //number of dots on screen at any time...
var outcome_done=false; //this gets changed to true when they press enter for their response and we show the outcome...
var canRespondslider=false; //can set this so only true when in loop for slider...
var canRespondbuttons=false;
var Isprobetrial=false;
var last_pressed='none';
var slider_startposition=0;
var slider_startposition_array=[];
// Counters
var currentevent = 0
var currenttrial_t = 0 //this is the counter for the training block trials...
var block1trials_t=0 //this is the counter for the block 1 category boundary trials...
var checktime=setInterval(function(){},100); //how often we loop over and check how long the trial is taking. If too long then it times out and we move to the next trial...

/*create event array*/
var total_instruction_screens=3;
var num_slidertrainingtrials=3;
var num_block1trials=2; //category boundary block trials...
var num_probetrials=2; //probe trials- slider but without feedback...
var num_trials=num_slidertrainingtrials+num_block1trials+num_probetrials;
var reaction_times=[];
var event_array=[];
  for (i = 0; i <total_instruction_screens; i++) {
  	var event_array = event_array.concat('instruct-'+i.toString())
  }
  for (i=0;i<num_slidertrainingtrials;i++){
      var event_array=event_array.concat('trainingtrial-'+i.toString())
      /*can have different event functions and then call the different functions related to those event types when get to this...*/
  }
  for (i=0;i<num_block1trials;i++){
      var event_array=event_array.concat('block1trial-'+i.toString())
      /*can have different event functions and then call the different functions related to those event types when get to this...*/
  }
  for (i=0;i<num_probetrials;i++){
      var event_array=event_array.concat('probetrial-'+i.toString())
      /*can have different event functions and then call the different functions related to those event types when get to this...*/
  }

  //variables to give a lifetime to the dots so they die a natural death after a random interval...
  var minlife=10;
  var maxlife=60;
  var liferange=maxlife-minlife;

  var eventt = event_array[0] //setting this, will use and increment later...
  console.log(event_array)

  //difficulty variables
  var colour_difficulty=0.2; //difficulty measure...
  var colour_spread=20; //std dev of Gaussian from which colour for individual dots is drawn...
  var sspread=0.1; //std dev of Gaussian from which speed for individual dots is drawn...
  var mean_speed=30; //how fast reanimate...

  //initialising variables
  var context='blah'; //don't actually need to show context with our new expt- will just have colour, not colour and speed...
  var choicebutton_side_array=[]; //0 for red on left, 1 for blue on right, from choicebutton_side.js...
  for (i=0;i<num_trials;i++){
    choicebutton_side_array.push(choicebutton_side[i])
  };
  console.log(choicebutton_side_array)
  var position_outcomebar_array=[]; //where the outcome bar should be positioned on the outcome slider...
  var colour_eachdot=[];
  var speed_eachdot=[];
    for (i = 0; i <num_trials; i++) {
      var colour_tmp=(0.5+rb_array[i]*0.5*colour_difficulty/1000); //transforming the input from rb_array
      var speed_tmp=1.5+speed_array[i]/2000; //transforming the input from speed_array
      colour_eachdot.push(colour_tmp); //actually probably want to set these and then work back to what the colour and speed values will be...
      speed_eachdot.push(speed_tmp);
    };

  var colour_range=math.max(colour_eachdot)-math.min(colour_eachdot);
  var speed_range=math.max(speed_eachdot)-math.min(speed_eachdot);

  var category_boundary_block1=math.min(colour_eachdot)+colour_range/2; //putting the category boundary at 50% for now...

  //working out what the outcome position of the bar should be on slider based on the colour and speed variables and the range...
  for (i=0;i<num_trials;i++){
    var outcome_position_speed_tmp=(speed_eachdot[i]-math.min(speed_eachdot))*100/speed_range; //
    var outcome_position_colour_tmp=(colour_eachdot[i]-math.min(colour_eachdot))*100/colour_range;//
    console.log(outcome_position_speed_tmp);
    console.log(outcome_position_colour_tmp);
    if (context_array[i]=='SPEED'){position_outcomebar_array.push(outcome_position_speed_tmp)} //saving where we are in colour spectrum to show outcome later...
    else if (context_array[i]=='COLOUR'){position_outcomebar_array.push(outcome_position_colour_tmp)} //saving where we are in speed spectrum to show outcome later...
  };

  //Timings- might not need all of these??
  var decisionlim = 8000 // not currently using...
  var ITI = 3000 //not sure if using...
  var startTrialTime = 0; //using
  var contextscreen_start=0; //1000 how long after trial starts the context screen is started...using
  var moving_dots_start=1000; //3000 using
  var moving_dots_timeout=5000; //5000 using
  var time_toenterslider=5000; //using-how long they have to enter their choice on the slider on each trial before timeout...
  var outcomebarshow_duration=2000; //using-how long to show the outcome bar for...
  var outcomebuttonshow_duration=2000;
  var howlong=0; //how long the trial has been running-updating using checktime...
  var intertrial_interval_probes=1000; //intertrial interval after they entered their response on the probe trials...
  var showsubjectchoicetime=2000;
  var squareflashtime=500;
  /////////////////// INTRUCTIONS //////////////////////////////
  function RunInstruct(event){
  	var currentnumber = parseInt(event.split('-')[1])// get number
  	console.log(currentnumber)

      //// Welcome Screen
      	if(currentnumber==1){
      		document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p>In this study you will...</p>'

      //// Display first trial screen
      	}else if(currentnumber==2){
      		document.getElementById('instruct').innerHTML='<p>On each trial you will...</p>'

      	}else if(currentnumber==3){
      		document.getElementById('instruct').innerHTML='<p>One is .</p>'

      	}else if(currentnumber==4){
      		document.getElementById('instruct').innerHTML='<p>The second thing you should consider though, is...</p>'

      	}else if(currentnumber==5){
      		document.getElementById('instruct').innerHTML='<p>You have a few seconds to make your decision. If you have made your choice, you can then enter your response using the button box. </p>'

      	}else if(currentnumber==6){
      		document.getElementById('instruct').innerHTML = 'Once you have entered your response the computer highlights your choice (show box around choice). '
      		document.getElementById('mag_right').style.border = '.2em solid black';
        }
      }

///////////////////////////////////////////////////////////////////////////////
//Functions defined that we are then stepping through and using when we run the trial...

  //Function for changing the content of context screen and displaying...
  //don't need for now as only having colour, not colour and speed...
  /*
    Context_screen=function(context){
    if (context=='COLOUR')
      //{function fColour()
      {
      console.log('getting_inCOLOUR')
      document.getElementById('test_para').innerHTML="COLOUR";
      document.getElementById('leftofslider_text').innerHTML="red"; //might be other way around and therefore may need to change later...
      document.getElementById('rightofslider_text').innerHTML="blue";
      $('#test_para').show();}
    else if (context=='SPEED')
      //{function fSpeed()
      {
      console.log('getting_inSPEED')
      document.getElementById('test_para').innerHTML="SPEED";
      document.getElementById('leftofslider_text').innerHTML="slow"; //might be other way around and therefore may need to change later...
      document.getElementById('rightofslider_text').innerHTML="fast";
      $('#test_para').show();}
    };
    */

    //Functions for the moving dots...
      //Function to push a new snowflake to the flakes array
    function addFlake(cW,cH){
        //console.log(currenttrial_t)
        //console.log(colour_eachdot[currenttrial_t])
        //console.log(speed_eachdot[currenttrial_t])
        for (i=0;i<num_dots;i++){
              var x=Math.floor(Math.random() * cW) + 1;
              //var y=cH/4;
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

                  if (i==num_dots){
                  console.log(flakes[1]);
                    };
            //console.log(flakes[1].ext);
          }; //for if loop
    }; /*for addFlake*/

      //Function to make the moving dots...
    var moving_dots=function(mean_speed, flakes){
        console.log('here')
          /*want to initialise the canvas and create variables related to it to use dimensions below...*/
          function initCanvas(){
            var ctx=document.getElementById('mycanvas').getContext('2d');
            var cW=ctx.canvas.width, cH=ctx.canvas.height;
            /*cut canvas to be a circle*/
            var radius_canvas=Math.min(cW/4,cH/4);
              function clipCanvas(){
                ctx.beginPath();
                ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,radius_canvas,0,Math.PI*2, false);
                ctx.clip();
              };

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
                  ctx.arc(flakes[i].x,flakes[i].y+=flakes[i].s, 2,0,Math.PI*2, false); /*adding to the y position to get downwards movement*/
                  ctx.closePath();
                  ctx.fill(); /*or could use .fillRect() but it needs 4 inputs...*/

                  /*remove snowflakes after move off canvas*/
                  /*can change to remove after a certain random time period...*/
                  /*or remove if they go outside certain area...*/
                  if (flakes[i].y>3*cH/4) {
                        flakes[i].y=cH/4;
                        flakes[i].x=Math.floor(Math.random() * cW) + 1;
                  } /*for if loop*/

                 /*if (flakes[i].ext<=0) //deal with flakes that have died from old age...
                    {
                      flakes[i].y=cH/4;
                      flakes[i].x=Math.floor(Math.random() * cW) + 1;
                      //flakes.splice(i,1);
                      //console.log('spliced');
                    } //for if loop */

                } /*for for loop*/

              } /*for snow*/

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
          setTimeout(function(){clearInterval(animateInterval); }, moving_dots_timeout); //need this here???
        }; /*for initCanvas*/
              initCanvas();
    }; /* for moving_dots*/



///////////////////////////////////////////////////////////////////////////////
//Functions for the slider bar
      //Function to show the slider and get people's responses...
    var slider=function(){
      console.log('in_slider')
      $("#outcomebar").css("left","0%"); //reset so we can reposition later...just trying, not sure if needed...
      $("#outcomebar").hide(); //hide this till we want to show the outcome...
      $("#slider").css("left","0%");  //reset position for slidebar...
      $('#container').show();
      canRespondslider=true;

      //here we want to change so that the slidebar moves along with left and right arrow keys rather than the draggable function
        //When the key is held down, move along. When key up, stop. Two loops depending on whether going left or right...
      //Call KeyDown function here...

      $("#slider").draggable({containment: "#slidebar",axis: "x", scroll: false, disabled: false, //might not need scroll:false...the axis:"x" just contrains movement in x axis?
         drag: function() {
             var position = $(this).position();
             var xPos = position.left;
             $('#participantOffer > span').text(xPos);
        }
      });
    };

//KeyDown function for the slider bar- moving left or right with the arrow keys...
  var slider_moveright;
  var slider_moveleft;
  var pressed_left = false; //want this so it will only call the function the first time the KeyDown is called, not continuously recall the function...
  var pressed_right = false;

  $('#slider').slider();
      // function KeyDown(e){
      //   var slider_position=0;
      //   console.log('in KeyDown')
      //   console.log(canRespondslider)
      //   console.log(e.keyCode)

        // //left arrow
        // if (canRespondslider==true && e.keyCode==37) {
        //     console.log('left arrow key down')
        //     if(pressed_left==false){ //only start animation once
        //         console.log('left arrow animation loop')
        //         width = $('#slidebar').width();
        //         slider_position=slider_position+10;
        //         slider_moveleft=setInterval(function()
        //           {$('#slider').slider( "value",50);
        //             //allow the user the move the div over the whole doc (left: '-=' + width)
        //             //{"margin-left":"-=10%"}, "fast"); //left arrow key
        //           },200)
        //     //console.log('still_animating')
        //       pressed_left = true;
        //     };
        //   //right arrow
        // } else if (canRespondslider==true && e.keyCode==39) {
        //     console.log('right arrow key down')
        //     if(pressed_right==false){ //only start animation once
        //         console.log('right arrow animation loop')
        //         var position = $('#slider').position();
        //         var left=position.left;
        //         console.log(left)
        //         slider_moveright=setInterval(function()
        //           { //check position of slider, if going to go near edge, then move 0%
        //             var position = $('#slider').position();
        //             var left=position.left;
        //
        //             $('#slider').animate(
        //             //allow the user the move the div over the whole doc (left: '-=' + width)
        //             {"margin-left":"+=10%"}, "fast"); //left arrow key
        //
        //
        //           },200)
        //     //console.log('still_animating')
        //       pressed_right = true;
        //
        //       };
        //
        //     };

        // };

            //.keyup(function(){

    //$('div').stop(); // stop the current animation
  //  pressed = false;
//});


          //var position = $("#slider").position();
          //var xPos=position.left; //add to this--see how moving dots does it...
          //xPos+="1px";
    /*      console.log('left arrow key down')

          var diff=1;
          var xpos=document.getElementById("slider").style.left;
          var max_x=$('#slidebar').width()-$('#slider').width();

          if (xpos>=max_x){
            diff=0;
          };

          setInterval(function() {
              addLeft(diff);
            },200);




        //right arrow
      } else if (canRespondbuttons==true && e.keyCode==39 ) {

        }
      };

      //Code from online to move the slider bar using the arrow keys...
      var addLeft = function(diff) {
        $('#slider').css("left", ($('#slider').position().left + diff) + "px");
        //if using tracked position:
        //   left += diff;
        //   $mover.css("left", left) + "px");
    };
*/

      //Function to save the slidebar position when the subject pressed enter
        //Called in Enter_slider function above...
      var slideposition_array=[];
      var save_slideposition=function(){
        var sliderposition_tmp=$("#slider").position();
        slideposition_array.push(sliderposition_tmp);
      };

      //Function to show outcome for slider bar based on their response
      //...ALSO proceeds to the next trial...(proceed next after outcomebarshow_duration...)
      var outcomeslider=function(response){
          outcome_done=true;
          console.log(outcome_done)
          console.log(position_outcomebar_array[currenttrial_t])
          var left_pos=position_outcomebar_array[currenttrial_t]+"%"
          $("#outcomebar").css("margin-left",left_pos) //position_outcomebar_array[currenttrial_t] need to turn this into a value...
          $("#outcomebar").show();

          // deal with no response
          if(response=='noresp'){
            console.log('NO RESPONSE')
            clearInterval(checktime);
          }
          //log that they responded
          if (response=='responded'){
            console.log('RESPONDED')
          }

          T4 =setTimeout(function() {
            {currenttrial_t+=1}
              Proceed('next');
          },outcomebarshow_duration); //time to show outcome bar for...
      };

  //Calls this function on probe trials, when we want to proceed to the next one but not show an outcome...
      var respondedslider_probetrial=function(response){
          outcome_done=true;
          console.log(outcome_done)
          console.log(position_outcomebar_array[currenttrial_t])

          // deal with no response
          if(response=='noresp'){
            console.log('NO RESPONSE')
            clearInterval(checktime);
          }
          //log that they responded
          if (response=='responded'){
            console.log('RESPONDED')
          }

          T4 =setTimeout(function() {
            {currenttrial_t+=1}
              Proceed('next');
          },intertrial_interval_probes); //time to show outcome bar for...
      };

///////////////////////////////////////////////////////////////////////////////
//Functions for the outcome buttons (category boundary trials...)
  //Function to show the choice buttons and allow subjects to choose...
  function choice_buttons(){
        canRespondbuttons=true;
        //need to add the other things want to hide/show on the screen here...
        //things to show

        //change the side of the screen the red and blue choice appears on...
            //0 for red on left, 1 for blue on right, from choicebutton_side.js...
            console.log(choicebutton_side_array[currenttrial_t]);
          if (choicebutton_side_array[currenttrial_t]==0){
              console.log('left=red');
              document.getElementById("left_choice").style.background="red";
              document.getElementById("left_choice").style.backgroundClip="content-box";
              document.getElementById("right_choice").style.background="blue";
              document.getElementById("right_choice").style.backgroundClip="content-box";
          }else if(choicebutton_side_array[currenttrial_t]==1){
              console.log('left=blue');
              document.getElementById("left_choice").style.background="blue";
              document.getElementById("left_choice").style.backgroundClip="content-box";
              document.getElementById("right_choice").style.background="red";
              document.getElementById("right_choice").style.backgroundClip="content-box";
          };

        //At this stage we don't want to show the outcome border...only add this in later...
        //remove border colour here...
        document.getElementById("left_choice").style.border="5px solid transparent";
        document.getElementById("right_choice").style.border="5px solid transparent";

        $('#fourth_div').show()
        $('#outcome_circle').hide()
        $('#left_choice').show()
        $('#right_choice').show()

        //things to hide...
      };

  //Function to save the subject's choice in an array...
    var choicemade_array=[];
    function save_choicebutton(){
        choicemade_array.push(last_pressed);
        console.log(choicemade_array)
        console.log(currenttrial_t)
        console.log(choicemade_array[currenttrial_t])
    };

  //Function to show the outcome based on their response and what is correct for that trial...
    //Now changing so just showing the border around the correct one rather than the outcome circle...
      //Just depends on what is correct and which side that colour is on, not what they chose anymore...
    var correct=[];
    var outcomebuttons=function(response){
          outcome_done=true;
          //log that they responded
      if (response=='responded'){
            console.log('RESPONDED')
            console.log(outcome_done)
            console.log(colour_eachdot[currenttrial_t])
            console.log(category_boundary_block1)
            console.log(choicebutton_side_array[currenttrial_t])
            console.log(last_pressed)
          //correct.push()
          //need to first change the colour of the outcome circle here based on their choice and the correct answer

          //Changing here now so just putting the outcome border around, but not showing the outcome circle anymore.
          //This doesn't depend on their answer, but we still want to log whether they were correct or not, which does depend on these other things...
              //Could also work out whether they were correct or not later, but ok to leave here as already set up...
         if (last_pressed=='left'){
           console.log('getting in last pressed left')
                if (colour_eachdot[currenttrial_t]>=category_boundary_block1 & choicebutton_side_array[currenttrial_t]==0){
                //red is on left, they pressed left, correct is red
                  console.log('first_if')
                  correct.push('correct');
                  //highlight correct one, which is red, which is on left
                  document.getElementById("left_choice").style.border="5px solid black"; //need to turn off for next trial...
                  //document.getElementById("outcome_circle").style.background = "green"; //change css of outcome circle here to green

                } else if (colour_eachdot[currenttrial_t]<category_boundary_block1 & choicebutton_side_array[currenttrial_t]==0){
              //red is on left, they pressed left, correct is blue (which is on right)
                console.log('second_if')
                correct.push('incorrect');
                document.getElementById("right_choice").style.border="5px solid black";

              } else if (colour_eachdot[currenttrial_t]<category_boundary_block1 & choicebutton_side_array[currenttrial_t]==1){
              //red is on right, they pressed left, correct is blue (on left)
                console.log('third_if')
                correct.push('correct');
                document.getElementById("left_choice").style.border="5px solid black";

              } else if (colour_eachdot[currenttrial_t]>=category_boundary_block1 & choicebutton_side_array[currenttrial_t]==1){
              //red is on right, they pressed left, correct is red (on right)
              console.log('fourth_if')
              correct.push('incorrect');
              document.getElementById("right_choice").style.border="5px solid black";
              }

        } else if (last_pressed=='right'){
          console.log('getting in last pressed right')
          console.log(colour_eachdot[currenttrial_t])
          console.log(category_boundary_block1)
          console.log(choicebutton_side_array[currenttrial_t])

            if (colour_eachdot[currenttrial_t]>=category_boundary_block1 & choicebutton_side_array[currenttrial_t]==0){
              //red is on left, they pressed right, correct is red (left)
              console.log('fifth_if')
              correct.push('incorrect');
              document.getElementById("left_choice").style.border="5px solid black";

            } else if (colour_eachdot[currenttrial_t]<category_boundary_block1 & choicebutton_side_array[currenttrial_t]==0){
            //red is on left, they pressed right, correct is blue (right)
            console.log('sixth_if')
            correct.push('correct');
            document.getElementById("right_choice").style.border="5px solid black";

          } else if (colour_eachdot[currenttrial_t]<category_boundary_block1 & choicebutton_side_array[currenttrial_t]==1){
            //red is on right, they pressed right, correct is blue (on left)
            console.log('seventh_if')
            correct.push('incorrect');
            document.getElementById("left_choice").style.border="5px solid black";

          } else if (colour_eachdot[currenttrial_t]>=category_boundary_block1 & choicebutton_side_array[currenttrial_t]==1){
            //red is on right, they pressed right, correct is red (right)
              console.log('eigth_if')
              correct.push('correct');
              document.getElementById("right_choice").style.border="5px solid black";
            }

          };

          $('#right_choice').show();
          $('#left_choice').show();
          //$('#fourth_div').show()
        };
          // deal with no response
          if(response=='noresp'){
            console.log('NO RESPONSE')
            clearInterval(checktime);
            choicemade_array.push('noresp');
            console.log(choicemade_array)
          }

          T4 =setTimeout(function() {
            {currenttrial_t+=1}
              Proceed('next');
          },outcomebuttonshow_duration); //time to show outcome bar for...
      };

//////////////////////////////////////////////////////////////////////////////////////////
//Functions to actually run the trial and proceed to the next step...

  //Function to draw circle on the canvas
  canvas_circle=function(){
      var ctx=document.getElementById('mycanvas').getContext('2d');
      var cW=ctx.canvas.width, cH=ctx.canvas.height;
      var radius_canvas=Math.min(cW/4,cH/4);
      //ctx.save();
      ctx.clearRect(0,0,cW,cH);
      /*cut canvas to be a circle*/
      ctx.beginPath();
      ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,radius_canvas,0,Math.PI*2, false);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.restore();
    };

  //Function to step through the timing loops for all the screens on a single trial...
  RunTrainingTrial=function(currenttrial_t){
    Isprobetrial=false;
    // trial start time for recording RT
    outcome_done=false; //set so they haven't entered a response yet...
    howlong=0;
    startTrialTime = new Date().getTime();
    timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
    canRespondslider=false;
    canRespondbuttons=false;

    //Timeout for showing context screen on each trial...
      /*var T0=setTimeout(function(){console.log(context_array[currenttrial_t])
      $('#second_div').show(); Context_screen(context_array[currenttrial_t]);},contextscreen_start);*/

    //Timeout for showing moving dots on each trial...
      var T1=setTimeout(function(){
      console.log('moving_dots')
      $('#second_div').hide();
      /*var canv = document.createElement('canvas');
      canv.id = 'mycanvas';
      var objTo = document.getElementById('third_div');
      objTo.appendChild(canv);
      $('#mycanvas').css("width", "80%", "height","40%"); //"background","#036", "border","blue 5px solid","background-color", "red","border-radius", "300px"
      */
      var ctx=document.getElementById('mycanvas');
      var cW=ctx.width, cH=ctx.height;
      console.log(cW);
      console.log('moving_dots_again')
      flakes=[];
      addFlake(cW,cH);
      console.log(flakes[1])
      moving_dots(mean_speed, flakes);}
      ,moving_dots_start);

    //Timeout for removing the canvas when moving dots finishes on each trial and starting slider...
      var T2=setTimeout(function(){
        //change the colour of the canvas circle to grey:
        canvas_circle();
        //var oldcanv = document.getElementById('mycanvas'); oldcanv.remove();
        document.getElementById('participantOffer').innerHTML="Move slider using left and right arrow keys and press enter to save choice";
        //Move the sliderbar to a random start position on each trial:
        slider_startposition=Math.random()*100 + "%"
        slider_startposition_array.push(slider_startposition); //to save the random start position we will use for the slider bar...
        $("#slider").css("margin-left",slider_startposition)
        slider(); ///when someone presses enter, then proceed to the next trial...
        }
        ,moving_dots_timeout);

    //check the time every 100ms and if taking too long, then want to move on to next trial...
      checktime=setInterval(function(){
      //timeout for taking too long to enter on slider...
      var currentTime1 = new Date().getTime();
      howlong = currentTime1 - startTrialTime;
      //console.log('inloop')
        if (howlong-moving_dots_timeout>time_toenterslider && timeout_needed==true && outcome_done==false)
            {save_slideposition();
             document.getElementById('participantOffer').innerHTML="TOO SLOW!!"
             $('#participantOffer').show();
             outcomeslider('noresp');
           };
         }, 100);
  };

//Function to run what we want for the category boundary trials...
RunBlock1Trial=function(block1trials_t){
  Isprobetrial=false;
  outcome_done=false; //set so they haven't entered a response yet...
  howlong=0; //how long the trial has run for...updating lower down...
  startTrialTime = new Date().getTime();
  timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
  canRespondslider=false;
  canRespondbuttons=false;
  //add functions that get called by key presses or button presses
      //add here for the new set up-- look at what Chris had in his...
  //$(document).bind('keyup',Pressedleft); //don't need now that have buttons...
  //$(document).bind('keyup',Pressedright); //don't need now that have buttons...

  //Timeout for showing moving dots on each trial...
      //on the context trials still want to show the moving dots, will just have to make sure we have the correct spread of variables
      //so they can learn the category boundary and we can test the category boundary...
  var T1=setTimeout(function(){
    console.log('moving_dots')
    $('#second_div').hide();
    var canv = document.createElement('canvas');
    canv.id = 'mycanvas';
    var objTo = document.getElementById('third_div');
    objTo.appendChild(canv);
    $('#mycanvas').css("width", "80%", "height","40%"); //"background","#036", "border","blue 5px solid","background-color", "red","border-radius", "300px"
    var ctx=document.getElementById('mycanvas');
    var cW=ctx.width, cH=ctx.height;
    console.log(cW);
    console.log('moving_dots_again')
    flakes=[];
    addFlake(cW,cH);
    console.log(flakes[1])
    moving_dots(mean_speed, flakes);}
    ,moving_dots_start);

  //Timeout for removing the canvas when moving dots finishes on each trial and starting slider...
  var T2=setTimeout(function(){var oldcanv = document.getElementById('mycanvas'); oldcanv.remove();
      choice_buttons();
      //document.getElementById('participantOffer').innerHTML="Drag slider using mouse and press enter to save choice";
      //slider(); ///when someone presses enter, then proceed to the next trial...
      }
      ,moving_dots_timeout);

  //check the time every 100ms and if taking too long, then want to move on to next trial...
  checktime=setInterval(function(){
    //timeout for taking too long to enter on slider...
    var currentTime1 = new Date().getTime();
    howlong = currentTime1 - startTrialTime;
    //console.log('inloop')
      if (howlong-moving_dots_timeout>time_toenterslider && timeout_needed==true && outcome_done==false)
          {save_slideposition();
           document.getElementById('participantOffer').innerHTML="TOO SLOW!!"
           $('#participantOffer').show();
           outcomebuttons('noresp');
         };
       }, 100);
};


//Function to run what we want for the probe trials...
RunProbeTrial=function(currenttrial_t){
  // trial start time for recording RT
  Isprobetrial=true;
  outcome_done=false; //set so they haven't entered a response yet...
  howlong=0;
  startTrialTime = new Date().getTime();
  timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
  canRespondslider=false;
  canRespondbuttons=false;

  //Timeout for showing moving dots on each trial...
    var T1=setTimeout(function(){
    console.log('moving_dots')
    $('#second_div').hide();
    var canv = document.createElement('canvas');
    canv.id = 'mycanvas';
    var objTo = document.getElementById('third_div');
    objTo.appendChild(canv);
    $('#mycanvas').css("width", "80%", "height","40%"); //"background","#036", "border","blue 5px solid","background-color", "red","border-radius", "300px"
    var ctx=document.getElementById('mycanvas');
    var cW=ctx.width, cH=ctx.height;
    console.log(cW);
    console.log('moving_dots_again')
    flakes=[];
    addFlake(cW,cH);
    console.log(flakes[1])
    moving_dots(mean_speed, flakes);}
    ,moving_dots_start);

  //Timeout for removing the canvas when moving dots finishes on each trial and starting slider...
    var T2=setTimeout(function(){var oldcanv = document.getElementById('mycanvas'); oldcanv.remove();
      document.getElementById('participantOffer').innerHTML="Move slider using left and right arrow keys and press enter to save choice";
      slider_startposition=Math.random()*100 + "%"
      slider_startposition_array.push(slider_startposition); //to save the random start position we will use for the slider bar...
      $("#slider").css("margin-left",slider_startposition)
      slider(); ///when someone presses enter, then proceed to the next trial...
      }
      ,moving_dots_timeout);

  //check the time every 100ms and if taking too long, then want to move on to next trial...
    checktime=setInterval(function(){
    //timeout for taking too long to enter on slider...
    var currentTime1 = new Date().getTime();
    howlong = currentTime1 - startTrialTime;
    //console.log('inloop')
      if (howlong-moving_dots_timeout>time_toenterslider && timeout_needed==true && outcome_done==false)
          {save_slideposition();
           document.getElementById('participantOffer').innerHTML="TOO SLOW!!"
           $('#participantOffer').show();
           respondedslider_probetrial('noresp'); ///EMMA CHANGE
         };
       }, 100);
};




//Works out which type of trial we want, and then runs the appropriate function to do that...whether instructions or a trial of a particular type...
  function Proceed(e){
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
      			RunInstruct(eventt);
            $('#button_continue').show()
            $('#button_previous').show()
            $('#instruct').show()
            $('#test_para').hide()
            $('#container').hide()
            $('#fourth_div').hide()
      		} else if (eventt.indexOf('trainingtrial')==0){
      			$('#instruct').hide()
      			$('#button_continue').hide()
      			$('#button_previous').hide()
            $('#second_div').hide()
            $('#container').hide()
            $('#fourth_div').hide()
            console.log('elseif run training')
      			RunTrainingTrial(currenttrial_t); //note that RunTrial needs to call Proceed next when someone responds to slider
          } else if (eventt.indexOf('block1trial')==0){
            $('#instruct').hide()
      			$('#button_continue').hide()
      			$('#button_previous').hide()
            $('#second_div').hide()
            $('#container').hide()
            $('#fourth_div').hide()
            console.log('elseif run block1')
            RunBlock1Trial(currenttrial_t);
          } else if (eventt.indexOf('probetrial')==0){
            $('#instruct').hide()
            $('#button_continue').hide()
            $('#button_previous').hide()
            $('#second_div').hide()
            $('#container').hide()
            $('#fourth_div').hide()
            console.log('elseif run probe')
            RunProbeTrial(currenttrial_t);
          };
        };
          //this is so we can add summary screens, break screens and end screens later if we want...
          /*else if(eventt.indexOf('summary')==0){
      			RunSummaryScreen();
      		}else if(eventt.indexOf('break')==0){
      			RunBreak();
      		}else if (eventt.indexOf('endscreen')==0){
      			RunEndScreen();
      		}*/

/////////////////////////////////////////////////////////////////////////////////////////////
//Button pressed functions...
//Function called whenever there is a 'keyup' event...
  //Need to adjust KeyUp to have something when they are leaving the slider...
function KeyUp(e){
  //same as Pressed left before...
  if ((e.keyCode==37 || e.which==37) && canRespondslider==true && Isprobetrial==false){
            console.log('released left button, training trial')
            clearInterval(slider_moveleft);
            slider_moveleft=0;
            pressed_left = false;

  } else if ((e.keyCode==39 || e.which==39) && canRespondslider==true && Isprobetrial==false){
            console.log('released right button, training trial')
            clearInterval(slider_moveright);
            slider_moveright=0;
            pressed_right = false;

} else if (canRespondbuttons==true && e.keyCode==77) { //77 is the code for m, need to put in instructions...
    console.log('pressed right')
    last_pressed='right'
    //reaction time
      var currentTime = new Date().getTime();
      var RT = currentTime - startTrialTime;
      reaction_times.push(RT);
    //make choice square flash;
    //making it bigger and adjusting the size of the circle container similtaneously so all fits.
        ///STILL NEED TO MOVE IT UP AT THE SAME TIME SO DOESN'T JUST GROW AT THE BOTTOM...
    document.getElementById("right_choice").style.height="120px";document.getElementById("right_choice").style.width="120px";
    document.getElementById("circle_container").style.width="520px";
    save_choicebutton();

    //Put the one they chose back to normal size
    var T3=setTimeout(function(){
      document.getElementById("right_choice").style.height="100px";document.getElementById("right_choice").style.width="100px";
      document.getElementById("circle_container").style.width="560px";
      },squareflashtime);

    //As we want to flash what they chose first, we don't want the outcome to happen straight away...
    var T4=setTimeout(function(){
          outcomebuttons('responded');
      },showsubjectchoicetime);

    timeout_needed=false;

  } else if ((e.keyCode==13 || e.which==13) && canRespondslider==true && Isprobetrial==false){
      console.log('pressed enter: training trial')
        //reaction time
          var currentTime = new Date().getTime();
          var RT = currentTime - startTrialTime;
          reaction_times.push(RT);
        $("#slider").draggable("option",{disabled:true});
        save_slideposition();
        outcomeslider('responded');
        timeout_needed=false;

  } else if ((e.keyCode==13 || e.which==13) && canRespondslider==true && Isprobetrial==true){
          console.log('pressed enter: probe trial')
            //reaction time
              var currentTime = new Date().getTime();
              var RT = currentTime - startTrialTime;
              reaction_times.push(RT);
            $("#slider").draggable("option",{disabled:true});
            save_slideposition();
            respondedslider_probetrial('responded');
            timeout_needed=false;


  //for stopping the slider moving if release the left arrow key on the training trials...
} else if (canRespondbuttons==true && e.keyCode==90 ) { //90 is the code for z, need to put in instructions...
  console.log('pressed left')
  last_pressed='left'
  //reaction time
    var currentTime = new Date().getTime();
    var RT = currentTime - startTrialTime;
    reaction_times.push(RT);
  save_choicebutton();

  //make choice square flash;
  //making it bigger and adjusting the size of the circle container similtaneously so all fits.
      ///STILL NEED TO MOVE IT UP AT THE SAME TIME SO DOESN'T JUST GROW AT THE BOTTOM...
  document.getElementById("left_choice").style.height="120px";document.getElementById("left_choice").style.width="120px";
  document.getElementById("circle_container").style.width="520px";

  //Put the one they chose back to normal size
  var T3=setTimeout(function(){
    document.getElementById("left_choice").style.height="100px";document.getElementById("left_choice").style.width="100px";
    document.getElementById("circle_container").style.width="560px";
    },squareflashtime);

  //As we want to flash what they chose first, we don't want the outcome to happen straight away...
  var T4=setTimeout(function(){
        outcomebuttons('responded');
    },showsubjectchoicetime);

  timeout_needed=false;

      };
};

////////////////////////////////////////////////////////////////////////////////////////////
//When the website loads, this is the first thing that is called...
  $(document).ready(function(){
      //add functions that get called by key presses or button presses
          $("#button_continue" ).click(function() {Proceed('next');});
          $("#button_previous" ).click(function() {Proceed('previous');});
          //$("#button_left" ).click(function() {ButtonClick('left');});
          //$("#button_right" ).click(function() {ButtonClick('right');});
          $(document).bind('keyup',KeyUp); //someone pressed enter??
        //  $(document).bind('keydown',KeyDown);

          Proceed('next'); //We want to go to Proceed next as the first thing that happens when we load page...
  });
