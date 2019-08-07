import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ComHistory from "./ComHistory"

const images = {
    incomingCall: {
        uri: require('../assets/images/incoming-call.png')
    },
    outgoingCall: {
        uri: require('../assets/images/outgoing-call.png')
    }
}

export default class ComHistoryBar extends Component {
    render() {
        return (
            <View style={{ flex: 1}} flexDirection='row'>
                <View style={{ flex: 1, backgroundColor: 'orange' }}>
                    <ComHistory title={'Last received:'} imageSource={images.incomingCall.uri} lastMessage={this.props.lastPlaneTransmission}/>
                </View>
                <View style={styles.separator} />
                <View style={{ flex: 1, backgroundColor: 'pink' }}>
                    <ComHistory title={'Last sent:'} imageSource={images.outgoingCall.uri} lastMessage={this.props.lastAtcTransmission}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    separator: {
        borderRightColor: 'black',
        borderRightWidth: 1,
    }
})
