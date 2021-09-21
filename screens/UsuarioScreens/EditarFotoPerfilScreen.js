import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Axios from 'axios';
import {useNetInfo} from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditeFotoPerfilScreen() {
    
    const navigation = useNavigation();

    const [avatar, setAvatar] = useState();
    const [imagem, setImagem] = useState();
    const [token, setToken] = useState();
    const [fileName, setFileName] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        (async () => {
            /*setImagem(
                await AsyncStorage.getItem('@MinhaVezSistema:imagem'),
            );
    
            setToken(await AsyncStorage.getItem('@MinhaVezSistema:token'));*/
            
            setId(await AsyncStorage.getItem("@MinhaVezSistema:id_usuario"));
        })();
    },[]);

    const imagePickerOption = {
        title: 'Selecione uma imagem',
    }

    function imagePickerCallback(data) {

        if(data.didCancel) {
            return;
        }

        if(data.error){
            return;
        }

        if(!data.uri){
            return;
        }

        setFileName(data.fileName)
        
        setAvatar(data)
    }

    async function uploadImage() {
        const form = new FormData();

        form.append('avatar', avatar.uri);

        form.append('fileName', fileName);

        form.append('token', 
            await AsyncStorage.getItem('@MinhaVezSistema:token')
        );

        Axios.post('https://minhavezsistema.com.br/api/usuario/editar_foto_perfil/', form, {
            headers: {
                'content-type': 'file'
            }
        })
        .then(function (response) {
            console.log(response)
        })
        .then(function (error) {
            console.log(error)
        })
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesing name='arrowleft' size={30} style={{
                        color: '#1E90FF',
                        marginTop: 30,
                        marginRight: 270
                    }} />
            </TouchableOpacity>
            <View style={styles.boxContainer}>
                <Image 
                    style={styles.logo}
                    source={require('./../../static/images/logo.png')}
                />
            </View>
            <View style={{justifyContent: 'space-evenly'}}>
                <Text style={styles.dica}>Infelizmente, nossa primeira versão do App MinhaVez - Sistema ainda não conta
                    com a opção para atualizar a foto do perfil diretamente pelo App. Se realmente quiser altera-lá,
                    click no botão abaixo e ele te encaminhara a página adequada, 
                    forneça seu username e senha para realizar o login.
                </Text>
                <Text style={styles.dica}>Logo resolveremos isso.</Text>
                <Text style={styles.dica}>Obrigado pela compreensão, e desculpe pelo transtorno.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('http://minhavezsistema.com.br/usuario/alterar_perfil/'+id+'/')}>
                <Text style={styles.textButton}>Editar</Text>
                <AntDesing name='edit' size={25} style={{color: 'white'}}/>
            </TouchableOpacity>
            {/*<TouchableOpacity style={styles.button} onPress={() => launchImageLibrary(imagePickerOption, imagePickerCallback)}>
                <Text style={styles.textButton}>Editar</Text>
                <AntDesing name='edit' size={25} style={{color: 'white'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={uploadImage}>
                <Text style={styles.textButton}>Salvar</Text>
                <AntDesing name='totop' size={25} style={{color: 'white'}}/>
                </TouchableOpacity>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    boxContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        margin: 20,
        marginTop: 30,
        alignItems: 'center',
    },

    img: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginRight: 30,
        borderRadius: 100,
    },

    button: {
        width: 150,
        height: 50,
        borderRadius: 3,
        marginTop: 20,
        backgroundColor: '#1E90FF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textButton: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },

    logo: {
        width: 300,
        height: 140,
    },

    dica: {
        fontSize: 17,
        color: 'grey',
        justifyContent: 'center',
        marginLeft: 10,
        margin: 10,
        flexWrap: 'wrap'
    }
});
