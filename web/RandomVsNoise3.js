let inc = 0.02; // larger increment = fewer noise samples, faster
let start = 0;
let speed = 0.1;
let zOffSet = 0;
let useZOffset = false;

let toggleButton;
let col1, col2;

function setup() {
    let c1 = createCanvas(900, 500);
    c1.parent('canvas-container');
    pixelDensity(1);

    col1 = color(0, 60, 0);     // very dark green
    col2 = color(173, 255, 47); // bright green

    toggleButton = createButton("Toggle Z Offset");
    toggleButton.parent('canvas-container'); // stays in container, below canvas
    toggleButton.style('background-color', '#0d130dff');
    toggleButton.style('color', 'white');
    toggleButton.style('border', 'none');
    toggleButton.style('padding', '8px 16px');
    toggleButton.style('font-size', '14px');
    toggleButton.style('border-radius', '5px');
    toggleButton.style('cursor', 'pointer');
    toggleButton.style('margin-top', '10px'); // spacing below canvas
    toggleButton.mouseOver(() => toggleButton.style('background-color', '#282828ff'));
    toggleButton.mouseOut(() => toggleButton.style('background-color', '#0d130dff'));

    toggleButton.position(
        width - 200,
        height + 130
    );
    // positionButtons();
    toggleButton.mousePressed(() => {
        useZOffset = !useZOffset;
        toggleButton.html(useZOffset ? "Move Y Offset" : "Enable Z Offset");
    });

    textSize(16);
    textAlign(RIGHT, TOP);
    fill(255);
    noStroke();
}


function draw() {
    background(0);

    let yOff = start;
    let cellSize = 3; // each "pixel" is a small rectangle

    for (let y = 0; y < height; y += cellSize) {
        let xOff = 0;

        // Left side: Perlin noise
        for (let x = 0; x < width / 2; x += cellSize) {
            let noiseVal = useZOffset
                ? noise(xOff, yOff, zOffSet)
                : noise(xOff, yOff);

            let c = lerpColor(col1, col2, noiseVal);
            fill(c);
            rect(x, y, cellSize, cellSize);

            xOff += inc;
        }

        // Right side: Random values
        for (let x = width / 2; x < width; x += cellSize) {
            let randVal = random(); // between 0 and 1
            let c = lerpColor(col1, col2, randVal);
            fill(c);
            rect(x, y, cellSize, cellSize);
        }

        yOff += inc;
    }

    if (useZOffset) {
        zOffSet += speed;
    } else {
        start -= speed;
    }

    // Labels
    stroke(0);
    strokeWeight(5);
    fill(255);
    textSize(20);
    textAlign(CENTER, TOP);
    text("Noise", width / 4, 10);       // Centered over left half
    text("Random", (3 * width) / 4, 10); // Centered over right half

    // FPS display
    textAlign(RIGHT, TOP);
    textSize(16);
    text(nf(frameRate(), 2, 1) + " FPS", width - 10, 10);
    noStroke();
}
