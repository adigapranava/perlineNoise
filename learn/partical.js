function Particle() {
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.MAXSPEED = 4;
    this.prevPos = this.pos.copy();

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.update = function(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.limit(this.MAXSPEED);


        if(this.pos.x < 0) {
            this.pos.x=width;
            this.updatePrev();
        };
        if(this.pos.x > width){
            this.pos.x=0;
            this.updatePrev();
        }
        if(this.pos.y < 0){
            this.pos.y=height;
            this.updatePrev();
        }
        if(this.pos.y > height) {
            this.pos.y=0;
            this.updatePrev();
        }
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    // this.show = function() {
    //     push();
    //     let t = frameCount * 0.01 + this.pos.x * 0.01 + this.pos.y * 0.01;
    //     let hue = noise(t) * 360;
    //     colorMode(HSB, 360, 100, 100, 100);
    //     stroke(hue, 80, 100, 25);
    //     strokeWeight(1);
    //     point(this.pos.x, this.pos.y);
    //     pop();
    // }

    this.show = function() {
        push();
        let noiseScale = 0.005;
        let t = frameCount * 0.005;
        let hue = noise(this.pos.x * noiseScale + t, this.pos.y * noiseScale + t) * 360;
        colorMode(HSB, 360, 100, 100, 100);
        stroke(hue, 60, 100, 8);
        // stroke(0,0,0, 90)
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
        pop();
    }





    this.follow = function(vectors) {
        var x = floor(this.pos.x / scale);
        var y = floor(this.pos.y / scale);
        var index = x + y * columns;
        // console.log(index);
        
        var force = vectors[index]
        // console.log(force);
        
        this.applyForce(force);
    }

     
}