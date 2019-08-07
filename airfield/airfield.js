"use strict";

import * as Airspace from "./airspace.js";
import * as Broadcaster from "./broadcaster.js"
import * as FlightNavigator from "./navigator.js";

const AIRFIELD = {
    width: 160,
    height: 90,
    base: { x: 20, y: 70 },
    final: { x: 20, y: 20 },
    runwayStart: { x: 30, y: 20 },
    runwayEnd: { x: 70, y: 20 },
    crosswind: { x: 80, y: 20 },
    downwind: { x: 80, y: 70 }
}

const PUBLISH_KEY = "pub-c-8138ca47-d28d-4b2d-924b-ea246f1dd974";
const SUBSCRIBE_KEY = "sub-c-1bffe06a-b3a0-11e9-839f-e2cc45fa663b";
const PUBLISH_FREQUENCY_SEC = 1;

let broadcaster = Broadcaster.init({
    publishKey: PUBLISH_KEY,
    subscribeKey: SUBSCRIBE_KEY,
    broadcastFrequencyMS: PUBLISH_FREQUENCY_SEC * 1000
})
let navigator = FlightNavigator.init(AIRFIELD);
Airspace.openAirspace(broadcaster, navigator)