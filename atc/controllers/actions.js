// Actions
export const SELECT_PLANE = 'SELECT_PLANE';
export const ISSUE_COMMAND = 'ISSUE_COMMAND';
export const UPDATE_PLANE = 'UPDATE_PLANE';

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

export function issueCommand(command) {
  return {type: ISSUE_COMMAND, command};
}

export function updatePlanes(planeData) {
  return {type: UPDATE_PLANE, planes: planeData};
}
