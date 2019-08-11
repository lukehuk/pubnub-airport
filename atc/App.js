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

export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = {...console};
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const store = createStore(atcApp);

  const broadcaster = Broadcaster.init({
    publishKey: PUBLISH_KEY,
    subscribeKey: SUBSCRIBE_KEY,
    store
  });


  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
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

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
