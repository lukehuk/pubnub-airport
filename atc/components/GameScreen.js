import React, { Component } from 'react'
import { Text, View } from 'react-native'
import CommandBar from "./CommandBar"
import SatelliteView from "./SatelliteView"
import ComHistoryBar from "./ComHistoryBar"
import { selectPlane } from "../controllers/actions"
import { connect } from "react-redux"

class GameScreen extends Component {
    render() {
        let selectedPlaneName = this.props.selectedPlane
        let planes = this.props.planes
        let onPlaneSelect = this.props.onPlaneSelect

        let isPlaneSelected = planes[selectedPlaneName] === undefined
        let selectedPlaneData = planes[selectedPlaneName]

        let onCommandIssued = (command) => () => {
            this.props.broadcaster.issueCommand(command)
        }
        let planeInFinalApproach = false //TODO

        return (
            <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <ComHistoryBar
                        lastAtcTransmission={selectedPlaneData.lastAtcTransmission}
                        lastPlaneTransmission={selectedPlaneData.lastPlaneTransmission}
                    />
                </View>
                <View style={{flex: 8}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 8, width: '100%'}}>
                            <SatelliteView
                                planes={planes}
                                onPlaneSelect={onPlaneSelect}
                                selectedPlane={selectedPlaneName}
                            />
                        </View>
                        <View style={{flex: 1, width: '100%'}}>
                            <CommandBar
                                planeSelected={isPlaneSelected}
                                planeInFinalApproach={planeInFinalApproach}
                                onCommandIssue={onCommandIssued}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedPlane: state.selectedPlane,
        planes: state.planes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPlaneSelect: planeName => {
            dispatch(selectPlane(planeName))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScreen)