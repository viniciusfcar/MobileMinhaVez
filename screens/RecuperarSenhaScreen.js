import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Container, Left, Right} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import TextInputMask from 'react-native-text-input-mask';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

export default function RecuperarSenhaScreen() {

    const navigation = useNavigation();

    const [spinner, setSpinner] = useState(false)

    const validationSchema = yup.object().shape({
        cpf: yup.string().required('CPF é obrigatório*'),
        email: yup.string().required('E-mail é obrigatório*'),
    })

    const initialFormState = {
        cpf: '',
        email: '',
    }

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            setSpinner(true);

            const form = new FormData();
            form.append("cpf", values.cpf);
            form.append("email", values.email);
    
            const apiCall = await fetch('https://minhavezsistema.com.br/api/usuario/alterar_senha/', {
                method: 'POST',
                body: form,
            });

            setSpinner(false);

            login();

            Alert.alert('Redefinição de Senha!', 'Enviamos por e-mail instruções para definir sua senha.'+
            ' Se você não receber um e-mail, certifique-se que o CPF informado tem uma conta cadastrada e que o E-mail informado é o mesmo do cadastro.'+
            ' Se você não receber um e-mail, certifique-se de que cadastrou corretamente o e-mail e verifique sua pasta de spam.'+
            ' Se mesmo assim não conseguiu recuperar a sua senha, contate o suporte pelo e-mail: minhavezsistema@gmail.com.');
        }
    })


    const login = () => {
        navigation.navigate('Login');
    }

    return (
        <Container style={styles.container}>
            <Spinner
                visible={spinner}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.boxContainer}>
                <Image 
                    style={styles.img}
                    source={require('./../static/images/logo.png')}
                />
            </View>
            <View>
                <Text style={styles.headerText}>Informe o CPF cadastrado:</Text>
                <TextInputMask
                    style={styles.boxInput}
                    placeholder='Ex: 123.456.789-00'
                    keyboardType='numeric'
                    defaultValue={formik.values.cpf}
                    inputStyle={{ color: 'black' }}
                    labelStyle={{ color: '#4169E1' }}
                    onChangeText={(formatted) => formik.setFieldValue('cpf', formatted)}
                    mask={"[000].[000].[000]-[00]"}
                    maxLength={14}
                />
                {formik.touched.cpf && formik.errors.cpf &&
                    <Text style={styles.alert}>{formik.errors.cpf}</Text>
                }
            </View>
            <View>
                <Text style={styles.headerText}>Informe o E-mail cadastrado:</Text>
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
            </View>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 50 }} />
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: "space-around"}}>
                <TouchableOpacity style={styles.buttonCancel} onPress={() => login()}>
                    <Text style={styles.buttonText2}>Cancelar</Text>
                    <AntDesing name='close' size={30} style={{color: 'white'}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
                    <Text style={styles.buttonText}>Enviar</Text>
                    <AntDesing name='check' size={30} style={{color: 'white'}} />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>

            </View>
        </Container>
    );

}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },

    header: {
        marginTop: 100,
    },

    headerText: {
        fontSize: 20,
        paddingLeft: '3%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '3%'
    },

    boxInput: {
        alignSelf: "stretch",
        height: 40,
        margin: '3%',
        marginTop: '5%',
        borderWidth: 2,
        borderColor: "#1E90FF",
        borderRadius: 5,
    },

    img: {
        width: '79%',
        height: '45%',
    },

    boxContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        backgroundColor: 'green',
        height: 50,
        width: '45%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
    },


    buttonCancel: {
        backgroundColor: 'red',
        height: 50,
        width: '45%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
    },


    buttonText: {
        fontSize: 20,
        marginLeft:40,
        color: 'white',
        fontWeight: 'bold',
    },

    buttonText2: {
        fontSize: 20,
        marginLeft: 25,
        color: 'white',
        fontWeight: 'bold',
    },
    
    alert: {
        fontSize: 13,
        color: 'red',
        alignItems: 'flex-start',
        marginLeft: '5%'
    }
})