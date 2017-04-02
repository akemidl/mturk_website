
$(document).ready(function(){
  /*$('.dot').draggable();*/

  /*var bg = new Image();
  bg.src = "Christmas.jpg";*/

/*want to initialise the canvas and create variables related to it to use dimensions below...*/
function initCanvas(){
  var ctx=document.getElementById('mycanvas').getContext('2d');
  var cW=ctx.canvas.width, cH=ctx.canvas.height;

  function addCircularBackground(){
  ctx.beginPath();
  ctx.fillStyle="rgba(255,0,0,0.5)"
  ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,ctx.canvas.height/4,0,Math.PI*2, false);
  ctx.closePath();
  ctx.fill();
  };


  var flakes=[];
/*pushing a new snowflake to the flakes array*/
  function addFlake(){
      /*making a square of the falling dots*/
      var x=Math.floor((cW/2-cH/4)+Math.random()*cH/2);
      /*var x=Math.floor(Math.random()*2*cW/4+cW/4); */ /*want to randomise this between 1 and canvas width*/
      var y=cH/4;
      var s=Math.floor(Math.random()*3+1); /*speed- random between 1 and 3- 3 layers of depth for these particles*/
      var rc=Math.floor(Math.random()*2+1); /*red color-want it to be between 1 and 255 at the moment...*/
    flakes.push({"x":x,"y":y,"s":s,"rc":rc});
  }; /*for addFlake*/

  /* we want to now loop over the flakes array to make the snowflakes move down screen by changing y value */
  function snow (){
    addFlake();
    addFlake();
      for(var i=0; i<flakes.length; i++){
        ctx.fillStyle="rgba(0,255,255,0.75)" /*makes it white and opaque*/
        ctx.beginPath(); /*start a new arc shape for each snowflake*/

        /*arc is for drawing a circle here for a snowflake...*/
        /*arc(x,y,radius,startAngle,endAngle (these are for how you draw them),anticlockwise)*/

        /*note that changing the number you multiply y by also changes the speed, so could make this a variable to change for different ones...*/
        ctx.arc(flakes[i].x,flakes[i].y+=flakes[i].s*0.9, 3.9,0,Math.PI*2, false); /*adding to the y position to get downwards movement*/
        ctx.closePath();
        ctx.fill(); /*or could use .fillRect() but it needs 4 inputs...*/

        /*remove snowflakes after move off canvas*/
        /*can change to remove after a certain random time period...*/
        /*or remove if they go outside certain area...*/
        if ( flakes[i].y>3*cH/4) {
          flakes.splice(i,1);
        } /*for if loop*/

      } /*for for loop*/
    } /*for snow*/

function animate(){
  ctx.save();
  ctx.clearRect(0,0,cW,cH);
  /*ctx.drawImage(bg,0,0);*/
  ctx.fillStyle="white";ctx.fillRect(0,0,cW,cH);
  snow();
  addCircularBackground();
  ctx.restore();

}; /*for animate function*/

var animateInterval=setInterval(animate,10); /*can change this interval to get them falling faster or slower...*/
}; /*for initCanvas*/

window.addEventListener('load',function(event)
  {
    initCanvas();
  });


});
