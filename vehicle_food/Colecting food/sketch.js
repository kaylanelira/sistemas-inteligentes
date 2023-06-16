let vehicle;
let food;
let isFoodOnScreen = false;
let foodRadius = 20;
let distances;

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle(100, 100);
}

function draw() {
  // background
  background(0);
  fill(255, 0, 0);
  noStroke();

  // food
  if (isFoodOnScreen) {
    setFoodPosition();
    isFoodOnScreen = true;
  }
  colide();
  
  // seeking food
  vehicle.seek(food);  
  
  // vehicle
  vehicle.show();
  vehicle.update();
}

function setFoodPosition() {
  food = createVector(random(width), random(height));
  
  distances = vehicle.distance(food.x, food.y);
  print(distances[0]);
  
  drawFood();
}

function colide() {
  if (distances[0] <= foodRadius || distances[1] <= foodRadius || distances[2] <= foodRadius) {
    isFoodOnScreen = false;
  } else {
    drawFood();
  }
}

function drawFood() {
  if (isFoodOnScreen) {
    circle(food.x, food.y, foodRadius);
  }
}
 
