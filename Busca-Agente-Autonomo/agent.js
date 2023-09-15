class Agent {
  constructor(world) {
    this.world = world;
    this.row = 0;
    this.col = 0;
    this.energy = 100;
    this.speed = 1;         // Velocidade inicial do agente
    this.acceleration = 0;  // Aceleração inicial do agente
  }
  
  // Posicionar o agente em uma posição inicial aleatória que não seja um obstáculo
  placeAgentRandomly() {
    let emptyCellFound = false;
    while (!emptyCellFound) {
      this.row = floor(random(this.world.rows));
      this.col = floor(random(this.world.cols));
      if (this.world.grid[this.row][this.col] !== OBSTACLE) {
        emptyCellFound = true;
      }
    }
  }
  
  // Função para mover o agente para uma posição específica (célula na grade)
  move(row, col, terrain) {
    this.row = row;
    this.col = col;
    this.x = this.col * this.world.cellSize + this.world.cellSize / 2;
    this.y = this.row * this.world.cellSize + this.world.cellSize / 2;

  }
  
  // Função para exibir o agente no canvas
  display() {
    stroke(0);
    fill(0, 255, 0); // Verde
    this.size = this.world.cellSize / 2;
    this.x = this.col * this.world.cellSize + this.world.cellSize / 2;
    this.y = this.row * this.world.cellSize + this.world.cellSize / 2;
    ellipse(this.x, this.y, this.size);
  }
}