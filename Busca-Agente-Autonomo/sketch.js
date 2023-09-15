let world;
let agent;
let food;
let path;
let frontier = []; // Nós de fronteira
let visitedNodes = []; // Nós visitados
let finalPath = []; // Caminho final
let searchComplete = true;
let currentPathIndex = 0; 
let currentMoveDelay = 0;
let visitComplete = true;
let indexVArr = 0;
let indexFArr = 0;
let visitSet = new Set();

function setup() {
  createCanvas(1080, 1080);
  const rows = 40;
  const cols = 40;
  const cellSize = width / rows;
  world = new World(rows, cols, cellSize);
  world.generateRandomTerrain(0.1, 0.3, 0.3, 0.3); // Exemplo de probabilidades, ajuste conforme necessário
  world.addAgentAndFood();
  
  algorithms = new Algorithms();
  selectedAlgorithm = "BFS"; // Algoritmo de busca em largura (inicialmente selecionado)
  
  // Texto
  const txt = createP("Escolha um Algoritmo de Busca:");
  txt.position(10, height + 5);
  txt.style("background-color", "rgba(255, 255, 255, 0.5)");
  
  // Botões para escolher o algoritmo
  const bfsButton = createButton("BFS");
  bfsButton.position(10, height + 45);
  bfsButton.mousePressed(() => {
    selectedAlgorithm = "BFS";
  });
  
  const dfsButton = createButton("DFS");
  dfsButton.position(50, height + 45);
  dfsButton.mousePressed(() => {
    selectedAlgorithm = "DFS";
  });
  
  const uniformCostButton = createButton("Custo Uniforme");
  uniformCostButton.position(90, height + 45);
  uniformCostButton.mousePressed(() => {
    selectedAlgorithm = "UniformCost";
  });
  
  const greedyButton = createButton("Gulosa");
  greedyButton.position(200, height + 45);
  greedyButton.mousePressed(() => {
    selectedAlgorithm = "Greedy";
  });
  
  const aStarButton = createButton("A*");
  aStarButton.position(257, height + 45);
  aStarButton.mousePressed(() => {
    selectedAlgorithm = "AStar";
  });
  
  const startButton = createButton("Iniciar Busca");
  startButton.position(10, height + 85);
  startButton.mousePressed(() => {
    startSearch();

  });
  
  const resetButton = createButton("Reiniciar");
  resetButton.position(110, height + 85);
  resetButton.mousePressed(() => {
    path = null;
    frontier = []; // Nós de fronteira
    visitedNodes = []; // Nós visitados
    finalPath = []; // Caminho final
    searchComplete = true;
    currentPathIndex = 0; 
    currentMoveDelay = 0;
    indexVArr = 0;
    indexFArr = 0;
    visitSet = new Set();
    visitComplete = true;
    setup();
  });
  

}

function draw() {
  

  world.agent.display();
  world.food.display();
  
  if(visitComplete){
    
    background(255);
    world.display();
    // Exibir o agente e a comida no canvas
    world.agent.display();
    world.food.display();
    
    // Exibir o caminho final escolhido
    if (path) {
      noFill();
      stroke(0,255,0);
      strokeWeight(world.cellSize * 0.1);

      beginShape();
      for (const node of path) {
        const [row, col] = node;
        const x = col * world.cellSize + world.cellSize / 2;
        const y = row * world.cellSize + world.cellSize / 2;
        vertex(x, y);
      }
      endShape();

    }
      //noStroke();
      fill("white");
      textSize(20);
      stroke("black");
      textAlign(LEFT);
      text(`Algoritmo selecionado: ${selectedAlgorithm}`, 10, height-10);

    // Verificar colisão entre o agente e a comida
    if (
      !world.foodEaten &&
      world.agent.row === world.food.row &&
      world.agent.col === world.food.col
    ) {
      world.foodEaten = true;
      world.foodCount++;
    }

    // Gerar nova comida se a anterior foi comida
    if (world.foodEaten) {
      world.food.placeFoodRandomly();
      world.foodEaten = false;
      searchComplete = false;
      currentPathIndex = 0;
      
      background(255);
      world.display();
      world.agent.display();
      world.food.display();
      
    }

    // Verificar se a busca ainda não foi realizada

    // Movimentar o agente apenas quando o caminho estiver definido
    if (path && currentPathIndex < path.length && visitComplete) {
      // Verificar se o agente está no nó atual do caminho
      const [currentRow, currentCol] = path[currentPathIndex];


      // Atraso entre os movimentos do agente
      if (currentMoveDelay == 0) {
        // Mover o agente para o próximo nó do caminho
        currentPathIndex++;
        if (currentPathIndex < path.length) {
         const [nextRow, nextCol] = path[currentPathIndex];
         world.agent.move(nextRow, nextCol, world.grid[nextRow][nextCol]);
          terrain = world.grid[nextRow][nextCol];
          currentMoveDelay = 10*terrain;
        }
       } else {
          fill("white");
          textSize(20);
          stroke("black");
          textSize(20);
          textAlign(RIGHT);
          text(`Delay: ${10* terrain - currentMoveDelay}`, width - 10, 30);
         currentMoveDelay--;
      }
    }
    
    if (!searchComplete) {
      // Fazer a busca
      startSearch();

    }
  }
  else{
      
      if (indexVArr != visitedNodes.length ) {
        const [row, col] = visitedNodes[indexVArr];
        
        // set que recebe os nós visitados 
        visitSet.add([row,col].toString());
        //console.log(visitSet.has([row,col].toString()));
        
        //console.log([row, col]);
        //console.log(visitSet);
        printFrontier(row, col);
        const x = col * world.cellSize;
        const y = row * world.cellSize;
        noStroke();
        fill(132, 200, 101, 200); // Verde semi-transparente
        rect(x, y, world.cellSize, world.cellSize);
        indexVArr++;
      }


    if(indexVArr == visitedNodes.length) {
      visitComplete = true;
      indexVArr = 0;
      indexFArr = 0;
      visitSet = new Set();
    }
  }
}

function printFrontier(visitRow, visitCol){
  let frontier = [];
  frontier = world.getNeighbors(visitRow, visitCol);
  //console.log(frontier)
  
  for(let i=0; i < frontier.length; i++){
    //console.log(node);
    let [row, col] = frontier[i];
    //console.log(visitSet);
    
    if(!visitSet.has([row, col].toString())){
      //console.log([row, col]);
      //console.log(visitSet);
      const x = col * world.cellSize;
      const y = row * world.cellSize;
      noStroke();
      fill(162, 0, 255, 120); // Roxo semi-transparente
      rect(x, y, world.cellSize, world.cellSize);
      
    }
  }
}

function startSearch() {
  const startRow = world.agent.row;
  const startCol = world.agent.col;
  const foodRow = world.food.row;
  const foodCol = world.food.col;
  searchComplete = true;
  visitComplete = false;

  // Chamar o algoritmo selecionado
  if (selectedAlgorithm === "BFS") {
    path = algorithms.breadthFirstSearch(startRow, startCol, foodRow, foodCol, world);
  }
  else if (selectedAlgorithm === "DFS") {
    path = algorithms.depthFirstSearch(startRow, startCol, foodRow, foodCol, world);

  }
  else if (selectedAlgorithm === "UniformCost") {
    path = algorithms.uniformCostSearch(startRow, startCol, foodRow, foodCol, world);
  } 
  else if (selectedAlgorithm === "Greedy") {
    path = algorithms.greedySearch(startRow, startCol, foodRow, foodCol, world);
  }
  else if (selectedAlgorithm === "AStar") {
    path = algorithms.aStarSearch(startRow, startCol, foodRow, foodCol, world);
  }
}