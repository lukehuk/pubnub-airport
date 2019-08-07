import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Plane from "./Plane"
import Airfield from "./Airfield"

export default class SatelliteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x:0,
            y:0
        }
    }

    componentDidMount(){
        // Toggle the state every second
        setInterval(() => {
            this.setState((previousState) => (
                {
                    x: previousState.x + 5,
                    y: previousState.y + 5
                }
            ));
            this.movePlane();
        }
        , 1000);
    }

    movePlane = () => {
        this.child.setPlanePosition(this.state.x, this.state.y);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Airfield/>
                <Plane onRef={ref => (this.child = ref)} planeName={'FXR004'} fuelPercent={30}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

