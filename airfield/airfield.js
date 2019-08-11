import * as Airspace from './airspace.js';
import * as Broadcaster from './broadcaster.js';
import * as FlightNavigator from './navigator.js';

const PUBLISH_KEY = '';
const SUBSCRIBE_KEY = '';
const PUBLISH_FREQUENCY_MS = 1000;
const PLANE_GEN_FREQ_MS = 5000;

// Percentage coordinates
const AIRFIELD = {
  base: {x: 12, y: 20},
  final: {x: 12, y: 80},
  runwayStart: {x: 20, y: 80},
  runwayMiddle: {x: 50, y: 80},
  upwind: {x: 88, y: 80},
  crosswind: {x: 88, y: 80},
  downwind: {x: 88, y: 20},
};

const navigator = FlightNavigator.init(AIRFIELD);

const broadcaster = Broadcaster.init({
  publishKey: PUBLISH_KEY,
  subscribeKey: SUBSCRIBE_KEY,
  broadcastFrequencyMS: PUBLISH_FREQUENCY_MS,
});

Airspace.openAirspace(
    broadcaster,
    navigator,
    PLANE_GEN_FREQ_MS
);
