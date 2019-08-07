import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity  } from 'react-native'

export default class Plane extends Component {
    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    state = {
        selected: false,
        left: 0,
        top: 0
    };

    setPlanePosition = (x, y) => {
        this.setState({
            left: x,
            top: y
        })
    }

    onPlanePressed = () => {
        this.setState({
            selected: true
        })
    }

    render() {
        let planeColor = this.state.selected ? 'yellow' : 'grey';

        return (
            <TouchableOpacity  onPress={this.onPlanePressed} style={[styles.planeContainer, {left: this.state.left, top: this.state.top}]}>
                <View style={styles.planeDetails}>
                    <Text style={styles.planeName}>{this.props.planeName}</Text>
                </View>
                <View style={[styles.plane, {backgroundColor: planeColor}]}/>
                <View style={styles.fuelIndicator}>
                    <View style={[styles.fuelLevel, {width: `${this.props.fuelPercent}%`}]}/>
                </View>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    planeContainer:{
        position: 'absolute',
        top: 200,
        left: 200,
        width:30,
        height:30,
    },
    planeDetails: {
        justifyContent : 'center',
        alignItems: 'center',
        width:30,
        height:3,
        marginBottom:5
    },
    planeName: {
        fontSize: 8,
    },
    fuelIndicator: {
        backgroundColor: 'grey',
        width:30,
        height:3,
        marginTop:2
    },
    fuelLevel: {
        backgroundColor: 'red',
        width: '50%',
        height: '100%',
    },
    plane: {
        backgroundColor: 'yellow',
        borderRadius: 30,
        borderColor: 'grey',
        borderRightColor: 'white',
        borderLeftColor: 'red',
        borderWidth: 3,
        width: '100%',
        height: '100%',
    }
})

