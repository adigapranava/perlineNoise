var inc = 0.01;
var start = 0;
var scl = 20;
var speed = 0.005;
var start = 0;

function setup() {
    // slider for speed
    speedSlider = createSlider(0.005, 0.05, speed, 0.01);
    speedSlider.position(15, 140);
    speedSlider.style('width', '80px');
    speedSlider.attribute('title', 'Speed');
    
    createCanvas(400, 400);

    // add a frame rate tag
    createDiv('Frame rate: ').id('frameRate');
    // create a frame for code
    createDiv('Code').id('code');
    // add a text element to display "Hello World"
    createElement('pre', `
            for (let x = 0; x < rows; x++) {
                var xOff = 0;
                for (let y = 0; y < cols; y++) {
                    let angle = map(noise(xOff, yOff), 0, 1, 0, TWO_PI);
                    let v = p5.Vector.fromAngle(angle);
                    xOff += 0.1;
                    
                    push();
                        translate(x * scl, y * scl);
                        rotate(v.heading());
                        stroke(0);
                        strokeWeight(1);
                        line(0, 0, scl, 0);
                    pop();
                }
                yOff += 0.1;
            }
    `).parent('code')
    .style('background-color', '#F0F0F0')
    .style('color', '#000000');
    rows = floor(width / scl);
    cols = floor(height / scl);
}

function draw() {
    background(220);
    speed = speedSlider.value();
    var yOff = 0;
    for (let x = 0; x < rows; x++) {
        var xOff = 0;
        for (let y = 0; y < cols; y++) {
            let angle = map(noise(start+xOff, start+yOff), 0, 1, 0, TWO_PI);
            let v = p5.Vector.fromAngle(angle);
            xOff += 0.1;
            
            push();
                translate(x * scl, y * scl);
                rotate(v.heading());
                stroke(0);
                strokeWeight(1);
                // show arrow in the direction of the vector
                // line(0, 0, scl, 0);
                line(0, 0, scl - 4, 0);
                translate(scl - 4, 0);
                let arrowSize = 4;
                triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
            pop();
        }
        yOff += 0.1;
    }
    start += speed;
    select('#frameRate').html("Frame rate: " + frameRate().toFixed(2));
}