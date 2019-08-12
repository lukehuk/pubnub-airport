import React, {Component} from 'react';
import {View} from 'react-native';
import CommandBar from './CommandBar';
import SatelliteView from './SatelliteView';
import ComHistoryBar from './ComHistoryBar';
import {selectPlane} from '../controllers/actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

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
        <View style={{flex: 1}}>
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

  static get propTypes() {
    return {
      selectedPlane: PropTypes.string,
      planes: PropTypes.object,
      onPlaneSelect: PropTypes.func,
      broadcaster: PropTypes.object
    };
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPlane: state.selectedPlane,
    planes: state.planes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlaneSelect: (planeName) => {
      dispatch(selectPlane(planeName));
    }
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScreen);
