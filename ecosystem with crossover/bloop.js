// Creature class

// Create a "bloop" creature
class Bloop {
  constructor(l, dna_) {
    this.position = l.copy(); // Location
    this.health = 200; // Life timer
    this.xoff = random(1000); // For perlin noise
    this.yoff = random(1000);
    this.dna = dna_; // DNA
    // DNA will determine size, maxspeed and vision range
    // The bigger the bloop, the slower it is and has a bigger vision range
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = map(this.dna.genes[0], 0, 1, 0, 50);
    this.visionRange = map(this.dna.genes[1], 0, 1, 10 + this.r, 50 + this.r);
    this.hasReproduced = false;
  }

  run(f) {
    this.update(f);
    this.borders();
    this.display();
  }
  
  // A bloop can find food and eat it
  eat(f) {
    let food = f.getFood();
    // Are we touching any food objects?
    for (let i = food.length - 1; i >= 0; i--) {
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      
      // If we are, juice up our strength!
      if (d < this.r / 2) {
        this.health += 100;
        food.splice(i, 1);
      }
    }
  }

  reproduce(bloops) {
    let partner = this.selectPartner(bloops);
    
    if (partner && partner != this && !this.hasReproduced) {
    
      let crossoverPoint = floor(random(this.dna.genes.length));

      let childGenes = [];

      for (let i = 0; i < this.dna.genes.length; i++) {
        if (i < crossoverPoint)
          childGenes[i] = this.dna.genes[i];
        else childGenes[i] = partner.dna.genes[i];
      } 

      let childDNA = new DNA(childGenes);

      // Child DNA can mutate
      childDNA.mutate(0.01);
      this.hasReproduced = true;
      return new Bloop(this.position, childDNA);
    } 
  }
  
  selectPartner(bloops) {
  let eligiblePartners = [];
  
  for (let i = 0; i < bloops.length; i++) {
    let bloopLocation = bloops[i].position;
    let d = p5.Vector.dist(this.position, bloopLocation);
    if (bloops[i] != this && d <= this.visionRange) {
      eligiblePartners.push(bloops[i]);
    }
  }
  
  if (eligiblePartners.length == 0) {
    return null;
  } 
  
  let randomPartner = floor(random(eligiblePartners.length));
  return eligiblePartners[randomPartner];
}


  // Method to update position
  update(f) {
    let food = f.getFood();
    // Simple movement based on perlin noise
    let vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;
    
    // changing direction if food is within range
    for (let i = food.length - 1; i >= 0; i--) {
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      
      if (d <= this.visionRange/2) {
          let foodDirection = p5.Vector.sub(foodLocation, this.position);
          foodDirection.setMag(this.maxspeed);
          foodDirection.sub(velocity);
          velocity = foodDirection; 
      }
    }
    
    this.position.add(velocity);
      
    // Death always looming
    this.health -= 0.2;
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r/2) this.position.x = width+this.r/2;
    if (this.position.y < this.r/2) this.position.y = height+this.r/2;
    if (this.position.x > width+this.r/2) this.position.x = -this.r/2;
    if (this.position.y > height+this.r/2) this.position.y = -this.r/2;
  }

  // Method to display
  display() {
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
    
    // vision range
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(color(255, 255, 0, 50), this.health);
    ellipse(this.position.x, this.position.y, this.visionRange, this.visionRange);
  }
  
// Death
  dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
