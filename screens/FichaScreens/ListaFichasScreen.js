import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, FlatList, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FichaScreen from './FichaScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth';
import { FAB } from 'react-native-paper';

export default function ListaFichaScreen() {

  const {usuario} = useContext(AuthContext);
  
  const navigation = useNavigation();

  const [itens, setItens] = useState();
  const [active, setActive] = useState();
  const [spinner, setSpinner] = useState();
  const [active_busca, setActiveBusca] = useState();
  const [busca, setBusca] = useState();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fichas();
  }, []);

  const closeBusca = () => {
    setActiveBusca(false);
    setBusca('')
  };

  const check = () => {
    setActiveBusca(true);
  };

  const openBusca = () => {
    if (active_busca) {
      return (
        <View style={styles.headerBusca}>
          <View>
            <TouchableOpacity onPress={() => closeBusca()}>
              <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
          <View append>
            <TextInput
              style={styles.boxInput}
              autoFocus
              placeholder="Ex: número ou status"
              autoCapitalize='none'
              keyboardType='text'
              value={busca}
              onChangeText={busca => setBusca(busca)}
              maxLength={40}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => filterItems()}>
              <Text style={{ color: '#1E90FF', fontSize: 20, fontWeight: 'bold' }}>OK</Text>
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
      var retornoBusca = itens.filter(item => item.fields.numero == busca || item.fields.status.toLowerCase().includes(busca.toLowerCase()));
      
      if (retornoBusca[0] != null) {
        setItens(retornoBusca);
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude e refaça a pesquisa!');
      }
    }
  }

  const fichas = async () => {
    try {

      setSpinner(true);

      const apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/' + usuario.id + '/minhasFichas')
      const response = await apiCall.json();
      
      if(response[0]) {
        setItens(response);
        setActive(true);
      } else {
        Alert.alert('Atenção', 'Você não possue nenhuma ficha!');
      }

      setSpinner(false);
    } catch (error) {
      console.log(error)
    }
  }

  let busca_buton = openBusca();

  return (
    <View style={styles.container}>
      <Spinner 
        visible={spinner}
      />
      <Header style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesing name='arrowleft' size={30} style={{color: 'white'}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>MINHAS FICHAS</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=rof3ss-EziA')}>
          <Entypo style={{color: 'white'}} size={30} name='video' />
        </TouchableOpacity>
      </Header>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
      {busca_buton}
      <FlatList 
        data={itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity key={item.pk}
                onPress={() => navigation.navigate('DetalhesFicha', { ficha: item })}>
                <FichaScreen key={item.pk} numero={item.fields.numero} status={item.fields.status} />
              </TouchableOpacity>
            </View>
          );
        }}
        refreshing={isLoading}
        onRefresh={() => fichas()}
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

  header: {
    backgroundColor: '#1E90FF',
    height: 55,
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
    paddingHorizontal: 10,
  },

  logo: {
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

