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
      console.log('state:', state);
      const newData = {};
      action.planes.forEach((plane) => {
        newData[plane.planeName] = plane;
      });
      console.log('newData:', newData);
      return newData;
    default:
      return state;
  }
}

const atcApp = combineReducers({
  selectedPlane,
  planes
});

export default atcApp;
