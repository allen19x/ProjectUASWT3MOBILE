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
import SongsUpdate from '../components/SongsUpdate';
import LoginScreen from '../components/LoginScreen';
import SongsAdd from '../components/SongsAdd';


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
                    <Scene key='login'
                        initial
                        hideNavBar
                        title="Login"
                        titleStyle={styles.headerTitleBig}
                        component={LoginScreen} />
                    <Scene key='songs'
                        onEnter={() => Actions.refresh({ lastUpdate: new Date })}
                        hideNavBar
                        title="Song List"
                        titleStyle={styles.headerTitleBig}
                        component={SongsScreen} />
                    <Scene key='songsDetail'
                        back
                        backButtonTintColor="white"
                        title="Song Detail"
                        titleStyle={styles.headerTitleBig}
                        component={SongsDetail} />
                    <Scene key='songsUpdate'
                        back
                        backButtonTintColor="white"
                        title="Song Update"
                        titleStyle={styles.headerTitleBig}
                        component={SongsUpdate} />
                    <Scene key='addSong'
                        back
                        backButtonTintColor="white"
                        title="Add Song"
                        titleStyle={styles.headerTitleBig}
                        component={SongsAdd} />
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