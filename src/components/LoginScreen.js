import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Linking } from 'react-native';
import { Fonts } from '../GlobalConfig';
import { Buffer } from 'buffer'
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

const LoginScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [loginValue, setLoginValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    const login = () => {
        const loginData = {
            username: loginValue,
            password: passwordValue
        }
        Actions.songs(loginData)
        setLoginValue("")
        setPasswordValue("")
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, backgroundColor:'lightblue' }}>
            {isLoading ?
                <View style={{ height: "50%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color="black" size='large' />
                </View>
                :
                <>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontFamily: Fonts.SF_COMPACT_BOLD, color: "black", fontSize: 24, marginBottom:20 }}>Welcome To Shamord!!</Text>
                        <View
                            style={{
                                height: 45,
                                maxHeight: 60,
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                marginBottom: 20,
                                alignItems: 'center',
                            }}>
                            <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Username :</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <View style={styles.inputSearchBoxContainerStyle}>
                                    <TextInput
                                        selectionColor="red"
                                        numberOfLines={1}
                                        style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "black", fontSize: 14, marginLeft: 2 }}
                                        value={loginValue}
                                        onChangeText={setLoginValue}>
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                height: 45,
                                maxHeight: 60,
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                marginBottom: 20,
                                alignItems: 'center',

                            }}>
                            <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Password :</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <View style={styles.inputSearchBoxContainerStyle}>
                                    <TextInput
                                        selectionColor="red"
                                        numberOfLines={1}
                                        style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "black", fontSize: 14, marginLeft: 2 }}
                                        value={passwordValue}
                                        onChangeText={setPasswordValue}>
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => login()}
                            style={{ height: 30, width: "100%", borderColor: "blue", marginBottom: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor:'blue', borderRadius:20 }}>
                            <Text style={{ fontSize: 14, fontFamily: Fonts.SF_COMPACT_BOLD, color:"white" }}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    inputSearchBoxContainerStyle: {
        height: 45,
        width: "100%",
        flexDirection: 'row',
        borderWidth: 1.5,
        paddingHorizontal: 20,
        borderRadius: 10,
        left: 5
    },
    cameraContainer: {
        height: "50%",
        width: "100%",
        overflow: 'hidden'
    },
    text1: {
        marginTop: 50,
        fontSize: 20,
        fontFamily: Fonts.Dark,
        color: "black",
        textAlign: 'center',
        lineHeight: 32
    },
    buttonScanAgain: {
        marginTop: 50,
        marginBottom: 20,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: "red",
        borderRadius: 8
    }
});


export default LoginScreen;