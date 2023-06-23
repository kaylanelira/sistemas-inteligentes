let vehicle;
let food;
let distance;
let foodColor = 255;

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle(100, 100);
  food = new Food(0, 0);
}

function draw() {
  // background
  background(0);

  // food
  food.show();
  if (!food.isOnScreen) {
    drawFood();
  }
  verifyColision();
  
  // vehicle
  vehicle.show();
  vehicle.update();
  
  // seeking food
  vehicle.seek(food);
}

function verifyColision() {
  distance = vehicle.distanceToVehicle(food.pos.x, food.pos.y); 
  if (distance <= food.radius) {
    food.count++;
    food.isOnScreen = false;
    print("Donut count: " + food.count);
  } else {
    food.show();
  }
}

function drawFood() {
  food.updatePosition();
  food.isOnScreen = true;
}