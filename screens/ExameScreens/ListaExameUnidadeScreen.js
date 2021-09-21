import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, TextInput, Alert, Linking } from 'react-native';
import { Text, View, Right, Icon, Left } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExameScreen from './ExameScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import Entypo from 'react-native-vector-icons/Entypo/';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import { FAB } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';

export default function ListaExameUnidadeScreen({route}) {

  const navigation = useNavigation();

  const [itens, setItens] = useState();
  const [busca, setBusca] = useState();
  const [active_busca, setActiveBusca] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(new Date());
  const [bool_data, setBoolData] = useState(false);

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const closeBusca = () => {
    setActiveBusca(false);
    setBusca('');
  };

  const check = () => {
    setActiveBusca(false);
  }

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
              placeholder="Ex: nome, hora, status ou tipo."
              autoCapitalize='none'
              keyboardType='text'
              value={busca}
              onChangeText={busca => setBusca(busca)}
              maxLength={40}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => filterItems(busca)}>
              <Text style={{color: '#1E90FF', fontSize: 20, fontWeight: 'bold'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const filterItems = (dado) => {
    setActiveBusca(false);
    setBoolData(false);
    
    if(dado == null && busca.trim().length == 0) {
      Alert.alert('Erro', 'Preencha o campo da busca!');
    
    } else if(dado == busca){
      var retornoBusca = itens.filter(exame => exame.nome.toLowerCase().includes(busca.toLowerCase()) || exame.status.toLowerCase().includes(busca.toLowerCase()) || exame.tipo.toLowerCase().includes(busca.toLowerCase()) || exame.hora.includes(busca))
      
      if(retornoBusca[0] != null) {
        setItens(retornoBusca);
      
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude a pesquisa ou atualize a tela e pesquise novamente!');
      }
    
    } else {
      var retornoBusca2 = itens.filter(exame => exame.data.includes(dado))
      
      if(retornoBusca2[0] != null) {
        setItens(retornoBusca2);
      
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude a pesquisa ou atualize a tela e pesquise novamente!');
      }
    }
  }

  const exames = async () => {
    
    setSpinner(true);
    setActiveBusca(false);
    
    const lista = route.params.exames;
    const newLista = [];
    
    for(var i = 0; i < lista.length; i++) {
      const apiCall = await fetch('https://minhavezsistema.com.br/api/exame/'+lista[i]+'/');
      const response = await apiCall.json();

      newLista.push(response);
    };

    if(newLista[0] == null) {
      Alert.alert('Atenção', 'A unidade não possue exames!');
    }

    setItens(newLista);
    setSpinner(false);
  };
  
  useEffect(() => {
    exames();
  },[]);
  
  const openCalendar = () => {
    if(bool_data) {
      return (
        <View style={{alignItems: 'center'}}>
          <DatePicker
            style={{marginLeft: 20, marginVertical: 10}}
            date={data}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            getDateStr="DD-MM-YYYY"
            customStyles={styles.styleFab}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderColor: '#1E90FF',
                marginVertical: 100,  
              }
            }}
            onDateChange={(item) => {
              const currentDate = item || data
              setBoolData(false);
              if(item != null) {
                setData(currentDate);
                filterItems(currentDate);
              }            
            }}
          />
        </View>
      )
    }
    
  }

  let calendar = openCalendar();
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
        <Text style={styles.headerText}>EXAMES UNIDADE</Text>
        <View></View>
      </View>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
      {busca_corpo}
      {calendar}
      <FlatList 
        data={itens}
        renderItem={({item}) => {
          return(
            <View>
              <TouchableOpacity key={item.id}
                onPress={() => navigation.navigate('DetalhesExame', {exame: item})}>
                <ExameScreen nome={item.nome} data={item.data} status={item.status} hora={item.hora} tipo={item.tipo}/>
              </TouchableOpacity>
            </View>
          );
        }}
        refreshing={isLoading}
        onRefresh={() => exames()}
        keyExtractor={(i, k) => k.toString()}
      />
      <FAB.Group
        style={styles.styleFab}
        fabStyle={styles.fabStyle}
        open={open}
        icon='search-web'
        actions={[
          {
            icon: 'calendar-today',
            label: 'Data',
            onPress: () => {setBoolData(true), setActiveBusca(false)},
          },
          {
            icon: 'plus',
            label: 'Demais Campos',
            onPress: () => {setActiveBusca(true), setBoolData(false)},
          },
        ]}
        onStateChange={onStateChange}
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
    backgroundColor: '#1E90FF'
  },

  styleFab: {
    position: 'absolute',
  } 
})

