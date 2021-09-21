import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth';
import Spinner from 'react-native-loading-spinner-overlay';

export default function PerfilUserScreen() {

    const navigation = useNavigation();

    const [username, setUsername] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [imagem, setImagem] = useState();
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        (async () => {
            setSpinner(true);
            setUsername(await AsyncStorage.getItem("@MinhaVezSistema:username"))
            setFirstName(await AsyncStorage.getItem("@MinhaVezSistema:first_name"))
            setLastName(await AsyncStorage.getItem("@MinhaVezSistema:last_name"))
            setImagem(await AsyncStorage.getItem("@MinhaVezSistema:imagem"))
            setSpinner(false);
        })();
    },[])

    return (
        <Container style={styles.container}>
            <Spinner 
                visible={spinner}
            />
            <Header style={styles.header}>
                <View style={{marginTop: 30}}>
                    <Entypo style={{color: 'white'}} size={40} name='menu' onPress={() => navigation.openDrawer()} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('EditarFotoPerfil')}>
                    <Image style={styles.imgPage} source={{uri: imagem}}/>
                </TouchableOpacity>
            </Header> 
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
            <CardItem header bordered>
                <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Username:</Text>
                <Text style={{paddingLeft: 5}}>{username}</Text>
            </CardItem>
            <CardItem header bordered>
                <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Nome:</Text>
                <Text style={{paddingLeft: 5}}>{first_name}</Text>
                <Text style={{paddingLeft: 2}}>{last_name}</Text>
            </CardItem>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
            <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('VerDados')}>
                <Text style={styles.headerSuccess}>
                    Ver Dados <AntDesing name='eyeo' size={25} style={{color: '#1E90FF'}}/>
                </Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
            <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('EditarPerfil')}>
                <Text style={styles.headerSuccess}>
                    Editar <AntDesing name='edit' size={25} style={{color: '#1E90FF'}}/>
                </Text>
            </TouchableOpacity>
        </Container>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    img: {
        width: 35,
        height: 35,
    },

    imgPage: {
        width: 200,
        height: 200,
        marginTop: 30,
        marginRight: 60,
        borderRadius: 100,
    },

    header: {
        backgroundColor: '#1E90FF',
        height: 250,
        flexDirection: 'row',
        justifyContent: "space-around",
        borderColor: 'white',
        borderBottomColor: 'white'
    },

    headerText: {
        color: 'white',
    },

    headerButton: {
        backgroundColor: 'white',
        borderRadius: 2,
        alignItems: 'center',
        height: 55,
        flexDirection: 'row',
        margin: 5,
        paddingLeft: 10,
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        paddingLeft: 50,
    },

    headerSuccess: {
        fontSize: 20,
        color: '#1E90FF',
        fontWeight: 'bold',
    },
    
    logo: {
        marginHorizontal: 8,
        marginVertical: 8,
        width: 60,
        color: '#1E90FF',
      },

})