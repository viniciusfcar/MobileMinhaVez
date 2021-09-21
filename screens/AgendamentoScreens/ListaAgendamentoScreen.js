import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList, Alert, TextInput, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AgendamentoScreen from './AgendamentoScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import {AuthContext} from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';

export default function ListaAgendamentoScreen(){

  const navigation = useNavigation();

  const {usuario} = useContext(AuthContext);

  const [itens, setItens] = useState([]);
  const [active, setActive] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [active_busca, setActiveBusca] = useState(false);
  const [busca, setBusca] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    agendamentos();
  }, []);

  const closeBusca = () => {
    setActiveBusca(false);
    setBusca('');
  };

  const check = () => {
    setActiveBusca(false);
  };

  const openBusca = () => {
    if(active_busca) {
      return(
        <View style={styles.headerBusca}>
          <View>
            <TouchableOpacity onPress={() => closeBusca()}>
              <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>X</Text>
            </TouchableOpacity>
          </View>
          <View append>
            <TextInput
              style={styles.boxInput}
              autoFocus
              placeholder="Ex: nome"
              autoCapitalize='none'
              keyboardType='text'
              value={busca}
              onChangeText={busca => setBusca(busca)}
              maxLength={40}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => filterItems()}>
              <Text style={{color: '#1E90FF', fontSize: 20, fontWeight: 'bold'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const filterItems = () => {
    
    if(busca.trim().length == 0) {
      Alert.alert('Erro', 'Preencha o campo da busca!');
    } else {
      var retornoBusca = itens.filter(item => item.fields.nome.toLowerCase().includes(busca.toLowerCase()));
      
      if(retornoBusca[0] != null) {
        setItens(retornoBusca);
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude e refaça a pesquisa!');
      }
    }
  }

  const agendamentos = async () => {
    setActiveBusca(false);
    setSpinner(true);
    
    const apiCall = await fetch('https://minhavezsistema.com.br/api/agendamento/'+usuario.id+'/agendamento_usuario/')
    const response = await apiCall.json();
    
    if(response[0] != null){
      setItens(response);
      setActive(true);
      setSpinner(false);

    } else {
      setSpinner(false);
      Alert.alert('Atenção', 'Você não possue nenhum agendamento!');
    }
  }

  let busca_corpo = openBusca();

  return (
    <View style={styles.container}>
      <Spinner 
        visible={spinner}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesing name='arrowleft' size={30} style={{color: 'white'}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>MEUS AGENDAMENTOS</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=F7WM36c_L2I')}>
          <Entypo style={{color: 'white'}} size={30} name='video' />
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
      {busca_corpo}
      <FlatList 
        data={itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return(
            <View>
              <TouchableOpacity key={item.id}
                onPress={() => navigation.navigate('DetalhesAgendamento', {agendamento: item})}>
                <AgendamentoScreen key={item.fields.id} nome={item.fields.nome}/>
              </TouchableOpacity>
            </View>
          );
        }}
        refreshing={isLoading}
        onRefresh={() => agendamentos()}
      />
      <FAB
        style={styles.fabStyle}
        icon='search-web'
        small
        onPress={() => setActiveBusca(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },

  icon: {
    width: 35,
    height: 35,
  },

  header: {
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 55,
    borderColor: 'white',
    borderBottomColor: 'white',
  },

  headerText: {
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
  },

  headerAlert: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 55,
    margin: 5,
    marginTop: 10,
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

  headerTextAlert: {
    fontSize: 25,
    color: '#1E90FF',
    fontWeight: 'bold',
  },  

  logo: {
    marginHorizontal: 8,
    marginVertical: 8,
    color: 'white',
  },

  headerBusca: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 55,
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

  spinnerTextStyle: {
    color: '#1E90FF',
  },

  fabStyle: {
    backgroundColor: '#1E90FF',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})