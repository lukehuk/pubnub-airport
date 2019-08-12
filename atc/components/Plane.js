import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Plane extends Component {
  onPlanePressed() {
    this.props.onPlaneSelect(this.props.planeName);
  }

  render() {
    const plane = this.props.planeData;
    const planeColor = this.props.planeSelected ? 'yellow' : 'grey';
    const fuelPercent = Math.floor((plane.remainingFuel / plane.fuelCapacity) * 100);
    const left = plane.currentX;
    const top = plane.currentY;
    const opacity = plane.currentAction === 'landing' ? plane.currentX / plane.destinationX : 1;

    // console.log("PLANE PROPS")
    // console.log(this.props)
    console.log('CURRENT X:' + plane.currentX + ' Y:' + plane.currentY);
    console.log('DESTINATION X:' + plane.destinationX + ' Y:' + plane.destinationY);
    console.log('ACTION: ' + plane.currentAction);

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
    fontSize: 8,
  },
  fuelIndicator: {
    backgroundColor: 'grey',
    width: 30,
    height: 3,
    marginTop: 2
  },
  fuelLevel: {
    backgroundColor: 'red',
    width: '50%',
    height: '100%',
  },
  plane: {
    backgroundColor: 'yellow',
    borderRadius: 30,
    borderColor: 'grey',
    borderWidth: 3,
    width: '100%',
    height: '100%',
  }
});

