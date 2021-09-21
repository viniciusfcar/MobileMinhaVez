import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import Entypo from 'react-native-vector-icons/Entypo/';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

export default function EditarUsernameScreen() {

    const navigation = useNavigation();

    const [username, setUsername] = useState();
    const [new_username, setNewUsername] = useState();

    const alterar = async () => {
        const form = new FormData();

        form.append('username', username);
        form.append('new_username', new_username);
        form.append('token', await AsyncStorage.getItem('@MinhaVezSistema:token'));

        const apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/editar_username/', {
            method: 'POST',
            body: form,
        });

        if(apiCall.status == 406) {
            Alert.alert('Erro', 'O username atual informado não pertence a você.');
        
        } else if(apiCall.status == 404) {
            Alert.alert('Atenção', 'Username já em uso por outro usuário ou por você mesmo, escolha outro username.');
        
        } else if(apiCall.status == 200) {
            navigation.navigate('Home');
            Alert.alert('Sucesso', 'Username alterado.');
        
        } else if(apiCall.status == 400) {
            Alert.alert('Atenção', 'Ambos os usernames são igual, informe um novo username para que possa realizar a alteração.')
        
        } else if(apiCall.status == 501) {
            navigation.navigate('Logout');
            Alert.alert('Erro', 'Requisição feita de forma errada, refaça o login.');
        }

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
            <TextInput
                style={styles.boxInput}
                placeholder='Username Atual'
                value={username}
                inputStyle={{color: 'black'}}
                label='Username Atual'
                labelStyle={{color: '#4169E1'}}
                onChangeText={username => setUsername(username)}
            />
            <TextInput
                style={styles.boxInput}
                placeholder='Novo Username'
                value={new_username}
                inputStyle={{color: 'black'}}
                label='Novo Username'
                labelStyle={{color: '#4169E1'}}
                onChangeText={username => setNewUsername(username)}
            />
            <TouchableOpacity style={styles.button} onPress={() => alterar()}>
                <Text style={styles.textButton}>Alterar</Text>
                <AntDesing name='edit' size={25} style={{color: 'white'}}/>
            </TouchableOpacity>
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
        marginTop: 70,
        alignItems: 'center',
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

    boxInput: {
        alignSelf: "stretch",
        height: 40,
        margin: 5,
        marginRight: 5,
        borderWidth: 2,
        borderColor: "#1E90FF",
        borderRadius: 5,
        padding: 10
    },
})