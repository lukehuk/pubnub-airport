import React, {Component} from 'react';
import {View} from 'react-native';
import Plane from './Plane';
import Airfield from './Airfield';
import PropTypes from 'prop-types';
import PlaneDestinationMarker from './PlaneDestinationMarker';

// Container component for the main play area. Generates plane components for each plane object
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

  // Only generate a plane destination marker if a plane is selected
  generatePlaneDestinationMarker() {
    if (this.props.isPlaneSelected) {
      return <PlaneDestinationMarker planeData={this.props.planes[this.props.selectedPlane]}/>;
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Airfield/>
        {this.generatePlaneDestinationMarker()}
        {this.generatePlaneList(Object.keys(this.props.planes))}
      </View>
    );
  }

  static get propTypes() {
    return {
      onPlaneSelect: PropTypes.func,
      planes: PropTypes.object,
      isPlaneSelected: PropTypes.bool,
      selectedPlane: PropTypes.string
    };
  }
}
