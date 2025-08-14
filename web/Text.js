let font;
let word = "Noicee";
let letterSpacing = 10;
let fontSize = 200;
let lettersPoints = [];
let startTime;

function preload() {
  font = loadFont('assets/MoonkidspersonaluseExtrabold-X3n72.otf');
}

function setup() {
  let cnv = createCanvas(1200, 500);
  cnv.parent('canvas-container');
  colorMode(HSB, 360, 100, 100, 100);
  noFill();

  prepareText();
  startTime = millis(); // Record start time
}

function prepareText() {
  lettersPoints = []; // reset
  let totalWidth = 0;
  for (let i = 0; i < word.length; i++) {
    let bounds = font.textBounds(word[i], 0, 0, fontSize);
    totalWidth += bounds.w + letterSpacing;
  }

  let startX = (width - totalWidth + letterSpacing) / 2;
  let y = height / 2 + fontSize / 4;
  let currentX = startX;

  for (let i = 0; i < word.length; i++) {
    let pts = font.textToPoints(word[i], currentX, y, fontSize, {
      sampleFactor: 0.4
    });
    lettersPoints.push(pts);
    let bounds = font.textBounds(word[i], 0, 0, fontSize);
    currentX += bounds.w + letterSpacing;
  }
}

function draw() {
  background(0);
  
  let noiseScale = 0.001;
  let timeScale = 0.01;
  let amp = 20;

  let elapsedSec = floor((millis() - startTime) / 1000);
  let lettersToShow = constrain(elapsedSec + 1, 0, word.length);

  for (let i = 0; i < lettersToShow; i++) {
    let hueVal = (frameCount + i * 40) % 360;

    // Glow
    stroke(hueVal, 80, 100, 30);
    strokeWeight(8);
    drawLetter(lettersPoints[i], noiseScale, timeScale, amp);

    // Sharp outline
    stroke(hueVal, 80, 100, 100);
    strokeWeight(2);
    drawLetter(lettersPoints[i], noiseScale, timeScale, amp);

  }
}

function drawLetter(points, noiseScale, timeScale, amp) {
  beginShape();
  for (let pt of points) {
    let n = noise(pt.x * noiseScale, pt.y * noiseScale, frameCount * timeScale);
    let angle = n * TWO_PI * 2;
    let xOff = -tan(angle) * amp / 200;
    let yOff = cos(angle) * amp;
    vertex(pt.x + xOff, pt.y + yOff);
  }
  endShape(CLOSE);
}

// Function to update the animated text
function updateName() {
  let inputVal = document.getElementById("nameInput").value.trim();
  if (inputVal) {
    word = inputVal;
    startTime = millis(); // reset animation timing
    prepareText();
  }
}
