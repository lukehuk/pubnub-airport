import React, {Component} from 'react';
import {Image, StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import PropTypes from 'prop-types';

// Renders a single command button. If no plane is selected the button will be disabled
export default class CommandButton extends Component {
  render() {
    const commandOpacity = this.props.disabled ? 0.3 : 1;

    return (
      <View style={{flex: 1, width: '100%', flexDirection: 'column'}}>
        <TouchableNativeFeedback
          onPress={this.props.onPress}
          disabled={this.props.disabled}>
          <View style={styles.button}>
            <Image
              style={[styles.buttonImage, {opacity: commandOpacity}]}
              source={this.props.imageSource.uri}
            />
          </View>
        </TouchableNativeFeedback>
      </View>

    );
  }

  static get propTypes() {
    return {
      onPress: PropTypes.func,
      disabled: PropTypes.bool,
      imageSource: PropTypes.object
    };
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    height: '100%',
    justifyContent: 'center'
  },
  buttonImage: {
    width: '100%',
    resizeMode: 'contain',
  }
});
