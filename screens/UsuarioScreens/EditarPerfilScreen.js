import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, } from 'native-base';
import { Input } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';
import TextInputMask from 'react-native-text-input-mask';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import {AuthContext} from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function EditarPerfilScreen() {


    const {usuario, user} = useContext(AuthContext);
    const navigation = useNavigation();

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [sus, setSus] = useState();
    const [cep, setCep] = useState();
    const [logradouro, setLogradouro] = useState();
    const [numero, setNumero] = useState();
    const [complemento, setComplemento] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [estado, setEstado] = useState();
    const [sexo, setSexo] = useState();
    const [telefone, setTelefone] = useState();
    const [spinner, setSpinner] = useState();
    const [text_logradouro, setTextLogradouro] = useState();
    const [text_complemento, setTextComplemento] = useState();
    const [text_bairro, setTextBairro] = useState();
    const [text_cidade, setTextCidade] = useState();
    const [text_estado, setTextEstado] = useState();
    const [color_line_cep, setColorLineCep] = useState('white');
    const [color_line_cpf, setColorLineCpf] = useState('white');
    const [color_line_sus, setColorLineSus] = useState('white');

    useEffect(() => {
        (async () => {
            setFirstName(await AsyncStorage.getItem("@MinhaVezSistema:first_name"));
            setLastName(await AsyncStorage.getItem("@MinhaVezSistema:last_name"));
            setCpf(await AsyncStorage.getItem("@MinhaVezSistema:cpf"));
            setRg(await AsyncStorage.getItem("@MinhaVezSistema:rg"));
            setSus(await AsyncStorage.getItem("@MinhaVezSistema:sus"));
            setCep(await AsyncStorage.getItem("@MinhaVezSistema:cep"));
            setLogradouro(await AsyncStorage.getItem("@MinhaVezSistema:logradouro"));
            setNumero(await AsyncStorage.getItem("@MinhaVezSistema:numero"));
            setComplemento(await AsyncStorage.getItem("@MinhaVezSistema:complemento"));
            setBairro(await AsyncStorage.getItem("@MinhaVezSistema:bairro"));
            setCidade(await AsyncStorage.getItem("@MinhaVezSistema:cidade"));
            setEstado(await AsyncStorage.getItem("@MinhaVezSistema:estado"));
            setSexo(await AsyncStorage.getItem("@MinhaVezSistema:sexo"));
            setTelefone(await AsyncStorage.getItem("@MinhaVezSistema:telefone"));
        })();
    },[]);

    const editar = async () => {
        setSpinner(true);

        if(cep.trim().length < 8) {
            setColorLineCep('red');
            setSpinner(false);
            Alert.alert('Erro', 'CEP com valor inesperado. Preencha o campo com 8 números!');
        
        } else if(cpf.trim().length < 14) {
            setColorLineCpf('red');
            etSpinner(false);
            Alert.alert('Erro', 'CPF com valor inesperado. Preencha o campo com 11 números!');
        
        } else if(
            first_name.trim().length == 0 || last_name.trim().length == 0 ||
            telefone.trim().length == 0 || sexo.trim().length == 0 || 
            cpf.trim().length == 0 ||
            sus.trim().length == 0 || rg.trim().length == 0 ||
            cep.trim().length == 0 || logradouro.trim().length == 0 ||
            numero.trim().length == 0 || bairro.trim().length == 0 ||
            cidade.trim().length == 0 || estado.trim().length == 0) {
            
            setSpinner(false);
            Alert.alert('Erro', 'Preencha os campos em branco que são obrigatórios!');
        } else {

            const form = new FormData();
            form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
            form.append("first_name", first_name);
            form.append("last_name", last_name);
            form.append("cpf", cpf);
            form.append("sus", sus);
            form.append("rg", rg);
            form.append("sexo", sexo);
            form.append("cep", cep);
            form.append("logradouro", logradouro);
            form.append("numero", numero);
            form.append("complemento", complemento);
            form.append("bairro", bairro);
            form.append("cidade", cidade);
            form.append("estado", estado);
            form.append("telefone", telefone);

            const apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/editar_perfil/', {
                method: 'POST',
                body: form,
            });

            setSpinner(false);
            
            if(apiCall.status == 200) {
                Alert.alert('Sucesso!', 'Perfil editado.');
                navigation.navigate('Home');
            } else if(apiCall.status == 409) {
                Alert.alert('Atenção', 'Verifique os campos com as linhas vermelhas!');
            }
        }
    }

    const onChangeText = async (cep) => {

        setCep(cep);

        let apiCall = await fetch('https://viacep.com.br/ws/'+cep+'/json/');
        const endereco = await apiCall.json();

        if(endereco.logradouro != undefined){
            
            if(endereco.logradouro != "") {
                setLogradouro(endereco.logradouro);
                setTextLogradouro(false);
            } else {
                setTextLogradouro(true);
            }
            
            if(endereco.complemento != ""){
                setComplemento(endereco.complemento);
                setTextComplemento(false)
            } else {
                setTextComplemento(true);
            }
            
            if(endereco.bairro != ""){
                setBairro(endereco.bairro);
                setTextBairro(false);
            } else {
                setTextBairro(true);
            }

            if(endereco.localidade != ""){
                setCidade(endereco.localidade);
                setTextCidade(false);
            } else {
                setTextCidade(true);
            }

            if(endereco.uf != ""){
                setEstado(endereco.uf);
                setTextEstado(false);
            } else {
                setTextEstado(true);
            }
            
            setColorLineCep('white');

            /* parte que habilita o btn salvar
            document.getElementById('alert-4').style.display = "none";
            document.getElementById("btn").disabled = false; */

        } else {
            setColorLineCep('red');
            Alert.alert('Erro', 'CEP inválido!');
        }
    }

    const cpfApp = async (cpf) => {
        setCpf(cpf);

        const id = await AsyncStorage.getItem('@MinhaVezSistema:id_usuario')
        
        let apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/?search='+cpf);
        const user = await apiCall.json();

        if(user[0] != null && user[0].id != id) {
            setColorLineCpf('red');
            Alert.alert('Erro', 'CPF em uso, escolha outro!');
        } else {
            setColorLineCpf('white');
        }
    };

    const susApp = async (sus) => {
        setSus(sus)

        const id = await AsyncStorage.getItem('@MinhaVezSistema:id_usuario')

        let apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/?search='+sus);
        const user = await apiCall.json();

        if(user[0] != null && user[0].id != id) {
            setColorLineSus('red');
            Alert.alert('Erro', 'SUS em uso, escolha outro!');
        } else {
            setColorLineSus('white');
        }
    };

    return (
        <Container style={styles.container}>
            <Spinner
                visible={false}
            />
            <Header style={styles.headerTittle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesing name='arrowleft' size={30} style={{color: 'white'}} />
                </TouchableOpacity>
                <Text style={styles.headerText}>EDITAR PERFIL</Text>
            </Header>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 20 }} />
            <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                <Text style={{marginLeft: 10}}>*Nome:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Nome'
                    value={first_name}
                    inputStyle={{color: 'black'}}
                    label='Nome'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={first_name => setFirstName(first_name)}
                />
                <Text style={{marginLeft: 10}}>*Sobrenome:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Sobrenome'
                    value={last_name}
                    inputStyle={{color: 'black'}}
                    label='Sobrenome'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={last_name => setLastName(last_name)}
                />
                <Text style={{marginLeft: 10}}>*Telefone:</Text>
                <TextInputMask
                    style={styles.boxInput}
                    placeholder='Telefone'
                    keyboardType='numeric'
                    value={telefone}
                    inputStyle={{color: 'black'}}
                    label='CPF'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={(formatted) => setTelefone(formatted)}
                    mask={"([00]) [00000]-[0000]"}
                    maxLength={15}
                />
                <Text style={{marginLeft: 10}}>*Sexo:</Text>
                <Picker 
                    selectedValue={sexo}
                    style={{ height: 70, width: 200, color: '#1E90FF'}}
                    onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}
                >
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Feminino" value="Feminino" />
                    <Picker.Item label="Outro" value="Outro" />
                </Picker>
                <Text style={{marginLeft: 10}}>*CPF:</Text>
                <TextInputMask
                    style={styles.boxInput}
                    placeholder='CPF'
                    keyboardType='numeric'
                    defaultValue={cpf}
                    underlineColorAndroid={color_line_cpf}
                    inputStyle={{color: 'black'}}
                    label='CPF'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={(formatted) => cpfApp(formatted)}
                    mask={"[000].[000].[000]-[00]"}
                    maxLength={14}
                />
                <Text style={{marginLeft: 10}}>*SUS:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='SUS'
                    keyboardType='numeric'
                    defaultValue={sus}
                    underlineColorAndroid={color_line_sus}
                    inputStyle={{color: 'black'}}
                    label='SUS'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={(sus) => susApp(sus)}
                />
                <Text style={{marginLeft: 10}}>*RG:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='RG'
                    keyboardType='numeric'
                    defaultValue={rg}
                    inputStyle={{color: 'black'}}
                    label='RG'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={rg => setRg(rg)}
                />
                <Text style={{marginLeft: 10}}>*CEP:</Text>
                <TextInputMask
                    style={styles.boxInput}
                    placeholder='CEP'
                    keyboardType='numeric'
                    defaultValue={cep}
                    underlineColorAndroid={color_line_cep}
                    inputStyle={{color: 'black'}}
                    label='CEP'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={(cep) => onChangeText(cep)}
                    mask={"[00000]-[000]"}
                    maxLength={9}
                />
                <Text style={{marginLeft: 10}}>*Logradouro:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_logradouro}
                    placeholder='Logradouro'
                    value={logradouro}
                    inputStyle={{color: 'black'}}
                    label='Logradouro'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={logradouro => setLogradouro(logradouro)}
                />
                <Text style={{marginLeft: 10}}>*Número:</Text>
                <TextInput
                    style={styles.boxInput}
                    keyboardType='numeric'
                    placeholder='Número'
                    value={numero}
                    inputStyle={{color: 'black'}}
                    label='Número'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={numero => setNumero(numero)}
                />
                <Text style={{marginLeft: 10}}>Complemento:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_complemento}
                    placeholder='Complemento'
                    value={complemento}
                    inputStyle={{color: 'black'}}
                    label='Complemento'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={complemento => setComplemento(complemento)}
                />
                <Text style={{marginLeft: 10}}>*Bairro:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_bairro}
                    placeholder='Bairro'
                    value={bairro}
                    inputStyle={{color: 'black'}}
                    label='Bairro'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={bairro => setBairro(bairro)}
                />
                <Text style={{marginLeft: 10}}>*Cidade:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_cidade}
                    placeholder='Cidade'
                    value={cidade}
                    inputStyle={{color: 'black'}}
                    label='Cidade'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={cidade => setCidade(cidade)}
                />
                <Text style={{marginLeft: 10}}>*Estado:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_estado}
                    placeholder='Estado'
                    value={estado}
                    inputStyle={{color: 'black'}}
                    label='Estado'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={estado => setEstado(estado)}
                />
            </ScrollView>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={() => editar()}>
                    <Text style={styles.buttonText}>Salvar</Text>
                    <Left style={{marginLeft: 20}}>
                        <AntDesing name='save' size={25} style={{color: 'green'}}/>
                    </Left>
                </TouchableOpacity>
            </View>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 20 }} />
        </Container>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    
    containerInput: {
        height: 50,
        alignItems: 'center',
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
        backgroundColor: '#1E90FF',
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
    marginRight: 75
    },

    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 50,
        width: 150,
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

    buttonText: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
    },

    logo: {
        width: 30,
        color: 'green',
    },

    spinnerTextStyle: {
        color: '#1E90FF',
    },

    boxInput: {
        alignSelf: "stretch",
        height: 40,
        margin: 5,
        marginRight: 5,
        borderWidth: 2,
        borderColor: "#1E90FF",
        borderRadius: 5,
        padding: 10
    },
});