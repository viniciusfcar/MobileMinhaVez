import React, {useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right, Spinner } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AntDesing from 'react-native-vector-icons/AntDesign/';

export default function DetalhesUnidadeScreen({route}) {
  
  const navigation = useNavigation();

  const [active, setActive] = useState(false);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
  
  }, [])

  const verificar = () => {
    if(route.params.unidade.fields) {
      return(
        <ScrollView>
          <Card>
              <CardItem header bordered style={styles.header}>
                  <Text style={{fontWeight: 'bold', color: '#1E90FF', fontSize: 20}}>{route.params.unidade.fields.razao_social}</Text>
              </CardItem>
              <CardItem>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>CEP:</Text>
                    <Text>{route.params.unidade.fields.cep}</Text>
                  </Left>
              </CardItem>
              <CardItem>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Logradouro:</Text>
                    <Text>{route.params.unidade.fields.logradouro}</Text>
                  </Left>
                  <Right>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Número:</Text>
                      <Text>{route.params.unidade.fields.numero}</Text>
                  </Right>
              </CardItem>
              <CardItem>
                <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Complemento:</Text>
                    <Text>{route.params.unidade.fields.complemento}</Text>
                </Left>
              </CardItem>
              <CardItem>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Bairro:</Text>
                    <Text>{route.params.unidade.fields.bairro}</Text>
                  </Left>
              </CardItem>
              <CardItem header bordered>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Cidade:</Text>
                    <Text>{route.params.unidade.fields.cidade}</Text>
                  </Left>
                  <Right>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Estado:</Text>
                    <Text>{route.params.unidade.fields.estado}</Text>
                  </Right>
              </CardItem>
              <CardItem header bordered>
                <View padder>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Telefone:</Text>
                  <Text>{route.params.unidade.fields.telefone}</Text>
                </View>
              </CardItem>
              <CardItem header bordered>
                <View padder>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>E-mail:</Text>
                  <Text>{route.params.unidade.fields.email}</Text>
                </View>
              </CardItem>
          </Card>
          <TouchableOpacity onPress={() => navigation.navigate('ListaConsultaUnidade', {consultas: route.params.unidade.fields.consultas})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Consultas</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListaAutorizacaoUnidade', {autorizacoes: route.params.unidade.fields.autorizacoes})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Autorizações</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListaExameUnidade', {exames: route.params.unidade.fields.exames})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Exames</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListaEspecialistaUnidade', {especialistas: route.params.unidade.fields.especialistas})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Especialistas</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListaResponsavelUnidade', {responsaveis: route.params.unidade.fields.responsaveis})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Responsáveis</Text>
            </CardItem>
          </TouchableOpacity>
        </ScrollView>
      )
    } else {
      return(
        <ScrollView>
          <Card>
              <CardItem header bordered style={styles.header}>
                  <Text style={{fontWeight: 'bold', color: '#1E90FF', fontSize: 20}}>{route.params.unidade.razao_social}</Text>
              </CardItem>
              <CardItem>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>CEP:</Text>
                      <Text>{route.params.unidade.cep}</Text>
                  </Left>
              </CardItem>
              <CardItem>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Logradouro:</Text>
                      <Text>{route.params.unidade.logradouro}</Text>
                  </Left>
                  <Right>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Número:</Text>
                      <Text>{route.params.unidade.numero}</Text>
                  </Right>
              </CardItem>
              <CardItem>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Complemento:</Text>
                      <Text>{route.params.unidade.complemento}</Text>
                  </Left>
              </CardItem>
              <CardItem>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Bairro:</Text>
                      <Text>{route.params.unidade.bairro}</Text>
                  </Left>
              </CardItem>
              <CardItem header bordered>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Cidade:</Text>
                      <Text>{route.params.unidade.cidade}</Text>
                  </Left>
                  <Right>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Estado:</Text>
                      <Text>{route.params.unidade.estado}</Text>
                  </Right>
              </CardItem>
              <CardItem header bordered>
                <View padder>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Telefone:</Text>
                  <Text>{route.params.unidade.telefone}</Text>
                </View>
              </CardItem>
              <CardItem header bordered>
                <View padder>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>E-mail:</Text>
                  <Text>{route.params.unidade.email}</Text>
                </View>
              </CardItem>
          </Card>
          <TouchableOpacity onPress={() => navigation.navigate('ListaConsultaUnidade', {consultas: route.params.unidade.consultas})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Consultas</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListaAutorizacaoUnidade', {autorizacoes: route.params.unidade.autorizacoes})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Autorizações</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListaExameUnidade', {exames: route.params.unidade.exames})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Exames</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListaEspecialistaUnidade', {especialistas: route.params.unidade.especialistas})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Especialistas</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListaResponsavelUnidade', {responsaveis: route.params.unidade.responsaveis})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Responsáveis</Text>
            </CardItem>
          </TouchableOpacity>
        </ScrollView>
      )
    }
  }
    
  let verificar_fuc = verificar();
  return (
    <Container style={styles.container}>
      <Header style={styles.headerTittle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesing name='arrowleft' size={30} style={{color: '#1E90FF'}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>DETALHES UNIDADE DE SAÚDE</Text>
      </Header>
      {verificar_fuc}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e7e7',
  },

  negrito: {
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  header: {
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: 'center',
    height: 105,
    flexDirection: 'row',
    justifyContent: "space-around",
  },

  headerTittle: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 55,
    flexDirection: 'row',
    justifyContent: "space-around",
    borderColor: 'white',
    borderBottomColor: 'white'
  },

  headerText: {
    fontSize: 18,
    color: '#1E90FF',
    fontWeight: 'bold',
    marginRight: 30,
  },

  modal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.65,
    elevation: 1.5,
  },

  text: {
    color: '#1E90FF',
  },
});