let speedSlider, offsetSlider;

function setup() {
    createCanvas(400, 300);
    speed = 0.1;
    start = 0;
    noOfCurves = 4;
    amplifyFactor = 0.65;

    // Create slider for number of curves and amplify factor
    noOfCurvesSlider = createSlider(1, 100, noOfCurves, 1);
    noOfCurvesSlider.position(15, 10);
    noOfCurvesSlider.style('width', '80px');
    noOfCurvesSlider.attribute('title', 'Number of Curves');

    amplifyFactorSlider = createSlider(0.1, 1, amplifyFactor, 0.05);
    amplifyFactorSlider.position(15, 30);
    amplifyFactorSlider.style('width', '80px');
    amplifyFactorSlider.attribute('title', 'Amplify Factor');
}

function draw() {
    background(220);
    xOffset = 0;
    yOffset = 0;
    // fill pixels with noise
    loadPixels();
    pixelDensity(1);
    noiseDetail(8, 0.65);
    for (let x = 0; x < width; x++) {
        yOffset = 0;
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let c = map(noise(start + xOffset, start + yOffset), 0, 1, 0, 255);
            pixels[index + 0] = c;
            pixels[index + 1] = c;
            pixels[index + 2] = c;
            pixels[index + 3] = 255;
            yOffset += 0.01;
        }
        xOffset += 0.01;
    }
    start += speed;
    updatePixels();

    // Update number of curves and amplify factor values based on sliders
    noOfCurves = noOfCurvesSlider.value();
    amplifyFactor = amplifyFactorSlider.value();

    //text
    noStroke();
    fill(0);
    text('Number of Curves: ' + noOfCurves, 100, 15);
    text('Amplify Factor: ' + amplifyFactor, 100, 35);
    textSize(20);
    text('Noise Visualization', 10, 60);
    textSize(12);
    text('Move the sliders to adjust the number of curves and amplify factor values', 10, 80);

    // press b to go to "back" page
    if (keyIsPressed && key === 'b') {
        window.location.href = "index.html";
    }
}