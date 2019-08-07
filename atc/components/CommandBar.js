import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CommandButton from "./CommandButton"

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
}

export default class CommandBar extends Component {
    render() {
        return (
            <View style={styles.commandBar}>
                <CommandButton style={styles.commandButton} imageSource={images.leftArrow.uri}/>
                <View style={styles.separator} />
                <CommandButton style={styles.commandButton} imageSource={images.downArrow.uri}/>
                <View style={styles.separator} />
                <CommandButton style={styles.commandButton} imageSource={images.noEntry.uri}/>
                <View style={styles.separator} />
                <CommandButton style={styles.commandButton} imageSource={images.thumbGreen.uri}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    commandBar:{
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
})