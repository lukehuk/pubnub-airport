const STARTING_FUEL = 100;
const planes = [];

// Generates a random uppercase ASCII character code
function getLetterCharCode() {
  return Math.floor(Math.random() * 26) + 65;
}

// Generates a random number ASCII character code
function getNumCharCode() {
  return Math.floor(Math.random() * 10) + 48;
}

// Constructs a random plane name using random ASCII character codes
function generatePlaneName() {
  return String.fromCharCode(...[
    getLetterCharCode(),
    getLetterCharCode(),
    getLetterCharCode(),
    getNumCharCode(),
    getNumCharCode(),
    getNumCharCode()
  ]);
}

// Generates data for a new plane
function generateNewPlane(navigator) {
  const startPosition = navigator.genStartPosition();
  const startDestination = navigator.genStartDestinationPosition();
  const planeName = generatePlaneName();
  const plane = {
    planeName: planeName,
    currentX: startPosition.x,
    currentY: startPosition.y,
    destinationX: startDestination.x,
    destinationY: startDestination.y,
    fuelCapacity: STARTING_FUEL,
    remainingFuel: STARTING_FUEL,
    currentAction: 'flying',
    lastAtcTransmission: '-',
    lastPlaneTransmission: planeName + ' awaiting instructions for landing.',
  };
  planes.push(plane);
}

// Updates plane information based on the latest ATC command
function handleATCCommand(latestCommand, plane, navigator) {
  const name = plane.planeName;
  switch (latestCommand) {
    case 'BASE':
      plane.lastAtcTransmission = name + ', enter left base for runway';
      plane.lastPlaneTransmission = name + ', following traffic';
      plane.currentAction = 'base';
      break;
    case 'DOWNWIND':
      plane.lastAtcTransmission = name + ', enter left downwind for runway';
      plane.lastPlaneTransmission = name + ', following traffic';
      plane.currentAction = 'downwind';
      break;
    case 'CLEARED':
      plane.lastAtcTransmission = name + ', you are cleared to land';
      plane.lastPlaneTransmission = name + ', rodger, cleared to land';
      plane.currentAction = 'landing';
      break;
    case 'LEAVE':
      plane.lastAtcTransmission = name + ', remain outside class delta';
      plane.lastPlaneTransmission = name + ', rodger, clearing airspace';
      plane.currentAction = 'leaving';
      break;
    default:
      return plane;
  }
  const destination = navigator.determineDestinationFromAction(
      plane.currentX,
      plane.currentY,
      plane.currentAction
  );
  plane.destinationX = destination.x;
  plane.destinationY = destination.y;
}

// Determines the movement required to advance towards the destination
function determineMovement(current, destination) {
  if (current !== destination) {
    return destination > current ? 1 : -1;
  } else {
    return 0;
  }
}

// Updates a specific plane based on plane and navigation data and any command given
function updatePlane(plane, navigator, latestCommand) {
  handleATCCommand(latestCommand, plane, navigator);

  const yChange = determineMovement(plane.currentY, plane.destinationY);
  const xChange = determineMovement(plane.currentX, plane.destinationX);

  plane.currentX = plane.currentX + xChange;
  plane.currentY = plane.currentY + yChange;
  plane.remainingFuel = plane.remainingFuel - Math.abs(xChange) - Math.abs(yChange);

  // TODO check for plane collision when on screen

  if (plane.remainingFuel < 0) {
    plane.currentAction = 'crashed';
  }

  if (plane.destinationX === plane.currentX && plane.destinationY === plane.currentY) {
    const newAction = navigator.determineNewAction(plane.currentAction);
    const destination = navigator.determineDestinationFromAction(
        plane.currentX,
        plane.currentY,
        newAction
    );
    plane.destinationX = destination.x;
    plane.destinationY = destination.y;
    plane.currentAction = newAction;
  }
  return plane;
}

// Updates each plane and broadcasts the update plane information
function updatePlanes(broadcaster, navigator) {
  planes.map(function(plane) {
    const latestCommand = broadcaster.getLatestPlaneCommand(plane.planeName);
    const updatedPlane = updatePlane(plane, navigator, latestCommand);
    broadcaster.broadcastPlanePosition(updatedPlane);
    // TODO if plane is landed, remove maybe increment some counter.
    // TODO if plane has crashed, end game
    return plane;
  });
}

// TODO
export function openAirspace(broadcaster, navigator, planeGenFreqSec) {
  // let newPlaneTimer = setInterval(() => generateNewPlane(), PLANE_GEN_FREQ_MS)
  generateNewPlane(navigator);
  const publishTimer = setInterval(() => updatePlanes(broadcaster, navigator), broadcaster.broadcastFrequencyMS);

  // after 5 seconds stop
  // setTimeout(() => {
  //     clearInterval(newPlaneTimer)
  //     console.log('No new planes')
  // }, 5000)
}


