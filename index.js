// Used to create and store information about each ship
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
      return "miss";
    } else if (this.gameBoard[location] !== "hit") {
      if (this.gameBoard[location] === "carrier") {
        this.carrier.getHit();
        this.gameBoard[location] = "hit";
        this.carrier.isSunk();
        if (this.carrier.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Carrier has Sunk";
          return "sunk";
        } else {
          return "hit";
        }
      }
      if (this.gameBoard[location] === "battleship") {
        this.battleship.getHit();
        this.gameBoard[location] = "hit";
        this.battleship.isSunk();
        if (this.battleship.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Battleship has Sunk";
          return "sunk";
        } else {
          return "hit";
        }
      }
      if (this.gameBoard[location] === "destroyer") {
        this.destroyer.getHit();
        this.gameBoard[location] = "hit";
        this.destroyer.isSunk();
        if (this.destroyer.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Destroyer has Sunk";
          return "sunk";
        } else {
          return "hit";
        }
      }
      if (this.gameBoard[location] === "submarine") {
        this.submarine.getHit();
        this.gameBoard[location] = "hit";
        this.submarine.isSunk();
        if (this.submarine.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Submarine has Sunk";
          return "sunk";
        } else {
          return "hit";
        }
      }
      if (this.gameBoard[location] === "patrolBoat") {
        this.patrolBoat.getHit();
        this.gameBoard[location] = "hit";
        this.patrolBoat.isSunk();
        if (this.patrolBoat.sunk === true) {
          this.sunkShips++;
          document.getElementById("currentMessage").textContent =
            "Patrol Boat has Sunk";
          return "sunk";
        } else {
          return "hit";
        }
      }
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
    this.gameBoard = "";
    this.computerBoard = "";
    this.hitSinceSink = false;
    this.lastHit = "";
    this.closeLocations = [];
  }

  displayStartingScreen() {
    this.gameBoard = new GameBoard();
    this.displayEmptyGameboard("gameboard", "square", "playerSquares", true);
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
    carrierImage.setAttribute(`ondragstart`, `player.drag(event)`);
    carrierImage.addEventListener("click", function () {
      player.rotateImage(this.id);
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
    battleshipImage.setAttribute(`ondragstart`, `player.drag(event)`);
    battleshipImage.addEventListener("click", function () {
      player.rotateImage(this.id);
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
    destroyerImage.setAttribute(`ondragstart`, `player.drag(event)`);
    destroyerImage.addEventListener("click", function () {
      player.rotateImage(this.id);
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
    submarineImage.setAttribute(`ondragstart`, `player.drag(event)`);
    submarineImage.addEventListener("click", function () {
      player.rotateImage(this.id);
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
    patrolBoatImage.setAttribute(`ondragstart`, `player.drag(event)`);
    patrolBoatImage.addEventListener("click", function () {
      player.rotateImage(this.id);
    });
    patrolBoatBox.appendChild(patrolBoatImage);
  }

  displayEmptyGameboard(parentId, idName, className, visible) {
    const playerBoard = document.getElementById(`${parentId}`);
    for (let i = 0; i < 100; i++) {
      const divSquare = document.createElement("div");
      divSquare.setAttribute(`id`, `${idName}${i}`);
      divSquare.classList.add(`${className}`);
      if (visible) {
        divSquare.classList.add("visible");
        divSquare.setAttribute(`ondrop`, `player.drop(event)`);
        divSquare.setAttribute(`ondragover`, `player.allowDrop(event)`);
      } else {
        const divSquareInner = document.createElement("div");
        divSquareInner.setAttribute(`id`, `${idName}Inner${i}`);
        divSquareInner.classList.add(`inner`);
        divSquare.appendChild(divSquareInner);
      }
      playerBoard.appendChild(divSquare);
    }
  }

  rotateImage(id) {
    const imageId = document.getElementById(id);
    imageId.style.transform = "rotate(90deg)";
    imageId.style.transformOrigin = "top left";
    imageId.addEventListener("click", function () {
      player.rotateImageBack(this.id);
    });
  }

  rotateImageBack(id) {
    const imageId = document.getElementById(id);
    imageId.style.transform = "rotate(0deg)";
    imageId.style.transformOrigin = "top left";
    imageId.addEventListener("click", function () {
      player.rotateImage(this.id);
    });
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  drop(event) {
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
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("carrier", 5, "x", location);
        } else {
          return; // If there is a boat doesnt continue
        }
        // Checks to make sure the boat will fit (y)
      } else if (direction === "y" && location <= 59) {
        // Checks to make sure another boat is not already here (y)
        for (let i = 0; i < 5; i++) {
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
          currentLocation = currentLocation + 10;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("carrier", 5, "y", location);
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
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("battleship", 4, "x", location);
        } else {
          return; // If there is a boat doesnt continue
        }
        // Checks to make sure the boat will fit (y)
      } else if (direction === "y" && location <= 69) {
        // Checks to make sure another boat is not already here (y)
        for (let i = 0; i < 4; i++) {
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
          currentLocation = currentLocation + 10;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("battleship", 4, "y", location);
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
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("destroyer", 3, "x", location);
        } else {
          return; // If there is a boat doesnt continue
        }
        // Checks to make sure the boat will fit (y)
      } else if (direction === "y" && location <= 79) {
        // Checks to make sure another boat is not already here (y)
        for (let i = 0; i < 3; i++) {
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
          currentLocation = currentLocation + 10;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("destroyer", 3, "y", location);
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
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("submarine", 3, "x", location);
        } else {
          return; // If there is a boat doesnt continue
        }
        // Checks to make sure the boat will fit (y)
      } else if (direction === "y" && location <= 79) {
        // Checks to make sure another boat is not already here (y)
        for (let i = 0; i < 3; i++) {
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
          currentLocation = currentLocation + 10;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("submarine", 3, "y", location);
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
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("patrolBoat", 2, "x", location);
        } else {
          return; // If there is a boat doesnt continue
        }
        // Checks to make sure the boat will fit (y)
      } else if (direction === "y" && location <= 89) {
        // Checks to make sure another boat is not already here (y)
        for (let i = 0; i < 2; i++) {
          if (this.gameBoard.gameBoard[currentLocation] != null)
            isValid = false;
          currentLocation = currentLocation + 10;
        }
        if (isValid === true) {
          this.gameBoard.placeShip("patrolBoat", 2, "y", location);
        } else {
          return; // If there is a boat it doesnt continue
        }
      } else return; // If the boat wont fit it doesnt continue
    }
    this.gameBoard.displayGameboard("square");
    this.removeElementsByClass(`${ship}Image`);
    const placedShips = this.gameBoard.placedShips;
    if (placedShips >= 5) {
      this.gameSetUp();
    }
  }

  gameSetUp() {
    this.computerBoard = new GameBoard();
    this.removeElementsByClass("startingScreen");
    this.createEnemyBoard();
    document.getElementById("currentMessage").textContent =
      "Click A Location on the Enemy Fleet to Start!";
    this.computerBoard.placeCompShips();
    this.computerBoard.displayGameboard("enemySquare");
    for (let i = 0; i < 100; i++) {
      const currentIndex = i;
      const square = document.getElementById(`enemySquareInner${i}`);
      square.addEventListener("click", function () {
        document.getElementById("currentMessage").textContent = "";
        player.gameLoop(currentIndex);
      });
    }
  }

  createEnemyBoard() {
    document.getElementById("enemyFleetTitle").textContent = "Enemy Fleet";
    const enemyFleet = document.getElementById("enemyFleet");
    const enemyGameboard = document.createElement("div");
    enemyGameboard.setAttribute(`id`, `enemyGameboard`);
    enemyGameboard.classList.add("enemyGameboard");
    enemyFleet.appendChild(enemyGameboard);
    this.displayEmptyGameboard(
      "enemyGameboard",
      "enemySquare",
      "enemySquares",
      false
    );
  }

  playerTurn(location) {
    if (this.turn === "player") {
      this.computerBoard.receiveAttack(location);
    }
    this.turn = "computer";
  }

  computerTurn(location) {
    if (this.turn === "computer") {
      if (this.hitSinceSink) {
        let nextLocation = this.getCloseNumber();
        if (
          this.gameBoard.gameBoard[nextLocation] === "hit" ||
          this.gameBoard.gameBoard[nextLocation] === "miss"
        ) {
          this.computerTurn(nextLocation);
          return "invalid move";
        } else {
          const thisAttack = this.gameBoard.receiveAttack(nextLocation);
          if (thisAttack === "sunk") {
            this.hitSinceSink = false;
            this.closeLocations = [];
          }
          if (thisAttack === "hit") {
            this.hitSinceSink = true;
            this.lastHit = nextLocation;
            this.addCloseLocations();
          }
          this.turn = "player";
          return "valid";
        }
      } else {
        if (
          this.gameBoard.gameBoard[location] === "hit" ||
          this.gameBoard.gameBoard[location] === "miss"
        ) {
          this.computerTurn(this.getRandomLocation());
          return "invalid move";
        } else {
          this.lastHit = location;
          const thisAttack = this.gameBoard.receiveAttack(location);
          if (thisAttack === "sunk") {
            this.hitSinceSink = false;
          }
          if (thisAttack === "hit") {
            this.hitSinceSink = true;
            this.addCloseLocations();
          }
          this.turn = "player";
          return "valid";
        }
      }
    }
  }

  getRandomLocation() {
    const ranNumber = Math.floor(Math.random() * 100);
    return ranNumber;
  }

  addCloseLocations() {
    if (
      this.lastHit != 0 &&
      this.lastHit != 10 &&
      this.lastHit != 20 &&
      this.lastHit != 30 &&
      this.lastHit != 40 &&
      this.lastHit != 50 &&
      this.lastHit != 60 &&
      this.lastHit != 70 &&
      this.lastHit != 80 &&
      this.lastHit != 90
    ) {
      if (!this.closeLocations.includes(this.lastHit - 1)) {
        this.closeLocations.push(this.lastHit - 1);
      }
    }
    if (
      this.lastHit != 9 &&
      this.lastHit != 19 &&
      this.lastHit != 29 &&
      this.lastHit != 39 &&
      this.lastHit != 49 &&
      this.lastHit != 59 &&
      this.lastHit != 69 &&
      this.lastHit != 79 &&
      this.lastHit != 89 &&
      this.lastHit != 99
    ) {
      if (!this.closeLocations.includes(this.lastHit + 1)) {
        this.closeLocations.push(this.lastHit + 1);
      }
    }
    if (
      this.lastHit != 0 &&
      this.lastHit != 1 &&
      this.lastHit != 2 &&
      this.lastHit != 3 &&
      this.lastHit != 4 &&
      this.lastHit != 5 &&
      this.lastHit != 6 &&
      this.lastHit != 7 &&
      this.lastHit != 8 &&
      this.lastHit != 9
    ) {
      if (!this.closeLocations.includes(this.lastHit - 10)) {
        this.closeLocations.push(this.lastHit - 10);
      }
    }
    if (
      this.lastHit != 90 &&
      this.lastHit != 91 &&
      this.lastHit != 92 &&
      this.lastHit != 93 &&
      this.lastHit != 94 &&
      this.lastHit != 95 &&
      this.lastHit != 96 &&
      this.lastHit != 97 &&
      this.lastHit != 98 &&
      this.lastHit != 99
    ) {
      if (!this.closeLocations.includes(this.lastHit + 10)) {
        this.closeLocations.push(this.lastHit + 10);
      }
    }
    console.log(this.closeLocations);
  }

  getCloseNumber() {
    const ranNumber = Math.floor(Math.random() * this.addCloseLocations.length);
    const closeNumber = this.closeLocations[ranNumber];
    this.closeLocations.splice(ranNumber, 1);
    console.log(closeNumber);
    console.log(this.closeLocations);
    return closeNumber;
  }

  gameLoop(currentId) {
    if (this.turn === "player") {
      if (
        this.computerBoard.gameBoard[currentId] != "hit" &&
        this.computerBoard.gameBoard[currentId] != "miss"
      ) {
        this.playerTurn(currentId);
        this.computerBoard.displayGameboard("enemySquare");
        this.computerTurn(this.getRandomLocation());
        this.gameBoard.displayGameboard("square");
        const playerLost = this.gameBoard.allShipsSunk();
        const compLost = this.computerBoard.allShipsSunk();
        if (playerLost) this.gameOver("player");
        if (compLost) this.gameOver("computer");
      }
    }
  }

  gameOver(loser) {
    for (let i = 0; i < 100; i++) {
      document.getElementById(`enemySquare${i}`).classList.add("visible");
    }
    this.removeElementsByClass("inner");
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
    player.removeElementsByClass("restartButton");
    player.removeElementsByClass("playerSquares");
    player.removeElementsByClass("enemySquares");
    player.removeElementsByClass("enemyGameboard");
    player.gameBoard = new GameBoard();
    player.displayStartingScreen();
  }

  removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
}

let player = new Player();
player.displayStartingScreen();
