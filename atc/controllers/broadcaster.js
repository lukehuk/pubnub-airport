import PubNub from 'pubnub';
import {updatePlanes} from './actions';

const PUB_CHANNEL = 'airfield-alpha-atc';
const SUB_CHANNEL = 'airfield-alpha';

function issuePlaneWithCommand(pubnub) {
  return (planeName, command) => {
    pubnub.publish({
      channel: PUB_CHANNEL,
      message: {planeName, command}
    }, (status, response) => {
      console.log(status, response);
    });
  };
}

export function init(config) {
  const pubnub = new PubNub({
    publishKey: config.publishKey,
    subscribeKey: config.subscribeKey
  });

  pubnub.addListener({
    status: (statusEvent) => {},
    message: (message) => {
      config.store.dispatch(updatePlanes(message.message));
    },
    presence: (presenceEvent) => {}
  });

  console.log('Subscribing..');

  pubnub.subscribe({
    channels: [SUB_CHANNEL]
  });

  return {
    issuePlaneWithCommand: issuePlaneWithCommand(pubnub)
  };
}
