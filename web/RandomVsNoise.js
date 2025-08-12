let randomX;
let noiseX;
let offset = 0;
let noiseHistory = [];
let randomHistory = [];
let speedSlider; // slider for noise speed

function setup() {
    let c1 = createCanvas(900, 500);
    c1.parent('canvas-container');
    randomX = width / 2;
    noiseX = width / 2;

    // Slider to tweak noise offset speed (centered below canvas)
    speedSlider = createSlider(0, 0.1, 0.01, 0.001);
    speedSlider.parent('slider-container'); // attaches to HTML container
    speedSlider.style('width', '200px');
}



function draw() {
    background(30);

    // --- FPS Display ---
    fill(255);
    noStroke();
    textSize(16);
    text(`FPS: ${nf(frameRate(), 2, 2)}`, width - 100, 20);

    // --- RANDOM CIRCLE ---
    randomX = random(0, width);
    fill('#4CAF50'); // green for random
    ellipse(randomX, height / 4, 20, 20);
    textSize(40);
    fill(255, 200);
    text('Random', 20, 100);

    // --- NOISE CIRCLE ---
    let noiseValue = noise(offset);
    noiseX = noiseValue * width;
    fill('#FF5722'); // orange for noise
    ellipse(noiseX, (3 * height) / 4, 20, 20);
    textSize(40);
    fill(255, 200);
    text('Noise', 20, (3 * height) / 4);

    // --- Update histories ---
    let randomValue = random(0, 1);
    noiseHistory.push(noiseValue);
    randomHistory.push(randomValue);

    if (noiseHistory.length > 300) noiseHistory.shift();
    if (randomHistory.length > 300) randomHistory.shift();

    // --- Draw Random graph ---
    drawGraph(randomHistory, '#4CAF50', height - 250, 'Random');

    // --- Draw Noise graph ---
    drawGraph(noiseHistory, '#FF5722', height - 5, 'Noise');

    // Increment offset for noise based on slider
    offset += speedSlider.value();

    // --- Slider label and noise value ---
    fill(200);
    noStroke();
    textSize(14);
    text(`Noise Speed: ${speedSlider.value().toFixed(3)}`, 
         20, height -20 );
}

function drawGraph(history, col, yPos, label) {
    // Background panel
    fill(50);
    noStroke();
    rect(width - 320, yPos - 80, 300, 70, 8);

    // Reference lines: min (0), mid (0.5), max (1)
    stroke(80); // subtle gray
    strokeWeight(1);
    let yMax = map(1, 0, 1, yPos - 10, yPos - 60);
    let yMid = map(0.5, 0, 1, yPos - 10, yPos - 60);
    let yMin = map(0, 0, 1, yPos - 10, yPos - 60);
    line(width - 310, yMax, width - 20, yMax); // max
    line(width - 310, yMid, width - 20, yMid); // mid
    line(width - 310, yMin, width - 20, yMin); // min

    // Graph line
    stroke(col);
    noFill();
    beginShape();
    for (let i = 0; i < history.length; i++) {
        let x = map(i, 0, history.length - 1, width - 310, width - 20);
        let y = map(history[i], 0, 1, yPos - 10, yPos - 60);
        vertex(x, y);
    }
    endShape();

    // Label
    noStroke();
    fill(200);
    textSize(14);
    text(label + ' graph', width - 310, yPos - 65);
}

