const diskMass = 10;
const diskRadius = 100;
var aMSlider;
var aMDSlider;
var pRSlider;
var pMSlider; 
//adjustableMass
var aM = 0;
//adjustableMassDist
var aMD = 0;
//pulleyRadius
var pR = 0;
//pullingMass
var pM = 0;

var start = false; //boolean for whether the animation is running or paused. starts paused. 
var time = 0; //for calculating angle in regards to time. resets to 0 with each reset.
var momentOfInertia = calcInertia(); //for calculating angle in regards to time.
var displacement = 0; //the distace fallen by the weight (used to calculate position of spinning parts as well)

function setup(){
  createCanvas(800,500);
  frameRate(30);

  textSize(18);
  ////creates the sliders////
  //adjustable mass "mass" slider
  aMSlider = createSlider(0, 500, 10, 10);
  aMSlider.position(10, 60);
  aMSlider.style('width', '200px');
  //adjustable mass "distace from center" slider
  aMDSlider = createSlider(0, 100, 10, 1);
  aMDSlider.position(10, 160);
  aMDSlider.style('width', '200px');
  //pulley "radius" slider
  pRSlider = createSlider(0, diskRadius, diskRadius/2, 1);
  pRSlider.position(10, 260);
  pRSlider.style('width', '200px');
  //pulling weight "mass" slider
  pMSlider = createSlider(0, 100, 10, 1);
  pMSlider.position(10, 360);
  pMSlider.style('width', '200px');
}

function draw(){
  clear();
  background(153);

  momentOfInertia = calcInertia();

  aM = aMSlider.value();
  aMD = aMDSlider.value();
  pR = pRSlider.value();
  pM = pMSlider.value();

  drawControls();
  updateAnimation();
}

function mousePressed() {
  rect(0, 425, 100, 50);
  //reset
  rect(120, 425, 100, 50);

  //checks if start/stop was clicked and updates the "start" boolean if it was.
  if (
    mouseX > 0 &&
    mouseX < 0 + 100 &&
    mouseY > 425 &&
    mouseY < 425 + 50
  ){
    if (start){
      start = false
    } else {
      start = true;
    }
  }

  //checks if reset was clicked and resets the animation if it was.
  if (
    mouseX > 120 &&
    mouseX < 220 &&
    mouseY > 425 &&
    mouseY < 425 + 50
  ){
    reset();
  }
}

function drawControls(){
  push();

  fill("white");
  ///boxes and lables for sliders///
  //adjustable mass "mass" slider box
  rect(0, 50, 220, 50);
  //adjustable mass "distace from center" slider box
  rect(0, 150, 220, 50);
  //pulley "radius" slider box
  rect(0, 250, 220, 50);
  //pulling weight "mass" slider box
  rect(0, 350, 220, 50);
  
  fill("black");
  //adjustable mass "mass" slider lable
  text('adjustable mass mass', 5, 90);
  //adjustable mass "distace from center" slider lable
  text('adjustable mass position', 5, 190);
  //pulley "radius" slider lable
  text('pulley radius', 20, 290);
  //pulling weight "mass" slider lable
  text('pulling weight mass', 5, 390);

  ///the buttons///
  //start/stop
  if(!start){
    fill('red');
  }else{
    fill('green');
  }
  rect(0, 425, 100, 50);
  fill("black");
  text('start/stop', 10, 455);
  //reset
  fill("grey");
  rect(120, 425, 100, 50);
  fill("black");
  text('reset', 150, 455);
  
  pop();
}

function updateAnimation(){
  let centerX = 500;
  let centerY = 200;
  let startingPlace = 100; //the starting length of sting off the pully at time = 0
  if(start){
    displacement += .1 * (deltaTime / 50);
  }

  push();
  ////table [these never change]
  fill("#664906");//brown
  //table top
  rect(centerX - 250, centerY + 95, 500, 20);
  //table legs
  rect(centerX - 200, centerY + 115, 10, 200);
  rect(centerX + 200, centerY + 115, 10, 200);

  ////rotating masses [these move and change size]
  strokeWeight(3);
  //poles
  line(centerX, centerY, centerX, centerY - 150);
  line(centerX, centerY, centerX + 150, centerY);
  line(centerX, centerY, centerX, centerY + 150);
  line(centerX, centerY, centerX - 150, centerY);
  //masses
  fill("#2E355F");
  circle(centerX, centerY - aMD - 50, aM/10);
  circle(centerX + aMD + 50, centerY, aM/10);
  circle(centerX, centerY + aMD + 50, aM/10);
  circle(centerX - aMD - 50, centerY, aM/10);

  ////Disk [these never change]
  fill("#6b8ebf");//a light blue
  //disk supports
  strokeWeight(5);
  line(centerX, centerY, centerX + 50, centerY + 93);
  line(centerX, centerY, centerX - 50, centerY + 93);
  //disk
  strokeWeight(1);
  circle(centerX, centerY, diskRadius);

  ////pully [this changes diameter but does not move]
  //pully (diameter adjusted by "pully radius" slider)
  circle(centerX, centerY, pR);

  ////weight [these move and change size]
  //string (x start position adjusted by "pully radius" slider)
  line(centerX + pR/2, centerY, centerX + pR/2, centerY + startingPlace + displacement);
  //weight (position adjusted with line end)
  square(centerX + pR/2 - pM/2, centerY + startingPlace + displacement, pM);

  //center [does not change]
  circle(centerX, centerY, 5);

  pop();
}

function reset(){
  //resets the animation and pauses it at 0 seconds
  aM = aMSlider.value();
  aMD = aMDSlider.value();
  pR = pRSlider.value();
  pM = pMSlider.value();
  momentOfInertia = calcInertia();

  start = false;
  time = 0;
}

function calcInertia(){
  return(4 * aM * aMD ** 2 + (1/2) * pM * pR ** 2);
}
