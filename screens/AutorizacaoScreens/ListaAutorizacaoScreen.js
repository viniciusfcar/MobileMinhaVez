import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert, FlatList, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AutorizacaoScreen from './AutorizacaoScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Entypo from 'react-native-vector-icons/Entypo/';
import NetInfo from '@react-native-community/netinfo';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';

export default function ListaAutorizacaoScreen() {

  const navigation = useNavigation();

  const [itens, setItens] = useState({});
  const [busca, setBusca] = useState('');
  const [active_busca, setActiveBusca] = useState(false);
  const [active, setActive] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(new Date());
  const [bool_data, setBoolData] = useState(false);

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  useEffect(() => {
    autorizacoes();
  }, [])

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
              placeholder="Ex: nome, status ou responsavel"
              autoCapitalize='none'
              keyboardType='text'
              value={busca}
              onChangeText={busca => setBusca(busca)}
              maxLength={40}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => onBusca()}>
              <Text style={{color: '#1E90FF', fontSize: 20, fontWeight: 'bold'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  const closeBusca = () => {
    setActive(false);
    setActiveBusca(false);
  };

  const check = () => {
    setActiveBusca(false);
  }

  const onBusca = async (dado) => {
    
    const apiCall = await fetch('https://minhavezsistema.com.br/api/autorizacao/?search='+dado);

    if(dado == null && busca.trim().length == 0) {
      Alert.alert('Erro', 'Preencha o campo da busca!');
    } else {
      const response = await apiCall.json();
      if(response[0]) {
        setItens(response);
      
      } else {
        Alert.alert('Aten????o', 'Nada encontrado para esses dados, mude e refa??a a pesquisa!');
      }
    }
  }

  const autorizacoes = async () => {
    try {
      setBoolData(false);
      setActiveBusca(false);
      setSpinner(true);
      
      const apiCall = await fetch('https://minhavezsistema.com.br/api/autorizacao/')
      const response = await apiCall.json();
      
      if(response[0] != null){
        setItens(response);
        setActive(true);
      } else {
        Alert.alert('Aten????o', 'N??o encontra-se nenhuma autoriza????o cadastrada!');
      }

      setSpinner(false);
    
    } catch(error) {
      console.log(error)
      setSpinner(false);
    }
  }

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
                onBusca(currentDate);
              }            
            }}
          />
        </View>
      )
    }
  }

  let busca_corpo = openBusca();
  let calendar = openCalendar();

  return (
    <View style={styles.container}>
      <Spinner 
        visible={spinner}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesing name='arrowleft' size={30} style={{color: 'white'}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>AUTORIZA????ES</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=QCrP2Xb2FMo')}>
          <Entypo style={{color: 'white'}} size={30} name='video' />
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
      {busca_corpo}
      {calendar}
      <FlatList 
        data={itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return(
            <View>
              <TouchableOpacity key={item.id}
                onPress={() => navigation.navigate('DetalhesAutorizacao', {autorizacao: item})}>
                <AutorizacaoScreen nome={item.nome} data={item.data} hora={item.hora} status={item.status}/>
              </TouchableOpacity>
            </View>
          )
        }}
        refreshing={isLoading}
        onRefresh={() => autorizacoes()}
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

  icon: {
      width: 35,
      height: 35,
  },

  header: {
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    height: 55,
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
    backgroundColor: '#1E90FF'
  },

  styleFab: {
    position: 'absolute',
  }
})

