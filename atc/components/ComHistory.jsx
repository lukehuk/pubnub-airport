import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

// Renders a communication history area
export default class ComHistory extends Component {
  render() {
    return (
      <View style={styles.comHistory} flexDirection='row'>
        <View style={styles.icon}>
          <Image style={styles.iconImage} source={this.props.imageSource.uri}/>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.lastMessage}>{this.props.lastMessage}</Text>
        </View>
      </View>
    );
  }

  static get propTypes() {
    return {
      imageSource: PropTypes.object,
      title: PropTypes.string,
      lastMessage: PropTypes.string
    };
  }
}

const styles = StyleSheet.create({
  comHistory: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000000'
  },
  content: {
    flex: 6
  },
  title: {
    fontWeight: 'bold',
  },
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconImage: {
    height: '100%',
    resizeMode: 'contain'
  },
  lastMessage: {
    fontStyle: 'italic'
  }
});
