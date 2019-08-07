"use strict";

import PubNub from "pubnub"

const CHANNEL = "airfield-A";

function broadcastPlanePosition(pubnub) {
    return (planeData) => {
        pubnub.publish({
            channel: CHANNEL,
            message: planeData
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
            console.log(message.message)
        },
        presence: (presenceEvent) => {}
    })

    console.log("Subscribing..")

    pubnub.subscribe({
        channels: [CHANNEL]
    })

    return {
        broadcastFrequencyMS: config.broadcastFrequencyMS,
        broadcastPlanePosition: broadcastPlanePosition(pubnub)
    }
}