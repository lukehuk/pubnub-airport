import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import CommandButton from './CommandButton';
import {PLANE_COMMANDS} from '../controllers/actions';
import PropTypes from 'prop-types';

const images = {
  leftArrow: {
    uri: require('../assets/images/arrow-left.png')
  },
  downArrow: {
    uri: require('../assets/images/arrow-down.png')
  },
  noEntry: {
    uri: require('../assets/images/no-entry.png')
  },
  thumbGreen: {
    uri: require('../assets/images/thumb-green.png')
  },
};

export default class CommandBar extends Component {
  render() {
    const commandsDisabled = !this.props.planeSelected;
    const landingCommandDisabled = !this.props.planeSelected || !this.props.planeInFinalApproach;
    return (
      <View style={styles.commandBar}>
        <CommandButton
          style={styles.commandButton}
          disabled={commandsDisabled}
          onPress={this.props.onCommandIssued(PLANE_COMMANDS.DOWNWIND)}
          imageSource={images.leftArrow}
        />
        <View style={styles.separator} />
        <CommandButton
          style={styles.commandButton}
          disabled={commandsDisabled}
          onPress={this.props.onCommandIssued(PLANE_COMMANDS.BASE)}
          imageSource={images.downArrow}
        />
        <View style={styles.separator} />
        <CommandButton
          style={styles.commandButton}
          disabled={commandsDisabled}
          onPress={this.props.onCommandIssued(PLANE_COMMANDS.LEAVE)}
          imageSource={images.noEntry}
        />
        <View style={styles.separator} />
        <CommandButton
          style={styles.commandButton}
          disabled={landingCommandDisabled}
          onPress={this.props.onCommandIssued(PLANE_COMMANDS.CLEARED)}
          imageSource={images.thumbGreen}
        />
      </View>
    );
  }

  static get propTypes() {
    return {
      onCommandIssued: PropTypes.func,
      planeSelected: PropTypes.bool,
      planeInFinalApproach: PropTypes.bool
    };
  }
}

const styles = StyleSheet.create({
  commandBar: {
    flex: 1,
    flexDirection: 'column',
    borderLeftColor: 'black',
    borderLeftWidth: 1,
  },
  commandButton: {
    flex: 1,
    width: '100%'
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});
