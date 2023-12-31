// Constructor (makes a random DNA)
class DNA {
  constructor(newgenes) {
    if (newgenes) {
      this.genes = newgenes;
    } else {
      // The genetic sequence
      // DNA is random floating point values between 0 and 1
      this.genes = new Array(2); // one to size and speed, the other one to vision range
      for (let i = 0; i < this.genes.length; i++) {
        this.genes[i] = random(0, 1);
      }
    }
  }

  copy() {
    // should switch to fancy JS array copy
    let newgenes = [];
    for (let i = 0; i < this.genes.length; i++) {
      newgenes[i] = this.genes[i];
    }

    return new DNA(newgenes);
  }

  // Based on a mutation probability, picks a new random character in array spots
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        this.genes[i] = random(0, 1);
      }
    }
  }
}