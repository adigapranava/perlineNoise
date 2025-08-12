let t = 0;

function setup() {
  createCanvas(400, 400);
  noFill();
  stroke(255);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  t += 0.01;
  
  let rBase = 100;
  let res = 200;
  let amp = 50;
  
  fill(200)
  beginShape();
  for (let i = 0; i < res; i++) {
    let theta = i * TWO_PI / res;
    let n = noise(cos(theta)+1, sin(theta)+1, t)
    let r = rBase + map(n, 0, 1, -amp, amp); // perturb radius
    let x = r * cos(theta);
    let y = r * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);
}