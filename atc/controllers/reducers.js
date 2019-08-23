import {NEW_GAME_EVENT, SELECT_PLANE, UPDATE_PLANES} from './actions';
import {combineReducers} from 'redux';


// Reducer to handle a plane selection action
function selectedPlane(state = '', action) {
  switch (action.type) {
    case SELECT_PLANE:
      return action.planeName;
    default:
      return state;
  }
}

// Reducer to handle new plane data being received
function planes(state = {}, action) {
  switch (action.type) {
    case UPDATE_PLANES:
      const newData = {};
      action.planes.forEach((plane) => {
        newData[plane.planeName] = plane;
      });
      return newData;
    default:
      return state;
  }
}

// Reducer to handle new plane data being received
function gameStatus(state = {score: 0, crashed: false}, action) {
  switch (action.type) {
    case NEW_GAME_EVENT:
      return action.event;
    default:
      return state;
  }
}

const atcApp = combineReducers({
  selectedPlane,
  planes,
  gameStatus
});

export default atcApp;
