import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Linking } from 'react-native';
import { Fonts } from '../GlobalConfig';
import { Buffer } from 'buffer'
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

const SongsAdd = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [artistValue, setArtistValue] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const [durationValue, setDurationValue] = useState("")
    const [albumValue, setAlbumValue] = useState("")
    const [linkValue, setLinkValue] = useState("")
    const [genreValue, setGenreValue] = useState("")
    const [yearValue, setYearValue] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [id, setId] = useState("")

    const BASE_URL = "http://192.168.0.17:3001"


    const addSongs = () => {
        setIsLoading(true)
        var session_url = `${BASE_URL}/songs`;
        var uname = props.loginData.username;
        var pass = props.loginData.password;
        console.log(uname)
        const token = Buffer.from(`${uname}:${pass}`, 'utf8').toString('base64')
        console.log("TEST", token)
        var config = {
            "headers": {
                "Authorization": "Basic " + token
            }
        }

        var content = {
            "id": id,
            "title": titleValue,
            "album": albumValue,
            "artist": artistValue,
            "genre": genreValue,
            "duration": durationValue,
            "year": yearValue,
            "poster": imageLink,
            "link":linkValue
        }
        axios.post(session_url, content, config)
            .then(function (response) {
                alert('Success Add Songs')
                setIsLoading(false)
                Actions.pop()
            }).catch(function (error) {
                console.log(error);
                alert('Not Authorized')
                setIsLoading(false)
            });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, backgroundColor: 'lightblue' }}>
            {isLoading ?
                <View style={{ height: "50%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={"black"} size='large' />
                </View>
                :
                <>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View
                                style={{
                                    height: 45,
                                    maxHeight: 60,
                                    flexDirection: "row",
                                    justifyContent: 'space-between',
                                    marginBottom: 20,
                                    alignItems: 'center',

                                }}>
                                <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>ID :</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={styles.inputSearchBoxContainerStyle}>
                                        <TextInput
                                            placeholder={titleValue}
                                            placeholderTextColor="gray"
                                            selectionColor="red"
                                            numberOfLines={1}
                                            style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 14, marginLeft: 2 }}
                                            value={id}
                                            onChangeText={setId}>
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
                                <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Image :</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={styles.inputSearchBoxContainerStyle}>
                                        <TextInput
                                            placeholder={titleValue}
                                            placeholderTextColor="gray"
                                            selectionColor="red"
                                            numberOfLines={1}
                                            style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 14, marginLeft: 2 }}
                                            value={imageLink}
                                            onChangeText={setImageLink}>
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
                                <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Title :</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={styles.inputSearchBoxContainerStyle}>
                                        <TextInput
                                            placeholder={titleValue}
                                            placeholderTextColor="gray"
                                            selectionColor="red"
                                            numberOfLines={1}
                                            style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 14, marginLeft: 2 }}
                                            value={titleValue}
                                            onChangeText={setTitleValue}>
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
                                <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Artist :</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={styles.inputSearchBoxContainerStyle}>
                                        <TextInput
                                            placeholder={artistValue}
                                            placeholderTextColor="gray"
                                            selectionColor="red"
                                            numberOfLines={1}
                                            style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 14, marginLeft: 2 }}
                                            value={artistValue}
                                            onChangeText={setArtistValue}>
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
                                <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Album :</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={styles.inputSearchBoxContainerStyle}>
                                        <TextInput
                                            placeholder={albumValue}
                                            placeholderTextColor="gray"
                                            selectionColor="red"
                                            numberOfLines={1}
                                            style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 14, marginLeft: 2 }}
                                            value={albumValue}
                                            onChangeText={setAlbumValue}>
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
                                <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Year :</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={styles.inputSearchBoxContainerStyle}>
                                        <TextInput
                                            placeholder={String(yearValue)}
                                            placeholderTextColor="gray"
                                            selectionColor="red"
                                            numberOfLines={1}
                                            keyboardType='numeric'
                                            style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 14, marginLeft: 2 }}
                                            value={yearValue}
                                            onChangeText={setYearValue}>
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
                                <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Duration :</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={styles.inputSearchBoxContainerStyle}>
                                        <TextInput
                                            placeholder={durationValue}
                                            placeholderTextColor="gray"
                                            selectionColor="red"
                                            numberOfLines={1}
                                            style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 14, marginLeft: 2 }}
                                            value={durationValue}
                                            onChangeText={setDurationValue}>
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
                                <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Genre :</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={styles.inputSearchBoxContainerStyle}>
                                        <TextInput
                                            placeholder={genreValue}
                                            placeholderTextColor="gray"
                                            selectionColor="red"
                                            numberOfLines={1}
                                            style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 14, marginLeft: 2 }}
                                            value={genreValue}
                                            onChangeText={setGenreValue}>
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
                                <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Link :</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <View style={styles.inputSearchBoxContainerStyle}>
                                        <TextInput
                                            placeholder={linkValue}
                                            placeholderTextColor="gray"
                                            selectionColor="red"
                                            numberOfLines={1}
                                            style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 14, marginLeft: 2 }}
                                            value={linkValue}
                                            onChangeText={setLinkValue}>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => addSongs()}
                                style={{ backgroundColor: 'blue', borderRadius: 20, height: 30, width: "100%", borderColor: "blue", marginBottom: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontFamily: Fonts.SF_COMPACT_BOLD, color: 'white' }}>Submit Change</Text>
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


export default SongsAdd;