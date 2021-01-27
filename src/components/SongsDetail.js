import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Linking } from 'react-native';
import { Fonts } from '../GlobalConfig';

const SongsDetail = (props) => {

    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10,backgroundColor:'lightblue' }}>
            {isLoading ?
                <View style={{ height: "50%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={"black"} size='large' />
                </View>
                :
                <>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                        <Image style={{ width: 200, height: 200, marginBottom:20  }} resizeMode='cover' source={{ uri: props.poster }} />
                        <View
                            style={{
                                minHeight: 10,
                                maxHeight: 60,
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                marginBottom:20 ,
                            }}>
                            <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Title :</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text numberOfLines={1} style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 16, marginLeft: 4 }}>
                                    {props.title}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                minHeight: 10,
                                maxHeight: 60,
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                marginBottom:20 ,
                            }}>
                            <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Artist :</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text numberOfLines={1} style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 16, marginLeft: 4 }}>
                                    {props.artist}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                minHeight: 10,
                                maxHeight: 60,
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                marginBottom:20 ,
                            }}>
                            <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Album :</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text numberOfLines={1} style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 16, marginLeft: 4 }}>
                                    {props.album}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                minHeight: 10,
                                maxHeight: 60,
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                marginBottom:20 ,
                            }}>
                            <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Year :</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text numberOfLines={1} style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 16, marginLeft: 4 }}>
                                {props.year}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                minHeight: 10,
                                maxHeight: 60,
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                marginBottom:20 ,
                            }}>
                            <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Duration :</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text numberOfLines={1} style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 16, marginLeft: 4 }}>
                                {props.duration}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                minHeight: 10,
                                maxHeight: 60,
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                marginBottom:20 ,
                            }}>
                            <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>Genre :</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text numberOfLines={1} style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 16, marginLeft: 4 }}>
                                {props.genre}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity 
                        onPress={()=>Linking.openURL(props.link)}
                          style={{ backgroundColor:'blue', borderRadius:20, height: 30, width: "100%", borderColor: "blue", marginBottom: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                           <Text style={{ fontSize: 14, fontFamily: Fonts.SF_COMPACT_BOLD, color:'white' }}>CLICK HERE TO OPEN SONG !!</Text>
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
        marginBottom: 10
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


export default SongsDetail;