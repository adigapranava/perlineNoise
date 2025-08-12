let offset = 0;
let clearBackground = true;
let drawAsLine = false;
let bgButton, lineButton;

function setup() {
  let c1 = createCanvas(900, 500);
  c1.parent('canvas-container');
  stroke(200);
  textAlign(CENTER, CENTER);

  // Create buttons
  bgButton = createButton('Toggle Background');
  lineButton = createButton('Toggle Line Mode');

  // Style buttons
  [bgButton, lineButton].forEach(btn => {
    btn.style('padding', '8px 16px');
    btn.style('margin', '0 5px');
    btn.style('border', 'none');
    btn.style('border-radius', '5px');
    btn.style('background-color', '#444');
    btn.style('color', '#fff');
    btn.style('font-size', '14px');
    btn.style('cursor', 'pointer');
  });

  // Button events
  bgButton.mousePressed(() => {
    clearBackground = !clearBackground;
  });

  lineButton.mousePressed(() => {
    drawAsLine = !drawAsLine;
    prevNoiseX = prevNoiseY = prevRandX = prevRandY = undefined;
  });

  // Position buttons at bottom center of canvas
  positionButtons();
}

function positionButtons() {
  let btnWidth = 300; // estimated combined width
  let x = (width - btnWidth) / 2;
  let y = height - 35; // 40px from bottom

  bgButton.position(x + canvasPositionX(), y + canvasPositionY());
  lineButton.position(x + 160 + canvasPositionX(), y + canvasPositionY());
}

// Helper to get canvas's position on the page
function canvasPositionX() {
  return select('canvas').elt.getBoundingClientRect().left + window.scrollX;
}
function canvasPositionY() {
  return select('canvas').elt.getBoundingClientRect().top + window.scrollY;
}

// Update button position if window resizes
function windowResized() {
  positionButtons();
}


function draw() {
  if (clearBackground) {
    background(30);
  }

  // --- Perlin noise coordinates ---
  let nX = noise(offset) * (width / 2);
  let nY = noise(offset + 1000) * height;

  // --- Random coordinates ---
  let rX = random(width / 2, width);
  let rY = random(height);

  if (drawAsLine) {
    stroke(255, 150, 0);
    noFill();
    if (prevNoiseX !== undefined) {
      line(prevNoiseX, prevNoiseY, nX, nY);
    }

    stroke(0, 200, 255);
    if (prevRandX !== undefined) {
      line(prevRandX, prevRandY, rX, rY);
    }
  } else {
    noStroke();
    fill(255, 150, 0);
    ellipse(nX, nY, 20, 20);

    fill(0, 200, 255);
    ellipse(rX, rY, 20, 20);
  }

  // Labels
  fill(255);
  stroke(30);
  strokeWeight(20)
//   noStroke();
  textSize(24);
  text('Perlin Noise', width / 4, height - 30);
  text('Random', (3 * width) / 4, height - 30);
  noStroke();
  strokeWeight(1);

  // Store current positions for next frame
  prevNoiseX = nX;
  prevNoiseY = nY;
  prevRandX = rX;
  prevRandY = rY;

  // Move noise offset
  offset += 0.01;
}
