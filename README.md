# PubNub Airport

A project that demos PubNub and Javascript technologies through an air traffic control game.

This repository contains two separate applications which both need to be run in order to play the game. Execution instructions are provided below.

This project comes with a four part blog series which can be accessed below. For additional support or guidance, please refer to these blogs:
* Part 1: COMING SOON
* Part 2: COMING SOON
* Part 3: COMING SOON
* Part 4: COMING SOON

# Airfield
The server-side component of the game that represents an airfield.

## Getting Started
### Prerequisites
This project requires:
* Node.js (with NPM)

### Installing
In order to use the application you will need publisher and subscriber PubNub keys. Free registration is possible at [https://dashboard.pubnub.com/signup](https://dashboard.pubnub.com/signup) 

The API keys should be added as the `PUBLISH_KEY` and `SUBSCRIBE_KEY` constants in airfield.js.

You will also need to ensure that dependent modules are installed. You can do this by running `npm install` in the airfield directory.

Execution behaviour, such as plane generation frequency, can be modified by adjusting constants within the project files.

### Running
The application can be started by running `node airfield.js --experimental-modules` in the airfield directory.

*Note: The application is written using ES6 modules. At the time of writing the latest version of Node.js requires the "--experimental-modules" flag to be present. It is possible that in subsequent versions of Node this flag is no longer required.* 

# ATC
The client-side component of the game that represents an airfield.

## Getting Started
### Prerequisites
TODO

### Installing
In order to use the application you will need publisher and subscriber PubNub keys. Free registration is possible at [https://dashboard.pubnub.com/signup](https://dashboard.pubnub.com/signup) 

The API keys should be added as the `PUBLISH_KEY` and `SUBSCRIBE_KEY` constants in App.js.

You will also need to ensure that dependent modules are installed. You can do this by running `npm install` in the atc directory.

TODO

### Running
The application can be started by running `expo start` in the atc directory.

TODO

## Built With
* [PubNub](https://www.pubnub.com/) - Realtime messaging platform 
* [Node.js](https://nodejs.org/) - A JavaScript runtime
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [React Native](https://facebook.github.io/react-native) - JavaScript library for building user interfaces 
* [Redux](https://redux.js.org/introduction/getting-started) - A predictable state container for JavaScript apps

## License
This project is licensed under the Apache-2.0 License