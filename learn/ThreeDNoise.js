let canvaSize = 400;
let scale = 20;
let rows = canvaSize / scale;
let columns = canvaSize / scale;
let vecs = []
let xOffSet = 0;
let yOffSet = 0;
let zOffSet = 0;

let xStart = 0;
let yStart = 0;
let fr, zSpeedP;
let zSpeed = 0.01;

let inc = 0.1;
let numOfParticles=100;

let particles = [];
let flowFields = [];

let started = false;
let numInput, submitButton;
let zSpeedSlider;

function setup() {
    fr = createP();
    createP("Enter number of particles:");
    numInput = createInput();
    numInput.attribute("placeholder", "e.g. 100");

    submitButton = createButton("Start Simulation");
    submitButton.mousePressed(createParticles);
    zSpeedP = createP();
    zSpeedSlider = createSlider(0, 1, zSpeed, 0.001); // min, max, initial, step
    zSpeedSlider.style('width', '200px');

    // frameRate(2);
    flowFields = new Array(rows * columns);
    angleMode(DEGREES);
}

function draw(){
    if (!started) return; 
    zSpeed = zSpeedSlider.value();
    // background(255);
    vecs = []
    yOffSet = yStart;
    for (let y = 0; y <= rows; y++) {
        xOffSet = xStart;
        for (let x = 0; x <= columns; x++) {
            var index = x + y * columns;
            push()
            translate(x * scale,y * scale);


            let vec = createVector(0.1,0);
            let angle = noise(xOffSet, yOffSet, zOffSet) * 360;
            vec.rotate(angle);
            flowFields[index] = vec;

            rotate(angle);

            stroke(0, 0, 0, 20);
            strokeWeight(1);
            // line(0, 0 ,scale, 0);
            // point(0, 0)
            pop();
            xOffSet += inc;
        }
        yOffSet += inc;
    }
    // xStart += xSpeed;
    // yStart += ySpeed;
    zOffSet += zSpeed;

    for (let i = 0; i < numOfParticles; i++) {
        particles[i].update();
        particles[i].show();
        particles[i].follow(flowFields);
    }
    fr.html("Frame Rate: " +floor(frameRate()));
    zSpeedP.html("Adjust zSpeed: "+ zSpeed);
}

function createParticles() {
  // Validate input
  let val = int(numInput.value());
  if (isNaN(val) || val <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }
  createCanvas(canvaSize, canvaSize);
//   background(0);
  numOfParticles = val;
  started = true;
  for (let i = 0; i < numOfParticles; i++) {
        particles[i] = new Particle();
    }
    let saveButton = createButton("Save Image ⬇");
    saveButton.mousePressed(() => saveCanvas("flowfield", "png"));
}