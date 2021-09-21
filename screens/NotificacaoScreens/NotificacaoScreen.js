import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Button, Icon, Fab, Left, Thumbnail, Header, Right } from 'native-base';
import { CheckBox } from 'react-native-elements';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListaNotificacaoScreen from './ListaNotificacaoScreen';

export default function NotificacaoScreen({notificacoes, id, status, titulo, assunto}){

    const check = () => {
        if(status == true) {
            return(
                <CheckBox
                    center
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={false}
                />
            )
        } else {
            return(
                <CheckBox
                    center
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={true}
                />
            )
        }
    }

    const delete_notificacao = async (pk) => {
        const form = new FormData();
        form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
        form.append("idNotificacao", pk);
        
        const apiCall = await fetch('https://minhavezsistema.com.br/api/notificacao/delete_notificacao/', {
            method: 'POST',
            body: form,
        });

        console.log(apiCall.status)
        
        if(apiCall.status == 200){
            notificacoes()
            Alert.alert('Sucesso', 'Notificação excluida!')
        }
    }

    useEffect(() => {
        check();
    },[])

    let check_corpo = check()
    return (
        <Content padder style={styles.corpo}>
            <CardItem style={styles.contaner}>
                {check_corpo}
                <Text style={styles.text}>{titulo}</Text>
                <TouchableOpacity key={id} onPress={() => delete_notificacao(id)}>
                    <AntDesing style={{color: '#1E90FF'}} size={20} name='delete' />
                </TouchableOpacity>
            </CardItem>
            <CardItem style={styles.contaner}>
                <Text style={styles.text_body}>{assunto}</Text>
            </CardItem>
        </Content>
    );
}

const styles = StyleSheet.create({
    contaner: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        flexDirection: 'row',
        justifyContent: "space-around",
    },

    bold: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#1E90FF',        
    },

    corpo: {
        flex: 1,
        flexDirection: 'column',
    },

    text: {
        color: '#1E90FF',
        margin: 2,
        fontSize: 20
    },

    text_body: {
        color: 'black',
        margin: 2
    }

});