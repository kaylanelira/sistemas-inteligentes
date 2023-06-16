class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 5;
    this.maxSpeed = 4;
    this.maxForce = 0.25;
  }
  
  show() {
    stroke(255);
    strokeWeight(8);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
    pop();
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.edges();
  }
  
  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  edges() {
    // left edge
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    // right edge
    } else if (this.pos.x < this.r) {
      this.pos.x = width + this.r;
    } 
    // top edge
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    // bottom edge
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r; 
    }
  }
  
  // TODO refatorar depois
  distance(food_x, food_y) {
    var distances = [dist(-this.r, -this.r/2, food_x, food_y), dist(this.r, this.r/2, food_x, food_y), dist(this.r/2, this.r, food_x, food_y)]
    return distances;
  }
}