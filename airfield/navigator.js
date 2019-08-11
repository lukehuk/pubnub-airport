// Planes spawn and leave this percent further than the edge of the screen
const MAX_DISTANCE_PERCENT_OFF_MAP = 10;

// Generates planes on an ellipse around the centre of the airfield
function genStartPosition() {
  return () => {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: (Math.cos(angle) * (50 + MAX_DISTANCE_PERCENT_OFF_MAP)) + 50,
      y: (Math.sin(angle)* (50 + MAX_DISTANCE_PERCENT_OFF_MAP)) + 50
    };
  };
}

// Generate a random position on the airfield
function genStartDestinationPosition() {
  return () => {
    return {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100)
    };
  };
}

// Determines a planes destination based on its action
function determineDestinationFromAction(airfield) {
  return (currentX, currentY, action) => {
    switch (action) {
      case 'downwind':
        return airfield.downwind;
      case 'base':
        return airfield.base;
      case 'final':
        return airfield.final;
      case 'runway':
        return airfield.runwayStart;
      case 'upwind':
        return airfield.upwind;
      case 'crosswind':
        return airfield.crosswind;
      case 'landing':
        return airfield.runwayMiddle;
      case 'flying':
        return genStartDestinationPosition();
      case 'leaving':
      default:
        return {
          x: currentX >= 50 ? 100 + MAX_DISTANCE_PERCENT_OFF_MAP : - MAX_DISTANCE_PERCENT_OFF_MAP,
          y: currentX >= 50 ? 100 + MAX_DISTANCE_PERCENT_OFF_MAP : - MAX_DISTANCE_PERCENT_OFF_MAP,
        };
    }
  };
}

// Called when a plane arrives at an action's destination. Determines the next action.
function determineNewAction() {
  return (oldAction) => {
    switch (oldAction) {
      case 'downwind':
        return 'base';
      case 'base':
        return 'final';
      case 'final':
        return 'runway';
      case 'runway':
        return 'upwind';
      case 'upwind':
        return 'crosswind';
      case 'crosswind':
        return 'downwind';
      case 'landing':
        return 'landed';
      case 'leaving':
      case 'flying':
      default:
        return 'flying';
    }
  };
}

export function init(airfield) {
  return {
    genStartPosition: genStartPosition(),
    genStartDestinationPosition: genStartDestinationPosition(),
    determineDestinationFromAction: determineDestinationFromAction(airfield),
    determineNewAction: determineNewAction()
  };
}
