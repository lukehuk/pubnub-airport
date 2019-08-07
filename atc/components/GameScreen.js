import React, { Component } from 'react'
import { Text, View } from 'react-native'
import CommandBar from "./CommandBar"
import SatelliteView from "./SatelliteView"
import ComHistoryBar from "./ComHistoryBar"

export default class GameScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <ComHistoryBar/>
                </View>
                <View style={{flex: 8}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 8, width: '100%'}}>
                            <SatelliteView/>
                        </View>
                        <View style={{flex: 1, width: '100%'}}>
                            <CommandBar/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}