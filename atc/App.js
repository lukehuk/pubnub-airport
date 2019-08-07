import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenOrientation } from 'expo';
import GameScreen from "./components/GameScreen"

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <View style={styles.container}>
                <StatusBar hidden/>
                <GameScreen/>
            </View>
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
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            // ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free to
            // remove this if you are not using it in your app
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        }),
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
