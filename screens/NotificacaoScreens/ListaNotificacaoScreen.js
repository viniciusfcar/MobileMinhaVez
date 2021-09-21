import React, {useEffect, useState, useContext}  from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Text, View, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificacaoScreen from './NotificacaoScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth';

export default function ListaNotificacaoScreen() {

  const navigation = useNavigation();

  const [itens, setItens] = useState();
  const [spinner, setSpinner] = useState(false);
  const [active_busca, setActiveBusca] = useState(false);
  const [busca, setBusca] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const {totalNotificacao} = useContext(AuthContext);

  useEffect(() => {
    notificacoes();
    totalNotificacao();
  },[]);

  const letNotificacao = async (id) => {

    const form = new FormData();
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
    form.append("idNotificacao", id);

    const apiCall = await fetch('https://minhavezsistema.com.br/api/notificacao/ler_notificacao/', {
      method: 'POST',
      body: form,
    });

    if(apiCall.status = 200) {
      notificacoes();
      totalNotificacao();
    
    } else if(apiCall.status = 404) {
      setSpinner(false);
      Alert.alert('Atenção', 'Notificação não encontrada ou você está deslogado. Corrija e tente novamente!');
    
    } else if(apiCall.status = 400) {
      setSpinner(false);
      Alert.alert('Erro', 'Solicitação inválida, saia do aplicativo e entre novamente!');
    }
  }

  const notificacoes = async () => {

    id = await AsyncStorage.getItem('@MinhaVezSistema:id_usuario');

    const apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/'+id+'/lista_notificacoes');
    const response = await apiCall.json();

    if(response[0] == null) {
      Alert.alert('Atenção', 'Nenhuma notificação, aguarde as novidades chegarem!');
    }

    setItens(response);
  }

  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesing name='arrowleft' size={30} style={{color: 'white'}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>NOTIFICAÇÕES</Text>
      </View>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
      <FlatList 
        data={itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          if(item.fields.status == false){
            return(
              <View>
                <TouchableOpacity key={item.pk} onPress={() => letNotificacao(item.pk)}>
                  <NotificacaoScreen id={item.pk} notificacoes={notificacoes} status={item.fields.status} titulo={item.fields.titulo} assunto={item.fields.assunto}/>
                </TouchableOpacity>
              </View>
            );
          
          } else {
            return(
              <View>
                <NotificacaoScreen id={item.pk} status={item.fields.status} notificacoes={notificacoes} titulo={item.fields.titulo} assunto={item.fields.assunto}/>
              </View>
            );
          }
        }}
        refreshing={isLoading}
        onRefresh={() => notificacoes()}
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
    marginRight: 100,
    color: 'white',
    fontWeight: 'bold',
  },
})

