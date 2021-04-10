var canvas = document.querySelector("canvas");
var cont = canvas.getContext("2d");

var scWidth = window.innerWidth;
var scHeight = window.innerHeight;

var backgroundColor = "#212121";
var darkColor = "#333333";
var inColor = "#225af7";
var outColor = "#f14242";

var inDot = 0;
var outDot = 0;

var lineWidth = 6;

canvas.height = scHeight;
canvas.width = scWidth;

function draw_circle(x, y, r){
  cont.beginPath();
  cont.arc(x, y, r, 0, Math.PI * 2, true);
  cont.strokeStyle = darkColor;
  cont.lineWidth = lineWidth;
  cont.stroke();
}

function draw_square(x, y, r){
  cont.beginPath();
  cont.moveTo(x-r, y-r);
  cont.lineTo(x+r, y-r);
  cont.lineTo(x+r, y+r);
  cont.lineTo(x-r, y+r);
  cont.lineTo(x-r, y-r);
  cont.strokeStyle = darkColor;
  cont.lineWidth = lineWidth;
  cont.stroke();
}

function draw_disc(x, y, r){
  cont.beginPath();
  cont.arc(x, y, r, 0, Math.PI * 2, true);
  cont.lineWidth = lineWidth;
  if (calc_dist_from_center(x, y) <= 300){
    cont.fillStyle = inColor;
    inDot++;
  } else {
    cont.fillStyle = outColor;
    outDot++;
  }
  cont.fill();
  console.log(inDot / (inDot + outDot) * 4);
}

function calc_dist_from_center(x, y){
  return Math.sqrt( (scWidth/2 - x)*(scWidth/2 - x) + (scHeight/2 -y)*(scHeight/2 -y))
}

function random(){
  var rand = Math.floor(Math.random() * 301);
  var sign = Math.round(Math.random());
  if (sign == 0){
    rand = -rand;
  }
  return rand;
}

draw_square(scWidth/2, scHeight/2, 300);
draw_circle(scWidth/2, scHeight/2, 300);

function round(){
  draw_disc(scWidth/2 + random(), scHeight/2 + random(), 6);
}

var interval = setInterval(round, 10);