import React, { Component } from 'react'
import { Scene, Router, Actions, Stack } from 'react-native-router-flux'
import {
    Alert,
    BackHandler,
    StyleSheet,
} from 'react-native';
import { Fonts } from '../GlobalConfig';
import SongsScreen from '../components/SongsScreen';
import SongsDetail from '../components/SongsDetail';


class NavigationRouter extends Component {
    showExitAlert() {
        Alert.alert(
            'Keluar Aplikasi',
            'Apakah Anda yakin untuk keluar aplikasi?',
            [
                {
                    text: 'Tidak',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Ya', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false },
        );
    }

    handleback = () => {
        let screen = Actions.currentScene;
        switch (screen) {
            case 'camera':
                this.showExitAlert()
                return true;
            default:
                Actions.pop()
                return true;
        }
    }

    render() {
        return (
            <Router
                navigationBarStyle={{ backgroundColor: "blue" }}
                backAndroidHandler={this.handleback}>
                <Stack
                    key='root'>
                    <Scene key='songs'
                        initial
                        title="Song List"
                        titleStyle={styles.headerTitleBig}
                        component={SongsScreen} />
                    <Scene key='songsDetail'
                        back
                        backButtonTintColor="white"
                        title="Song Detail"
                        titleStyle={styles.headerTitleBig}
                        component={SongsDetail} />
                </Stack>
            </Router>
        )
    }
}

const styles = StyleSheet.create({

    headerTitleBig: {
        color: 'white',
        fontSize: 20,
        fontFamily: Fonts.SF_COMPACT_BOLD,
        letterSpacing: 0.7,
        paddingLeft: 10
    },
})

export default NavigationRouter