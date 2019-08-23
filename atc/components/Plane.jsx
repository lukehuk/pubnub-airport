import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

// Renders a single plane at its current location. Plane name and fuel level are also displayed.
// If the plane is selected it will render differently.
export default class Plane extends Component {
  onPlanePressed() {
    this.props.onPlaneSelect(this.props.planeName);
  }

  render() {
    const plane = this.props.planeData;
    const planeColor = this.props.planeSelected ? '#ffcc00' : '#808080';
    const fuelPercent = Math.floor((plane.remainingFuel / plane.fuelCapacity) * 100);
    const left = plane.currentX;
    const top = plane.currentY;
    const opacity = plane.currentAction === 'landing' ? plane.currentX / plane.destinationX : 1;

    return (
      <TouchableOpacity
        onPress={() => this.onPlanePressed()}
        style={[styles.container, {left: `${left}%`, top: `${top}%`, opacity: opacity}]}>
        <View style={styles.planeDetails}>
          <Text style={styles.planeName}>{this.props.planeName}</Text>
        </View>
        <View style={[styles.plane, {backgroundColor: planeColor}]}/>
        <View style={styles.fuelIndicator}>
          <View style={[styles.fuelLevel, {width: `${fuelPercent}%`}]}/>
        </View>
      </TouchableOpacity>
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
    marginLeft: -15,
    marginTop: -19,
    width: 30,
    height: 30,
  },
  planeDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 3,
    marginBottom: 5
  },
  planeName: {
    width: 35,
    fontSize: 8,
    textAlign: 'center'
  },
  fuelIndicator: {
    backgroundColor: '#808080',
    width: 30,
    height: 3,
    marginTop: 2
  },
  fuelLevel: {
    backgroundColor: '#ff0000',
    width: '50%',
    height: '100%',
  },
  plane: {
    backgroundColor: '#ffcc00',
    borderRadius: 30,
    borderColor: '#808080',
    borderWidth: 3,
    width: '100%',
    height: '100%',
  }
});

