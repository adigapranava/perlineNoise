let inc = 0.1;
let start = 0;
let scl = 20;
let speed = 0.005;
let speedSlider;
let opacity = 80;

// let rows, cols;
let rows = 900 / scl;
let columns = 500 / scl;
let particles = [];
let flowfield = [];

let useNoise = true;  // true for noise, false for random
let isPaused = false; // true to pause flow field animation

let toggleButton;
let pauseButton;

function setup() {
    let c = createCanvas(900, 500);
    c.parent('canvas-container');

    speedSlider = createSlider(0.005, 0.05, speed, 0.01);
    speedSlider.parent('slider-container');
    speedSlider.style('width', '80px');
    speedSlider.attribute('title', 'Speed');

    // Add buttons below slider
    toggleButton = createButton('Toggle Mode');
    toggleButton.parent('slider-container');
    toggleButton.mousePressed(() => {
        useNoise = !useNoise;
    });

    pauseButton = createButton('Pause');
    pauseButton.parent('slider-container');
    pauseButton.mousePressed(() => {
        isPaused = !isPaused;
        pauseButton.html(isPaused ? 'Resume' : 'Pause');
    });

    rows = floor(width / scl);
    cols = floor(height / scl);

    flowfield = new Array(rows * cols);

    textSize(16);
    textAlign(RIGHT, TOP);
    fill(255);
    noStroke();
}

function draw() {
    background(0);
    speed = speedSlider.value();

    if (!isPaused) {
        if (useNoise) {
            // Generate flow field vectors using Perlin noise for entire canvas
            let yOff = 0;
            for (let y = 0; y < cols; y++) {
                let xOff = 0;
                for (let x = 0; x < rows; x++) {
                    let angle = map(noise(start + xOff, start + yOff), 0, 1, 0, TWO_PI);
                    let v = p5.Vector.fromAngle(angle);
                    flowfield[x + y * rows] = v;
                    xOff += inc;
                }
                yOff += inc;
            }
        } else {
            // Generate flow field vectors randomly for entire canvas
            for (let y = 0; y < cols; y++) {
                for (let x = 0; x < rows; x++) {
                    let angle = random(TWO_PI);
                    flowfield[x + y * rows] = p5.Vector.fromAngle(angle);
                }
            }
        }
        start += speed;
    }

    // Draw arrows for the entire canvas based on current flowfield
    for (let y = 0; y < cols + 1; y++) {
        for (let x = 0; x < rows + 1; x++) {
            let v = flowfield[x + y * rows] || p5.Vector.fromAngle(0);

            push();
            translate(x * scl, y * scl);
            rotate(v.heading());
            stroke(useNoise ? color(173, 255, 47, opacity) : color(255, 165, 0, opacity));
            strokeWeight(1);
            line(0, 0, scl - 4, 0);
            translate(scl - 4, 0);
            let arrowSize = 4;
            fill(useNoise ? color(173, 255, 47, opacity) : color(255, 165, 0, opacity));
            triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
            pop();
        }
    }

    // Update and display particles if you have that class defined
    for (let p of particles) {
        p.follow(flowfield);
        p.update();
        p.show();
    }

    // Labels
    stroke(0);
    strokeWeight(5);
    fill(255);
    textSize(20);
    textAlign(CENTER, TOP);
    text(useNoise ? "Noise" : "Random", width / 2, 10);

    // FPS display
    textAlign(RIGHT, TOP);
    textSize(16);
    text(nf(frameRate(), 2, 1) + " FPS", width - 10, 10);
    noStroke();
}

// When mouse is clicked, create a new particle at the mouse position
function mouseClicked() {
    particles.push(new Particle(mouseX, mouseY));
}
