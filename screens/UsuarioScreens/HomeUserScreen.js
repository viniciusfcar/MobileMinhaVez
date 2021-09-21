import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons/';
import Entypo from 'react-native-vector-icons/Entypo/';
import OneSignal from 'react-native-onesignal';
import {AuthContext} from '../../contexts/auth';
import Spinner from 'react-native-loading-spinner-overlay';


//Tem que usar o Navigation pra navegar
import { useNavigation } from '@react-navigation/native';

export default function HomeUserScreen() {

  const {usuario, user, total_notificacao} = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);

  //Essa é a forma correta e não trazendo como parametro
  const navigation = useNavigation();

  const onNotificacao = () => {
    if(total_notificacao > 0 && total_notificacao < 9) {
      return(
        <View style={{flexDirection: 'column', width: '10%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('ListaNotificacao')}>
            <AntDesing style={{color: 'white',}} size={35} name='bells'/>
            <Text style={{backgroundColor: 'white', borderRadius: 100, position:'absolute'}}>{total_notificacao}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=nbzrBWAEUjo')}>
            <Entypo style={{color: 'white', marginTop: 5}} size={35} name='video' />
          </TouchableOpacity>
        </View>
      )
    } else if(total_notificacao > 9) {
      return(
        <View style={{flexDirection: 'column', width: '10%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('ListaNotificacao')}>
            <AntDesing style={{color: 'white'}} size={35} name='bells'/>
            <Text style={{backgroundColor: 'white', borderRadius: 100, position:'absolute'}}>9+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=nbzrBWAEUjo')}>
            <Entypo style={{color: 'white', marginTop: 5}} size={35} name='video' />
          </TouchableOpacity>
        </View>
      )
    } else {
      return(
        <View style={{flexDirection: 'column', width: '10%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('ListaNotificacao')}>
            <AntDesing style={{color: 'white',}} size={35} name='bells'/>
            <Text style={{backgroundColor: 'white', borderRadius: 100, position:'absolute'}}></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=nbzrBWAEUjo')}>
            <Entypo style={{color: 'white', marginTop: 5}} size={35} name='video' />
          </TouchableOpacity>
        </View>
      )
    }
  }

  const idsPush = async (push) => {

    const form = new FormData();
    form.append("notificacao", push.userId);
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
    
    const apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/set_notificacao/', {
      method: 'POST',
      body: form,
    });
  }

  const load = async () => {
    setSpinner(true);

    const apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/'+usuario.id+'/')
    const response = await apiCall.json()
    
    const apiCall2 = await fetch('https://minhavezsistema.com.br/api/user/'+usuario.user+'/');
    const response2 = await apiCall2.json();

    await AsyncStorage.setItem("@MinhaVezSistema:telefone", response.telefone);
    await AsyncStorage.setItem("@MinhaVezSistema:username", response2.username);
    await AsyncStorage.setItem("@MinhaVezSistema:first_name", response2.first_name);
    await AsyncStorage.setItem("@MinhaVezSistema:last_name", response2.last_name);
    await AsyncStorage.setItem("@MinhaVezSistema:email", response2.email);
    await AsyncStorage.setItem("@MinhaVezSistema:cpf", response.cpf);
    await AsyncStorage.setItem("@MinhaVezSistema:sus", response.sus);
    await AsyncStorage.setItem("@MinhaVezSistema:rg", response.rg);
    await AsyncStorage.setItem("@MinhaVezSistema:cep", response.cep);
    await AsyncStorage.setItem("@MinhaVezSistema:logradouro", response.logradouro);
    await AsyncStorage.setItem("@MinhaVezSistema:numero", JSON.stringify(response.numero));
    await AsyncStorage.setItem("@MinhaVezSistema:complemento", response.complemento);
    await AsyncStorage.setItem("@MinhaVezSistema:cidade", response.cidade);
    await AsyncStorage.setItem("@MinhaVezSistema:estado", response.estado);
    await AsyncStorage.setItem("@MinhaVezSistema:sexo", response.sexo);
    await AsyncStorage.setItem("@MinhaVezSistema:bairro", response.bairro);
    await AsyncStorage.setItem("@MinhaVezSistema:imagem", response.imagem);
    
    OneSignal.init('0414c64c-3f63-486a-8fa2-78ce89f5032e');
    OneSignal.addEventListener('ids', idsPush);

    setSpinner(false);
  }
  
  useEffect(() => {    
    load();
  },[]);
  
  let notificacao = onNotificacao();

  return (
    <Container style={styles.container}>
      <Spinner
        visible={spinner}
      />
      <Header style={styles.header}>
        <Entypo style={{color: 'white', width: '10%'}} size={35} name='menu' onPress={() => navigation.openDrawer()} />
        <Image 
          style={styles.img}
          source={require('./../../static/images/logo_branca.png')}
        />
        {notificacao}
      </Header>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
      <ScrollView ontentInsetAdjustmentBehavior="automatic">
        <TouchableOpacity style={styles.headerDiversos}
          onPress={() => navigation.navigate('ListaFicha')}>
          <Text style={styles.headerTextDiversos}>Minhas Fichas</Text>
          <Right>
            <AntDesing name='tago' size={40} style={styles.logo} />
          </Right>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerDiversos}
          onPress={() => navigation.navigate('ListaAgendamento')}>
          <Text style={styles.headerTextDiversos}>Meus Agendamentos</Text>
          <Right>
            <AntDesing name='book' size={40} style={styles.logo} />
          </Right>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerDiversos}
          onPress={() => navigation.navigate('ListaConsulta')}>
          <Text style={styles.headerTextDiversos}>Consultas</Text>
          <Right>
            <SimpleLineIcons name='graph' size={40} style={styles.logo} />
          </Right>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerDiversos}
          onPress={() => navigation.navigate('ListaAutorizacao')}>
          <Text style={styles.headerTextDiversos}>Autorizações</Text>
          <Right>
            <AntDesing name='folder1' size={40} style={styles.logo} />
          </Right>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerDiversos}
          onPress={() => navigation.navigate('ListaExame')}>
          <Text style={styles.headerTextDiversos}>Exames</Text>
          <Right>
            <Entypo name='lab-flask' size={40} style={styles.logo} />
          </Right>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerDiversos}
          onPress={() => navigation.navigate('ListaEspecialista')}>
          <Text style={styles.headerTextDiversos}>Especialistas</Text>
          <Right>
            <Entypo name='users' size={40} style={styles.logo} />
          </Right>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerDiversos}
          onPress={() => navigation.navigate('ListaUnidade')}>
          <Text style={styles.headerTextDiversos}>Unidades de Saúde</Text>
          <Right>
            <AntDesing name='home' size={40} style={styles.logo} />
          </Right>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    backgroundColor: '#1E90FF',
    height: 120,
    borderColor: 'white',
    borderBottomColor: 'white',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-around",
  },

  headerDiversos: {
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

  headerText: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 60,
  },

  headerTextDiversos: {
    fontSize: 20,
    color: '#1E90FF',
    fontWeight: 'bold',
  },

  logo: {
    marginHorizontal: 8,
    marginVertical: 8,
    width: 60,
    color: '#1E90FF',
  },

  img: {
    width: 208,
    height: 108,
  },
});
