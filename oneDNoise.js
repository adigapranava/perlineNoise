let speedSlider, offsetSlider;

function setup() {
    createCanvas(windowWidth - 30, windowHeight - 30);
    start = 0;
    speed = 0.01;
    offSetMove = 0.01;

    // Create speed slider
    speedSlider = createSlider(0.01, 0.1, speed, 0.01);
    speedSlider.position(15, 10);
    speedSlider.style('width', '80px');
    speedSlider.attribute('title', 'Speed');

    // Create offset move slider
    offsetSlider = createSlider(0.001, 0.02, offSetMove, 0.001);
    offsetSlider.position(15, 30);
    offsetSlider.style('width', '80px');
    offsetSlider.attribute('title', 'Offset Move');
}

function draw() {
    background(220);
    xOffset = 0;
    noFill();
    strokeWeight(5);
    beginShape(TESS);
    for (let i = 0; i < width; i++) {
        let y = map(noise(start + xOffset), 0, 1, 0, height);
        stroke(200, 0, 0);
        vertex(i, y);
        xOffset += offSetMove;
    }
    endShape();
    start += speed;

    // Update speed and offset move values based on sliders
    speed = speedSlider.value();
    offSetMove = offsetSlider.value();
    noStroke();
    fill(0);
    text('Speed: ' + speed, 100, 15);
    text('Offset Move: ' + offSetMove, 100, 35);

    // Add text to the screen
    textSize(20);
    text('Noise Visualization', 10, 60);
    textSize(12);
    text('Move the sliders to adjust the speed and offset move values', 10, 80);
    text('Press the "space bar" key to stop the frame', 10, 100);

    if (keyIsPressed && key === ' ') {
        speed =0;
    }
    
    // press b to go to "back" page
    if (keyIsPressed && key === 'b') {
        window.location.href = "index.html";
    }
}