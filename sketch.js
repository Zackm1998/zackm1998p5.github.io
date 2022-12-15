let W = 400;
let H = 200; //dimensions

let tx = ''; //number of collapses format
let record = 0;
let ballsx = [W / 2]; // x position 
let ballsy = [H / 2]; // y position
let Vx = [-2]; //x axis velocity
let Vy = [3]; //y axis velocity
let mg;
let N = 1; // number of balls
let r; //red
let g; //green 
let b; //blue
let diam = 30; //ball diameter

function setup() {
  frameRate(60);
  createCanvas(W, H + 40); // extra 40px to display the number of collapses
  r = [random(255)];
  g = [random(255)];
  b = [random(255)];
  mg = sqrt(pow(Vy, 2) + pow(Vy, 2)); //to normalize the randomized velocities
}

function draw() {
  background(200);
  stroke(1);
  fill(255);
  rect(0, 0, W, H); // main frame
  for (i = 0; i < N; i++) { // loop through all the balls
    wall_collapse(i); //check for collapses, if any change the direction
    fill(r[i], g[i], b[i], 200); //set the color
    noStroke();
    circle(ballsx[i], ballsy[i], diam); //draw the ball
    ballsx[i] += Vx[i]; // increment on the x-axis
    ballsy[i] += Vy[i]; // increment on the y-axis

  }
  fill(100, 0, 100); // text color

  text('Number of Collapses: ' + record, W / 2, 225);
  text('Click on the canvas', 50, 225);
}

function wall_collapse(i) {

  if (ballsx[i] > (W - diam / 2) || ballsx[i] < diam / 2) {

    Vx[i] *= -1;
    record++;

  }
  if (ballsy[i] > (H - diam / 2) || ballsy[i] < diam / 2) {
    Vy[i] *= -1;
    record++;

  }
}

function mouseClicked() {
  if (mouseX < W - diam / 2 && mouseX > diam / 2 && mouseY > diam / 2 && mouseY < H - diam / 2) {
    // generate random colors for the new ball
    append(r, random(255));
    append(g, random(255));
    append(b, random(255));
    // increment the number of balls
    N++;
    // append the new ball's color and location  to the balls coordinates 
    append(ballsx, mouseX);
    append(ballsy, mouseY);
    // generate a random velocity
    vx = random(10);
    vy = random(10);
    // normalize the velocity
    vx = (vx / sqrt(pow(vx, 2) + pow(vy, 2))) * mg;
    vy = (vy / sqrt(pow(vx, 2) + pow(vy, 2))) * mg;
    //append the new normalized velocity
    append(Vx, vx);
    append(Vy, vy);
  }
}