import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Container, Header, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import Feather from 'react-native-vector-icons/Feather/';
import Moment from 'moment';

export default function DetalhesAgendamentoScreen({route}) {

  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [idAgendamento, setIdAgendamento] = useState(0);
  const [consulta, setConsulta] = useState(null);
  const [autorizacao, setAutorizacao] = useState(null);
  const [exame, setExame] = useState(null);
  const [especialista, setEspecialista] = useState(null);
  const [responsavel, setResponsavel] = useState(null);
  const [active, setActive] = useState(false);
  const [id_ficha, setIdFicha] = useState('');
  const [participa, setParticipa] = useState(false);
  const [objeto, setObjeto] = useState('');
  const [stringObj, setStrngObj] = useState('');
  const [id_usuario, setIdUsuario] = useState('');
  const [spinner, setSpinner] = useState(true);
  const [filas, setFilas] = useState();

  useEffect(() => {
    getUser();
    consult_aut();
    onFilas();
  },[]);

  const getUser = async () => {
    setSpinner(true);

    setIdUsuario(await AsyncStorage.getItem('@MinhaVezSistema:id_usuario'));
    
    setSpinner(false);
  };

  const consult_aut = async () =>{
    setSpinner(true);

    const apiCall = await fetch('https://minhavezsistema.com.br/api/agendamento/'+route.params.agendamento.pk+'/detalhes_agendamento/')
    const response = await apiCall.json();

    if(response[0].model == 'consulta.consulta'){
      setConsulta(response[0]);
      setObjeto(response[0]);
      setStrngObj('consulta');
      esp_resp(response[0]);
    }else if(response[0].model == 'autorizacao.autorizacao') {
      setAutorizacao(response[0]);
      setObjeto(response[0]);
      setStrngObj('autorizacao');
      esp_resp(response[0]);  

    } else {
      setExame(response[0]);
      setObjeto(response[0]);
      setStrngObj('exame');
    }

    onFilas(response[0].fields.filas);
  }

  const esp_resp = async (obj) =>{
    if(obj.model == 'consulta.consulta') {
      const apiCall = await fetch('https://minhavezsistema.com.br/api/especialista/'+obj.fields.especialista+'/')
      const response = await apiCall.json();
      
      setEspecialista(response);
    
    }else {
      const apiCall = await fetch('https://minhavezsistema.com.br/api/responsavel/'+obj.fields.responsavel+'/')
      const response = await apiCall.json();
      setResponsavel(response);
    }
  }

  const onFilas = async (obj) => {
    setSpinner(true);

    var lista = obj;

    var newLista = [];
    var fichas = [];

    for(var i = 0; i < lista.length; i++) {
      const apiCall = await fetch('https://minhavezsistema.com.br/api/fila/'+lista[i]+'/');
      const response = await apiCall.json();
      newLista.push(response);
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

      var id = await AsyncStorage.getItem('@MinhaVezSistema:id_usuario');

      if(response.usuario == id){
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
      Alert.alert('Sucesso!', 'Ficha desmarcada.')
    
    } else if(apiCall.status == 401) {
      Alert.alert('Cuidado!', 'Sem permissão para tal ação, verifique e refaça se necessário.')
    
    } else if(apiCall.status == 511) {
      navigation.navigate('Logout');
      Alert.alert('Erro!', 'Você não está logado, refaça o login.');
    
    } else if(apiCall.status == 400) {
      alert('Atenção!','Requisição errada, contate o suporte.');
    }
  }
  
  const marcar = async (pref) => {
    const form = new FormData();
    
    form.append("id_"+stringObj, objeto.pk);
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
    form.append("preferencial", pref);

    const apiCall = await fetch('https://minhavezsistema.com.br/api/ficha/cadastro_ficha_' + stringObj + '/', {
      method: 'POST',
      body: form,
    });

    const response = await apiCall.json();
    
    if(response[0]){
      setParticipa(true);
      setActive(false);
      setIdFicha(response[0].pk)

      Alert.alert('Sucesso!', 'Ficha marcada.');
    
    } else if(apiCall.status == 511){
      navigation.navigate('Logout');
      Alert.alert('Erro!', 'Você não está logado, refaça o login.');
    
    } else if(apiCall.status == 400){
      Alert.alert('Atenção!', 'Requisição errada, contate o suporte!');
    
    } else if(apiCall.status == 403){
      Alert.alert('Atenção!', 'Você já participa dessa consulta, que tipo de ação está tentando ?');
    }
  }

  const onCheck = () => {
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
              <TouchableOpacity onPress={() => marcar(0)} style={[styles.button, styles.buttonAdd]}>
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

  const verificaButton = (objeto) => {
    if(objeto.fields.create_fila){ 
      if(participa){
        return(
          <TouchableOpacity onPress={() => desmarcar()}>
            <View style={styles.header}>
              <Text style={styles.headerDanger}>
                Desmarcar X
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return(
          <TouchableOpacity onPress={() => onCheck()}>
            <View style={styles.header}>
              <Text style={styles.headerSuccess}>
                Marcar <Feather name='check' size={25} style={{color: 'green'}}/> 
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    } else {
      return(
        <View style={styles.header}>
          <Text style={styles.headerDanger}>Sem Fila X</Text>
        </View>
      )
    }
  }

  const verificar = () => {
    if(autorizacao != null && responsavel != null) {
      let but_corpo = verificaButton(autorizacao)
      let open_corpo = open();
      return(
        <ScrollView ontentInsetAdjustmentBehavior="automatic">
          <Card>
            <CardItem header bordered>
              <Text style={styles.negrito}>Dados do Agendamento</Text>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                <Text style={{marginRight: 30}}>{route.params.agendamento.fields.nome}</Text>
              </Left>
            </CardItem>
            <CardItem header bordered>
              <Text style={styles.negrito}>Dados da Autorização</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                <Text>{autorizacao.fields.nome}</Text>
              </Left>
              <Right>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                <Text>{Moment(autorizacao.fields.data).format('DD/MM/YYYY')}</Text>
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
                <Text>{autorizacao.fields.status}</Text>
              </Left>
            </CardItem>
            <CardItem header bordered>
                <Text style={styles.negrito}>Responsável</Text>
            </CardItem>
            <CardItem>
              <View>
                <Thumbnail source={{ uri: responsavel.imagem}}/>
              </View>
              <Left>
                <Body>
                  <Text>{responsavel.nome}</Text>
                  <Text note>{responsavel.sobrenome}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <View style={{ borderBottomColor: '#e9e7e7', borderBottomWidth: 50 }}>
            {but_corpo}
            {open_corpo}
          </View>
        </ScrollView>
      )
    }
    else if(consulta != null && especialista != null){
      let but_corpo = verificaButton(consulta)
      let open_corpo = open()
      return(
        <ScrollView ontentInsetAdjustmentBehavior="automatic">
          <Card>
            <CardItem header bordered>
                <Text style={styles.negrito}>Dados do Agendamento</Text>
            </CardItem>
            <CardItem header bordered>
                <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                    <Text style={{marginRight: 30}}>{route.params.agendamento.fields.nome}</Text>
                </Left>
            </CardItem>
            <CardItem header bordered>
                <Text style={styles.negrito}>Dados da Consulta</Text>
            </CardItem>
            <CardItem>
                <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                    <Text>{consulta.fields.nome}</Text>
                </Left>
                <Right>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                    <Text>{Moment(consulta.fields.data).format('DD/MM/YYYY')}</Text>
                </Right>
            </CardItem>
            <CardItem header bordered>
                <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
                    <Text>{consulta.fields.status}</Text>
                </Left>
            </CardItem>
            <CardItem header>
                <Text style={styles.negrito}>Especialista</Text>
            </CardItem>
            <CardItem>
              <TouchableOpacity onPress={() => navigation.navigate('DetalhesEspecialista', {especialista: especialista})}>
                  <Thumbnail style={styles.avatar} source={{uri: especialista.imagem}}/>
              </TouchableOpacity>  
              <Left>
                <Body>
                    <Text>{especialista.nome}</Text>
                    <Text note>{especialista.sobrenome}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <View style={{ borderBottomColor: '#e9e7e7', borderBottomWidth: 50 }}>
            {but_corpo}
            {open_corpo}
          </View>
        </ScrollView>
      )
    } else if(exame != null) {
      let but_corpo = verificaButton(exame)
      let open_corpo = open()
      return(
        <ScrollView ontentInsetAdjustmentBehavior="automatic">
          <Card>
            <CardItem header bordered>
                <Text style={styles.negrito}>Dados do Agendamento</Text>
            </CardItem>
            <CardItem header bordered>
                <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                    <Text style={{marginRight: 30}}>{route.params.agendamento.fields.nome}</Text>
                </Left>
            </CardItem>
            <CardItem header bordered>
                <Text style={styles.negrito}>Dados do Exame</Text>
            </CardItem>
            <CardItem>
                <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                    <Text>{exame.fields.nome}</Text>
                </Left>
                <Right>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                    <Text>{Moment(exame.fields.data).format('DD/MM/YYYY')}</Text>
                </Right>
            </CardItem>
            <CardItem header bordered>
                <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Tipo:</Text>
                    <Text>{exame.fields.tipo}</Text>
                </Left>
                <Right>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                    <Text>{exame.fields.data}</Text>
                </Right>
            </CardItem>
          </Card>
          <View style={{ borderBottomColor: '#e9e7e7', borderBottomWidth: 50 }}>
            {but_corpo}
            {open_corpo}
          </View>
        </ScrollView>
      )
    }
  }

  let verificar_corpo = verificar();
  return (
    <View style={styles.container}>
      <Spinner 
        visible={spinner}
      />
      <Header style={styles.headerTittle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesing name='arrowleft' size={30} style={{color: '#1E90FF'}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>DETALHES DO AGENDAMENTO</Text>
      </Header>
      <View padder>
        {verificar_corpo}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#e9e7e7',  
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
    fontSize: 19,
    color: '#1E90FF',
    fontWeight: 'bold',
    marginRight: 30,
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

  negrito: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },

  button:{
    borderRadius: 10,       
    padding: 10,    
    marginTop: 5,           
  },

  buttonAdd:{
    backgroundColor: 'white',
    paddingHorizontal: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginLeft: 5,
  },

  buttonContainer:{
    flexDirection: 'row',        
  },

  close: {
    fontSize: 25,
    color: 'red',
  },
})

