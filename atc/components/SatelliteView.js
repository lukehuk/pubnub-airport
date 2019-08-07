import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Plane from "./Plane"
import Airfield from "./Airfield"

export default class SatelliteView extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Airfield/>
                {this.props.planes.entries((planeName, planeData) => (
                    <Plane
                        planeSelected={this.props.selectedPlane === planeName}
                        onPlaneSelect={this.props.onPlaneSelect}
                        planeName={planeName}
                        planeData={planeData}
                    />
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({})

