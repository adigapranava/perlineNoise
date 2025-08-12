let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(0, 0, 0, 20); // slight fade for trails
  translate(width / 2, height / 2);
  t += 0.01;

  let rBase = 80;
  let res = 200;
  let amp = 40;
  let layers = 13;

  for (let k = layers - 1; k >= 0; k--) { // draw from back to front
    let offset = k * 0.5;
    let hueVal = (t * 60 + k * 40) % 360;

    fill(hueVal, 80, 100, 30); // transparent fill
    beginShape();
    for (let i = 0; i < res; i++) {
      let theta = i * TWO_PI / res;

      // swirling noise for motion
      let n = noise(
        cos(theta + t + offset) + 1,
        sin(theta + t + offset) + 1,
        t + offset
      );

      let r = rBase + k * 12 + map(n, 0, 1, -amp, amp);
      let x = r * cos(theta);
      let y = r * sin(theta);
      vertex(x, y);
    }
    endShape(CLOSE);
    rBase-=1
  }
}
