import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

export default class ComHistory extends Component {
    render() {
        return (
            <View style={styles.comHistory} flexDirection='row'>
                <View style={styles.icon}>
                    <Image style={styles.iconImage} source={this.props.imageSource}/>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.lastMessage}>{this.props.lastMessage}</Text>
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    comHistory: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    content: {
        flex: 6,
        width: 33
    },
    title: {
        fontWeight: 'bold',
    },
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent : 'center'
    },
    iconImage: {
        height: '100%',
        resizeMode: 'contain'
    },
    lastMessage: {
        fontStyle: 'italic'
    }
})