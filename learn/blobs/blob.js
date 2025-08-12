let t = 0;

function setup() {
  createCanvas(400, 400);
  noFill();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  t += 0.01;

  let rBase = 100;
  let res = 200;
  let amp = 50;

  // Use shadow blur for glow
  drawingContext.shadowBlur = 40; // glow spread
  drawingContext.shadowColor = color(0, 255, 255, 200); // glow color

  stroke(0, 255, 255);
  strokeWeight(3);
  fill(0, 255, 255, 255);

  beginShape();
  for (let i = 0; i < res; i++) {
    let theta = i * TWO_PI / res;
    let n = noise(cos(theta) + 1, sin(theta) + 1, t);
    let r = rBase + map(n, 0, 1, -amp, amp);
    let x = r * cos(theta);
    let y = r * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);

  // Reset shadow for other drawings
  drawingContext.shadowBlur = 0;
}
