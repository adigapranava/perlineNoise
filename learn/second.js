let noiseX;
let noiseY;
let offset = 0;

function setup() {

    createCanvas(900, 500)
    randomX = width/2

    noiseX = width/2
    offSet = 0
}

function draw() {
    background(30);


    noiseX = noise(offset) * width;
    noiseY = noise(offset+1000) * height;
    ellipse(noiseX, noiseY, 20,20)
    textSize(40);
    fill('tomato');
    text('noise', width/2, 3*height/4);
    offset += 0.01
}