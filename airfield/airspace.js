'use strict';

const PLANE_GEN_FREQ_MS = 5000
const STARTING_FUEL = 500;

let planes = []
let planeCommands = {}

function getLetter() {
    return Math.floor(Math.random() * 26) + 65;
}

function getNum() {
    return Math.floor(Math.random() * 11) + 48;
}

function generatePlaneName() {
    return String.fromCharCode(...[getLetter(), getLetter(), getLetter(), getNum(), getNum(), getNum()])
}

function generateNewPlane(navigator) {
    let startPosition = navigator.genStartPosition();
    let startDestination = navigator.genStartDestinationPosition();
    let plane = {
        planeId: generatePlaneName(),
        currentX: startPosition.x,
        currentY: startPosition.y,
        destinationX: startDestination.x,
        destinationY: startDestination.y,
        fuel: STARTING_FUEL,
        currentAction: "Flying",
        lastAtcTransmission: "",
        lastPlaneTransmission: "",
    }
    planes.push(plane)
}

function updatePlane(plane, navigator) {
    if (planeCommands[plane.planeId] !== undefined) {
        plane.lastContactReceived = ""
        plane.lastContactSent = ""
        plane.currentAction = ""
        let destination = navigator.determineDestination(
            plane.currentX,
            plane.currentY,
            plane.currentAction
        )
        plane.destinationX = destination.x
        plane.destinationY = destination.y
    }

    if (plane.destinationX !== plane.currentX) {
        plane.currentX = plane.destinationX > plane.currentX ? plane.currentX + 1 : plane.currentX - 1
        plane.fuel = plane.fuel - 1;
    }

    if (plane.destinationY !== plane.currentY) {
        plane.currentY = plane.destinationY > plane.currentY ? plane.currentY + 1 : plane.currentY - 1
        plane.fuel = plane.fuel - 1;
    }

    if (plane.destinationX === plane.currentX && plane.destinationY === plane.currentY) {
        let destination = navigator.determineDestination(
            plane.currentX,
            plane.currentY,
            plane.currentAction
        )
        plane.destinationX = destination.x
        plane.destinationY = destination.y
    }
    return plane
}

function updatePlanes(broadcaster, navigator) {
    planes.map(function (plane) {
        let updatedPlane = updatePlane(plane, navigator)
        broadcaster.broadcastPlanePosition(updatedPlane)
        return plane
    })
}

function commandReceived(command) {
    planeCommands[command.planeId] = command.message
}

export function openAirspace(broadcaster, navigator) {
    // let newPlaneTimer = setInterval(() => generateNewPlane(), PLANE_GEN_FREQ_MS)
    generateNewPlane(navigator)
    let publishTimer = setInterval(() => updatePlanes(broadcaster, navigator), broadcaster.broadcastFrequencyMS)

    // after 5 seconds stop
    // setTimeout(() => {
    //     clearInterval(newPlaneTimer)
    //     console.log('No new planes')
    // }, 5000)
}


