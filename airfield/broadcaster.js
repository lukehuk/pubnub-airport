import PubNub from 'pubnub';

const PLANES_PUB_CHANNEL = 'airfield-alpha';
const GAME_EVENT_PUB_CHANNEL = 'airfield-alpha-events';
const ATC_SUB_CHANNEL = 'airfield-alpha-atc';

const receivedPlaneCommands = {};
let gameScore = 0;

// Publish a message to the specified pubnub channel
function publish(pubnub, channel, data) {
  pubnub.publish({
    channel: channel,
    message: data
  }, (status, response) => {
    console.log(channel, status, response);
  });
}

// Returns a function that, when called with plane data, broadcasts the data
function broadcastPlaneData(pubnub) {
  return (planeData) => {
    publish(pubnub, PLANES_PUB_CHANNEL, planeData);
  };
}

// Publishes a game event which includes the score and whether the end game has occurred
function publishEvent(pubnub, didCrash) {
  publish(pubnub, GAME_EVENT_PUB_CHANNEL, {
    score: gameScore,
    crashed: didCrash
  });
}

// Returns a function to be called when a plane lands. We increment the score and publish an event
function planeLanded(pubnub) {
  return () => {
    gameScore = gameScore + 1;
    console.log('Plane landed! Current score: ', gameScore);
    publishEvent(pubnub, false);
  };
}

// Returns a function to be called when a plane crashes. Endgame triggered by publishing an event
function planeCrashed(pubnub) {
  return () => {
    console.log('A plane has crashed! Game over. Final score: ', gameScore);
    publishEvent(pubnub, true);
  };
}

// Returns the latest ATC command received for given a plane name
function getLatestPlaneCommand(planeName) {
  const latestCommand = receivedPlaneCommands[planeName];
  delete receivedPlaneCommands[planeName];
  return latestCommand;
}

export function init(config) {
  const pubnub = new PubNub({
    publishKey: config.publishKey,
    subscribeKey: config.subscribeKey
  });

  pubnub.addListener({
    message: (message) => {
      console.log(message.message);
      receivedPlaneCommands[message.message.planeName] = message.message.command;
    },
  });

  console.log('Subscribing to ' + ATC_SUB_CHANNEL);

  pubnub.subscribe({
    channels: [ATC_SUB_CHANNEL]
  });

  return {
    broadcastFrequencyMS: config.broadcastFrequencyMS,
    broadcastPlanePosition: broadcastPlaneData(pubnub),
    planeLanded: planeLanded(pubnub),
    planeCrashed: planeCrashed(pubnub),
    getLatestPlaneCommand
  };
}
