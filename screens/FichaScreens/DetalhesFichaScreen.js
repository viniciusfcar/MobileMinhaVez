import React, {useEffect, useState} from 'react';
import { Modal, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right, Header } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Entypo from 'react-native-vector-icons/Entypo/';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons/';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';

export default function DetalhesFichaScreen({route}) {
  
  const navigation = useNavigation();

  const [spinner, setSpinner] = useState(false);
  const [preferencial, setPreferencial] = useState();
  const [status_fila, setStatusFila] = useState(false);
  const [consulta, setConsulta] = useState(null);
  const [autorizacao, setAutorizacao] = useState(null);
  const [exame, setExame] = useState(null);
  const [fila, setFila] = useState(null);
  const [unidade, setUnidade] = useState(null);
  const [posicao_ficha, setPosicaoFicha] = useState();
  const [especialista, setEspecialista] = useState(null);
  const [responsavel, setResponsavel] = useState(null);
  const [consulta_modal, setConsultaModal] = useState(false);
  const [exame_modal, setExameaModal] = useState(false);
  const [autorizacao_modal, setAutorizacaoModal] = useState(false);

  useEffect(() => {
    onFicha();
    posicao();
  },[]);

  const onFicha = async () => {

    setSpinner(true);

    if(route.params.ficha.fields.preferencial){
      setPreferencial('SIM');
    
    } else {
      setPreferencial('NÃO');
    }

    const apiCall1 = await fetch('https://minhavezsistema.com.br/api/autorizacao/' + route.params.ficha.pk + '/autorizacao_ficha/')
    const response1 = await apiCall1.json();

    const apiCall2 = await fetch('https://minhavezsistema.com.br/api/consulta/' + route.params.ficha.pk + '/consulta_ficha/')
    const response2 = await apiCall2.json();

    const apiCall3 = await fetch('https://minhavezsistema.com.br/api/exame/' + route.params.ficha.pk + '/exame_ficha/')
    const response3 = await apiCall3.json();

    const apiCall4 = await fetch('https://minhavezsistema.com.br/api/fila/' + route.params.ficha.pk + '/fila_ficha/')
    const response4 = await apiCall4.json();

    const apiCall5 = await fetch('https://minhavezsistema.com.br/api/unidade_saude/' + route.params.ficha.pk + '/unidade_ficha/')
    const response5 = await apiCall5.json();

    if(response1[0] != null) {
      setAutorizacao(response1[0]);
      setStatusFila(response1[0].fields.status);
      esp_resp(response1[0]);
    
    } else if(response2[0] != null) {
      setConsulta(response2[0]);
      setStatusFila(response2[0].fields.status);
      esp_resp(response2[0]);
    
    } else if(response3[0]){
      setExame(response3[0]);
      setStatusFila(response3[0].fields.status);
    
    }
    
    if(response4[0]){
      setFila(response4[0]);
    }

    if(response5[0]){
      setUnidade(response5[0]);
    }

    setSpinner(false);

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

  const desmarcar = async () => {
    const form = new FormData();
    form.append("id_ficha", route.params.ficha.pk);
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));

    const apiCall = await fetch('https://minhavezsistema.com.br/api/ficha/desistir_ficha/', {
      method: 'POST',
      body: form,
    });

    if(apiCall.status == 200) {
      navigation.navigate('Home');
      Alert.alert('Sucesso!', 'Ficha desmarcada.');
    
    } else if(apiCall.status == 401) {
      Alert.alert('Atenção!','Sem permissão para tal ação, verifique e refaça se necessário');
    
    } else if(apiCall.status == 511) {
      navigation.navigate('Logout');
      Alert.alert('Cuidado!', 'Você não está logado, refaça o login.');
    
    } else if(apiCall.status == 400) {
      Alert.alert('Erro!', 'Requisição errada, contate o suporte.');
    }
  }

  const posicao = async () => {
      setSpinner(true);

      const apiCall6 = await fetch('https://minhavezsistema.com.br/api/ficha/'+route.params.ficha.pk+'/consulta_posicao_ficha')
      const response6 = await apiCall6.json();

      setPosicaoFicha(response6);

      setSpinner(false);    
  }

  const verificar_fila = () => {
    if(fila) {
      return (
        <View>
          <CardItem header bordered>
            <Text style={styles.negrito}>Dados da Fila</Text>
          </CardItem>
          <CardItem>
            <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
            <Left>
              <Text style={{alignItems: 'center'}}>{fila.fields.nome}</Text>
            </Left>
          </CardItem>
        </View>
      );
    }
  }

  const verificar = () => {

    if(consulta != null && especialista != null) {
      return (
        <View>
          <Modal visible={consulta_modal} animationType="slide" transparent={true} onRequestClose={() => {}}>
            <View style={styles.container} padder>  
              <Card style={styles.boxContainer}>
                <CardItem header bordered>
                  <Text style={styles.negrito}>Dados da Consulta</Text>
                  <Right>
                    <SimpleLineIcons name='graph' size={25} style={{color: '#1E90FF'}} />
                  </Right>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                        <Text>{consulta.fields.nome}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Hora:</Text>
                        <Text>{consulta.fields.hora}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                        <Text>{Moment(consulta.fields.data).format('DD/MM/YYYY')}</Text>
                    </Left>
                </CardItem>
                <CardItem header bordered>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
                    <Text>{consulta.fields.status}</Text>
                  </Left>
                </CardItem>
                <CardItem header bordered>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Especialista:</Text>
                    <Text>{especialista.nome} {especialista.sobrenome}</Text>
                  </Left>
                </CardItem>
                <CardItem style={styles.buttonContainer}>
                  <Right>
                    <TouchableOpacity onPress={() => setConsultaModal(false)} style={[styles.button, styles.buttonCancel]}>
                    <Text style={styles.boxText}>Cancelar</Text>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => setConsultaModal(true)}>
            <CardItem header bordered>
              <Text style={styles.negrito}>Dados da Consulta</Text>
              <Right>
                <SimpleLineIcons name='graph' size={25} style={{color: '#1E90FF'}} />
              </Right>
            </CardItem>
          </TouchableOpacity>
        </View>
      );
    } else if(autorizacao != null && responsavel != null){
      return (
        <View>
          <Modal visible={autorizacao_modal} animationType="fade" transparent={true} onRequestClose={() => {}}>
            <View style={styles.container} padder>  
              <Card style={styles.boxContainer}>
                <CardItem header bordered>
                    <Text style={styles.negrito}>Dados da Autorização</Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                        <Text>{autorizacao.fields.nome}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Hora:</Text>
                        <Text>{autorizacao.fields.hora}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                        <Text>{Moment(autorizacao.fields.data).format('DD/MM/YYYY')}</Text>
                    </Left>
                </CardItem>
                <CardItem header bordered>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
                    <Text>{autorizacao.fields.status}</Text>
                  </Left>
                </CardItem>
                <CardItem>
                    <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Responsável:</Text>
                      <Text>{responsavel.nome} {responsavel.sobrenome}</Text>
                    </Left>
                </CardItem>
                <CardItem style={styles.buttonContainer}>
                  <Right>
                    <TouchableOpacity onPress={() => setAutorizacaoModal(false)} style={[styles.button, styles.buttonCancel]}>
                        <Text style={styles.boxText}>Cancelar</Text>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => setAutorizacaoModal(true)}>
            <CardItem header bordered>
              <Text style={styles.negrito}>Dados da Autorização</Text>
              <Right>
                <AntDesing name='folder1' size={25} style={{color: '#1E90FF'}} />
              </Right>
            </CardItem>
          </TouchableOpacity>
        </View>
      );
    } else if(exame){
      return(
        <View>
          <Modal visible={exame_modal} animationType="fade" transparent={true} onRequestClose={() => {}}>
            <View style={styles.container} padder>  
              <Card style={styles.boxContainer}>
                <CardItem header bordered>
                    <Text style={styles.negrito}>Dados do Exame</Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                        <Text>{exame.fields.nome}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Hora:</Text>
                        <Text>{exame.fields.hora}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                        <Text>{Moment(exame.fields.data).format('DD/MM/YYYY')}</Text>
                    </Left>
                </CardItem>
                <CardItem header bordered>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Tipo:</Text>
                    <Text>{exame.fields.tipo}</Text>
                  </Left>
                </CardItem>
                <CardItem header bordered>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
                    <Text>{exame.fields.status}</Text>
                  </Left>
                </CardItem>
                <CardItem style={styles.buttonContainer}>
                  <Right>
                    <TouchableOpacity onPress={() => setExameaModal(false)} style={[styles.button, styles.buttonCancel]}>
                        <Text style={styles.boxText}>Cancelar</Text>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>
            </View>
          </Modal>
          <TouchableOpacity onPress={() =>setExameaModal(true)}>
            <CardItem header bordered>
              <Text style={styles.negrito}>Dados do Exame</Text>
              <Right>
                <Entypo name='lab-flask' size={25} style={{color: '#1E90FF'}} />
              </Right>
            </CardItem>
          </TouchableOpacity>
        </View>
      )
    }
  }

  const mostra_posicao = () => {
    if(status_fila == 'INICIADA' && route.params.ficha.fields.status != 'ATENDIDA') {
      if(posicao_ficha == 0) {
        return(
          <TouchableOpacity onPress={() => posicao()}>
            <View style={styles.header}>
              <Text style={styles.headerPosicao}>É a sua vez, esteja pronto!</Text>
              <Right style={{marginRight: 20}}>
                <Icon style={{color: '#1E90FF'}} name='refresh'/>
              </Right>
            </View>
          </TouchableOpacity>
        )
      } else {
        return(
          <TouchableOpacity onPress={() => posicao()}>
            <View style={styles.header}>
              <Text style={styles.headerPosicao}>Faltam {posicao_ficha} fichas, fique atento!</Text>
              <Right style={{marginRight: 20}}>
                <Icon style={{color: '#1E90FF'}} name='refresh'/>
              </Right>
            </View>
          </TouchableOpacity>
        )
      }
    }
  }

  const statusFicha = () => {
    if(route.params.ficha.fields.status == 'AGUARDANDO'){
      return(
        <TouchableOpacity style={styles.header} onPress={() => desmarcar()}>
            <Text style={styles.headerDanger}>Desmarcar X</Text>
        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity style={styles.header} onPress={() => desmarcar()}>
          <Text style={styles.headerDanger}>Excluir X</Text>
        </TouchableOpacity>
      )
    }
  }
    
  let corpo = verificar()
  let corpo_posicao = mostra_posicao()
  let fila_corpo = verificar_fila()
  let status_ficha_corpo = statusFicha();

  return (
    <Container style={styles.container}>
      <Spinner 
        visible={spinner}
      />
      <Header style={styles.headerTittle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesing name='arrowleft' size={30} style={{color: '#1E90FF'}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>DETALHES DA FICHA</Text>
      </Header>
      <View style={{ borderBottomColor: '#e9e7e7', borderBottomWidth: 10 }} />
      <View padder>
        {corpo_posicao}
        <Card>
          <CardItem header bordered>
            <Text style={styles.negrito}>Dados da Ficha</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Sua ficha é:</Text>
              <Text>{route.params.ficha.fields.numero}</Text>
            </Left>
            <Left>
              <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Preferencial:</Text>
              <Text>{preferencial}</Text>
            </Left>
          </CardItem>
          <CardItem header bordered>
            <Left>
              <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
              <Text>{route.params.ficha.fields.status}</Text>
            </Left>
          </CardItem>
          {fila_corpo}
          {corpo}
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesUnidade', {unidade: unidade})}>
            <CardItem header bordered>
              <Text style={styles.negrito}>Detalhes da Unidade</Text>
              <Right>
                <AntDesing name='home' size={25} style={{color: '#1E90FF'}} />
              </Right>
            </CardItem>
          </TouchableOpacity>
        </Card>
        {status_ficha_corpo}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e7e7',
  },

  negrito: {
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  headerTittle: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 55,
    flexDirection: 'row',
    justifyContent: "space-around",
    borderColor: 'white',
    borderBottomColor: 'white',
  },

  headerText: {
    fontSize: 20,
    color: '#1E90FF',
    fontWeight: 'bold',
    marginRight: 60
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

  text: {
    color: '#1E90FF',  
  },

  headerDanger: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },

  headerPosicao: {
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
  },

  boxContainer:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: '#DCDCDC',        
    justifyContent: 'center',  
    margin: 20,
    padding: 10, 
  },

  negrito: {
    fontWeight: 'bold',
    color: '#1E90FF'
  },

  text: {
    color: '#1E90FF',
    margin: 5,  
  },

  button:{
    borderRadius: 10,       
    padding: 10,    
    marginTop: 10,           
  },

  buttonCancel:{
    backgroundColor: '#ff0000',
    paddingHorizontal: 50,       
    marginLeft: 10,
  },

  boxTex:{
    color: '#fff',
    fontWeight: 'bold',
  },

  buttonContainer:{
    flexDirection: 'row',        
  },
});