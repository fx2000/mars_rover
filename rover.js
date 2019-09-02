/**
 * Mars Rover
 * Webdev Module 0 - Ironhack
 * Daniel Duque
 **/

// Creating game grid
let grid = [];
for (let x = 0; x < 10; x++) {
  var col = [];
  for (let y = 0; y < 10; y++) {
    col.push("clear");
  }
  grid.push(col);
}

// Creating rovers
let rover = [
  {
    name: "Spirit",
    type: "Rover",
    direction: "S",
    position: {
      x: 0,
      y: 0
    },
    travelLog: [{
      x: 0,
      y: 0
    }]
  },
  {
    name: "Opportunity",
    type: "Rover",
    direction: "N",
    position: {
      x: 9,
      y: 9
    },
    travelLog: [{
      x: 9,
      y: 9
    }]
  }
];

// Generate a random number of obstacles
let obstacleNumber = (Math.floor(Math.random() * (10 - 1 + 1)) + 1)

// Randomly generate type and position for obstacles
let obstacles = [];

let obstacleType = [
  "crater",
  "hill",
  "rock",
  "little green man"
];
for (i = 1; i <= obstacleNumber; i++) {
  obstacles.push({
    name: "Obstacle",
    type: obstacleType[(Math.floor(Math.random() * (obstacleType.length + 0)) + 0)],
    position: {
      x: (Math.floor(Math.random() * (9 - 1 + 0)) + 0),
      y: (Math.floor(Math.random() * (9 - 1 + 0)) + 0)
    }
  });
}

// Place the obstacles on the grid
for (let i = 0; i < obstacles.length; i++) {
  grid[obstacles[i].position.x][obstacles[i].position.y] = obstacles[i];
}

// Place the rovers on the grid
grid[rover[0].position.x][rover[0].position.y] = rover[0];
grid[rover[1].position.x][rover[1].position.y] = rover[1];

// Turn Rover left
function turnLeft(rover) {
  
  // Check direction and turn appropriately
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
    case "W":
      rover.direction = "S";
      break;
  }
  console.log(`Turning left, ${rover.name}'s new direction is ${rover.direction}`);
}

// Turn Rover right
function turnRight(rover) {
  
  // Check direction and turn appropriately
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
  console.log(`Turning right, ${rover.name}'s new direction is ${rover.direction}`);
}

// Move Rover forward
function moveForward(rover) {
  
  let moved = 0;
  grid[rover.position.x][rover.position.y] = "clear";
  
  // Check direction and move appropriately
  switch (rover.direction) {
    case "N":
      // Check for grid edges
      if (rover.position.y > 0) {
        // Check for obstacles
        if (grid[rover.position.x][(rover.position.y - 1)].hasOwnProperty("type")) {
          console.log(`${rover.name} has encountered a ${grid[rover.position.x][(rover.position.y - 1)].type} and can't move in that direction`);
        } else {
          rover.position.y--;
          moved = 1;
        }
      } else {
        console.log(`You can't move ${rover.name} out of the grid`);
      }
      break;
    case "S":
      // Check for grid edges
      if (rover.position.y < 9) {
        // Check for obstacles
        if (grid[rover.position.x][(rover.position.y + 1)].hasOwnProperty("type")) {
          console.log(`${rover.name} has encountered a ${grid[rover.position.x][(rover.position.y + 1)].type} and can't move in that direction`);
        } else {
          rover.position.y++;
          moved = 1;
        }
      } else {
        console.log(`You can't move ${rover.name} out of the grid`);
      }
      break;
    case "E":
      // Check for grid edges
      if (rover.position.x < 9) {
        // Check for obstacles
        if (grid[rover.position.x + 1][(rover.position.y)].hasOwnProperty("type")) {
          console.log(`${rover.name} has encountered a ${grid[rover.position.x + 1][(rover.position.y)].type} and can't move in that direction`);
        } else {
          rover.position.x++;
          moved = 1;
        }
      } else {
        console.log(`You can't move ${rover.name} out of the grid`);
      }
      break;
    case "W":
      // Check for grid edges
      if (rover.position.x > 0) {
        // Check for obstacles
        if (grid[rover.position.x - 1][(rover.position.y)].hasOwnProperty("type")) {
          console.log(`${rover.name} has encountered a ${grid[rover.position.x - 1][(rover.position.y)].type} and can't move in that direction`);
        } else {
          rover.position.x--;
          moved = 1;
        }
      } else {
        console.log(`You can't move ${rover.name} out of the grid`);
      }
      break;
  }
  
  // Save new position to the Travel Log and the grid
  if (moved === 1) {
    let newPosition = {
      x: rover.position.x,
      y: rover.position.y
    };
    grid[newPosition.x][newPosition.y] = rover;
    rover.travelLog.push(newPosition);
    console.log(`Moving forward, ${rover.name}'s new position is (${rover.position.x},${rover.position.y})`);
  } else {
    grid[rover.position.x][rover.position.y] = rover;
    console.log(`Staying put, ${rover.name}'s current position is (${rover.position.x},${rover.position.y})`);
  }
  
  
}

// Move Rover backward
function moveBackward(rover) {
  
  let moved = 0;
  
  // Check direction and move appropriately
  switch (rover.direction) {
    case "S":
      // Check for grid edges
      if (rover.position.y > 0) {
        // Check for obstacles
        if (grid[rover.position.x][(rover.position.y - 1)].hasOwnProperty("type")) {
          console.log(`${rover.name} has encountered a ${grid[rover.position.x][(rover.position.y - 1)].type} and can't move in that direction`);
        } else {
          rover.position.y--;
          moved = 1;
        }
      } else {
        console.log(`You can't move ${rover.name} out of the grid`);
      }
      break;
    case "N":
      // Check for grid edges
      if (rover.position.y < 9) {
        // Check for obstacles
        if (grid[rover.position.x][(rover.position.y + 1)].hasOwnProperty("type")) {
          console.log(`${rover.name} has encountered a ${grid[rover.position.x][(rover.position.y + 1)].type} and can't move in that direction`);
        } else {
          rover.position.y++;
          moved = 1;
        }
      } else {
        console.log(`You can't move ${rover.name} out of the grid`);
      }
      break;
    case "W":
      // Check for grid edges
      if (rover.position.x < 9) {
        // Check for obstacles
        if (grid[rover.position.x + 1][(rover.position.y)].hasOwnProperty("type")) {
          console.log(`${rover.name} has encountered a ${grid[rover.position.x + 1][(rover.position.y)].type} and can't move in that direction`);
        } else {
          rover.position.x++;
          moved = 1;
        }
      } else {
        console.log(`You can't move ${rover.name} out of the grid`);
      }
      break;
    case "E":
      // Check for grid edges
      if (rover.position.x > 0) {
        // Check for obstacles
        if (grid[rover.position.x - 1][(rover.position.y)].hasOwnProperty("type")) {
          console.log(`${rover.name} has encountered a ${grid[rover.position.x - 1][(rover.position.y)].type} and can't move in that direction`);
        }
        rover.position.x--;
        moved = 1;
      } else {
        console.log(`You can't move ${rover.name} out of the grid`);
      }
      break;
  }
  
  // Save new position to the Travel Log and the grid
  if (moved === 1) {
    let newPosition = {
      x: rover.position.x,
      y: rover.position.y
    };
    grid[newPosition.x][newPosition.y] = rover;
    rover.travelLog.push(newPosition);
    console.log(`Moving forward, ${rover.name}'s new position is (${rover.position.x},${rover.position.y})`);
  } else {
    grid[rover.position.x][rover.position.y] = rover;
    console.log(`Staying put, ${rover.name}'s current position is (${rover.position.x},${rover.position.y})`);
  }
}

// Move Rover commands
function moveRover(rover, commands) {
  
  // Go through each command and send to the appropriate function
  for (let i = 0; i < commands.length; i++) {
    switch (commands[i]) {
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
      default:
        console.log(`${commands[i]} is not a valid command`);
    }
  }
}

// Move rovers
console.log("********** START **********");
//moveRover(rover[0], "ffffffffflfff");
//moveRover(rover[1], "lffffffff");