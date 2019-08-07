import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default class Airfield extends Component {
    render() {
        return (
            <View style={styles.airfield}>
                    <View style={styles.finalApproach}>
                    </View>
                    <View style={styles.trafficRoute}

                    />

                    <View style={styles.runway}>

                        <View style={styles.runwayPaint}/>
                    </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    airfield: {
        flex: 1,
        backgroundColor: '#8aa81c'
    },
    trafficRoute: {
        // width: '100%',
        position: 'relative',
        height: '60%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%',
        marginBottom: '10%',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        borderStyle: 'dashed'
    },
    finalApproach: {
        position: 'absolute',
        top: 250,
        left: 70,
        width: 130,
        height: 50,
        backgroundColor: '#a9b322',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    runway: {
        position: 'absolute',
        top: 250,
        left: 200,
        width: 300,
        height: 50,
        backgroundColor: 'black'
    },
    runwayPaint: {
        marginTop: 22,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'dashed'
    }
})

