import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Fonts } from '../GlobalConfig';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import axios from 'axios';
import { Buffer } from 'buffer'

const SongsScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [songList, setSongList] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [isModalFilter, setIsModalFilter] = useState(false)
    const [filtervalue, setFiltervalue] = useState("")

    useEffect(() => {
        var session_url = 'http://f84d2a5b6f2e.ngrok.io/songs';
        var uname = 'allen';
        var pass = 'allen';
        const token = Buffer.from(`${uname}:${pass}`, 'utf8').toString('base64')
        console.log("TEST", token)
        var config = {
            "headers": {
                "Authorization": "Basic " + token
            }
        };
        axios.get(session_url, config)
            .then(function (response) {
                setSongList(response.data.data);
                console.log(response.data.data);
            }).catch(function (error) {
                console.log(error.response.data);
            });
    }, [])

    const searchSong = () => {
        setIsLoading(true)
        var session_url = 'http://f84d2a5b6f2e.ngrok.io/songs?'+filtervalue+"="+searchValue;
        var uname = 'allen';
        var pass = 'allen';
        const token = Buffer.from(`${uname}:${pass}`, 'utf8').toString('base64')
        console.log("TEST", token)
        var config = {
            "headers": {
                "Authorization": "Basic " + token
            }
        };
        axios.get(session_url, config)
            .then(function (response) {
                setIsLoading(false)
                setSongList(response.data.data);
                if(response.data.data==""){
                    alert("Not Found")
                }
            }).catch(function (error) {
                setIsLoading(false)
                console.log(error.response.data);
                alert("Connection not available")
            });
    }

    const _hideModal = () => {
        setIsModalFilter(false)
    }

    const selectFilter = (data) => {
        setIsModalFilter(false)
        setFiltervalue(data)
        console.log(data)
    }

    const searchByFilter = () =>{
        if(filtervalue==""){
            alert("Please Choose Search Filter")
        }
        else{
            searchSong()
        }
    }
    
    const openDetail =(data)=>{
        Actions.songsDetail(data)
    }

    var modalContent = <View />
    if (isModalFilter) {
        modalContent = (
            <View style={{ backgroundColor: "blue", padding: 15, borderRadius: 20, width: '100%', height: 200, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ flex: 1, width: "100%", borderWidth: 1, backgroundColor: "lightblue", justifyContent: 'center', alignItems: 'center', borderColor: 'black' }}
                    onPress={() => selectFilter("title")}>
                    <Text>Title</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, width: "100%", borderWidth: 1, backgroundColor: "lightblue", justifyContent: 'center', alignItems: 'center', borderColor: 'black' }}
                    onPress={() => selectFilter("artist")}>
                    <Text>Artist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, width: "100%", borderWidth: 1, backgroundColor: "lightblue", justifyContent: 'center', alignItems: 'center', borderColor: 'black' }}
                    onPress={() => selectFilter("album")}>
                    <Text>Album</Text>
                </TouchableOpacity>
            </View>
        )
    }



    const ListShow = (item) => {
        return (
            <>
                <TouchableOpacity 
                onPress={()=> openDetail(item.item)}
                style={{
                    minHeight: 10,
                    maxHeight: 60,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    marginBottom: 5,
                    borderBottomWidth:1,
                    borderColor:'gray'
                }}>
                    <Text style={{ fontFamily: Fonts.SF_COMPACT_MEDIUM, color: "black", fontSize: 16 }}>
                        {item.item.title} :
				</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.SF_COMPACT_REGULAR, color: "lightblack", fontSize: 16, marginLeft: 4 }}>
                            by {item.item.artist}
                        </Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    let viewContent = (
        <>
            {isLoading ?
                <View style={{ height: "50%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={"black"} size='large' />
                </View>
                :
                <>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.inputSearchBoxContainerStyle}>
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor="gray"
                                selectionColor="red"
                                style={{
                                    fontSize: 18,
                                    color: "black",
                                    width: "100%",
                                    textAlign: "center",
                                    fontFamily: Fonts.SF_COMPACT_REGULAR
                                }}
                                numberOfLines={1}
                                value={searchValue}
                                onChangeText={setSearchValue}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsModalFilter(true)}
                            style={{ height: 30, width: "100%", borderColor: "blue", marginBottom: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontFamily: Fonts.SF_COMPACT_BOLD }}>Filter</Text>
                            {filtervalue != "" &&
                                <Text style={{ fontSize: 14, fontFamily: Fonts.SF_COMPACT_BOLD }}> : {filtervalue}</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>searchByFilter()}
                            style={{ height: 30, width: "100%", borderColor: "blue", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontFamily: Fonts.SF_COMPACT_BOLD }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ flex: 0.8 }}>
                        {songList.map((item, index) => {
                            return (
                                <ListShow
                                    key={String(index)}
                                    item={item}
                                    index={index} />
                            )
                        })}
                    </ScrollView>
                </>
            }
        </>
    )


    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
            {viewContent}
            <Modal
                onBackButtonPress={_hideModal}
                onBackdropPress={_hideModal}
                children={modalContent}
                isVisible={isModalFilter}
                backdropOpacity={0.4} />
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


export default SongsScreen;