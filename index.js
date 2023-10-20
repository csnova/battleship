// Used to create and store infromation about each ship
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

// Used to create a gameboard for player and computer
// Has methods to place ships, recieve attacks/send hits to ships,
// idenitfy when all ships have been sunk, display the current gameboard,
// and randomly place ships in legal locations.
class GameBoard {
  constructor() {
    this.gameBoard = new Array(100).fill(null);
    this.carrier = "";
    this.battleship = "";
    this.destroyer = "";
    this.submarine = "";
    this.patrolBoat = "";
    this.sunkShips = 0;
    this.placedShips = 0;
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
    this.placedShips++;
  }

  receiveAttack(location) {
    if (this.gameBoard[location] === null) {
      this.gameBoard[location] = "miss";
    } else if (this.gameBoard[location] !== "hit") {
      if (this.gameBoard[location] === "carrier") {
        this.carrier.getHit();
        this.carrier.isSunk();
        if (this.carrier.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Carrier has Sunk";
        }
      }
      if (this.gameBoard[location] === "battleship") {
        this.battleship.getHit();
        this.battleship.isSunk();
        if (this.battleship.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Battleship has Sunk";
        }
      }
      if (this.gameBoard[location] === "destroyer") {
        this.destroyer.getHit();
        this.destroyer.isSunk();
        if (this.destroyer.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Destroyer has Sunk";
        }
      }
      if (this.gameBoard[location] === "submarine") {
        this.submarine.getHit();
        this.submarine.isSunk();
        if (this.submarine.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Submarine has Sunk";
        }
      }
      if (this.gameBoard[location] === "patrolBoat") {
        this.patrolBoat.getHit();
        this.patrolBoat.isSunk();
        if (this.patrolBoat.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Patrol Boat has Sunk";
        }
      }
      this.gameBoard[location] = "hit";
    }
  }

  allShipsSunk() {
    if (this.sunkShips >= 5) {
      return true;
    } else return false;
  }

  displayGameboard(idName) {
    document.getElementById(`${idName}Sunk`).textContent = `${this.sunkShips}`;
    for (let i = 0; i < 100; i++) {
      const currentValue = this.gameBoard[i];
      const square = document.getElementById(`${idName}${i}`);
      if (currentValue !== null) {
        square.classList.add(`${currentValue}`);
      }
    }
  }

  getRandomLocation() {
    let ranNumber = Math.floor(Math.random() * 100);
    return ranNumber;
  }

  getRandomDirection() {
    let ranNumber = Math.floor(Math.random() * 2);
    if (ranNumber === 1) return "x";
    else return "y";
  }

  checkCarrierPlacement() {
    let direction = this.getRandomDirection();
    let ranNumber = this.getRandomLocation();
    if (
      direction === "x" &&
      ((ranNumber <= 95 && ranNumber >= 90) ||
        (ranNumber <= 85 && ranNumber >= 80) ||
        (ranNumber <= 75 && ranNumber >= 70) ||
        (ranNumber <= 65 && ranNumber >= 60) ||
        (ranNumber <= 55 && ranNumber >= 50) ||
        (ranNumber <= 45 && ranNumber >= 40) ||
        (ranNumber <= 35 && ranNumber >= 30) ||
        (ranNumber <= 25 && ranNumber >= 20) ||
        (ranNumber <= 15 && ranNumber >= 10) ||
        ranNumber <= 5)
    ) {
      this.placeShip("carrier", 5, "x", ranNumber);
    } else if (direction === "y" && ranNumber <= 59) {
      this.placeShip("carrier", 5, "y", ranNumber);
    } else this.checkCarrierPlacement();
  }

  checkBattleshipPlacement() {
    let direction = this.getRandomDirection();
    let ranNumber = this.getRandomLocation();
    let isValid = true;
    let currentLocation = ranNumber;
    // Checks to make sure the boat will fit (x)
    if (
      direction === "x" &&
      ((ranNumber <= 96 && ranNumber >= 90) ||
        (ranNumber <= 86 && ranNumber >= 80) ||
        (ranNumber <= 76 && ranNumber >= 70) ||
        (ranNumber <= 66 && ranNumber >= 60) ||
        (ranNumber <= 56 && ranNumber >= 50) ||
        (ranNumber <= 46 && ranNumber >= 40) ||
        (ranNumber <= 36 && ranNumber >= 30) ||
        (ranNumber <= 26 && ranNumber >= 20) ||
        (ranNumber <= 16 && ranNumber >= 10) ||
        ranNumber <= 6)
    ) {
      // Checks to make sure another boat is not already here (x)
      for (let i = 0; i < 4; i++) {
        currentLocation = ranNumber + i;
        if (this.gameBoard[currentLocation] != null) isValid = false;
      }
      if (isValid === true) {
        this.placeShip("battleship", 4, "x", ranNumber);
      } else {
        // If there is a boat it starts over with a new location
        this.checkBattleshipPlacement();
      }
      // Checks to make sure the boat will fit (y)
    } else if (direction === "y" && ranNumber <= 69) {
      // Checks to make sure another boat is not already here (y)
      for (let i = 0; i < 4; i++) {
        if (this.gameBoard[currentLocation] != null) isValid = false;
        currentLocation = currentLocation + 10;
      }
      if (isValid === true) {
        this.placeShip("battleship", 4, "y", ranNumber);
      } else {
        // If there is a boat it starts over with a new location
        this.checkBattleshipPlacement();
      }
      // If the boat wont fit it starts over with a new location
    } else this.checkBattleshipPlacement();
  }

  checkDestroyerPlacement() {
    let direction = this.getRandomDirection();
    let ranNumber = this.getRandomLocation();
    let isValid = true;
    let currentLocation = ranNumber;
    // Checks to make sure the boat will fit (x)
    if (
      direction === "x" &&
      ((ranNumber <= 97 && ranNumber >= 90) ||
        (ranNumber <= 87 && ranNumber >= 80) ||
        (ranNumber <= 77 && ranNumber >= 70) ||
        (ranNumber <= 67 && ranNumber >= 60) ||
        (ranNumber <= 57 && ranNumber >= 50) ||
        (ranNumber <= 47 && ranNumber >= 40) ||
        (ranNumber <= 37 && ranNumber >= 30) ||
        (ranNumber <= 27 && ranNumber >= 20) ||
        (ranNumber <= 17 && ranNumber >= 10) ||
        ranNumber <= 7)
    ) {
      // Checks to make sure another boat is not already here (x)
      for (let i = 0; i < 3; i++) {
        currentLocation = ranNumber + i;
        if (this.gameBoard[currentLocation] != null) isValid = false;
      }
      if (isValid === true) {
        this.placeShip("destroyer", 3, "x", ranNumber);
      } else {
        // If there is a boat it starts over with a new location
        this.checkDestroyerPlacement();
      }
      // Checks to make sure the boat will fit (y)
    } else if (direction === "y" && ranNumber <= 79) {
      // Checks to make sure another boat is not already here (y)
      for (let i = 0; i < 3; i++) {
        if (this.gameBoard[currentLocation] != null) isValid = false;
        currentLocation = currentLocation + 10;
      }
      if (isValid === true) {
        this.placeShip("destroyer", 3, "y", ranNumber);
      } else {
        // If there is a boat it starts over with a new location
        this.checkDestroyerPlacement();
      }
      // If the boat wont fit it starts over with a new location
    } else this.checkDestroyerPlacement();
  }

  checkSubmarinePlacement() {
    let direction = this.getRandomDirection();
    let ranNumber = this.getRandomLocation();
    let isValid = true;
    let currentLocation = ranNumber;
    // Checks to make sure the boat will fit (x)
    if (
      direction === "x" &&
      ((ranNumber <= 97 && ranNumber >= 90) ||
        (ranNumber <= 87 && ranNumber >= 80) ||
        (ranNumber <= 77 && ranNumber >= 70) ||
        (ranNumber <= 67 && ranNumber >= 60) ||
        (ranNumber <= 57 && ranNumber >= 50) ||
        (ranNumber <= 47 && ranNumber >= 40) ||
        (ranNumber <= 37 && ranNumber >= 30) ||
        (ranNumber <= 27 && ranNumber >= 20) ||
        (ranNumber <= 17 && ranNumber >= 10) ||
        ranNumber <= 7)
    ) {
      // Checks to make sure another boat is not already here (x)
      for (let i = 0; i < 3; i++) {
        currentLocation = ranNumber + i;
        if (this.gameBoard[currentLocation] != null) isValid = false;
      }
      if (isValid === true) {
        this.placeShip("submarine", 3, "x", ranNumber);
      } else {
        // If there is a boat it starts over with a new location
        this.checkSubmarinePlacement();
      }
      // Checks to make sure the boat will fit (y)
    } else if (direction === "y" && ranNumber <= 79) {
      // Checks to make sure another boat is not already here (y)
      for (let i = 0; i < 3; i++) {
        if (this.gameBoard[currentLocation] != null) isValid = false;
        currentLocation = currentLocation + 10;
      }
      if (isValid === true) {
        this.placeShip("submarine", 3, "y", ranNumber);
      } else {
        // If there is a boat it starts over with a new location
        this.checkSubmarinePlacement();
      }
      // If the boat wont fit it starts over with a new location
    } else this.checkSubmarinePlacement();
  }

  checkPatrolBoatPlacement() {
    let direction = this.getRandomDirection();
    let ranNumber = this.getRandomLocation();
    let isValid = true;
    let currentLocation = ranNumber;
    // Checks to make sure the boat will fit (x)
    if (
      direction === "x" &&
      ((ranNumber <= 98 && ranNumber >= 90) ||
        (ranNumber <= 88 && ranNumber >= 80) ||
        (ranNumber <= 78 && ranNumber >= 70) ||
        (ranNumber <= 68 && ranNumber >= 60) ||
        (ranNumber <= 58 && ranNumber >= 50) ||
        (ranNumber <= 48 && ranNumber >= 40) ||
        (ranNumber <= 38 && ranNumber >= 30) ||
        (ranNumber <= 28 && ranNumber >= 20) ||
        (ranNumber <= 18 && ranNumber >= 10) ||
        ranNumber <= 8)
    ) {
      // Checks to make sure another boat is not already here (x)
      for (let i = 0; i < 2; i++) {
        currentLocation = ranNumber + i;
        if (this.gameBoard[currentLocation] != null) isValid = false;
      }
      if (isValid === true) {
        this.placeShip("patrolBoat", 2, "x", ranNumber);
      } else {
        // If there is a boat it starts over with a new location
        this.checkPatrolBoatPlacement();
      }
      // Checks to make sure the boat will fit (y)
    } else if (direction === "y" && ranNumber <= 89) {
      // Checks to make sure another boat is not already here (y)
      for (let i = 0; i < 2; i++) {
        if (this.gameBoard[currentLocation] != null) isValid = false;
        currentLocation = currentLocation + 10;
      }
      if (isValid === true) {
        this.placeShip("patrolBoat", 2, "y", ranNumber);
      } else {
        // If there is a boat it starts over with a new location
        this.checkPatrolBoatPlacement();
      }
      // If the boat wont fit it starts over with a new location
    } else this.checkPatrolBoatPlacement();
  }

  placeCompShips() {
    this.checkCarrierPlacement();
    this.checkBattleshipPlacement();
    this.checkDestroyerPlacement();
    this.checkSubmarinePlacement();
    this.checkPatrolBoatPlacement();
  }
}

// Used to run game and keep track of turn order
// Has methods to conduct a players turn, conduct the computers turn,
// control flow of game, have a game over screen, and restart when over
class Player {
  constructor() {
    this.turn = "player";
    this.justHit = false;
  }

  playerTurn(location, computerBoard) {
    if (this.turn === "player") {
      computerBoard.receiveAttack(location);
    }
    this.turn = "computer";
  }

  computerTurn(location, gameBoard) {
    if (this.turn === "computer") {
      if (
        gameBoard.gameBoard[location] === "hit" ||
        gameBoard.gameBoard[location] === "miss"
      ) {
        this.computerTurn(this.getRandomLocation(), gameBoard);
        return "invalid move";
      } else {
        gameBoard.receiveAttack(location);
        this.turn = "player";
        return "valid";
      }
    }
  }

  getRandomLocation() {
    let ranNumber = Math.floor(Math.random() * 100);
    return ranNumber;
  }

  gameLoop(currentId, gameBoard, computerBoard) {
    if (this.turn === "player") {
      if (
        computerBoard.gameBoard[currentId] != "hit" &&
        computerBoard.gameBoard[currentId] != "miss"
      ) {
        this.playerTurn(currentId, computerBoard);
        computerBoard.displayGameboard("enemySquare");
        this.computerTurn(this.getRandomLocation(), gameBoard);
        gameBoard.displayGameboard("square");
        const playerLost = gameBoard.allShipsSunk();
        const compLost = computerBoard.allShipsSunk();
        if (playerLost) this.gameOver("player");
        if (compLost) this.gameOver("computer");
      }
    }
  }

  gameOver(loser) {
    for (let i = 0; i < 100; i++) {
      document.getElementById(`enemySquare${i}`).classList.add("visible");
    }
    removeElementsByClass("inner");
    const textBox = document.getElementById("currentMessage");
    if (loser === "player") {
      textBox.textContent =
        "All of your ships have sunk! Your enemy is the winner.";
      textBox.style.color = "#693205";
    }
    if (loser === "computer") {
      textBox.textContent =
        "You sunk all your enemies ships! You are the winner!";
      textBox.style.color = "#5684e7";
    }
    const buttonBox = document.getElementById("restartBox");
    const button = document.createElement("BUTTON");
    button.classList.add("restartButton");
    button.addEventListener("click", this.restart);
    button.textContent = "Restart";
    buttonBox.appendChild(button);
  }

  restart() {
    removeElementsByClass("restartButton");
    removeElementsByClass("playerSquares");
    removeElementsByClass("enemySquares");
    removeElementsByClass("enemyGameboard");
    displayStartingScreen();
    gameBoard = new GameBoard();
    displayEmptyGameboard("gameboard", "square", "playerSquares", true);
  }
}

// Used to remove screens when no longer needed,
// Removes blocks from list after placed, removes starting screen when game has begun,
// when game over removes event listners so player cant keep playing,
// used in start over to restet screen.
function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// Used at begining to set up ship palcement mechanic, then again at restart
function displayStartingScreen() {
  document.getElementById("squareSunk").textContent = "0";
  document.getElementById("enemySquareSunk").textContent = "0";
  document.getElementById("enemyFleetTitle").textContent = "Place Your Fleet";
  const enemyFleet = document.getElementById("enemyFleet");
  const startingScreen = document.createElement("div");
  startingScreen.classList.add("startingScreen");
  enemyFleet.appendChild(startingScreen);
  const instructions = document.createElement("p");
  instructions.setAttribute(`id`, `instructions`);
  instructions.textContent = "Click to Rotate, Drag Ships Ont Board to Place";
  startingScreen.appendChild(instructions);
  const carrierBox = document.createElement("div");
  carrierBox.classList.add("shipBox");
  carrierBox.setAttribute(`id`, `carrierBox`);
  startingScreen.appendChild(carrierBox);
  const carrierTitle = document.createElement("p");
  carrierTitle.classList.add("shipTitles");
  carrierTitle.textContent = "Carrier";
  carrierBox.appendChild(carrierTitle);
  const carrierImage = document.createElement("IMG");
  carrierImage.classList.add("carrierImage");
  carrierImage.setAttribute(`id`, `carrierImage`);
  carrierImage.setAttribute(`src`, `./images/carrier.png`);
  carrierImage.setAttribute(`alt`, `Picture of Carrier`);
  carrierImage.setAttribute(`draggable`, `true`);
  carrierImage.setAttribute(`ondragstart`, `drag(event)`);
  carrierImage.addEventListener("click", function () {
    rotateImage(this.id);
  });
  carrierBox.appendChild(carrierImage);
  const battleshipBox = document.createElement("div");
  battleshipBox.classList.add("shipBox");
  battleshipBox.setAttribute(`id`, `battleshipBox`);
  startingScreen.appendChild(battleshipBox);
  const battleshipTitle = document.createElement("p");
  battleshipTitle.classList.add("shipTitles");
  battleshipTitle.textContent = "Battleship";
  battleshipBox.appendChild(battleshipTitle);
  const battleshipImage = document.createElement("IMG");
  battleshipImage.classList.add("battleshipImage");
  battleshipImage.setAttribute(`id`, `battleshipImage`);
  battleshipImage.setAttribute(`src`, `./images/battleship.png`);
  battleshipImage.setAttribute(`alt`, `Picture of Battleship`);
  battleshipImage.setAttribute(`draggable`, `true`);
  battleshipImage.setAttribute(`ondragstart`, `drag(event)`);
  battleshipImage.addEventListener("click", function () {
    rotateImage(this.id);
  });
  battleshipBox.appendChild(battleshipImage);
  const destroyerBox = document.createElement("div");
  destroyerBox.classList.add("shipBox");
  destroyerBox.setAttribute(`id`, `destroyerBox`);
  startingScreen.appendChild(destroyerBox);
  const destroyerTitle = document.createElement("p");
  destroyerTitle.classList.add("shipTitles");
  destroyerTitle.textContent = "Destroyer";
  destroyerBox.appendChild(destroyerTitle);
  const destroyerImage = document.createElement("IMG");
  destroyerImage.classList.add("destroyerImage");
  destroyerImage.setAttribute(`id`, `destroyerImage`);
  destroyerImage.setAttribute(`src`, `./images/destroyer.png`);
  destroyerImage.setAttribute(`alt`, `Picture of Destroyer`);
  destroyerImage.setAttribute(`draggable`, `true`);
  destroyerImage.setAttribute(`ondragstart`, `drag(event)`);
  destroyerImage.addEventListener("click", function () {
    rotateImage(this.id);
  });
  destroyerBox.appendChild(destroyerImage);
  const submarineBox = document.createElement("div");
  submarineBox.classList.add("shipBox");
  submarineBox.setAttribute(`id`, `submarineBox`);
  startingScreen.appendChild(submarineBox);
  const submarineTitle = document.createElement("p");
  submarineTitle.classList.add("shipTitles");
  submarineTitle.textContent = "Submarine";
  submarineBox.appendChild(submarineTitle);
  const submarineImage = document.createElement("IMG");
  submarineImage.classList.add("submarineImage");
  submarineImage.setAttribute(`id`, `submarineImage`);
  submarineImage.setAttribute(`src`, `./images/submarine.png`);
  submarineImage.setAttribute(`alt`, `Picture of Submarine`);
  submarineImage.setAttribute(`draggable`, `true`);
  submarineImage.setAttribute(`ondragstart`, `drag(event)`);
  submarineImage.addEventListener("click", function () {
    rotateImage(this.id);
  });
  submarineBox.appendChild(submarineImage);
  const patrolBoatBox = document.createElement("div");
  patrolBoatBox.classList.add("shipBox");
  patrolBoatBox.setAttribute(`id`, `patrolBoatBox`);
  startingScreen.appendChild(patrolBoatBox);
  const patrolBoatTitle = document.createElement("p");
  patrolBoatTitle.classList.add("shipTitles");
  patrolBoatTitle.textContent = "Patrol Boat";
  patrolBoatBox.appendChild(patrolBoatTitle);
  const patrolBoatImage = document.createElement("IMG");
  patrolBoatImage.classList.add("patrolBoatImage");
  patrolBoatImage.setAttribute(`id`, `patrolBoatImage`);
  patrolBoatImage.setAttribute(`src`, `./images/patrolBoat.png`);
  patrolBoatImage.setAttribute(`alt`, `Picture of Patrol Boat`);
  patrolBoatImage.setAttribute(`draggable`, `true`);
  patrolBoatImage.setAttribute(`ondragstart`, `drag(event)`);
  patrolBoatImage.addEventListener("click", function () {
    rotateImage(this.id);
  });
  patrolBoatBox.appendChild(patrolBoatImage);
}

// Display the players empty board to place ships
// Adds ondrop and on dragover to allow drag and drop
function displayEmptyGameboard(parentId, idName, className, visible) {
  const playerBoard = document.getElementById(`${parentId}`);
  for (let i = 0; i < 100; i++) {
    const divSquare = document.createElement("div");
    divSquare.setAttribute(`id`, `${idName}${i}`);
    divSquare.classList.add(`${className}`);
    if (visible) {
      divSquare.classList.add("visible");
      divSquare.setAttribute(`ondrop`, `drop(event)`);
      divSquare.setAttribute(`ondragover`, `allowDrop(event)`);
    } else {
      const divSquareInner = document.createElement("div");
      divSquareInner.setAttribute(`id`, `${idName}Inner${i}`);
      divSquareInner.classList.add(`inner`);
      divSquare.appendChild(divSquareInner);
    }
    playerBoard.appendChild(divSquare);
  }
}

//Takes an image that is horizontal and makes it vertical
function rotateImage(id) {
  const imageId = document.getElementById(id);
  imageId.style.transform = "rotate(90deg)";
  imageId.style.transformOrigin = "top left";
  imageId.addEventListener("click", function () {
    rotateImageBack(this.id);
  });
}

//Takes an image that is vertical and makes it horizontal
function rotateImageBack(id) {
  const imageId = document.getElementById(id);
  imageId.style.transform = "rotate(0deg)";
  imageId.style.transformOrigin = "top left";
  imageId.addEventListener("click", function () {
    rotateImage(this.id);
  });
}

// Next 3 functions are all part of placing ships
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  let direction;
  const imageId = event.dataTransfer.getData("text");
  const currentImage = document.getElementById(imageId);
  const imageRotation = currentImage.getAttribute("style");
  if (
    imageRotation == "transform: rotate(0deg); transform-origin: left top;" ||
    imageRotation == null
  ) {
    direction = "x";
  }
  if (
    imageRotation == "transform: rotate(90deg); transform-origin: left top;"
  ) {
    direction = "y";
  }
  let ship = imageId;
  ship = ship.slice(0, -5);
  let location = event.target.id;
  location = location.slice(6);
  location = parseInt(location);
  let isValid = true;
  let currentLocation = location;
  if (ship === "carrier") {
    // Checks to make sure the boat will fit (x)
    if (
      direction === "x" &&
      ((location <= 95 && location >= 90) ||
        (location <= 85 && location >= 80) ||
        (location <= 75 && location >= 70) ||
        (location <= 65 && location >= 60) ||
        (location <= 55 && location >= 50) ||
        (location <= 45 && location >= 40) ||
        (location <= 35 && location >= 30) ||
        (location <= 25 && location >= 20) ||
        (location <= 15 && location >= 10) ||
        location <= 5)
    ) {
      // Checks to make sure another boat is not already here (x)
      for (let i = 0; i < 5; i++) {
        currentLocation = location + i;
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
      }
      if (isValid === true) {
        gameBoard.placeShip("carrier", 5, "x", location);
      } else {
        return; // If there is a boat doesnt continue
      }
      // Checks to make sure the boat will fit (y)
    } else if (direction === "y" && location <= 59) {
      // Checks to make sure another boat is not already here (y)
      for (let i = 0; i < 5; i++) {
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
        currentLocation = currentLocation + 10;
      }
      if (isValid === true) {
        gameBoard.placeShip("carrier", 5, "y", location);
      } else {
        return; // If there is a boat it doesnt continue
      }
    } else return; // If the boat wont fit it doesnt continue
  }
  if (ship === "battleship") {
    // Checks to make sure the boat will fit (x)
    if (
      direction === "x" &&
      ((location <= 96 && location >= 90) ||
        (location <= 86 && location >= 80) ||
        (location <= 76 && location >= 70) ||
        (location <= 66 && location >= 60) ||
        (location <= 56 && location >= 50) ||
        (location <= 46 && location >= 40) ||
        (location <= 36 && location >= 30) ||
        (location <= 26 && location >= 20) ||
        (location <= 16 && location >= 10) ||
        location <= 6)
    ) {
      // Checks to make sure another boat is not already here (x)
      for (let i = 0; i < 4; i++) {
        currentLocation = location + i;
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
      }
      if (isValid === true) {
        gameBoard.placeShip("battleship", 4, "x", location);
      } else {
        return; // If there is a boat doesnt continue
      }
      // Checks to make sure the boat will fit (y)
    } else if (direction === "y" && location <= 69) {
      // Checks to make sure another boat is not already here (y)
      for (let i = 0; i < 4; i++) {
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
        currentLocation = currentLocation + 10;
      }
      if (isValid === true) {
        gameBoard.placeShip("battleship", 4, "y", location);
      } else {
        return; // If there is a boat it doesnt continue
      }
    } else return; // If the boat wont fit it doesnt continue
  }
  if (ship === "destroyer") {
    // Checks to make sure the boat will fit (x)
    if (
      direction === "x" &&
      ((location <= 97 && location >= 90) ||
        (location <= 87 && location >= 80) ||
        (location <= 77 && location >= 70) ||
        (location <= 67 && location >= 60) ||
        (location <= 57 && location >= 50) ||
        (location <= 47 && location >= 40) ||
        (location <= 37 && location >= 30) ||
        (location <= 27 && location >= 20) ||
        (location <= 17 && location >= 10) ||
        location <= 7)
    ) {
      // Checks to make sure another boat is not already here (x)
      for (let i = 0; i < 3; i++) {
        currentLocation = location + i;
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
      }
      if (isValid === true) {
        gameBoard.placeShip("destroyer", 3, "x", location);
      } else {
        return; // If there is a boat doesnt continue
      }
      // Checks to make sure the boat will fit (y)
    } else if (direction === "y" && location <= 79) {
      // Checks to make sure another boat is not already here (y)
      for (let i = 0; i < 3; i++) {
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
        currentLocation = currentLocation + 10;
      }
      if (isValid === true) {
        gameBoard.placeShip("destroyer", 3, "y", location);
      } else {
        return; // If there is a boat it doesnt continue
      }
    } else return; // If the boat wont fit it doesnt continue
  }
  if (ship === "submarine") {
    // Checks to make sure the boat will fit (x)
    if (
      direction === "x" &&
      ((location <= 97 && location >= 90) ||
        (location <= 87 && location >= 80) ||
        (location <= 77 && location >= 70) ||
        (location <= 67 && location >= 60) ||
        (location <= 57 && location >= 50) ||
        (location <= 47 && location >= 40) ||
        (location <= 37 && location >= 30) ||
        (location <= 27 && location >= 20) ||
        (location <= 17 && location >= 10) ||
        location <= 7)
    ) {
      // Checks to make sure another boat is not already here (x)
      for (let i = 0; i < 3; i++) {
        currentLocation = location + i;
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
      }
      if (isValid === true) {
        gameBoard.placeShip("submarine", 3, "x", location);
      } else {
        return; // If there is a boat doesnt continue
      }
      // Checks to make sure the boat will fit (y)
    } else if (direction === "y" && location <= 79) {
      // Checks to make sure another boat is not already here (y)
      for (let i = 0; i < 3; i++) {
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
        currentLocation = currentLocation + 10;
      }
      if (isValid === true) {
        gameBoard.placeShip("submarine", 3, "y", location);
      } else {
        return; // If there is a boat it doesnt continue
      }
    } else return; // If the boat wont fit it doesnt continue
  }
  if (ship === "patrolBoat") {
    // Checks to make sure the boat will fit (x)
    if (
      direction === "x" &&
      ((location <= 98 && location >= 90) ||
        (location <= 88 && location >= 80) ||
        (location <= 78 && location >= 70) ||
        (location <= 68 && location >= 60) ||
        (location <= 58 && location >= 50) ||
        (location <= 48 && location >= 40) ||
        (location <= 38 && location >= 30) ||
        (location <= 28 && location >= 20) ||
        (location <= 18 && location >= 10) ||
        location <= 8)
    ) {
      // Checks to make sure another boat is not already here (x)
      for (let i = 0; i < 2; i++) {
        currentLocation = location + i;
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
      }
      if (isValid === true) {
        gameBoard.placeShip("patrolBoat", 2, "x", location);
      } else {
        return; // If there is a boat doesnt continue
      }
      // Checks to make sure the boat will fit (y)
    } else if (direction === "y" && location <= 89) {
      // Checks to make sure another boat is not already here (y)
      for (let i = 0; i < 2; i++) {
        if (gameBoard.gameBoard[currentLocation] != null) isValid = false;
        currentLocation = currentLocation + 10;
      }
      if (isValid === true) {
        gameBoard.placeShip("patrolBoat", 2, "y", location);
      } else {
        return; // If there is a boat it doesnt continue
      }
    } else return; // If the boat wont fit it doesnt continue
  }
  gameBoard.displayGameboard("square");
  removeElementsByClass(`${ship}Image`);
  const placedShips = gameBoard.placedShips;
  if (placedShips >= 5) {
    gameSetUp();
  }
}

//This starts game after ships are placed
function gameSetUp() {
  let player = new Player();
  let computerBoard = new GameBoard();
  removeElementsByClass("startingScreen");
  createEnemyBoard(computerBoard);
  document.getElementById("currentMessage").textContent =
    "Click A Location on the Enemy Fleet to Start!";
  computerBoard.placeCompShips();
  computerBoard.displayGameboard("enemySquare");
  for (let i = 0; i < 100; i++) {
    const currentIndex = i;
    const square = document.getElementById(`enemySquareInner${i}`);
    square.addEventListener("click", function () {
      document.getElementById("currentMessage").textContent = "";
      player.gameLoop(currentIndex, gameBoard, computerBoard);
    });
  }
}

// Display the computers board and title when game is started
function createEnemyBoard() {
  document.getElementById("enemyFleetTitle").textContent = "Enemy Fleet";
  const enemyFleet = document.getElementById("enemyFleet");
  const enemyGameboard = document.createElement("div");
  enemyGameboard.setAttribute(`id`, `enemyGameboard`);
  enemyGameboard.classList.add("enemyGameboard");
  enemyFleet.appendChild(enemyGameboard);
  displayEmptyGameboard("enemyGameboard", "enemySquare", "enemySquares", false);
}

// Run on load to display the empty board and starting screen
let gameBoard = new GameBoard();
displayEmptyGameboard("gameboard", "square", "playerSquares", true);
displayStartingScreen();
