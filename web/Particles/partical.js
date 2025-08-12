function Particle(x, y) {
    if (x === undefined || y === undefined) {
        this.pos = createVector(random(width), random(height));
    } else {
        this.pos = createVector(x, y);
    }
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.MAXSPEED = 4;
    this.prevPos = this.pos.copy();

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.update = function() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.limit(this.MAXSPEED);

        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

this.show = function() {
    push();
    // Set a bright color for the glow
    stroke(173, 255, 47); 
    strokeWeight(10);

    // Enable glow effect using shadow properties
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(173, 255, 47);

    point(this.pos.x, this.pos.y);
    this.updatePrev();
    pop();
}


    this.follow = function(vectors) {
        
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * columns;
        let force = vectors[index];
        this.applyForce(force);
    }
}
