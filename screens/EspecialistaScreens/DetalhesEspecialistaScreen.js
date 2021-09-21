import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Container, Header, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnidadeSaudeScreen from '../UnidadeSaudeScreens/UnidadeSaudeScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import AntDesing from 'react-native-vector-icons/AntDesign/';

export default function DetalhesEspecialistaScreen({route}) {

  const navigation = useNavigation();

  const [especializacoes, setEspecializacoes] = useState({});
  const [profissao, setProfissao] = useState({});
  const [unidades, setUnidades] = useState({});
  const [spinner, setSpinner] = useState(false);

  const onProfissao = async () => {
    setSpinner(true);
    
    const id_profissao = route.params.especialista.profissao

    const apiCall = await fetch('https://minhavezsistema.com.br/api/profissao/' + id_profissao + '/')
    const response = await apiCall.json();

    setProfissao(response);

    setSpinner(false);
  }

  const onEspecializacao = async ()  => {
    
    try {
      setSpinner(true);
      const lista = route.params.especialista.especializacao;
      const new_lista = [];

      for(var i=0; i < lista.length; i++) {

        const apiCall = await fetch('https://minhavezsistema.com.br/api/especializacao/' + lista[i] + '/')
        const response = await apiCall.json();

        new_lista.push(response);
      }

      setEspecializacoes(new_lista);

      setSpinner(false);
    
    } catch(error) {

    }
  }

  const onUnidades = async ()  => {
    setSpinner(true);

    const apiCall = await fetch('https://minhavezsistema.com.br/api/especialista/' + route.params.especialista.id + '/unidadesEspecialista/')
    const response = await apiCall.json();

    setUnidades(response);  
    setSpinner(false);  
  }

  useEffect(() => {
    onProfissao();
    onEspecializacao();
    onUnidades();
  }, []);
      
  return (
    <Container style={styles.container}>
      <Spinner 
        visible={spinner}
      />
      <Header style={styles.headerTittle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesing name='arrowleft' size={30} style={{color: '#1E90FF'}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>DETALHES DO ESPECIALISTA</Text>
      </Header>
      <View padder>
        <Card>
          <CardItem>
            <Image
              style={styles.avatar}
              source={{uri: route.params.especialista.imagem}}
            />
            <Left>
              <Body>
                <Text>{route.params.especialista.nome}</Text>
                <Text note>{route.params.especialista.sobrenome}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <View padder>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Profissão:</Text>
                <Text>{profissao.nome}</Text>
              </View>
            </Left>
            <Right>
              <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Especializações:</Text>
              <ScrollView>
                <FlatList 
                  data={especializacoes}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    return (
                      <View>
                        <Text>- {item.nome};</Text>
                      </View>
                    );
                  }}
                />
              </ScrollView>
            </Right>
          </CardItem>
        </Card>
        <View style={styles.header}>
          <Text style={{color: '#4169E1', fontSize: 25}}>Locais de Atendimento:</Text>
        </View>
        <ScrollView ontentInsetAdjustmentBehavior="automatic">
          <FlatList 
            data={unidades}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity key={item.id}
                    onPress={() => navigation.navigate('DetalhesUnidade', {unidade: item})}>
                    <UnidadeSaudeScreen razao_social={item.fields.razao_social}/>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  negrito: {
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  avatar: {
    width: '50%',
    height: 190,
    borderRadius: 20
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
    marginRight: 20,
    color: '#1E90FF',
    fontWeight: 'bold',
  },

  text: {
    color: '#1E90FF',
    marginLeft: 10
  },

});