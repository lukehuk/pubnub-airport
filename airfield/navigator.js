"use strict"

function genStartPosition(airfield) {
    return () => {
        return {
            x: Math.floor(Math.random() * airfield.width * 2),
            y: 0 - Math.floor(Math.random() * airfield.height * 2)
        }
    }
}

function genStartDestinationPosition(airfield) {
    return () => {
        return {
            x: Math.floor(Math.random() * airfield.final.x),
            y: Math.floor(Math.random() * airfield.final.y)
        }
    }
}

function determineDestination(airfield) {
    return (currentX, currentY, action) => {
        let targetX
        let targetY
        switch (action) {
            case "base":
                return airfield.base
            case "downwind":
                return airfield.downwind
            case "cleared":
                return airfield.runwayStart
            case "clearing":
                return {
                    x: currentX >= airfield.width / 2 ? airfield.width + 1 : -1
                }
            default:


        }
        return {
            x: targetX,
            y: targetY
        }
    }
}

export function init(airfield) {
    return {
        genStartPosition: genStartPosition(airfield),
        genStartDestinationPosition: genStartDestinationPosition(airfield),
        determineDestination: determineDestination(airfield)
    }

}