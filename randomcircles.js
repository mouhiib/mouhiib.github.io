var canvas = document.getElementById("canvas");
var cont = canvas.getContext("2d");

//Generate random dot on the circle
// and start the recursivity from there

function drawCircle(x, y, radius, undercircles){
  if (undercircles > 0){
    cont.beginPath();
    cont.arc(x, y, radius, 0, 2 * Math.PI, true);
    cont.stroke();
    
    drawCircle(x+radius, y,          radius/2, undercircles-1);
    drawCircle(x-radius, y,          radius/2, undercircles-1);
    drawCircle(x,        y+radius,   radius/2, undercircles-1);
    drawCircle(x,        y-radius,   radius/2, undercircles-1);
  }
}

// Expanding the canvas
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// drawCircle(window.innerWidth/2, window.innerHeight/2, 200, 2);


function circles(x, y, radius, undercircles){
  if (undercircles > 0){
    cont.beginPath();
    cont.arc(x, y, radius, 0, 2 * Math.PI);
    cont.stroke();

    for (let i = 0; i<3; i++){
      var a = Math.floor(Math.random() * (Math.PI*2+1));
      circles(x+Math.cos(a)*radius, y+Math.sin(a)*radius, radius/2, undercircles-1);
    }
  }
}

setInterval(function(){
  cont.clearRect(0, 0, canvas.width, canvas.height);
  circles(window.innerWidth/2, window.innerHeight/2, 200, 5);
}, 1000);