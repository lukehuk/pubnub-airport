// Actions
export const SELECT_PLANE = 'SELECT_PLANE';
export const UPDATE_PLANES = 'UPDATE_PLANES';
export const NEW_GAME_EVENT = 'NEW_GAME_EVENT';

export const PLANE_COMMANDS = {
  DOWNWIND: 'DOWNWIND',
  BASE: 'BASE',
  LEAVE: 'LEAVE',
  CLEARED: 'CLEARED'
};

// Action creators
export function selectPlane(planeName) {
  return {type: SELECT_PLANE, planeName};
}

export function updatePlanes(planeData) {
  return {type: UPDATE_PLANES, planes: planeData};
}

export function newGameEvent(eventDetails) {
  return {type: NEW_GAME_EVENT, event: eventDetails};
}
