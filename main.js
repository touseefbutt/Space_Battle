
//Make the GAME an OBJECT
let game = {
    round: 0,
    targetShip: 0,
    userResponse: "",
};

let captain = {
    name: "USS Schwartznegger",
    hull: 20,
    firePower: 5,
    accuracy: 0.7,
    attack: function () {
      //This is my attack function using math.random
let attackChance = Math.random();
    if (attackChance <= this.accuracy) {
        return true;
    } else {
        return false;
    }
    },
};

  // CLASS & constructor for Alien Ship
class AlienShip {
    constructor(name, hull, firePower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firePower = firePower;
    this.accuracy = accuracy;
    }
    attack() {
      //Attack function using math.random
    let attackChance = Math.random();
    if (attackChance <= this.accuracy) {
        return true;
    } else {
        return false;
    }
    }
}

  // Alien Arrays-Will Loop through these values to configure ship
  let alienShips = []; // alien ships
  let alienHullValues = [3, 4, 5, 6]; // alien hull values
  let alienFirePowerValues = [2, 3, 4]; // alien fire power values
  let alienAccValues = [0.6, 0.7, 0.8]; // alien accuracy values

  // Build Alien Ship Function. Create a For loop that uses the arrays above using math.floor & math.random
let createAlienShips = () => {
    for (let i = 0; i < 6; i++) {
      //Iterate 6 values
    let name = "Alien Ship " + (i + 1);
      let hull = alienHullValues[Math.floor(Math.random() * 4)];
      let firePower = alienFirePowerValues[Math.floor(Math.random() * 3)];
      let accuracy = alienAccValues[Math.floor(Math.random() * 3)];
      alienShips[i] = new AlienShip(name, hull, firePower, accuracy); //The result will be a new alien ship with the new parameters
    }
};
  // Battle Function=Set up a function that "Holds" the battle
let shipsBattle = (ship1, ship2) => {
    // put the ships into an array
    let ships = [ship1, ship2];
    let attack = false;
    let attacking = 0;
    let beingAttacked = 1;
    let temp;
    console.log(" Attack Begins =================");
    while (ships[beingAttacked].hull > 0) {
      //While the hull is greater than 0...Keep attacking
      // Attacking Sequence
    if (ships[beingAttacked].hull > 0) {
        // Console log the attack information
        console.log("\n");
        console.log(` ${ships[attacking].name} attacked ${ships[beingAttacked].name}`,
        );
        // Generate the attack on the enemy ship
        attack = ships[attacking].attack();
        if (attack === true) {
          ships[beingAttacked].hull -= ships[attacking].firePower; //Increase Fire power
        console.log(`Attack Successful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull}`)
        } else {
        console.log(`Attack Unsuccessful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull}`);
        }
        // Check if the ship being attacked is still alive
        if (ships[beingAttacked].hull <= 0) {
        console.log(`${ships[beingAttacked].name} has been destroyed`);
        if (ships[beingAttacked] === captain) {
            ///If the USS SHip is being attaced and is destroyed THEN alert player Game is Over
            alert("Game Over!!!");
        } else if (ships[beingAttacked].name === alienShips[alienShips.length - 1].name) {
            alert(`${ships[beingAttacked].name} destroyed!\nAlien fleet has been destroyed!\nyou save the Earth`            );
          } //If USS destroys alien fleet, then alert player of victory
        else {
            game.userResponse = prompt(`${alienShips[game.targetShip].name} destroyed!!\n${
                captain.name}
            Hull: ${captain.hull}\nWould you like to ATTACK the next ship or RETREAT from battle?`, "");
            game.targetShip += 1; //PROMPT PLAYER IF THEY WANTT TO CONTINUE OR RETREAT
            checkUserPrompt();
            return;
        }
        } else {
          // Switch the attacking/attacked ships
        temp = attacking;
        attacking = beingAttacked;
        beingAttacked = temp;
        }
    }
    }
};
  // Function to check user prompts
let checkUserPrompt = () => {
    let responseUpperCase = game.userResponse.toUpperCase();
    if (responseUpperCase === "ATTACK") {
    shipsBattle(captain, alienShips[game.targetShip]);
    } else if (responseUpperCase === "RETREAT") {
    alert("Game Over! You Live to Fight Again Another Day.");
    }
};

let startGame = () => {
    // Build alien fleets
    createAlienShips();

    game.userResponse = prompt(
    "Alien fleet approaching\nWould you like to ATTACK the first ship or RETREAT?","");
    checkUserPrompt();
};

  // Initialize game
startGame();