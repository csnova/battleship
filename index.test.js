const { Ship, GameBoard, Player } = require("./index.js");

// Testing ship.getHit and ship.isSunk
test("Does ship.getHits change hits 1", () => {
  let carrier = new Ship(5);
  carrier.getHit();
  expect(carrier.hits).toBe(1);
});

test("Does ship.getHits change hits 2", () => {
  let carrier = new Ship(5);
  carrier.getHit();
  carrier.getHit();
  expect(carrier.hits).toBe(2);
});

test("Does ship.getHits change hits 3", () => {
  let carrier = new Ship(5);
  carrier.getHit();
  carrier.getHit();
  carrier.getHit();
  expect(carrier.hits).toBe(3);
});

test("Does ship.getHits change hits 4", () => {
  let carrier = new Ship(5);
  carrier.getHit();
  carrier.getHit();
  carrier.getHit();
  carrier.getHit();
  expect(carrier.hits).toBe(4);
});

test("Does ship.isSunk detect when ship is not sunk", () => {
  let carrier = new Ship(5);
  carrier.isSunk;
  expect(carrier.sunk).toBe(false);
});

test("Does ship.isSunk detect when ship is sunk", () => {
  let carrier = new Ship(5);
  carrier.getHit();
  carrier.getHit();
  carrier.getHit();
  carrier.getHit();
  carrier.getHit();
  carrier.isSunk();
  expect(carrier.sunk).toBe(true);
});

// Testing GameBoard.placeShip
test("Place one ship on board", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "x", 22);
  expect(gameBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    "carrier",
    "carrier",
    "carrier",
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("Place one ship on board (Y Direction)", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  expect(gameBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("Place one ship on board (Destroyer)", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("destroyer", 3, "x", 35);
  expect(gameBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "destroyer",
    "destroyer",
    "destroyer",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("Place two ships on board (both x direction)", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "x", 22);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  expect(gameBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    "carrier",
    "carrier",
    "carrier",
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "destroyer",
    "destroyer",
    "destroyer",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("Place two ships on board (mixed directions)", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  expect(gameBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    "destroyer",
    "destroyer",
    "destroyer",
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("Place 5 ships on board (mixed directions)", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  expect(gameBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    "submarine",
    "submarine",
    "submarine",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    "destroyer",
    "destroyer",
    "destroyer",
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    "patrolBoat",
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    "patrolBoat",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "battleship",
    "battleship",
    "battleship",
    "battleship",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});


test("Does recieivng a miss get recorded", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  gameBoard.receiveAttack(10)
  expect(gameBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    "submarine",
    "submarine",
    "submarine",
    null,
    null,
    "miss",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    "destroyer",
    "destroyer",
    "destroyer",
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    "patrolBoat",
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    "patrolBoat",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "battleship",
    "battleship",
    "battleship",
    "battleship",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("Does recieivng a hit get recorded", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  gameBoard.receiveAttack(6)
  expect(gameBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    "submarine",
    "hit",
    "submarine",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    "destroyer",
    "destroyer",
    "destroyer",
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    "patrolBoat",
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    "patrolBoat",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "battleship",
    "battleship",
    "battleship",
    "battleship",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("Does recieivng a hit change the ships hit count?", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  gameBoard.receiveAttack(6)
  expect(gameBoard.submarine.hits).toBe(1);
});

test("Does recieivng enough hits change the ships sunk variable?", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  gameBoard.receiveAttack(6)
  gameBoard.receiveAttack(5)
  gameBoard.receiveAttack(7)
  expect(gameBoard.submarine.sunk).toBe(true);
});

test("Does sinking a ship change the sunkShips variable?", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  gameBoard.receiveAttack(6)
  gameBoard.receiveAttack(5)
  gameBoard.receiveAttack(7)
  expect(gameBoard.sunkShips).toBe(1);
});

test("Does hitting the same place twice change hits count?", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  gameBoard.receiveAttack(6)
  gameBoard.receiveAttack(6)
  expect(gameBoard.submarine.hits).toBe(1);
});

test("Does gameboard report when all ships sunk (false)", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  gameBoard.receiveAttack(5)
  gameBoard.receiveAttack(6)
  gameBoard.receiveAttack(7)
  expect(gameBoard.allShipsSunk()).toBe(false);
});

test("Does gameboard report when all ships sunk (true)", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  gameBoard.receiveAttack(58)
  gameBoard.receiveAttack(68)
  gameBoard.receiveAttack(5)
  gameBoard.receiveAttack(6)
  gameBoard.receiveAttack(7)
  gameBoard.receiveAttack(35)
  gameBoard.receiveAttack(36)
  gameBoard.receiveAttack(37)
  gameBoard.receiveAttack(83)
  gameBoard.receiveAttack(84)
  gameBoard.receiveAttack(85)
  gameBoard.receiveAttack(86)
  gameBoard.receiveAttack(22)
  gameBoard.receiveAttack(32)
  gameBoard.receiveAttack(42)
  gameBoard.receiveAttack(52)
  gameBoard.receiveAttack(62)
  expect(gameBoard.allShipsSunk()).toBe(true);
});

test("After Player takes turn the turn switches", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  let computerBoard = new GameBoard();
  let player = new Player();
  player.playerTurn(6, computerBoard)
  expect(player.turn).toBe("computer");
});

test("After Computer takes turn the turn switches", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  let computerBoard = new GameBoard();
  let player = new Player();
  player.playerTurn(6, computerBoard)
  player.computerTurn(10, gameBoard)
  expect(player.turn).toBe("player");
});

test("Does Player getting a miss get recorded", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  let computerBoard = new GameBoard();
  computerBoard.placeShip("carrier", 5, "x", 53);
  computerBoard.placeShip("battleship", 4, "y", 18);
  computerBoard.placeShip("destroyer", 3, "x", 21);
  computerBoard.placeShip("submarine", 3, "y", 61);
  computerBoard.placeShip("patrolBoat", 2, "x", 86);
  let player = new Player();
  player.playerTurn(10, computerBoard)
  expect(computerBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "miss",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "battleship",
    null,
    null,
    "destroyer",
    "destroyer",
    "destroyer",
    null,
    null,
    null,
    null,
    "battleship",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "battleship",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "battleship",
    null,
    null,
    null,
    null,
    "carrier",
    "carrier",
    "carrier",
    "carrier",
    "carrier",
    null,
    null,
    null,
    "submarine",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "submarine",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "submarine",
    null,
    null,
    null,
    null,
    "patrolBoat",
    "patrolBoat",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("Does Computer getting a miss get recorded", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  let computerBoard = new GameBoard();
  computerBoard.placeShip("carrier", 5, "x", 53);
  computerBoard.placeShip("battleship", 4, "y", 18);
  computerBoard.placeShip("destroyer", 3, "x", 21);
  computerBoard.placeShip("submarine", 3, "y", 61);
  computerBoard.placeShip("patrolBoat", 2, "x", 86);
  let player = new Player();
  player.playerTurn(10, computerBoard)
  player.computerTurn(10, gameBoard)
  expect(gameBoard.gameBoard).toEqual([
    null,
    null,
    null,
    null,
    null,
    "submarine",
    "submarine",
    "submarine",
    null,
    null,
    "miss",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    "destroyer",
    "destroyer",
    "destroyer",
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    "patrolBoat",
    null,
    null,
    null,
    "carrier",
    null,
    null,
    null,
    null,
    null,
    "patrolBoat",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "battleship",
    "battleship",
    "battleship",
    "battleship",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
});

test("Does Computer return when move is invalid? (already missed)", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  let computerBoard = new GameBoard();
  computerBoard.placeShip("carrier", 5, "x", 53);
  computerBoard.placeShip("battleship", 4, "y", 18);
  computerBoard.placeShip("destroyer", 3, "x", 21);
  computerBoard.placeShip("submarine", 3, "y", 61);
  computerBoard.placeShip("patrolBoat", 2, "x", 86);
  let player = new Player();
  player.playerTurn(10, computerBoard)
  player.computerTurn(10, gameBoard)
  player.playerTurn(15, computerBoard)
  expect(player.computerTurn(10, gameBoard)).toBe("invalid move");
});

test("Does Computer return when move is invalid? (already hit)", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip("carrier", 5, "y", 22);
  gameBoard.placeShip("battleship", 4, "x", 83);
  gameBoard.placeShip("destroyer", 3, "x", 35);
  gameBoard.placeShip("submarine", 3, "x", 5);
  gameBoard.placeShip("patrolBoat", 2, "y", 58);
  let computerBoard = new GameBoard();
  computerBoard.placeShip("carrier", 5, "x", 53);
  computerBoard.placeShip("battleship", 4, "y", 18);
  computerBoard.placeShip("destroyer", 3, "x", 21);
  computerBoard.placeShip("submarine", 3, "y", 61);
  computerBoard.placeShip("patrolBoat", 2, "x", 86);
  let player = new Player();
  player.playerTurn(10, computerBoard)
  player.computerTurn(83, gameBoard)
  player.playerTurn(15, computerBoard)
  expect(player.computerTurn(83, gameBoard)).toBe("invalid move");
});

