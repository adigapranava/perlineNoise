let inc = 0.1;
let start = 0;
let scl = 20;
let speed = 0.005;
let speedSlider;

let rows, cols;

function setup() {
    let c = createCanvas(900, 500);
    c.parent('canvas-container'); // put inside same container if needed

    // slider for speed
    speedSlider = createSlider(0.005, 0.05, speed, 0.01);
    speedSlider.parent('canvas-container');
    // speedSlider.position(15, height + 30);
    speedSlider.style('width', '80px');
    speedSlider.attribute('title', 'Speed');
    speedSlider.position(width- 200, height + 180);

    rows = floor((width / 2) / scl); // per half
    cols = floor(height / scl);

    textSize(16);
    textAlign(RIGHT, TOP);
    fill(255);
    noStroke();
}

function draw() {
    background(0);
    speed = speedSlider.value();

    let yOff = 0;
    for (let y = 0; y < cols + 1; y++) {
        let xOff = 0;

        // Left side: Perlin noise arrows
        for (let x = 0; x < rows + 1; x++) {
            let angle = map(noise(start + xOff, start + yOff), 0, 1, 0, TWO_PI);
            let v = p5.Vector.fromAngle(angle);

            push();
            translate(x * scl, y * scl);
            rotate(v.heading());
            stroke(173, 255, 47); // bright green arrows
            strokeWeight(1);
            line(0, 0, scl - 4, 0);
            translate(scl - 4, 0);
            let arrowSize = 4;
            triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
            pop();

            xOff += inc;
        }

        // Right side: Random arrows
        for (let x = 0; x < rows + 1; x++) {
            let angle = random(TWO_PI);
            let v = p5.Vector.fromAngle(angle);

            push();
            translate((x + rows) * scl, y * scl);
            rotate(v.heading());
            stroke(255, 165, 0);
            strokeWeight(1);
            line(0, 0, scl - 4, 0);
            translate(scl - 4, 0);
            let arrowSize = 4;
            triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
            pop();
        }

        yOff += inc;
    }

    start += speed;

    // Labels
    stroke(0);
    strokeWeight(5);
    fill(255);
    textSize(20);
    textAlign(CENTER, TOP);
    text("Noise", width / 4, 10);       // Left half center
    text("Random", (3 * width) / 4, 10); // Right half center

    // FPS display
    textAlign(RIGHT, TOP);
    textSize(16);
    text(nf(frameRate(), 2, 1) + " FPS", width - 10, 10);
    noStroke();
}
