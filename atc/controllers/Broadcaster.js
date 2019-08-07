"use strict";

import PubNub from "pubnub"
import { updatePlane } from "./actions"

const PUB_CHANNEL = "airfield-A-atc";
const SUB_CHANNEL = "airfield-A";

function issuePlaneWithCommand(pubnub) {
    return (planeName, command) => {
        pubnub.publish({
            channel: PUB_CHANNEL,
            message: { planeName, command }
        }, (status, response) => {
            console.log(status, response)
        })
    }
}

export function init(config) {
    let pubnub = new PubNub({
        publishKey: config.publishKey,
        subscribeKey: config.subscribeKey
    })

    pubnub.addListener({
        status: (statusEvent) => {},
        message: (message) => {
            this.props.store.dispatch(updatePlane(message))
        },
        presence: (presenceEvent) => {}
    })

    console.log("Subscribing..")

    pubnub.subscribe({
        channels: [SUB_CHANNEL]
    })

    return {
        issuePlaneWithCommand: issuePlaneWithCommand(pubnub)
    }
}