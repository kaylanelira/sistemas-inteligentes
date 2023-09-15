// Constantes para representar os tipos de terreno
const EMPTY = 0;     // Terreno vazio
const OBSTACLE = 1;  // Obstáculo
const SAND = 2;      // Terreno de custo baixo (areia)
const MUD = 4;       // Terreno de custo médio (atoleiro)
const WATER = 6;     // Terreno de custo alto (água)

class World {
  constructor(rows, cols, cellSize) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;
    this.grid = [];
    this.originalGrid = [];
    this.custoUniGrid = []

    // Inicializar o ambiente com terreno vazio (0)
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      this.originalGrid[i] = [];
      this.custoUniGrid[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = 0;
        this.originalGrid[i][j] = 0;  
        this.custoUniGrid[i][j] = 0
      }
    }
  }
  
   generateRandomTerrain(obstacleProb, sandProb, mudProb, waterProb) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Gerar terreno aleatoriamente com base nas probabilidades fornecidas
        const rand = random();
        if (rand < obstacleProb) {
          this.grid[i][j] = OBSTACLE;
          this.originalGrid[i][j] = OBSTACLE;
          this.custoUniGrid[i][j] = 999;
        } else if (rand < obstacleProb + sandProb) {
          this.grid[i][j] = SAND;
          this.originalGrid[i][j] = SAND;
          this.custoUniGrid[i][j] = 1;
        } else if (rand < obstacleProb + sandProb + mudProb) {
          this.grid[i][j] = MUD;
          this.originalGrid[i][j] = MUD;
          this.custoUniGrid[i][j] = 5;
        } else if (rand < obstacleProb + sandProb + mudProb + waterProb) {
          this.grid[i][j] = WATER;
          this.originalGrid[i][j] = WATER;
          this.custoUniGrid[i][j] = 10;
        }
      }
    }
   }
  
  // Definir cores para cada tipo de terreno
  getColorForTerrain(terrain) {
    switch (terrain) {
      case EMPTY:
        return color(255);   // Branco para terreno vazio
      case OBSTACLE:
        return color(0);     // Preto para obstáculos
      case SAND:
        return color(255, 255, 153, 150);  // Amarelo claro para areia
      case MUD:
        return color(102, 51, 0, 150);    // Marrom para atoleiro
      case WATER:
        return color(0, 102, 255, 150);   // Azul para água
      default:
        return color(255);
    }
  }
   
  // Função para obter os vizinhos de uma célula (para busca em largura)
  getNeighbors(row, col) {
    const neighbors = [];
    const directions = [
      [-1, 0], // cima
      [1, 0],  // baixo
      [0, -1], // esquerda
      [0, 1]   // direita
    ];
    
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      
      if (this.isValidCell(newRow, newCol) && this.grid[newRow][newCol] !== OBSTACLE) {
        neighbors.push([newRow, newCol]);
      }
    }
    
    return neighbors;
  }

  // Função auxiliar para verificar se a célula é válida (dentro dos limites do mundo)
  isValidCell(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }
  
  // Adicionar o agente e a comida ao ambiente
  addAgentAndFood() {
    this.agent = new Agent(this);
    this.food = new Food(this, this.agent);

    this.agent.placeAgentRandomly();
    this.food.placeFoodRandomly();
  }
  
  // Exibir o ambiente no canvas
  display() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const x = j * this.cellSize;
        const y = i * this.cellSize;
        const terrain = this.grid[i][j];
        noStroke();
        fill(this.getColorForTerrain(terrain));
        rect(x, y, this.cellSize, this.cellSize);
      }
    }
  }
}