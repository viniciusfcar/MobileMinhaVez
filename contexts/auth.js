import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';
import { Alert } from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import Axios from 'axios';

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [id_usuario, setIdUsuario] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [total_notificacao, setTotalNotificacao] = useState();

    //Carregar usuário do AsyncStorage
    useEffect(() => {
        const loadStorage = async () => {
            const storageUser = await AsyncStorage.getItem('@MinhaVezSistema:usuario')
            if (storageUser) {
                setUsuario(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }
        loadStorage()
       
    }, [])

    //Cadastrar de usuário
    const signUp = async (name, email, phone, password, cpf) => {
    }

    //Funcao para logar o usuário
    const signIn = async (username, senha) => {
        if (username.trim().length == 0 || senha.trim().length == 0) {

            Alert.alert('Erro!', 'Preencha o email e senha');

        } else {

            let user_name = username;
            let password = senha;
            
            const form = new FormData();
            form.append("username", user_name);
            form.append("password", password);
            //https://minhavezsistema.com.br
            const apiCall = await fetch('https://minhavezsistema.com.br/api-token-auth/', {
                method: 'POST',
                body: form,
            });
            
            const response = await apiCall.json();
            setToken(response.token);

            try {

                if (response.token) {

                    const form = new FormData();
                    form.append("token", response.token);
                    
                    const apiCall1 = await fetch('https://minhavezsistema.com.br/api/usuario/verificaUser/', {
                        method: 'POST',
                        body: form,
                    });

                    const response1 = await apiCall1.json();
                    
                    if (response1[0]) {
                        
                        const apiCall2 = await fetch('https://minhavezsistema.com.br/api/usuario/'+response1[0].pk+'/')
                        const response2 = await apiCall2.json()

                        await AsyncStorage.setItem("@MinhaVezSistema:usuario", JSON.stringify(response2));
                        await AsyncStorage.setItem("@MinhaVezSistema:id_usuario", JSON.stringify(response2.id));
                        await AsyncStorage.setItem("@MinhaVezSistema:token", JSON.stringify(response.token));
                        
                        setUsuario(response2);
                        setIdUsuario(response2.id);
                        
                        return

                    } else {
                        
                        var mensagem = 'Sem permissão para usar o APP!';

                        Alert.alert('Atenção!', mensagem);
                    }
                } else {
                    var mensagem = 'Usuário e/ou Senha Inválido(s)!';
                    Alert.alert('Erro!', mensagem);
                }
            }
            catch (erro) {
                var mensagem = 'Usuário e/ou Senha Inválido(s)!';

                console.log(erro)

                Alert.alert('Erro!', mensagem);
            }
        }
    }

    //Função para deslogar o usuário
    const logOut = async () => {
        await AsyncStorage.removeItem('@MinhaVezSistema:usuario')
            .then(() => {
                setUsuario(null);
            });
        
        await AsyncStorage.clear();
    }

    const pegarUser = async () => {
        const apiCall2 = await fetch('https://minhavezsistema.com.br/api/user/'+usuario.user+'/');
        const response2 = await apiCall2.json();
        setUser(response2);
    }

    const totalNotificacao = async () => {

        const apiCall3 = await fetch('https://minhavezsistema.com.br/api/usuario/'+usuario.id+'/total_notificacao_app/');
        const response3 = await apiCall3.json();
        setTotalNotificacao(response3);
    }

    return (
        <AuthContext.Provider value={{ signed: !!usuario, user, usuario, id_usuario,loading, total_notificacao, totalNotificacao, signIn, signUp, logOut, pegarUser }}>
            {children}
        </AuthContext.Provider>
    )
}

