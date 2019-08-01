PubNub = require('pubnub');

const PUBLISH_KEY = "";
const SUBSCRIBE_KEY = "";
const PLANE_GEN_FREQ_SEC = 5;
const PUBLISH_FREQUENCY_SEC = 1;

var pubnub = new PubNub({
    publishKey : PUBLISH_KEY,
    subscribeKey : SUBSCRIBE_KEY
})

function createPlane() {
 var plane =
{
                planeId: "FOO",
                positionX: 0,
                positionY: 0,
                heading: "SE",
                fuel: 500,
                currentAction: "Flying",
                commandHistory: []
            }
            publish(plane);

            }

updatePlane()

updatePlanes()

commandReceived(command) {

}
    function publishPlaneData(planeData) {
        var publishConfig = {
            channel : "airfield-A",
            message: planeData
        }
        pubnub.publish(publishConfig, function(status, response) {
            console.log(status, response);
        })
    }

    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publish();
            }
        },
        message: function(msg) {
            console.log(msg.message);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['airfield-A']
    });

// repeat with the interval of 2 seconds
let timerId = setInterval(() => publish(), 2000);

console.log("publishing")
// after 5 seconds stop
setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 5000);
