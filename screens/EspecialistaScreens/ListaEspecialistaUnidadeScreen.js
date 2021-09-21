import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList, Alert, TextInput, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EspecialistaScreen from './EspecialistaScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Entypo from 'react-native-vector-icons/Entypo/';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import { FAB } from 'react-native-paper';

export default function ListaEspecialistaUnidadeScreen({route}) {

  const navigation = useNavigation();

  const [itens, setItens] = useState();
  const [busca, setBusca] = useState();
  const [active_busca, setActiveBusca] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeBusca = () => {
    setActiveBusca(false);
    setBusca('');
  };

  const check = () => {
    setActiveBusca(true);
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
              placeholder="Ex: nome, data, status."
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
      var retornoBusca = itens.filter(esp => esp.nome.toLowerCase().includes(busca.toLowerCase()) || esp.sobrenome.toLowerCase().includes(busca.toLowerCase()));
      
      if(retornoBusca[0] != null) {
        setItens(retornoBusca);
      
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude a pesquisa ou atualize a tela e pesquise novamente!');
      }
    }
  }

  const especialistas = async () => {
    setSpinner(true);
    setActiveBusca(false);
    
    const lista = route.params.especialistas;
    const newLista = [];
    
    for(var i = 0; i < lista.length; i++) {
      const apiCall = await fetch('https://minhavezsistema.com.br/api/especialista/'+lista[i]+'/')
      const response = await apiCall.json();

      newLista.push(response);
    };

    if(newLista[0] == null) {
      Alert.alert('Atenção', 'A unidade não possue especialistas!');
    }

    setItens(newLista);
    setSpinner(false);
  }
  
  useEffect(() => {
    especialistas();
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
        <Text style={styles.headerText}>ESPECIALISTAS UNIDADE</Text>
        <View></View>
      </View>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
      {busca_corpo}
      <FlatList 
        data={itens}
        renderItem={({item}) => {
          return(
            <View>
              <TouchableOpacity key={item.id}
                onPress={() => navigation.navigate('DetalhesEspecialista', {especialista: item})}>
                <EspecialistaScreen imagem={item.imagem} nome={item.nome} sobrenome={item.sobrenome}/>
              </TouchableOpacity>
            </View>
          );
        }}
        refreshing={isLoading}
        onRefresh={() => especialistas()}
        keyExtractor={(i, k) => k.toString()}
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
    justifyContent: "space-around",
  },

  headerText: {
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
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

