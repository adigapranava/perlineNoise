var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums = 200;
var noiseScale = 800;

var colorPalettes = [
  [[69, 33, 124], [7, 153, 242], [255, 255, 255]],    // Palette 1
  [[255, 100, 100], [100, 255, 100], [100, 100, 255]],// Palette 2
  [[255, 200, 0], [0, 200, 255], [200, 0, 255]],      // Palette 3
  [[255, 87, 51], [255, 195, 0], [36, 123, 160]],     // Palette 4
  [[131, 56, 236], [58, 134, 255], [123, 237, 159]],  // Palette 5
  [[255, 145, 164], [212, 193, 190], [109, 109, 121]],// Palette 6
  [[255, 97, 56], [255, 166, 0], [255, 224, 102]],    // Palette 7
  [[6, 214, 160], [17, 138, 178], [7, 59, 76]]         // Palette 8
];

var paletteNames = [
  "Royal Glow",
  "Candy Pop",
  "Neon Vibes",
  "Sunset Splash",
  "Electric Dream",
  "Soft Pastels",
  "Coral Crush",
  "Aqua Pulse"
];

var currentPaletteIndex = 0;
var currentPalette;
var changePaletteButton;

function setup() {
  c = createCanvas(900, 500);
  c.parent('canvas-container');
  textSize(24);
  textAlign(LEFT, TOP);
  textFont('Helvetica');
  fill(255);
  background(21, 8, 50);
  
  currentPalette = colorPalettes[currentPaletteIndex];

  for (var i = 0; i < nums; i++) {
    particles_a[i] = new Particle(random(0, width), random(0, height));
    particles_b[i] = new Particle(random(0, width), random(0, height));
    particles_c[i] = new Particle(random(0, width), random(0, height));
  }

  changePaletteButton = createButton('Change Color Palette');
  changePaletteButton.parent('controls-container');
  changePaletteButton.mousePressed(changePalette);
}

function draw() {
  noStroke();
  smooth();

  for (var i = 0; i < nums; i++) {
    var radius = map(i, 0, nums, 1, 2);
    var alpha = map(i, 0, nums, 0, 250);

    fill(currentPalette[0][0], currentPalette[0][1], currentPalette[0][2], alpha);
    particles_a[i].move();
    particles_a[i].display(radius);
    particles_a[i].checkEdge();

    fill(currentPalette[1][0], currentPalette[1][1], currentPalette[1][2], alpha);
    particles_b[i].move();
    particles_b[i].display(radius);
    particles_b[i].checkEdge();

    fill(currentPalette[2][0], currentPalette[2][1], currentPalette[2][2], alpha);
    particles_c[i].move();
    particles_c[i].display(radius);
    particles_c[i].checkEdge();
  }

  // Draw the palette name on top left corner
  fill(255);
  noStroke();
  rect(0, 0, textWidth(paletteNames[currentPaletteIndex]) + 20, 40); // Background box for readability
  fill(21, 8, 50);
  text(paletteNames[currentPaletteIndex], 10, 8);
}

function changePalette() {
  currentPaletteIndex = (currentPaletteIndex + 1) % colorPalettes.length;
  currentPalette = colorPalettes[currentPaletteIndex];

  for (var i = 0; i < nums; i++) {
    particles_a[i] = new Particle(random(0, width), random(0, height));
    particles_b[i] = new Particle(random(0, width), random(0, height));
    particles_c[i] = new Particle(random(0, width), random(0, height));
  }

  background(21, 8, 50);
}

function Particle(x, y) {
  this.dir = createVector(0, 0);
  this.vel = createVector(0, 0);
  this.pos = createVector(x, y);
  this.speed = 0.4;

  this.move = function() {
    var angle = noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * TWO_PI * noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  }

  this.checkEdge = function() {
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      this.pos.x = random(50, width);
      this.pos.y = random(50, height);
    }
  }

  this.display = function(r) {
    ellipse(this.pos.x, this.pos.y, r, r);
  }
}
