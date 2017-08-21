//Playing around to try to work out how to do the category boundary stuff

//add button presses

var boundary=     //this will be blocked so that update the category boundary variable for the particular block...

var leftorright=     //for which side of the category boundary the colour variable falls on for this particular trial...

//run motion dots

//display button choices

//wait for button press
    //store response
//compare with leftorright variable...

//provide feedback so they can learn the category boundary...

//go to next trial







//Function to run what we want for the category boundary trials...
RunBlock1Trial=function(block1trials_t){
  outcome_done=false; //set so they haven't entered a response yet...
  howlong=0; //how long the trial has run for...updating lower down...
  startTrialTime = new Date().getTime();
  timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
  canRespondslider=false;
  canRespondbuttons=false;
  //add functions that get called by key presses or button presses
      //add here for the new set up-- look at what Chris had in his...
  $(document).bind('keyup',Pressedleft); //don't need now that have buttons...
  $(document).bind('keyup',Pressedright); //don't need now that have buttons...

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
    console.log('inloop')
      if (howlong-moving_dots_timeout>time_toenterslider && timeout_needed==true && outcome_done==false)
          {save_slideposition();
           document.getElementById('participantOffer').innerHTML="TOO SLOW!!"
           $('#participantOffer').show();
           outcomebuttons('noresp');
         };
       }, 100);
};


  function choice_buttons{
    canRespondbuttons=true;
    //need to add the other things want to hide/show on the screen here...
    //things to show
    $('#left_choice').show()
    $('#right_choice').show()

    //things to hide...

  };


  var choicebutton_array=[];
  function save_choicebutton{
      choicebutton_array.push(last_pressed);
  };


//Note that actually might want to replace this with button press stuff now...



  function Pressedleft(e) {
	if (canRespondbuttons==true && e.keyCode==90 ) { //90 is the code for z, need to put in instructions...
    console.log('pressed left')
    Outcome('left')
		last_pressed='left'
    //reaction time
      var currentTime = new Date().getTime();
      var RT = currentTime - startTrialTime;
      reaction_times.push(RT);
    save_choicebutton();
    outcome('responded');
    timeout_needed=false;
	}
}

function Pressedright(e) {
	if (canRespondbuttons==true && e.keyCode==77) { //77 is the code for m, need to put in instructions...
    console.log('pressed left')
    Outcome('left')
		last_pressed='left'
    //reaction time
      var currentTime = new Date().getTime();
      var RT = currentTime - startTrialTime;
      reaction_times.push(RT);
    save_choicebutton();
    outcomebuttons('responded');
    timeout_needed=false;
	}
}


//look at what happens for outcome('responded')...need to change to what we want for category trials...
//Function to show outcome for slider bar based on their response
//...ALSO proceeds to the next trial...(proceed next after outcomebarshow_duration...)
var outcomebuttons=function(response){
    outcome_done=true;
    console.log(outcome_done)

    //show outcome
      //something here we reveal to show the outcome
      //set text of choice_outcome to show the outcome...and then actually show...
    /*  Context_screen=function(context){
      if (context=='COLOUR')
        /*{function fColour()*/ {
    /*    console.log('getting_inCOLOUR')
        document.getElementById('test_para').innerHTML="COLOUR";
        document.getElementById('leftofslider_text').innerHTML="red"; //might be other way around and therefore may need to change later...
        document.getElementById('rightofslider_text').innerHTML="blue";
        $('#test_para').show();}
      else if (context=='SPEED')
        /*{function fSpeed()*/ {
    /*    console.log('getting_inSPEED')
        document.getElementById('test_para').innerHTML="SPEED";
        document.getElementById('leftofslider_text').innerHTML="slow"; //might be other way around and therefore may need to change later...
        document.getElementById('rightofslider_text').innerHTML="fast";
        $('#test_para').show();}
          };*/

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
    },outcomebuttonshow_duration); //time to show outcome bar for...
};




//stuff that need to sort out to show outcome in the outcome loop (coloured circle...)


          //show outcome

//here I need to show the circle- set it's colour depending on what they chose, what the real answer is and what side of the
//screen that choice was on on this trial


            //something here we reveal to show the outcome
            //set text of choice_outcome to show the outcome...and then actually show...
          /*  Context_screen=function(context){
            if (context=='COLOUR')
              /*{function fColour()*/ //{
          /*    console.log('getting_inCOLOUR')
              document.getElementById('test_para').innerHTML="COLOUR";
              document.getElementById('leftofslider_text').innerHTML="red"; //might be other way around and therefore may need to change later...
              document.getElementById('rightofslider_text').innerHTML="blue";
              $('#test_para').show();}
            else if (context=='SPEED')
              /*{function fSpeed()*/ //{
          /*    console.log('getting_inSPEED')
              document.getElementById('test_para').innerHTML="SPEED";
              document.getElementById('leftofslider_text').innerHTML="slow"; //might be other way around and therefore may need to change later...
              document.getElementById('rightofslider_text').innerHTML="fast";
              $('#test_para').show();}
                };*/
