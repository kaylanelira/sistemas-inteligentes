class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 5;
    this.maxSpeed = 4;
    this.maxForce = 0.25;
    this.seekDirection = createVector(random(width), random(height));
    this.force = p5.Vector.sub(this.seekDirection, this.pos);
    this.fieldOfViewColor = color(255, 255, 0, 50); 
    this.fieldOfViewRadius = 170;
  }
  
  show() {
    // drawing vehicle as a triangule
    this.drawVehicle();
    // drawing vehicle's field of view 
    this.drawView();
  }
  
  drawVehicle() {
    stroke(255);
    strokeWeight(8);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
    pop();
  }

  drawView() {
    fill(this.fieldOfViewColor);
    noStroke();    
    circle(this.pos.x, this.pos.y, this.fieldOfViewRadius);
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    
    // Check boundary conditions
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
  
  seek(target) {
    if(this.checkIfNeedNewDirection()) {
      this.seekDirection = createVector(random(width), random(height));
    }

    // creating force
    this.force = p5.Vector.sub(this.seekDirection, this.pos);
    
    // If the food is within the vehicle's field view, go to the food
    if (this.distanceToVehicle(target.pos.x, target.pos.y) <= this.fieldOfViewRadius/2) {
      this.force = p5.Vector.sub(target.pos, this.pos);
    }
    this.force.setMag(this.maxSpeed);
    this.force.sub(this.vel);
    this.force.limit(this.maxForce);
    this.applyForce(this.force);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  distanceToVehicle(food_x, food_y) {
    var distanceToVehicle = dist(this.pos.x, this.pos.y, food_x, food_y);
    return distanceToVehicle;
  }

  // checks if vehicle hit a wall or got to the position set and haven't found the food
  checkIfNeedNewDirection() {
    if (this.pos.x == 0 || this.pos.x == width || 
      this.pos.y == 0 || this.pos.y == height || 
      this.distanceToVehicle(this.seekDirection.x, this.seekDirection.y) < 10) {
      return true;
    } else {
      return false;
    }
  }
}