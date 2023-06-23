class Food {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.radius = 20;
    this.count = 0;
    this.coloring = createVector(255, 0, 0);
    this.isOnScreen = false;
  }
  
  updatePosition(){
    this.pos = createVector(random(width), random(height));
    this.show();
  }
  
  show() {
    fill('brown');
    circle(this.pos.x, this.pos.y, this.radius);
    fill('pink');
    circle(this.pos.x, this.pos.y, this.radius-3);
    fill('black');
    circle(this.pos.x, this.pos.y, this.radius-12);
    noStroke();
  }
}