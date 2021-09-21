import 'react-native-gesture-handler'
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerItems, createSwitchNavigator } from 'react-navigation';


import AuthProvider from './contexts/auth';
import Routes from './routes/index';

console.disableYellowBox = true

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

/*const DrawerNavigatorUser = createDrawerNavigator();
const Stack = createStackNavigator();

function mydrawer() {
  return(
    <DrawerNavigatorUser.Navigator 
    initialRouteName="Home">
      <DrawerNavigatorUser.Screen name="Home" component={HomeUserScreen} />
      <DrawerNavigatorUser.Screen name="Perfil" component={PerfilUserScreen} />
      <DrawerNavigatorUser.Screen name="Configuracoes" component={ListaConfiguracoesScreen} />
      <DrawerNavigatorUser.Screen name="Logout" component={LogoutScreen} />
    </DrawerNavigatorUser.Navigator>
  );
};

function StackCadastroUser(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="CadastroUser" component={CadastroUserScreen} />
    </Stack.Navigator>
  )
}

function StackRecuperarSenha(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />
    </Stack.Navigator>
  )
}

function StackUser(){
  return(
    <Stack.Navigator 
    initialRouteName="DrawerNavigator">
      <Stack.Screen name="DrawerNavigator" component={mydrawer} />
      <Stack.Screen name="DetalhesEspecialista" component={DetalhesEspecialistaScreen} />
      <Stack.Screen name="DetalhesConsulta" component={DetalhesConsultaScreen} />
      <Stack.Screen name="DetalhesFicha" component={DetalhesFichaScreen} />
      <Stack.Screen name="DetalhesAutorizacao" component={DetalhesAutorizacaoScreen} />
      <Stack.Screen name="DetalhesUnidade" component={DetalhesUnidadeScreen} />
      <Stack.Screen name="ListaConsultaUnidade" component={ListaConsultaUnidadeScreen} />
      <Stack.Screen name="ListaAutorizacaoUnidade" component={ListaAutorizacaoUnidadeScreen} />
      <Stack.Screen name="ListaEspecialistaUnidade" component={ListaEspecialistaUnidadeScreen} />
      <Stack.Screen name="ListaResponsavelUnidade" component={ListaResponsavelUnidadeScreen} />
      <Stack.Screen name="ListaFicha" component={ListaFichasScreen} />
      <Stack.Screen name="ListaAgendamento" component={ListaAgendamentoScreen} />
      <Stack.Screen name="ListaConsulta" component={ListaConsultaScreen} />
      <Stack.Screen name="ListaAutorizacao" component={ListaAutorizacaoScreen} />
      <Stack.Screen name="ListaEspecialista" component={ListaEspecialistaScreen} />
      <Stack.Screen name="ListaUnidade" component={ListaUnidadeScreen} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
      <Stack.Screen name="ListaExame" component={ListaExameScreen} />
      <Stack.Screen name="ListaExameUnidade" component={ListaExameUnidadeScreen} />
      <Stack.Screen name="DetalhesExame" component={DetalhesExameScreen} />
      <Stack.Screen name="DetalhesAgendamento" component={DetalhesAgendamentoScreen} />
      <Stack.Screen name="VerDados" component={VerDadosScreen} />
      <Stack.Screen name="EditarFotoPerfil" component={EditarFotoPerfilScreen} />
      <Stack.Screen name="EditarEmail" component={EditarEmailScreen} />
      <Stack.Screen name="EditarUsername" component={EditarUsernameScreen} />
      <Stack.Screen name="ListaNotificacao" component={ListaNotificacaoScreen} />
    </Stack.Navigator>
  )
}

const SwitchNavigator = createSwitchNavigator(
  {
    StackUser: StackUser,
    LoadingLogin: LoadingLoginScreen,
    Login: LoginScreen,
    StackCadastroUser: StackCadastroUser,
    StackRecuperarSenha: StackRecuperarSenha,
  },{
    initialRouteName: 'LoadingLogin',
    navigationOptions: {
      headerTransparent: true,
    },
  },
);*/

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 150,
  }
})
