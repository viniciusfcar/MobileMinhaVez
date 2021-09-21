import React, {useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Container, Header, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right, } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather/';
import { useNavigation } from '@react-navigation/native';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import {AuthContext} from '../../contexts/auth';
import Moment from 'moment';

export default function DetalhesExameScreen({route}) {
  
  const navigation = useNavigation();

  const [active, setActive] = useState(false);
  const [unidade, setUnidade] = useState();
  const [razao_social, setRazaoSocial] = useState();
  const [filas, setFilas] = useState();
  const [vagas, setVagas] = useState();
  const [participa, setParticipa] = useState(false);
  const [id_ficha, setIdFicha] = useState();
  const [spinner, setSpinner] = useState(false);


  useEffect(() => {
    onUnidade();
    onFilas();
  }, []);

  const onUnidade = async () => {

    const apiCall = await fetch('https://minhavezsistema.com.br/api/unidade_saude/'+
                    route.params.exame.id + '/exame_unidade/')
    const response = await apiCall.json();

    setUnidade(response[0]);
    setRazaoSocial(response[0].fields.razao_social);
  };
  
  const onFilas = async () => {
    setSpinner(true);

    var lista = route.params.exame.filas;
    var newLista = [];
    var fichas = [];

    for(var i = 0; i < lista.length; i++) {
      const apiCall = await fetch('https://minhavezsistema.com.br/api/fila/'+lista[i]+'/');
      const response = await apiCall.json();
      newLista.push(response);
      setVagas(response.vagas)
    }
    
    setFilas(newLista);

    for(var i = 0; i < newLista.length; i++){
      for(var j = 0; j < newLista[i].fichas.length; j++){
        fichas.push(newLista[i].fichas[j]);
      }
    }
    
    for(var i = 0; i < fichas.length; i++){
      const apiCall = await fetch('https://minhavezsistema.com.br/api/ficha/'+fichas[i]+'/');
      const response = await apiCall.json();
      
      const id_usuario = await AsyncStorage.getItem("@MinhaVezSistema:id_usuario");
      
      if(response.usuario == id_usuario && response.status != 'DESISTENTE'){
        setParticipa(true);
        setIdFicha(response.id);
      }
    }

    setSpinner(false);

  };

  const desmarcar = async () => {
    const form = new FormData();
    
    form.append("id_ficha", id_ficha);
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));

    const apiCall = await fetch('https://minhavezsistema.com.br/api/ficha/desistir_ficha/', {
      method: 'POST',
      body: form,
    });

    if(apiCall.status == 200) {
      setParticipa(false);
      Alert.alert('Sucesso!','Exame desmarcado.');
    
    } else if(apiCall.status == 401) {
      Alert.alert('Cuidado!', 'Sem permissão para tal ação, verifique e refaça se necessário.')
    
    } else if(apiCall.status == 511) {
      navigation.navigate('Logout');
      Alert.alert('Atenção!', 'Você não estálogado, refaça o login!');
    
    } else if(apiCall.status == 400) {
      Alert.alert('Atenção!', 'Requisição errada, contate o suporte!');
    }
  }

  const marcar = async (pref) => {

    if(vagas > 0) {
      const form = new FormData();
      form.append("id_exame", route.params.exame.id);
      form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
      form.append("preferencial", pref);

      const apiCall = await fetch('https://minhavezsistema.com.br/api/ficha/cadastro_ficha_exame/', {
        method: 'POST',
        body: form,
      });

      const response = await apiCall.json();
      
      if(response[0]){
        setActive(false);
        setParticipa(true);
        setIdFicha(response[0].pk)

        Alert.alert('Sucesso!', 'Exame marcado, veja suas fichas!');
      
      } else if(apiCall.status == 511){
        navigation.navigate('Logout');
        Alert.alert('Erro!', 'Você não estálogado, refaça o login!');
      
      } else if(apiCall.status == 400){
        Alert.alert('Cuidado!', 'Requisição errada, contate o suporte!');
      
      } else if(apiCall.status == 403){
        Alert.alert('Não Permitido!', 'Você já participa desse exame, que tipo de ação está tentando ?');
      }else if(apiCall.status == 401){
        Alert.alert('Atenção!', 'Essa fila não contém fichas disponíveis!');
      }

    } else {
      Alert.alert('Atenção!', 'Acabaram as fichas para esse Exame!');
    }
  }

  const onCheck = () =>{
    setActive(true);
  }

  const open = () => {
    if(active){
      return(
        <View>
          <TouchableOpacity onPress={() => setActive(false)}>
            <Text style={styles.close}>x</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => marcar(0)} style={[styles.button, styles.buttonCancel]}>
              <Text>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => marcar(1)} style={[styles.button, styles.buttonAdd]}>
              <Text>Preferêncial</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  const verifica = () => {
    if(route.params.exame.create_fila){ 
      if(participa){
        return(
          <TouchableOpacity style={styles.header} onPress={() => desmarcar()}>
            <Text style={styles.headerDanger}>Desmarcar X</Text>
          </TouchableOpacity>
        );
      } else {
        return(
          <TouchableOpacity style={styles.header} onPress={() => onCheck()}>
            <Text style={styles.headerSuccess}>
              Marcar <Feather name='check' size={25} style={{color: 'green'}}/>
            </Text>
          </TouchableOpacity>
        );
      }
    } else {
      return(
        <View style={styles.header}>
          <Text style={styles.headerDanger}>Sem Fila X</Text>
        </View>
      );
    }
  };
    
  let verifica_corpo = verifica();
  let open_corpo = open();
  return (
    <Container style={styles.container}>
      <Spinner 
        visible={spinner}
      />
      <Header style={styles.headerTittle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesing name='arrowleft' size={30} style={{color: '#1E90FF'}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>DETALHES DO EXAME</Text>
      </Header>
      <View padder>
        <Card>
          <CardItem header>
            <Left>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome: </Text>
                <Text>{route.params.exame.nome}</Text>
            </Left>
          </CardItem>
          <CardItem header>
            <Left>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Hora: </Text>
                <Text>{route.params.exame.hora}</Text>
            </Left>
            <Right>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data: </Text>
                <Text>{Moment(route.params.exame.data).format('DD/MM/YYYY')}</Text>
            </Right>
          </CardItem>
          <CardItem header bordered>
            <Left>
              <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status: </Text>
                <Text>{route.params.exame.status}</Text>
            </Left>
            <Right>
              <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Tipo: </Text>
              <Text>{route.params.exame.tipo}</Text>
            </Right>
          </CardItem>
          <CardItem header>
            <Left>
              <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Unidade de Saúde</Text>
            </Left>
          </CardItem>
          <CardItem> 
            <Left>
              <Body>
                <TouchableOpacity onPress={() => navigation.navigate('DetalhesUnidade', {unidade: unidade})}>
                  <Text>{razao_social}</Text>
                </TouchableOpacity>
              </Body> 
            </Left>
          </CardItem>
        </Card>
        {verifica_corpo}
        {open_corpo}
      </View>
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
    fontSize: 20,
    color: '#1E90FF',
    fontWeight: 'bold',
    marginRight: 50,
  },

  header: {
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  headerSuccess: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },

  headerDanger: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },

  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  buttonCancel:{
    backgroundColor: 'white',
    paddingHorizontal: 50,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  buttonAdd:{
    backgroundColor: 'white',
    paddingHorizontal: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  
  button:{
    borderRadius: 10,       
    padding: 10,    
    marginTop: 10,           
  },

  close: {
    fontSize: 25,
    color: 'red',
  },

  text: {
    color: '#1E90FF',  
  },
});