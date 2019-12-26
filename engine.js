var can = document.getElementById("canvas");
can.width = window.innerWidth;
can.height = window.innerHeight;

var ctx = can.getContext("2d");

var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;

// Draw circle in the middle
function drawCircle(){
  ctx.beginPath();
  ctx.arc(pageWidth/2, pageHeight/2, pageHeight/2.5, 0, 2 * Math.PI);
  ctx.strokeStyle = "#1d1d1d";
  ctx.lineWidth = 14;
  ctx.stroke();
}

// Draw a disc that goes around the circle
var positions = [[0, 0], [0, 0], [0, 0]];
var inside = 0;
var outside = 0;
var insidetxt = document.getElementsByClassName("inside");
var outsidetxt = document.getElementsByClassName("ouside");
var probtxt = document.getElementsByClassName("prob");
function calc(){
  $(".inside").html(inside);
  $(".outside").html(outside);
  $(".prob").html(((inside)/(outside+inside)));
}
//inside, outside, tries, insidetxt, outsidetxt, probtxt
function drawDisc(){
  var variable = 0;
  calc();
  ctx.lineWidth = 0.1;
  ctx.fillStyle = "#EE4540";
  for (i=0; i<3; i++){
    variable = Math.random() * (2*Math.PI);
    positions[i][0] = (pageWidth/2)-(Math.cos(variable)*pageHeight/2.5);
    positions[i][1] = (pageHeight/2)-(Math.sin(variable)*pageHeight/2.5);
  };
  if (area(positions)){
    ctx.fillStyle = "#A3ADFF";
    inside++;
  } else {
    ctx.fillStyle = "#EE4540";
    outside++;
  }
  for (i=0; i<3; i++){
    ctx.beginPath();
    ctx.arc(positions[i][0], positions[i][1], 20, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();
  };

  if (area(positions)){
    ctx.fillStyle = "#A3ADFF33";
    ctx.strokeStyle = "#A3ADFF";
  } else {
    ctx.fillStyle = "#EE454033";
    ctx.strokeStyle = "#EE4540";
  }
  ctx.beginPath();
  ctx.moveTo(positions[0][0], positions[0][1]);
  ctx.lineTo(positions[1][0], positions[1][1]);
  ctx.lineTo(positions[2][0], positions[2][1]);
  ctx.lineJoin = "round";
  ctx.closePath();
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.fill();
};

function drawMiddleDisc(){
  ctx.beginPath();
  ctx.arc((pageWidth/2), (pageHeight/2), 5, 0, 2 * Math.PI, false);
  ctx.lineWidth = 0.1;
  ctx.stroke();
  ctx.fillStyle = "#1d1d1d";
  ctx.fill();
}

function clear(){
  ctx.clearRect(0, 0, can.width, can.height);
};

function area(positions){
  var A = 0; 
  var a1 = 0; 
  var a2 = 0;
  var a3 = 0;
  A = (positions[0][0]*(positions[1][1]-positions[2][1]) + positions[1][0]*(positions[2][1]-positions[0][1]) +  positions[2][0]*(positions[0][1]-positions[1][1]))/2
  a1 = (can.width/2*(positions[1][1]-positions[2][1]) + positions[1][0]*(positions[2][1]-can.height/2) +  positions[2][0]*(can.height/2-positions[1][1]))/2
  a2 = (positions[0][0]*(can.height/2-positions[2][1]) + can.width/2*(positions[2][1]-positions[0][1]) +  positions[2][0]*(positions[0][1]-can.height/2))/2
  a3 = (positions[0][0]*(positions[1][1]-can.height/2) + positions[1][0]*(can.height/2-positions[0][1]) +  can.width/2*(positions[0][1]-positions[1][1]))/2
  if (Math.round(Math.abs(a1)+Math.abs(a2)+Math.abs(a3)) == Math.round(Math.abs(A))){
    return true;
  } else {
    return false;
  }
}; 

function everything(){
  clear();
  drawCircle();
  drawMiddleDisc();
  drawDisc();
  area(positions);
};

//Function to change the value of the range and change hjow frequent the function generates dics

everything();

var changeper = 1000;
var interval = setInterval(everything, changeper);
$(document).on('input', '.changeslider', function() {
  changeper = ($(this).val()/2)*100;
  console.log(changeper);
  clearInterval(interval);
  interval = setInterval(everything, changeper);
  $(".changesecond").html((($(this).val()/2)*100)/1000)
});

// Calculate area
// Call the draw function every x ms
/**********************/

//Add menu
  //Optional: Open and close the menu


//-- Dec 24 [Done]
  //-- Use an arrany to represent three random picked positions for the discs to use them later to position them and calculate the area

//-- Dec 25
  //-- Check if dot is inside the triangle -> if yes then change the strokeStyle to blue to indicate that (https://youtu.be/H9qu9Xptf-w)
  //-- Add numbers
  //-- Add slider