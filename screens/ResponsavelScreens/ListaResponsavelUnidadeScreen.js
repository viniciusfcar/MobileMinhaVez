import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Text, View, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsavelScreen from './ResponsavelScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import { FAB } from 'react-native-paper';

export default function ListaResponsavelUnidadeScreen({route}) {

  const navigation = useNavigation();

  const [itens, setItens] = useState();
  const [spinner, setSpinner] = useState();
  const [active_busca, setActiveBusca] = useState();
  const [busca, setBusca] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
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
              placeholder="Ex: nome."
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
    setActiveBusca(false);

    if(busca.trim().length == 0) {
      Alert.alert('Erro', 'Preencha o campo da busca!');
    
    } else {
      var retornoBusca = itens.filter(resp => resp.nome.toLowerCase().includes(busca.toLowerCase()) || resp.sobrenome.toLowerCase().includes(busca.toLowerCase()));
      
      if(retornoBusca[0] != null) {
        setItens(retornoBusca);
      
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude a pesquisa ou atualize a tela e pesquise novamente!');
      }
    }
  }

  const responsaveis = async () => {
    setSpinner(true);
    setActiveBusca(false);
    
    const lista = route.params.responsaveis;
    const newLista = [];
    
    for(var i = 0; i < lista.length; i++) {
      const apiCall = await fetch('https://minhavezsistema.com.br/api/responsavel/'+lista[i]+'/');
      const response = await apiCall.json();

      newLista.push(response);
    };

    if(newLista[0] == null) {
      Alert.alert('Atenção', 'A unidade não possue responsáveis!');
    }

    setItens(newLista);
    setSpinner(false);
  }
  
  useEffect(() => {
    responsaveis();
  },[]);
  
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
        <Text style={styles.headerText}>RESPONSÁVEIS UNIDADE</Text>
      </View>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
      {busca_corpo}
      <FlatList 
        data={itens}
        renderItem={({item}) => {
          return(
            <View>
              <ResponsavelScreen imagem={item.imagem} nome={item.nome} sobrenome={item.sobrenome}/>
            </View>
          );
        }}
        refreshing={isLoading}
        onRefresh={() => responsaveis()}
        keyExtractor={(item, index) => index.toString()}
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
    alignItems: 'center',
    height: 55,
    flexDirection: 'row',
    justifyContent: "space-around"
  },

  headerText: {
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 60
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

  logo: {
    marginHorizontal: 8,
    marginVertical: 8,
    color: 'white',
  },

  fabStyle: {
    backgroundColor: '#1E90FF',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

