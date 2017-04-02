
$(document).ready(function(){
  /*$('.dot').draggable();*/

  /*var bg = new Image();
  bg.src = "Christmas.jpg";*/

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

  var flakes=[];
/*pushing a new snowflake to the flakes array*/
  function addFlake(){
      /*making a square of the falling dots*/
      /*var x=Math.floor((cW/2-cH/4)+Math.random()*cH/2);*/
      /*var x=Math.floor(Math.random()*2*cW/4+cW/4); */ /*want to randomise this between 1 and canvas width*/
      var x=Math.floor(Math.random() * cW) + 1;
      var y=cH/4;
      var s=Math.floor(Math.random()*3+1); /*speed- random between 1 and 3- 3 layers of depth for these particles- 3 different speed we can set. Need to change if want a whole range...*/
      var rc=Math.floor(Math.random()*255+1); /*red color-want it to be between 1 and 255 at the moment...*/
      var rb=Math.floor(Math.random()*255+1); /*blue color-want it to be between 1 and 255 at the moment...*/
      var rot=Math.random();
      var ang=Math.floor(Math.random()*2+1); /*how much moving in x direction as well? Can change overall angle?*/
    flakes.push({"x":x,"y":y,"s":s,"rc":rc, "rb":rb, "rot":rot, "ang":ang});
  }; /*for addFlake*/

  /* we want to now loop over the flakes array to make the snowflakes move down screen by changing y value */
  function snow (){
    addFlake(); /*change the density of flakes by how many of these you do*/
    addFlake();
      for(var i=0; i<flakes.length; i++){
        ctx.fillStyle="rgba(" +flakes[i].rc + ",0," +flakes[i].rb + ",0.75)" /*makes it white and opaque*/
        /*ctx.rotate(flakes[i].rot);*/ /*this makes them move wildly*/
        ctx.beginPath(); /*start a new arc shape for each snowflake*/

        /*arc is for drawing a circle here for a snowflake...*/
        /*arc(x,y,radius,startAngle,endAngle (these are for how you draw them),anticlockwise)*/

        /*note that changing the number you multiply y by also changes the speed, so could make this a variable to change for different ones...*/

        /*does this update the variables stored in flakes and how??*/
        /*flakes[i].x+=flakes[i].ang*/
        ctx.arc(flakes[i].x,flakes[i].y+=flakes[i].s*0.9, 3.9,0,Math.PI*2, false); /*adding to the y position to get downwards movement*/
        ctx.closePath();
        ctx.fill(); /*or could use .fillRect() but it needs 4 inputs...*/

        /*remove snowflakes after move off canvas*/
        /*can change to remove after a certain random time period...*/
        /*or remove if they go outside certain area...*/
        if ( flakes[i].y>3*cH/4) {
          flakes.splice(i,1); /*removes one item (element i) from array*/
        } /*for if loop*/

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
  /*addCircularBackground();*/
  ctx.restore(); /*restoring the last image of the animation stack...*/

}; /*for animate function*/

var animateInterval=setInterval(animate,50); /*can change this interval to get them falling faster or slower overall...*/
}; /*for initCanvas*/

window.addEventListener('load',function(event)
  {
    initCanvas();
  });


});
