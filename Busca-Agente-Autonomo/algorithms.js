class Algorithms {
  
  constructor() {}

  // Algoritmo de busca em largura
  breadthFirstSearch(startRow, startCol, foodRow, foodCol, world) {
    visitedNodes = [];
    frontier = [];
    
    const queue = [];
    const visited = new Set();
    const path = new Map();
    const startNode = [startRow, startCol];
    
    queue.push(startNode);
    visited.add(startNode.toString());

    while (queue.length > 0) {
      const currentNode = queue.shift();
      const [currentRow, currentCol] = currentNode;
      visitedNodes.push(currentNode); // Adicionar nó atual aos nós visitados
      
      if (currentRow === foodRow && currentCol === foodCol) {
        // Encontrou o estado objetivo (posição da comida)
        return this.reconstructPath(path, startNode, currentNode);
      }
      
      const neighbors = world.getNeighbors(currentRow, currentCol);
      for (const neighbor of neighbors) {
        
        const [neighborRow, neighborCol] = neighbor;
        const neighborNode = [neighborRow, neighborCol];

        if (!visited.has(neighborNode.toString())) {
          queue.push(neighborNode);
          visited.add(neighborNode.toString());
          path.set(neighborNode.toString(), currentNode);
          frontier.push(neighborNode); // Adicionar vizinho à lista de fronteira

        }
    }
  }
       
    // Caso não encontre caminho, retorna nulo
    return null;
  }

  // Função auxiliar para reconstruir o caminho a partir das informações de pais
  reconstructPath(path, startNode, endNode) {
    const pathNodes = [];
    let currentNode = endNode;
    
    while (currentNode.toString() !== startNode.toString()) {
      pathNodes.push(currentNode);
      currentNode = path.get(currentNode.toString());
    }
    
    pathNodes.push(startNode);
    return pathNodes.reverse();
  }
    
  // Algoritmo de busca em profundidade (DFS)
  depthFirstSearch(startRow, startCol, foodRow, foodCol, world) {
    visitedNodes = [];
    frontier = [];
    
    const stack = [];
    const visited = new Set();
    const path = new Map();

    
    const startNode = [startRow, startCol];  
    stack.push(startNode);
    visited.add(startNode.toString());

    while (stack.length > 0) {
      const currentNode = stack.pop();
      const [currentRow, currentCol] = currentNode;
      visitedNodes.push(currentNode); // Adicionar nó atual aos nós visitados
      
      if (currentRow === foodRow && currentCol === foodCol) {
        // Encontrou o estado objetivo (posição da comida)
        return this.reconstructPath(path, startNode, currentNode);
      }

      const neighbors = world.getNeighbors(currentRow, currentCol);
    for (const neighbor of neighbors) {
      const [neighborRow, neighborCol] = neighbor;
      const neighborNode = [neighborRow, neighborCol];

      if (!visited.has(neighborNode.toString())) {
        stack.push(neighborNode);
        visited.add(neighborNode.toString());
        path.set(neighborNode.toString(), currentNode);
        frontier.push(neighborNode); // Adicionar vizinho à lista de fronteira
      }
    }
  }
    // Caso não encontre caminho, retorna nulo
    return null;
  }
  
  
  // Algoritmo de busca de custo uniforme
  uniformCostSearch(startRow, startCol, foodRow, foodCol, world) {
      visitedNodes = [];
      frontier = [];
    
      const queue = new PriorityQueue();
      const visited = new Set();
      const path = new Map();
      const startNode = [startRow, startCol];
  
      queue.enqueue(startNode, 0);
      visited.add(startNode.toString());
      visitedNodes.push(startNode); // Adicionar nó inicial aos nós visitados

  
      while (!queue.isEmpty()) {
        const { element: currentNode, cost: currentCost } = queue.dequeue();
        const [currentRow, currentCol] = currentNode;
        visitedNodes.push(currentNode); // Adicionar nó aos nós visitados

  
        if (currentRow === foodRow && currentCol === foodCol) {
          // Encontrou o estado objetivo (posição da comida)
          return this.reconstructPath(path, startNode, currentNode);
        }
  
        const neighbors = world.getNeighbors(currentRow, currentCol);
        for (const neighbor of neighbors) {
          const [neighborRow, neighborCol] = neighbor;
          const neighborNode = [neighborRow, neighborCol];
  
          // Obtemos o custo do vizinho (nó atual já tem custo armazenado em world)
          const neighborCost = world.custoUniGrid[neighborRow][neighborCol];
    
          const newCost = currentCost + neighborCost;
  
          if (!visited.has(neighborNode.toString())) {
              queue.enqueue(neighborNode, newCost);
              visited.add(neighborNode.toString());
              path.set(neighborNode.toString(), currentNode);
              frontier.push(neighborNode); // Adicionar vizinho à lista de fronteira
          }
        }
      }
  
      // Caso não encontre caminho, retorna nulo
      return null;
    }

  // Algoritmo de busca gulosa
  greedySearch(startRow, startCol, foodRow, foodCol, world) {
    const heuristic = (row, col) => {
      return Math.abs(foodRow - row) + Math.abs(foodCol - col);
    };
    
    visitedNodes = [];
    frontier = [];

    const queue = new PriorityQueue();
    const visited = new Set();
    const path = new Map();
    const startNode = [startRow, startCol];

    // Adiciona nó inicial com heurística na fila
    queue.enqueue(startNode, heuristic(startRow, startCol));
    visited.add(startNode.toString());

    // Visita os nós
    while (!queue.isEmpty()) {
      // Retira o nó atual
      const { element: currentNode, cost: currentCost } = queue.dequeue();
      const [currentRow, currentCol] = currentNode;
      visitedNodes.push(currentNode); // Adicionar nó atual aos nós visitados
      
      
      if (currentRow === foodRow && currentCol === foodCol) {
        // Encontrou o estado objetivo (posição da comida)
        return this.reconstructPath(path, startNode, currentNode);
      }

      const neighbors = world.getNeighbors(currentRow, currentCol);
      for (const neighbor of neighbors) {
        const [neighborRow, neighborCol] = neighbor;
        const neighborNode = [neighborRow, neighborCol];

        if (!visited.has(neighborNode.toString())) {
          visited.add(neighborNode.toString());
          path.set(neighborNode.toString(), currentNode);

          // Estima o custo do caminho restante usando a heurística
          const heuristicCost = heuristic(neighborRow, neighborCol);

          // Prioriza os nós que parecem mais próximos usando a heurística como custo
          queue.enqueue(neighborNode, heuristicCost);
          frontier.push(neighborNode); // Adicionar vizinho à lista de fronteira
        }
      }
    }

    // Caso não encontre caminho, retorna nulo
    return null;
  }
  
  // Algoritmo de busca A*
  aStarSearch(startRow, startCol, foodRow, foodCol, world) {
    visitedNodes = [];
    frontier = [];
    
    const heap = new MinHeap();
    const visited = new Set();
    const path = new Map();
    const startNode = [startRow, startCol];
    let gcost = 0;
    let hcost = 0;
    
    
    heap.insert( 0, 0, startNode);
    visited.add(startNode.toString());
    
    while (heap.size() > 0) {
      const currentNode = heap.extractMin();
      const [currentRow, currentCol] = currentNode.object;
      visitedNodes.push(currentNode.object); // Adicionar nó atual aos nós visitados
      
      if (currentRow === foodRow && currentCol === foodCol) {
        // Encontrou o estado objetivo (posição da comida)
        heap.flush();
        return this.reconstructPath(path, startNode, currentNode.object);
      }
      
      const neighbors = world.getNeighbors(currentRow, currentCol);
      for (const neighbor of neighbors) {
        const [neighborRow, neighborCol] = neighbor;
        const neighborNode = [neighborRow, neighborCol];
        
        if (!visited.has(neighborNode.toString()))
        {
          //Avalia-se o custo g do tile vizinho analisado
          //g = g(antecessor)  + peso do terreno do sucessor
          switch(world.grid[neighborRow][neighborCol])
          {
            case SAND: 
              gcost = currentNode.gcost + 1;
              break;
            case MUD: 
              gcost = currentNode.gcost + 5;
              break;
            case WATER: 
              gcost = currentNode.gcost + 10;
              break;
            default:
              gcost = currentNode.gcost + 50;
              //So por garantia, se algum terreno nao eh nenhum dos tipo permitidos de terreno eu realmente nao quero que o agente percorra esse caminho
          }
          
          //Avalia-se o custo h do tile vizinho analisado
          //Como nao ha movimento diagonal, nao usa-se pitagoras
          hcost = abs(neighborNode[0] - foodRow) + 
                  abs(neighborNode[1] - foodCol)
          
          heap.insert(gcost + hcost, gcost, neighborNode);
          
          visited.add(neighborNode.toString());
          path.set(neighborNode.toString(), currentNode.object);
          frontier.push(neighborNode); // Adicionar vizinho à lista de fronteira
        }
      }
    }
    
    // Caso não encontre caminho, retorna nulo
    return null;
    // Retorna o caminho encontrado até a comida
  }
}


class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element, cost) {
    this.queue.push({ element, cost });
    this.queue.sort((a, b) => a.cost - b.cost);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

