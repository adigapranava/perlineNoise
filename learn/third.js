let offSetX = 0;
let start = 0;

function setup() {
    createCanvas(900, 500);
}

function draw() {
    background(30);

    noFill();
    beginShape();
    var offSetX = start;
    for (let x = 0; x < width; x++) {
        stroke(255);
        s = map(cos(offSetX), -1,1, 0, height);
        n = map(noise(offSetX),0,1, -60,60);
        y = s + n;
        vertex(x, y);
        offSetX += 0.01;
    }
    start += 0.01;
    endShape();
}