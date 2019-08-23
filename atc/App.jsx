import {AppLoading, ScreenOrientation} from 'expo';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Asset} from 'expo-asset';
import React, {useState} from 'react';
import GameScreen from './components/GameScreen';
import {createStore} from 'redux';
import atcApp from './controllers/reducers';
import {Provider} from 'react-redux';
import * as Broadcaster from './controllers/broadcaster';
import {YellowBox} from 'react-native';

const PUBLISH_KEY = '';
const SUBSCRIBE_KEY = '';

// Entrypoint into the application.
// Creates the Redux store, initializes PubNub, loads resources and renders the game.
export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = {...console};
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  // Declare new state variable 'isLoadingComplete', default to false, set with 'setLoadingComplete'
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const store = createStore(atcApp);

  const broadcaster = Broadcaster.init({
    publishKey: PUBLISH_KEY,
    subscribeKey: SUBSCRIBE_KEY,
    dispatch: store.dispatch
  });


  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadAsync}
        onError={(error) => console.warn(error)}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  } else {
    // Hide device status bar (where clock, signal strength etc shown), create game screen component
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar hidden/>
          <GameScreen broadcaster={broadcaster}/>
        </View>
      </Provider>
    );
  }
}

// Load all game images
async function loadAsync() {
  await Promise.all([
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT),
    Asset.loadAsync([
      require('./assets/images/arrow-left.png'),
      require('./assets/images/arrow-down.png'),
      require('./assets/images/no-entry.png'),
      require('./assets/images/thumb-green.png'),
      require('./assets/images/thumb-grey.png'),
      require('./assets/images/incoming-call.png'),
      require('./assets/images/outgoing-call.png')
    ])
  ]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
