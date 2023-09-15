class Heap_node {
  constructor(cost, gcost, object) {
    this.cost = cost;
    this.gcost = gcost;
    this.object = object;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  insert(cost, gcost, object) {
    const newNode = new Heap_node(cost, gcost, object);
    this.heap.push(newNode);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[index].cost >= this.heap[parentIndex].cost) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return minValue;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let leftChildIndex = this.getLeftChildIndex(index);
      let rightChildIndex = this.getRightChildIndex(index);
      let smallestIndex = index;

      if (leftChildIndex < length && this.heap[leftChildIndex].cost <     this.heap[smallestIndex].cost) {
        smallestIndex = leftChildIndex;
      }

      if (rightChildIndex < length && this.heap[rightChildIndex].cost < this.heap[smallestIndex].cost) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === index) break;

      this.swap(index, smallestIndex);
      index = smallestIndex;
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
  
  flush() {
  this.heap = []; // Clear the heap and make it empty
  }
  
}  
