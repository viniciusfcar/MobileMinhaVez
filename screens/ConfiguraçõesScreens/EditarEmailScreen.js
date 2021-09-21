import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import Entypo from 'react-native-vector-icons/Entypo/';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

export default function EditarEmailScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState();
    const [new_email, setNewEmail] = useState();

    const alterar = async () => {
        const form = new FormData();

        form.append('email', email);
        form.append('new_email', new_email);
        form.append('token', await AsyncStorage.getItem('@MinhaVezSistema:token'));

        const apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/editar_email/', {
            method: 'POST',
            body: form,
        });
        
        if(apiCall.status == 406) {
            Alert.alert('Atenção', 'Preencha um novo e-mail válido.');
        
        } else if(apiCall.status == 404) {
            Alert.alert('Atenção', 'Você está tentando alterar o e-mail de outro usuário ou um que não existe.');
        
        } else if(apiCall.status == 200) {
            navigation.navigate('Home');
            Alert.alert('Sucesso', 'E-mail alterado.');
        
        } else if(apiCall.status == 400) {
            Alert.alert('Atenção', 'Ambos os e-mail são igual, informe um novo e-mail para que possa realizar a alteração.')
        
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
                placeholder='E-mail Atual'
                value={email}
                inputStyle={{color: 'black'}}
                label='E-mail Atual'
                labelStyle={{color: '#4169E1'}}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                style={styles.boxInput}
                placeholder='Novo E-mail'
                value={new_email}
                inputStyle={{color: 'black'}}
                label='Novo E-mail'
                labelStyle={{color: '#4169E1'}}
                onChangeText={email => setNewEmail(email)}
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