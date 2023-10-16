class Ship {
  constructor(size, hits = 0, sunk = false) {
    this.size = size;
    this.hits = hits;
    this.sunk = sunk;
  }

  getHit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits >= this.size) {
      this.sunk = true;
    }
  }
}

class GameBoard {
  constructor() {
    this.gameBoard = new Array(100).fill(null);
    this.carrier = "";
    this.battleship = "";
    this.destroyer = "";
    this.submarine = "";
    this.patrolBoat = "";
  }

  placeShip(name, size, direction, location) {
    if (name === "carrier") {
      this.carrier = new Ship(size);
    }
    if (name === "battleship") {
      this.battleship = new Ship(size);
    }
    if (name === "destroyer") {
      this.destroyer = new Ship(size);
    }
    if (name === "submarine") {
      this.submarine = new Ship(size);
    }
    if (name === "patrolBoat") {
      this.patrolBoat = new Ship(size);
    }
    let currentLocation;
    if (direction === "x") {
      for (let i = 0; i < size; i++) {
        currentLocation = location + i;
        this.gameBoard[currentLocation] = name;
      }
    }
    currentLocation = location;
    if (direction === "y") {
      for (let i = 0; i < size; i++) {
        this.gameBoard[currentLocation] = name;
        currentLocation = currentLocation + 10;
      }
    }
  }
}

module.exports = {
  Ship,
  GameBoard,
};
