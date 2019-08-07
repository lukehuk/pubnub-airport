/*
 * action types
 */

export const SELECT_PLANE = 'SELECT_PLANE'
export const ISSUE_COMMAND = 'ISSUE_COMMAND'
export const UPDATE_PLANE = 'UPDATE_PLANE'

/*
 * other constants
 */

export const PlaneCommands = {
    DOWNWIND: 'DOWNWIND',
    BASE: 'BASE',
    LEAVE: 'LEAVE',
    CLEARED: 'CLEARED'
}

/*
 * action creators
 */

export function selectPlane(planeName) {
    return { type: SELECT_PLANE, planeName }
}

export function issueCommand(command) {
    return { type: ISSUE_COMMAND, command }
}

export function updatePlane(plane) {
    return { type: UPDATE_PLANE, plane}
}