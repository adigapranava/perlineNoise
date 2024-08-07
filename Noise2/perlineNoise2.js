var inc = 0.01;
var start = 0;
var scl = 20;
var speed = 0.005;
var start = 0;
var numberOfParticles = 1000;
var particles = [];
var flowField = [];
var moveField = true;

function setup() {
    // add a checkbox to toggle the flow field
    createDiv('Move Field').id('moveField');
    let moveFieldCheckbox = createCheckbox('', moveField);
    moveFieldCheckbox.changed(() => {
        moveField = !moveField;
    }
    );

    createCanvas(400, 400);

    // add a frame rate tag
    createDiv('Frame rate: ').id('frameRate');
    // create a frame for code
    createDiv('Code').id('code');
    // add a text element to display "Hello World"
    createElement('pre', `
        particles.forEach(p => {
            p.follow(flowField);
            p.update();
            p.edges();
            p.show();
        });
    `).parent('code')
    .style('background-color', '#F0F0F0')
    .style('color', '#000000');
    rows = floor(width / scl);
    cols = floor(height / scl);

    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(220);
    var yOff = 0;
    flowField = [];
    for (let x = 0; x < rows    ; x++) {
        var xOff = 0;
        for (let y = 0; y < cols; y++) {
            let angle = map(noise(start+xOff, start+yOff), 0, 1, 0, TWO_PI);
            let v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowField.push(v);
            xOff += 0.1;

            
            push();
                translate(x * scl, y * scl);
                rotate(v.heading());
                stroke(0, 50);
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
    if (moveField) {
        start += speed;
    }
    particles.forEach(p => {
        p.follow(flowField);
        p.update();
        p.edges();
        p.show();
    });
    select('#frameRate').html("Frame rate: " + frameRate().toFixed(2));
}