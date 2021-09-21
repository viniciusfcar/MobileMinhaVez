import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Moment from 'moment';
import { Container, Content, Accordion, Card, CardItem, Body, Button, Icon, Fab, Left, Thumbnail, Header, Right } from 'native-base';

export default class ExameScreen extends React.Component {

    render() {
        return (
            <Content padder style={styles.corpo}>
                <CardItem style={styles.contaner}>
                    <Left>
                        <Text style={styles.bold}>Nome: </Text>
                        <Text style={styles.text}>{this.props.nome}</Text>
                    </Left>
                </CardItem>
                <CardItem style={styles.contaner}>
                    <Left>
                        <Text style={styles.bold}>Hora: </Text>
                        <Text style={styles.text}>{this.props.hora}</Text>
                    </Left>
                    <Right>
                        <Text style={styles.bold}>Data: </Text>
                        <Text style={styles.text}>{Moment(this.props.data).format('DD/MM/YYYY')}</Text>
                    </Right>
                </CardItem>
                <CardItem style={styles.contaner}>
                    <Left>
                        <Text style={styles.bold}>Status: </Text>
                        <Text style={styles.text}>{this.props.status}</Text>
                    </Left>
                    <Right>
                        <Text style={styles.bold}>Tipo: </Text>
                        <Text style={styles.text}>{this.props.tipo}</Text>
                    </Right>
                </CardItem>
            </Content>
        );
    }
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
    },

    bold: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#1E90FF',
        fontSize: 15,       
    },

    corpo: {
        flex: 1,
        flexDirection: 'column',
    },

    text: {
        color: '#1E90FF',
        margin: 2,
        fontSize: 15,
    },

    TextLeft:{
        backgroundColor: 'white',
        marginLeft: 10,
        marginTop: 10,
    },

    TextRigth:{
        paddingHorizontal: 50,       
        marginLeft: 50,
        marginTop: 10,
    },

});