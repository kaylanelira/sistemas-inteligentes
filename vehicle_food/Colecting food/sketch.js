let vehicle;
let target;

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle(100, 100);
}

function draw() {
  background(0);
  fill(255, 0, 0);
  noStroke();
  vehicle.show();
}