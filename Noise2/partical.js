function Particle(x, y) {
    if (x === undefined || y === undefined) {
        this.pos = createVector(random(width), random(height));
    } else {
        this.pos = createVector(x, y);
    }
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();
}

Particle.prototype.applyForce = function(force) {
    this.acc.add(force);
};

Particle.prototype.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
};

Particle.prototype.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
}

Particle.prototype.edges = function() {
    if (this.pos.x > width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x <= 0) {
        this.pos.x = width;
        this.updatePrev();
      }
      if (this.pos.y > height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = height;
        this.updatePrev();
      }
  
}

Particle.prototype.show = function() {
    // make rainbow colors with HSB and 20% alpha
    // colorMode(HSB); 
    // stroke(floor(random(100)), 100, 70);
    stroke(0);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    // colorMode(RGB); 
    // line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
};

Particle.prototype.follow = function(vectors) {
    for (let i = 0; i < vectors.length; i++) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = vectors[index];
        // let angle = force.heading();
        // let angleDiff = this.vel.heading() - angle;
        // let steer = p5.Vector.fromAngle(angle);
        // steer.setMag(this.maxspeed);
        // steer.sub(this.vel);
        // steer.limit(0.1);
        // this.applyForce(steer);
        this.applyForce(force);
    }
}