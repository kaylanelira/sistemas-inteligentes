class Food {
  constructor(world, agent) {
    this.world = world;
    this.agent = agent;
    this.row = 0;
    this.col = 0;
  }
  
  // Posicionar a comida em uma posição inicial aleatória que não seja um obstáculo
  // e que não coincida com a posição inicial do agente
  placeFoodRandomly() {
    let emptyCellFound = false;
    while (!emptyCellFound) {
      this.row = floor(random(this.world.rows));
      this.col = floor(random(this.world.cols));
      
      if ( this.world.grid[this.row][this.col] !== OBSTACLE &&
         (this.row !== this.agent.row || this.col !== this.agent.col)){
        
        emptyCellFound = true;
      }
    }
  }
  
  // Função para exibir a comida no canvas
  display() {
    stroke(0);
    fill(255, 0, 0); // Vermelho
    this.size = this.world.cellSize / 2;
    this.x = this.col * this.world.cellSize + this.world.cellSize / 2;
    this.y = this.row * this.world.cellSize + this.world.cellSize / 2;
    ellipse(this.x, this.y, this.size);
  }
}