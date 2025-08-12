function Blob() {
    this.x = 0;
    this.y = 0;
    this.radius = 10;
    this.color = 'rgba(255, 0, 0, 0.5)';
    this.xoff = random(1000); // Offset for noise
    this.yoff = random(1000); // Offset for noise
    this.roff = random(1000); // Offset for radius noise
}

Blob.prototype.update = function() {
    // Use noise() for smooth movement
    this.x = map(noise(this.xoff), 0, 1, 0, width);
    this.y = map(noise(this.yoff), 0, 1, 0, height);
    this.radius = map(noise(this.roff), 0, 1, 10, 50);
    
    // Increment offsets
    this.xoff += 0.01;
    this.yoff += 0.01;
    this.roff += 0.02;
    
    this.color = 'rgba(255, 0, 0, ' + map(this.radius, 10, 50, 0, 1) + ')';
}

Blob.prototype.display = function() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius);
}