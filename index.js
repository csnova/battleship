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
    this.sunkShips = 0
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

  receiveAttack(location) {
    if (this.gameBoard[location] === null) {
      this.gameBoard[location] = "miss"
    } else if (this.gameBoard[location] !== "hit") {
      if (this.gameBoard[location] === "carrier") {
        this.carrier.getHit()
        this.carrier.isSunk()
        if (this.carrier.sunk === true) this.sunkShips++
      }
      if (this.gameBoard[location] === "battleship") {
        this.battleship.getHit()
        this.battleship.isSunk()
        if (this.battleship.sunk === true) this.sunkShips++
      }
      if (this.gameBoard[location] === "destroyer") {
        this.destroyer.getHit()
        this.destroyer.isSunk()
        if (this.destroyer.sunk === true) this.sunkShips++
      }
      if (this.gameBoard[location] === "submarine") {
        this.submarine.getHit()
        this.submarine.isSunk()
        if (this.submarine.sunk === true) this.sunkShips++
      }
      if (this.gameBoard[location] === "patrolBoat") {
        this.patrolBoat.getHit()
        this.patrolBoat.isSunk()
        if (this.patrolBoat.sunk === true) this.sunkShips++
      }
      this.gameBoard[location] = "hit"
    }
  }

  allShipsSunk() {
    if (this.sunkShips >= 5) return true
    else return false
  }
}

class Player {
  constructor() {
    this.turn = "player"
  }

  playerTurn(location, computerBoard) {
    if (this.turn === "player") {
      computerBoard.receiveAttack(location)
    }
    this.turn = "computer"
  }

  computerTurn(location, gameBoard) {
    if (this.turn === "computer") {
      if (gameBoard.gameBoard[location] === "hit" || gameBoard.gameBoard[location] === "miss") {
        return "invalid move"
      } else {
        gameBoard.receiveAttack(location)
        this.turn = "player"
        return "valid"
      }
    }
  }

  getRandomLocation() {
    let ranNumber = Math.floor(Math.random() * 100);
    return ranNumber
  }
}

function displayEmptyGameboard(parentId, idName, className) {
  const playerBoard = document.getElementById(`${parentId}`)
  for (let i = 0; i < 100; i++) {
    const divSquare = document.createElement("div");
    divSquare.setAttribute(`id`, `${idName}${i}`);
    divSquare.classList.add(`${className}`);
    playerBoard.appendChild(divSquare);
  }
}

function displayGameboard(board, idName) {
  for (let i = 0; i < 100; i++) {
    const currentValue = board.gameBoard[i];
    const square = document.getElementById(`${idName}${i}`)
    if (currentValue !== null) {
      square.classList.add(`${currentValue}`);
    }
  }
}

displayEmptyGameboard("gameboard", "square", "playerSquares");
displayEmptyGameboard("enemyGameboard", "enemySquare", "enemySquares");



// module.exports = {
//   Ship,
//   GameBoard,
//   Player,
// };