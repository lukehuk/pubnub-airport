import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import CommandBar from './CommandBar';
import SatelliteView from './SatelliteView';
import ComHistoryBar from './ComHistoryBar';
import {selectPlane} from '../controllers/actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Container component for the game. Gets data from the Redux store and converts it into props for
// the child components.
class GameScreen extends Component {
  render() {
    const selectedPlaneName = this.props.selectedPlane;
    const planes = this.props.planes;
    const onPlaneSelect = this.props.onPlaneSelect;

    const isPlaneSelected = planes[selectedPlaneName] !== undefined;
    const selectedPlaneData = planes[selectedPlaneName];

    const onCommandIssued = (command) => () => {
      this.props.broadcaster.issuePlaneWithCommand(selectedPlaneName, command);
    };
    const planeInFinalApproach = isPlaneSelected && selectedPlaneData.currentAction === 'runway';

    return (
      <View style={{flex: 1, width: '100%', flexDirection: 'column'}}>
        <View style={{flex: 1, zIndex: 10}}>
          <ComHistoryBar
            lastAtcTransmission={isPlaneSelected ? selectedPlaneData.lastAtcTransmission : 'N/A'}
            lastPlaneTransmission={isPlaneSelected ? selectedPlaneData.lastPlaneTransmission: 'N/A'}
          />
        </View>
        <View style={{flex: 8}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 8, width: '100%'}}>
              <SatelliteView
                planes={planes}
                onPlaneSelect={onPlaneSelect}
                isPlaneSelected={isPlaneSelected}
                selectedPlane={selectedPlaneName}
              />
            </View>
            <View style={{flex: 1, width: '100%'}}>
              <CommandBar
                planeSelected={isPlaneSelected}
                planeInFinalApproach={planeInFinalApproach}
                onCommandIssued={onCommandIssued}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameStatus.score < this.props.gameStatus.score) {
      Alert.alert('Plane landed!', 'Current score: ' + this.props.gameStatus.score);
    }
    if (this.props.gameStatus.crashed) {
      Alert.alert('GAME OVER!', 'A plane has crashed! Final score: ' + this.props.gameStatus.score);
    }
  }


  static get propTypes() {
    return {
      selectedPlane: PropTypes.string,
      planes: PropTypes.object,
      gameStatus: PropTypes.object,
      onPlaneSelect: PropTypes.func,
      broadcaster: PropTypes.object
    };
  }
}

// Used for selecting the needed data from the Redux store
const mapStateToProps = (state) => {
  return {
    selectedPlane: state.selectedPlane,
    planes: state.planes,
    gameStatus: state.gameStatus
  };
};

// Used for dispatching actions to the Redux store
const mapDispatchToProps = (dispatch) => {
  return {
    onPlaneSelect: (planeName) => {
      dispatch(selectPlane(planeName));
    }
  };
};

// Connects the React component to the Redux store
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScreen);
