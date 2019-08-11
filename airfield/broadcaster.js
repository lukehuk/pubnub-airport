import PubNub from 'pubnub';

const PUB_CHANNEL = 'airfield-A';
const SUB_CHANNEL = 'airfield-A-atc';

const receivedPlaneCommands = {};

// Broadcasts data about a plane
function broadcastPlaneData(pubnub) {
  return (planeData) => {
    pubnub.publish({
      channel: PUB_CHANNEL,
      message: planeData
    }, (status, response) => {
      console.log(status, response); // TODO handle error
    });
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

  // TODO handle error
  pubnub.addListener({
    status: (statusEvent) => {},
    message: (message) => {
      receivedPlaneCommands[message.message.planeName] = message.message.command;
    },
    presence: (presenceEvent) => {}
  });

  console.log('Subscribing to ' + SUB_CHANNEL);

  pubnub.subscribe({
    channels: [SUB_CHANNEL]
  });

  return {
    broadcastFrequencyMS: config.broadcastFrequencyMS,
    broadcastPlanePosition: broadcastPlaneData(pubnub),
    getLatestPlaneCommand
  };
}
