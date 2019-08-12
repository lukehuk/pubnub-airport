import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

export default class PlaneDestinationMarker extends Component {
  render() {
    const plane = this.props.planeData;
    const left = plane.destinationX;
    const top = plane.destinationY;

    return (
      <View style={[styles.container, {left: `${left}%`, top: `${top}%`}]}>
        <View style={styles.destinationMarker}/>
      </View>
    );
  }

  static get propTypes() {
    return {
      planeData: PropTypes.object,
      onPlaneSelect: PropTypes.func,
      planeName: PropTypes.string,
      planeSelected: PropTypes.bool
    };
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginLeft: -8,
    marginTop: -8,
    width: 16,
    height: 16,
  },
  destinationMarker: {
    backgroundColor: 'red',
    borderRadius: 30,
    borderStyle: 'dotted',
    borderColor: 'white',
    borderWidth: 3,
    width: '100%',
    height: '100%',
  }
});

