let xOffSet = 0;
let yOffSet = 0;
let inc = 0.01;
let start = 0;
let speed = 0.01;

function setup() {
    createCanvas(900, 500);
    pixelDensity(1);
}

function draw() {
    // background(30);
    loadPixels();
    yOffSet = start;
    for (let x = 0; x < width; x++) {
        xOffSet = 0;
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let col = map(noise(xOffSet, yOffSet), 0,1,0, 255);
            pixels[index + 0] = 10;
            pixels[index + 1] = col;
            pixels[index + 2] = 250;
            pixels[index + 3] = 255;
            xOffSet += inc;
        }
        yOffSet += inc;
    }
    start -= speed;
    updatePixels();
}