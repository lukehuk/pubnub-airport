import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// Component renders a runway and traffic pattern
export default class Airfield extends Component {
  render() {
    return (
      <View style={styles.airfield}>
        <View style={styles.finalApproach}/>
        <View style={styles.trafficRoute}/>
        <View style={styles.runway}>
          <View style={styles.runwayPaint}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  airfield: {
    flex: 1,
    backgroundColor: '#8aa81c'
  },
  trafficRoute: {
    position: 'relative',
    height: '60%',
    marginLeft: '12%',
    marginRight: '12%',
    top: '20%',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 5,
    borderStyle: 'dashed'
  },
  finalApproach: {
    position: 'absolute',
    top: '74%',
    left: '12%',
    width: '21%',
    height: '12%',
    backgroundColor: '#a9b322',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50
  },
  runway: {
    position: 'absolute',
    top: '74%',
    left: '33%',
    width: '45%',
    height: '12%',
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  runwayPaint: {
    marginTop: '6%',
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'dashed'
  }
});

