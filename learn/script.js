let ranodmX;
let noiseX;
let offset = 0;

function setup() {

    c1 = createCanvas(900, 500)
    randomX = width/2

    noiseX = width/2
    offSet = 0
}

function draw() {
    background(30);
    // noStroke();
    // color('tomato's);
    randomX = random(0, width);
    ellipse(randomX, height/4, 20, 20);
    textSize(40);
    text('random', 0, 100);


    noiseX = noise(offset) * width; 
    ellipse(noiseX, 3 * height/4, 20,20)
    textSize(40);
    fill('tomato');
    text('noise', 0, 3*height/4);
    offset += 0.01
}