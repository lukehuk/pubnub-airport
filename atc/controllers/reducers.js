import {SELECT_PLANE, UPDATE_PLANE} from './actions';
import {combineReducers} from 'redux';

function selectedPlane(state = '', action) {
  switch (action.type) {
    case SELECT_PLANE:
      return action.planeName;
    default:
      return state;
  }
}

function planes(state = {}, action) {
  switch (action.type) {
    case UPDATE_PLANE:
      return Object.assign({}, state.planes, {
        [action.plane.planeName]: action.plane
      });
    default:
      return state;
  }
}

const atcApp = combineReducers({
  selectedPlane,
  planes
});

export default atcApp;
