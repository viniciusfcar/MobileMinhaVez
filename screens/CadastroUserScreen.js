import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, Button} from 'native-base';
import TextInputMask from 'react-native-text-input-mask';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

import { useFormik } from 'formik';
import * as yup from 'yup';

export default function CadastroUserScreen() {

    const navigation = useNavigation();

    const [username, setUsername] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
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
    const [alert_logradouro, setAlertLogradouro] = useState('');
    const [alert_numero, setAlertNumero] = useState('');
    const [alert_bairro, setAlertBairro] = useState('');
    const [alert_cidade, setAlertCidade] = useState('');
    const [alert_estado, setAlertEstado] = useState('');
    const [color_line_cpf, setColorLineCpf] = useState('white');
    const [color_line_sus, setColorLineSus] = useState('white');
    const [color_line_username, setColorLineUsername] = useState('white');
    const [color_line_senha, setColorLineSenha] = useState('white');
    const [color_line_cep, setColorLineCep] = useState('white');
    const [color_line_confir_senha, setColorLineConfirSenha] = useState('white');
    const [password, setPassword] = useState();
    const [confirm_senha, setConfirmSenha] = useState();

    const onCancel = () => {
        navigation.navigate('Login');
    }

    const validationSchema = yup.object().shape({
        first_name: yup.string().required('Nome é obrigatório*'),
        last_name: yup.string().required('Sobrenome é obrigatório*'),
        cpf: yup.string().required('CPF é obrigatório*'),
        sus: yup.string().required('SUS é obrigatório*'),
        rg: yup.string().required('RG é obrigatório*'),
        email: yup.string().required('E-mail é obrigatório*'),
        username: yup.string().required('Username é obrigatório*'),
        password: yup.string().required('Senha é obrigatório*'),
        confirm_senha: yup.string().required('Confirmar a senha é obrigatório*'),
        telefone: yup.string().required('Telefone é obrigatório*'),
    })

    const initialFormState = {
        first_name: '',
        last_name: '',
        cpf: '',
        sus: '',
        rg: '',
        email: '',
        username: '',
        password: '',
        confirm_senha: '',
        telefone: '',
    }

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {

            if(sexo == null) {
                setSpinner(true);
                Alert.alert('Erro', 'Selecione o seu sexo!');
            } else if(values.cpf.trim().length < 14) {
                setColorLineCpf('red');
                setSpinner(true);
                Alert.alert('Erro', 'CPF com valor inesperado. Preencha o campo com 11 números!');
            
            } else if(!cep || cep?.trim().length < 8) {
                setSpinner(true);
                setColorLineCep('red');
                Alert.alert('Erro', 'CEP com valor inesperado. Preencha o campo com 8 números!');
            
            } else if(!logradouro || logradouro?.trim().length == 0) {
                setAlertLogradouro('Logradouro é obrigatório*')
            
            } else if(!numero || numero?.trim().length == 0) {
                setAlertNumero('Número é obrigatório*')
            
            } else if(!bairro || bairro?.trim().length == 0) {
                setAlertBairro('Bairro é obrigatório*')
            
            } else if(!cidade || cidade?.trim().length == 0) {
                setAlertCidade('Cidade é obrigatório*')
            
            } else if(!estado || estado?.trim().length == 0) {
                setAlertEstado('Estado é orbigatório*')
            
            } else if(values.password.trim().length < 8) {
                setColorLineSenha('red');
                setSpinner(false);
                Alert.alert('Erro', 'Sua senha tem menos de 8 caracteres, veja a dica abaixo do campo!')
            
            } else {

                setAlertLogradouro('')
                setAlertNumero('')
                setAlertBairro('')
                setAlertCidade('')
                setAlertEstado('')

                const form = new FormData();
                form.append("username", values.username);
                form.append("telefone", values.telefone);
                form.append("password", values.password);
                form.append("email", values.email);
                form.append("first_name", values.first_name);
                form.append("last_name", values.last_name);
                form.append("cpf", values.cpf);
                form.append("sus", values.sus);
                form.append("rg", values.rg);
                form.append("sexo", sexo);
                form.append("cep", cep);
                form.append("logradouro", logradouro);
                form.append("numero", numero);
                form.append("complemento", complemento);
                form.append("bairro", bairro);
                form.append("cidade", cidade);
                form.append("estado", estado);
                
                const apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/cadastro_user/', {
                    method: 'POST',
                    body: form,
                });

                setSpinner(false);

                if (apiCall.status == 200) {
                    navigation.navigate('Login');
                    Alert.alert('Sucesso!', 'Realize o login para acessar sua conta!');
                } else if (apiCall.status == 406) {
                    Alert.alert('Atenção!', 'O e-mail preenchido não é válido!');
                } else if (apiCall.status == 409) {
                    Alert.alert('Atenção!', 'Verifique se od campos estão preenchidos ou com as linhas vermelha!');
                } else if (apiCall.status == 400) {
                    Alert.alert('Erro', 'Que tipo de ação está tentando fazer ? Contate o suporte!');
                }
            }
        }
    })

    const onChangeText = async () => {
        const cep_func = cep;
        console.log(cep)
        let apiCall = await fetch('https://viacep.com.br/ws/' + cep_func + '/json/');
        const endereco = await apiCall.json();

        if (endereco.logradouro != undefined) {

            if (endereco.logradouro != "") {
                setLogradouro(endereco.logradouro);
                setTextLogradouro(false);
            } else {
                setTextLogradouro(true);
            }

            if (endereco.complemento != "") {
                setComplemento(endereco.complemento);
                setTextComplemento(false)
            } else {
                setTextComplemento(true);
            }

            if (endereco.bairro != "") {
                setBairro(endereco.bairro);
                setTextBairro(false);
            } else {
                setTextBairro(true);
            }

            if (endereco.localidade != "") {
                setCidade(endereco.localidade);
                setTextCidade(false);
            } else {
                setTextCidade(true);
            }

            if (endereco.uf != "") {
                setEstado(endereco.uf)
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

    const cpfApp = async () => {
        const cpf_func = formik.values.cpf;
        
        let apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/?search=' + cpf_func);
        const user = await apiCall.json();
        
        if (user[0] != null) {
            setColorLineCpf('red');
            Alert.alert('Erro', 'CPF em uso, escolha outro!');
        } else {
            setColorLineCpf('white');
        }
    };

    const usernameApp = async () => {
        const username_func = formik.values.username;
        
        let apiCall = await fetch('https://minhavezsistema.com.br/api/user/?search=' + username_func);
        const user = await apiCall.json();

        if (user[0] != null) {
            setColorLineUsername('red');
            Alert.alert('Erro', 'Username em uso, escolha outro!');
        } else {
            setColorLineUsername('white');
        }
    };

    const susApp = async () => {
        const sus_func = formik.values.sus;

        let apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/?search=' + sus_func);
        const user = await apiCall.json();

        if (user[0] != null) {
            setColorLineSus('red');
            Alert.alert('Erro', 'SUS em uso, escolha outro!');
        } else {
            setColorLineSus('white');
        }
    };

    const confirmeSenha = async () => {

        if (confirm_senha == password) {
            setColorLineConfirSenha('white');
        } else {
            setColorLineConfirSenha('red');
            Alert.alert('Erro', 'Senhas estão diferentes');
        }
    }

    return (
        <Container style={styles.container}>
            <Header style={styles.headerTittle}>
                <Text style={styles.headerText}>CADASTRE-SE</Text>
                <Right>
                    <Image
                        style={{ width: 60, height: 50 }}
                        source={require('./../static/images/isotipo_branco.png')}
                    />
                </Right>
            </Header>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
            <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                <Text style={{ marginLeft: 10 }}>*Nome:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Ex: Maria'
                    value={formik.values.first_name}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={formik.handleChange('first_name')}
                />
                {formik.touched.first_name && formik.errors.first_name &&
                    <Text style={styles.alert}>{formik.errors.first_name}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*Sobrenome:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Ex: Silva'
                    value={formik.values.last_name}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={formik.handleChange('last_name')}
                />
                {formik.touched.last_name && formik.errors.last_name &&
                    <Text style={styles.alert}>{formik.errors.last_name}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*Sexo:</Text>
                <Picker 
                    selectedValue={sexo}
                    style={{ height: 50, width: 150, color: '#1E90FF'}}
                    onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}
                >
                    <Picker.Item label="Selecione" value={null} />  
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Feminino" value="Feminino" />
                    <Picker.Item label="Outro" value="Outro" />
                </Picker>
                <Text style={{ marginLeft: 10 }}>*CPF:</Text>
                <TextInputMask
                    style={styles.boxInput}
                    placeholder='Ex: 123.456.789-00'
                    keyboardType='numeric'
                    defaultValue={formik.values.cpf}
                    underlineColorAndroid={color_line_cpf}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onEndEditing={() => cpfApp()}
                    onChangeText={(formatted) => formik.setFieldValue('cpf', formatted)}
                    mask={"[000].[000].[000]-[00]"}
                    maxLength={14}
                />
                {formik.touched.cpf && formik.errors.cpf &&
                    <Text style={styles.alert}>{formik.errors.cpf}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*SUS:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Ex: 0129837686'
                    keyboardType='numeric'
                    defaultValue={formik.values.sus}
                    underlineColorAndroid={color_line_sus}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onEndEditing={() => susApp()}
                    onChangeText={formik.handleChange('sus')}
                />
                {formik.touched.sus && formik.errors.sus &&
                    <Text style={styles.alert}>{formik.errors.sus}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*RG:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Ex: 002789'
                    keyboardType='numeric'
                    defaultValue={formik.values.rg}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={formik.handleChange('rg')}
                />
                {formik.touched.rg && formik.errors.rg &&
                    <Text style={styles.alert}>{formik.errors.rg}</Text>
                }
                <CardItem header bordered />
                <Text style={{ marginLeft: 10, marginTop: 15 }}>*CEP:</Text>
                <Text style={styles.dica}>Dica: Apenas números</Text>
                <TextInputMask
                    style={styles.boxInput}
                    placeholder='Ex: 59900-000'
                    keyboardType='numeric'
                    defaultValue={cep}
                    underlineColorAndroid={color_line_cep}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onEndEditing={() => onChangeText()}
                    onChangeText={(formatted) => setCep(formatted)}
                    mask={"[00000]-[000]"}
                    maxLength={9}
                />
                <Text style={{ marginLeft: 10 }}>*Logradouro:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_logradouro}
                    placeholder='Ex: Rua, Avenida, Travessa...'
                    value={logradouro}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={logradouro => setLogradouro(logradouro)}
                />
                {alert_logradouro != '' &&
                    <Text style={styles.alert}>{alert_logradouro}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*Número:</Text>
                <Text style={styles.dica}>Dica: Caso não possua número, coloque 0.</Text>
                <TextInput
                    style={styles.boxInput}
                    keyboardType='numeric'
                    placeholder='Ex: 90'
                    value={numero}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={numero => setNumero(numero)}
                />
                {alert_numero != '' &&
                    <Text style={styles.alert}>{alert_numero}</Text>
                }
                <Text style={{ marginLeft: 10 }}>Complemento:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_complemento}
                    placeholder='Ex: Casa, AP, Quadra...'
                    value={complemento}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={complemento => setComplemento(complemento)}
                />
                <Text style={{ marginLeft: 10 }}>*Bairro:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_bairro}
                    placeholder='Ex: Centro'
                    value={bairro}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={bairro => setBairro(bairro)}
                />
                {alert_bairro != '' &&
                    <Text style={styles.alert}>{alert_bairro}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*Cidade:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_cidade}
                    placeholder='Ex: Pau dos Ferros'
                    value={cidade}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={cidade => setCidade(cidade)}
                />
                {alert_cidade != '' &&
                    <Text style={styles.alert}>{alert_cidade}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*Estado:</Text>
                <TextInput
                    style={styles.boxInput}
                    editable={text_estado}
                    placeholder='Ex: RN'
                    value={estado}
                    inputStyle={{ color: 'black' }}
                    onChangeText={estado => setEstado(estado)}
                />
                {alert_estado != '' &&
                    <Text style={styles.alert}>{alert_estado}</Text>
                }
                <CardItem header bordered />
                <Text style={{ marginLeft: 10, marginTop: 15 }}>*Username:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Ex: maria77'
                    defaultValue={formik.values.username}
                    underlineColorAndroid={color_line_username}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    Outlined='focused'
                    onEndEditing={() => usernameApp()}
                    onChangeText={formik.handleChange('username')}
                />
                {formik.touched.username && formik.errors.username &&
                    <Text style={styles.alert}>{formik.errors.username}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*Senha:</Text>
                <Text style={styles.dica}>Dica: de 8 a 150 caracteres. Letras, números e @/./+/-/_ apenas.</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Senha'
                    value={formik.values.password}
                    underlineColorAndroid={color_line_senha}
                    secureTextEntry={true}
                    inputStyle={{ color: 'black' }}
                    autoCapitalize='none'
                    onChangeText={formik.handleChange('password')}
                />
                {formik.touched.password && formik.errors.password &&
                    <Text style={styles.alert}>{formik.errors.password}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*Confirme a senha:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Confirme a senha'
                    value={formik.values.confirm_senha}
                    underlineColorAndroid={color_line_confir_senha}
                    secureTextEntry={true}
                    inputStyle={{ color: 'black' }}
                    autoCapitalize='none'
                    onEndEditing={() => confirmeSenha()}
                    onChangeText={formik.handleChange('confirm_senha')}
                />
                {formik.touched.confirm_senha && formik.errors.confirm_senha &&
                    <Text style={styles.alert}>{formik.errors.confirm_senha}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*E-mail:</Text>
                <TextInput
                    style={styles.boxInput}
                    placeholder='Ex: maria@gmail.com'
                    value={formik.values.email}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={formik.handleChange('email')}
                />
                {formik.touched.email && formik.errors.email &&
                    <Text style={styles.alert}>{formik.errors.email}</Text>
                }
                <Text style={{ marginLeft: 10 }}>*Telefone:</Text>
                <TextInputMask
                    style={styles.boxInput}
                    placeholder='Ex: (84) 99629-0000'
                    keyboardType='numeric'
                    value={formik.values.telefone}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={formik.handleChange('telefone')}
                    mask={"([00]) [00000]-[0000]"}
                    maxLength={15}
                />
                {formik.touched.telefone && formik.errors.telefone &&
                    <Text style={styles.alert}>{formik.errors.telefone}</Text>
                }
            </ScrollView>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: "space-around", }}>
                <TouchableOpacity style={styles.button} onPress={() => onCancel()}>
                    <Text style={styles.buttonText2}>Cancelar</Text>
                    <AntDesing name='close' size={30} style={styles.logo2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
                    <Text style={styles.buttonText}>Salvar</Text>
                    <AntDesing name='save' size={30} style={styles.logo} />
                </TouchableOpacity>
            </View>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
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
        borderBottomColor: 'white',
        height: 70,
    },

    headerText: {
        fontSize: 30,
        color: 'white',
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
        justifyContent: "space-around",
    },

    buttonText: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
    },

    buttonText2: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
    },

    logo: {
        color: 'green',
    },

    logo2: {
        color: 'red',
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

    dica: {
        fontSize: 13,
        color: 'grey',
        alignItems: 'flex-start',
        marginLeft: 10
    },

    alert: {
        fontSize: 13,
        color: 'red',
        alignItems: 'flex-start',
        marginLeft: 10
    }

});