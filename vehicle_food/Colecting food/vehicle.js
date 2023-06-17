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
  }
  
  seek(target) {
    let force = p5.Vector.sub(target.pos, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  distance(food_x, food_y) {
    var distances = dist(this.pos.x, this.pos.y, food_x, food_y);
    return distances;
  }
}