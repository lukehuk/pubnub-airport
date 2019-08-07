import React, { Component } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

export default class CommandButton extends Component {
    _onPressButton() {
        // Alert.alert('You tapped the button!')
    }

    render() {
        return (
            <View style={{ flex: 1, width: '100%', flexDirection: 'column', backgroundColor: 'yellow' }}>
                <TouchableNativeFeedback
                    onPress={this._onPressButton}
                    background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>

                    <View style={styles.button}>
                        <Image style={styles.buttonImage} source={this.props.imageSource}/>
                    </View>
                </TouchableNativeFeedback>
            </View>

        )

    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2196F3',
        height: '100%',
        justifyContent : 'center'
    },
    buttonImage: {
        width: '100%',
        resizeMode: 'contain'
    }
});