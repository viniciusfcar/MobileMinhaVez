import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import Entypo from 'react-native-vector-icons/Entypo/';
import { useNavigation } from '@react-navigation/native';

export default function ListaConfiguracoesScreen() {

    const navigationOptions = {
        drawerLabel: 'Configurações',
        drawerIcon: ({ tintColor }) => (
            <AntDesing style={{color: '#1E90FF'}} size={25} name='setting' />
        ),
        
    };

    const navigation = useNavigation();

    return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Entypo style={{color: 'white'}} size={40} name='menu' onPress={() => navigation.openDrawer()} />
                <Text style={styles.headerText}>CONFIGURAÇÕES</Text>
            </Header>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
            <TouchableOpacity style={styles.headerDiversosKey} onPress={() => navigation.navigate('EditarEmail')}>
                <Text style={styles.headerTextDiversosKey}>Editar E-mail</Text>
                <Right style={{marginRight: 50}}>
                    <AntDesing name='edit' size={25} style={{color: '#1E90FF'}}/>
                </Right>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerDiversosKey} onPress={() => navigation.navigate('EditarUsername')}>
                <Text style={styles.headerTextDiversosKey}>Editar Username</Text>
                <Right style={{marginRight: 50}}>
                    <AntDesing name='edit' size={25} style={{color: '#1E90FF'}}/>
                </Right>
            </TouchableOpacity>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    header: {
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        height: 100,
        flexDirection: 'row',
        justifyContent: "space-around",
        borderColor: 'white',
        borderBottomColor: 'white'
    },

    headerText: {
        fontSize: 21,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 65,
    },

    headerDiversos: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 75,
        flexDirection: 'row',
        margin: 5,
        paddingRight: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    headerTextDiversos: {
        fontSize: 15,
        color: '#1E90FF',
        fontWeight: 'bold',
    },

    headerDiversosKey: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 75,
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

    headerTextDiversosKey: {
        fontSize: 20,
        color: '#1E90FF',
        fontWeight: 'bold',
    },

    icon: {
        color: '#1E90FF'
    },

    button: {
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        height: 50,
        width: 75,
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
        marginVertical: 8,
        width: 60,
        fontSize: 15,
        color: 'white',
    },

    logo: {
        marginHorizontal: 8,
        marginVertical: 8,
        width: 60,
        color: '#1E90FF',
    },

})