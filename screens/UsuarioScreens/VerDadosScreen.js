import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, } from 'native-base';
import { Input } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {AuthContext} from '../../contexts/auth';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import { useNavigation } from '@react-navigation/native';

export default function EditarPerfilScreen() {

    const navigation = useNavigation();

    const [username, setUsername] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [sus, setSus] = useState();
    const [cep, setCep] = useState();
    const [logradouro, setLogradouro] = useState();
    const [numero, setNumero] = useState();
    const [complemento, setComplemento] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [estado, setEstado] = useState();
    const [sexo, setSexo] = useState();
    const [telefone, setTelefone] = useState();
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        (async () => {
            setSpinner(true);
            setUsername(await AsyncStorage.getItem("@MinhaVezSistema:username"));
            setFirstName(await AsyncStorage.getItem("@MinhaVezSistema:first_name"));
            setLastName(await AsyncStorage.getItem("@MinhaVezSistema:last_name"));
            setEmail(await AsyncStorage.getItem("@MinhaVezSistema:email"));
            setCpf(await AsyncStorage.getItem("@MinhaVezSistema:cpf"));
            setRg(await AsyncStorage.getItem("@MinhaVezSistema:rg"));
            setSus(await AsyncStorage.getItem("@MinhaVezSistema:sus"));
            setCep(await AsyncStorage.getItem("@MinhaVezSistema:cep"));
            setLogradouro(await AsyncStorage.getItem("@MinhaVezSistema:logradouro"));
            setNumero(await AsyncStorage.getItem("@MinhaVezSistema:numero"));
            setComplemento(await AsyncStorage.getItem("@MinhaVezSistema:complemento"));
            setBairro(await AsyncStorage.getItem("@MinhaVezSistema:bairro"));
            setCidade(await AsyncStorage.getItem("@MinhaVezSistema:cidade"));
            setEstado(await AsyncStorage.getItem("@MinhaVezSistema:estado"));
            setSexo(await AsyncStorage.getItem("@MinhaVezSistema:sexo"));
            setTelefone(await AsyncStorage.getItem("@MinhaVezSistema:telefone"));
            setSpinner(false);
        })();
    },[])

    return (
        <Container style={styles.container}>
            <Spinner
                visible={spinner}
            />
            <Header style={styles.headerTittle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesing name='arrowleft' size={30} style={{color: 'white'}} />
                </TouchableOpacity>
                <Text style={styles.headerText}>MEUS DADOS</Text>
            </Header>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 20 }} />
            <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Username:</Text>
                    <Text style={{paddingLeft: 5}}>{username}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Nome:</Text>
                    <Text style={{paddingLeft: 5}}>{first_name}</Text>
                    <Text style={{paddingLeft: 2}}>{last_name}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Sexo:</Text>
                    <Text style={{paddingLeft: 5}}>{sexo}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>CPF:</Text>
                    <Text style={{paddingLeft: 5}}>{cpf}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>RG:</Text>
                    <Text style={{paddingLeft: 5}}>{rg}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>SUS:</Text>
                    <Text style={{paddingLeft: 5}}>{sus}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>E-mail:</Text>
                    <Text style={{paddingLeft: 5}}>{email}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Telefone:</Text>
                    <Text style={{paddingLeft: 5}}>{telefone}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>CEP:</Text>
                    <Text style={{paddingLeft: 5}}>{cep}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Logradouro:</Text>
                    <Text style={{paddingLeft: 5}}>{logradouro}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Número:</Text>
                    <Text style={{paddingLeft: 5}}>{numero}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Complemento:</Text>
                    <Text style={{paddingLeft: 5}}>{complemento}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Bairro:</Text>
                    <Text style={{paddingLeft: 5}}>{bairro}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Cidade:</Text>
                    <Text style={{paddingLeft: 5}}>{cidade}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Estado:</Text>
                    <Text style={{paddingLeft: 5}}>{estado}</Text>
                </CardItem>
            </ScrollView>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
        </Container>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    
    containerInput: {
        height: 50,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    headerTittle: {
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
        borderColor: 'white',
        borderBottomColor: 'white'
    },

    headerText: {
        fontSize: 21,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 90
    },

    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 50,
        width: 150,
        flexDirection: 'row',
        margin: 5,
        paddingLeft: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    buttonText: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
    },

    logo: {
        width: 30,
        color: 'green',
    },

    spinnerTextStyle: {
        color: '#1E90FF',
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
});