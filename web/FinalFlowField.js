// Parameters
let inc = 0.1;
let scl = 20;
let opacity = 250;
let zOff = 0;
let zSpeed = 0.01;
let canvaSize = 400;

let numOfParticles = 100;
let cols, rows;
let particles = [];
let flowfield = [];

let zSpeedSlider, zSpeedP;
let numInput, submitButton;
let started = false;

function setup() {
    // Setup canvas and parameter UI
    let c = createCanvas(900, 500);
    c.parent('canvas-container'); // optional: specify a div container

    pixelDensity(2);

    createP("Enter number of particles:");
    numInput = createInput();
    numInput.attribute("placeholder", "e.g. 1000");
    numInput.parent('controls-container'); // optional

    submitButton = createButton("Start Simulation");
    submitButton.parent('controls-container'); // optional
    submitButton.mousePressed(createParticles);

    zSpeedP = createP();
    zSpeedSlider = createSlider(0.001, 0.05, zSpeed, 0.001);
    zSpeedSlider.parent('controls-container'); // optional
    zSpeedSlider.style('width', '200px');

    cols = floor(width / scl);
    rows = floor(height / scl);

    flowfield = new Array(cols * rows);

    textSize(16);
    textAlign(RIGHT, TOP);
    fill(255);
    noStroke();
}

function draw() {
    if (!started) return;
    background(0, 15); // subtle fade for trails; adjust as needed

    zSpeed = zSpeedSlider.value();
    zSpeedP.html("Adjust zSpeed: " + zSpeed);

    // Step through flow field; build with 3D Perlin noise for animation over time
    let yOff = 0;
    for (let y = 0; y < rows; y++) {
        let xOff = 0;
        for (let x = 0; x < cols; x++) {
            let angle = noise(xOff, yOff, zOff) * TWO_PI * 2;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[x + y * cols] = v;
            xOff += inc;
        }
        yOff += inc;
    }
    zOff += zSpeed;

    // Display particles
    for (let p of particles) {
        p.follow(flowfield, cols, rows, scl);
        p.update();
        p.show();
    }

    // Label and FPS readout
    noStroke();
    fill(255);
    textSize(20);
    textAlign(CENTER, TOP);
    text("Noise", width / 2, 10);

    textAlign(RIGHT, TOP);
    textSize(16);
    text(nf(frameRate(), 2, 1) + " FPS", width - 10, 10);
}

function createParticles() {
    let val = int(numInput.value());
    if (isNaN(val) || val <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }
    numOfParticles = val;
    started = true;
    particles = [];
    for (let i = 0; i < numOfParticles; i++) {
        particles[i] = new Particle();
    }

    // Optional: Add save button only after start
    let saveButton = createButton("Save Image ⬇");
    saveButton.mousePressed(() => saveCanvas("flowfield", "png"));
}

// Example minimal Particle class (adapt this for coloring/trails)
class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxspeed = 2;
        this.prev = this.pos.copy();
    }
    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // Wrap around edges
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.prev.set(this.pos);
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.prev.set(this.pos);
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.prev.set(this.pos);
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.prev.set(this.pos);
        }
    }
    follow(flowfield, cols, rows, scl) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = flowfield[index];
        this.applyForce(force);
    }
    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        push();
        colorMode(HSB, 360, 100, 100, 100);
        let t = frameCount * 0.012;
        let hue = noise(this.pos.x * 0.004 + t, this.pos.y * 0.004 + t) * 360;
        stroke((hue + frameCount * 2) % 360, 90, 100, 18);
        strokeWeight(1.3);
        line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
        this.prev.set(this.pos);
        pop();
    }

}
