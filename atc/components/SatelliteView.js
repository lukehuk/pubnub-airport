import React, {Component} from 'react';
import {View} from 'react-native';
import Plane from './Plane';
import Airfield from './Airfield';
import PropTypes from 'prop-types';

export default class SatelliteView extends Component {
  generatePlaneList(planeNames) {
    const planeList = [];
    planeNames.forEach((planeName) => (
      planeList.push(<Plane
        key={planeName}
        planeSelected={this.props.selectedPlane === planeName}
        onPlaneSelect={this.props.onPlaneSelect}
        planeName={planeName}
        planeData={this.props.planes[planeName]}
      />)
    ));
    return planeList;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Airfield/>
        {this.generatePlaneList(Object.keys(this.props.planes))}
      </View>
    );
  }

  static get propTypes() {
    return {
      onPlaneSelect: PropTypes.func,
      planes: PropTypes.array,
      selectedPlane: PropTypes.string()
    };
  }
}
