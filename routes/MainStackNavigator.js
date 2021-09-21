import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

// Drawer Stacks
import HomeUserScreen from '../screens/UsuarioScreens/HomeUserScreen';
import PerfilUserScreen from '../screens/UsuarioScreens/PerfilUserScreen';
import ListaConfiguracoesScreen from '../screens/ConfiguraçõesScreens/ListaConfiguracoesScreen';

// Home Stacks 
import DetalhesAgendamentoScreen from '../screens/AgendamentoScreens/DetalhesAgendamentoScreen';
import DetalhesConsultaScreen from '../screens/ConsultaScreens/DetalhesConsultaScreen';
import DetalhesEspecialistaScreen from '../screens/EspecialistaScreens/DetalhesEspecialistaScreen';
import DetalhesFichaScreen from '../screens/FichaScreens/DetalhesFichaScreen';
import DetalhesAutorizacaoScreen from '../screens/AutorizacaoScreens/DetalhesAutorizacaoScreen';
import DetalhesUnidadeScreen from '../screens/UnidadeSaudeScreens/DetalhesUnidadeScreen';
import ListaConsultaUnidadeScreen from '../screens/ConsultaScreens/ListaConsultaUnidadeScreen';
import ListaAutorizacaoUnidadeScreen from '../screens/AutorizacaoScreens/ListaAutorizacaoUnidadeScreen';
import ListaEspecialistaUnidadeScreen from '../screens/EspecialistaScreens/ListaEspecialistaUnidadeScreen';
import ListaResponsavelUnidadeScreen from '../screens/ResponsavelScreens/ListaResponsavelUnidadeScreen';
import ListaFichasScreen from '../screens/FichaScreens/ListaFichasScreen';
import ListaAgendamentoScreen from '../screens/AgendamentoScreens/ListaAgendamentoScreen';
import ListaConsultaScreen from '../screens/ConsultaScreens/ListaConsultaScreen';
import ListaAutorizacaoScreen from '../screens/AutorizacaoScreens/ListaAutorizacaoScreen';
import ListaEspecialistaScreen from '../screens/EspecialistaScreens/ListaEspecialistaScreen';
import ListaUnidadeScreen from '../screens/UnidadeSaudeScreens/ListaUnidadeScreen';
import EditarPerfilScreen from '../screens/UsuarioScreens/EditarPerfilScreen';
import ListaExameScreen from '../screens/ExameScreens/ListaExameScreen';
import ListaExameUnidadeScreen from '../screens/ExameScreens/ListaExameUnidadeScreen';
import DetalhesExameScreen from '../screens/ExameScreens/DetalhesExameScreen';
import ListaNotificacaoScreen from '../screens/NotificacaoScreens/ListaNotificacaoScreen';
import VerDadosScreen from '../screens/UsuarioScreens/VerDadosScreen';
import EditarFotoPerfilScreen from '../screens/UsuarioScreens/EditarFotoPerfilScreen';
import EditarEmailScreen from '../screens/ConfiguraçõesScreens/EditarEmailScreen';
import EditarUsernameScreen from '../screens/ConfiguraçõesScreens/EditarUsernameScreen';


const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Home' component={HomeUserScreen} />
            <Stack.Screen name='DetalhesAgendamento' component={DetalhesAgendamentoScreen} />
            <Stack.Screen name='DetalhesConsulta' component={DetalhesConsultaScreen} />
            <Stack.Screen name='DetalhesEspecialista' component={DetalhesEspecialistaScreen} />
            <Stack.Screen name='DetalhesFicha' component={DetalhesFichaScreen} />
            <Stack.Screen name='DetalhesAutorizacao' component={DetalhesAutorizacaoScreen} />
            <Stack.Screen name='DetalhesUnidade' component={DetalhesUnidadeScreen} />
            <Stack.Screen name='ListaConsultaUnidade' component={ListaConsultaUnidadeScreen} />
            <Stack.Screen name='ListaAutorizacaoUnidade' component={ListaAutorizacaoUnidadeScreen} />
            <Stack.Screen name='ListaEspecialistaUnidade' component={ListaEspecialistaUnidadeScreen} />
            <Stack.Screen name='ListaResponsavelUnidade' component={ListaResponsavelUnidadeScreen} />
            <Stack.Screen name='ListaAgendamento' component={ListaAgendamentoScreen} />
            <Stack.Screen name='ListaConsulta' component={ListaConsultaScreen} />
            <Stack.Screen name='ListaAutorizacao' component={ListaAutorizacaoScreen} />
            <Stack.Screen name='ListaEspecialista' component={ListaEspecialistaScreen} />
            <Stack.Screen name='ListaFicha' component={ListaFichasScreen} />
            <Stack.Screen name='ListaUnidade' component={ListaUnidadeScreen} />
            <Stack.Screen name='ListaExame' component={ListaExameScreen} />
            <Stack.Screen name='ListaExameUnidade' component={ListaExameUnidadeScreen} />
            <Stack.Screen name='DetalhesExame' component={DetalhesExameScreen} />
            <Stack.Screen name='ListaNotificacao' component={ListaNotificacaoScreen} />
        </Stack.Navigator>
    );
}

const PerfilStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Perfil' component={PerfilUserScreen} />
            <Stack.Screen name='EditarFotoPerfil' component={EditarFotoPerfilScreen} />
            <Stack.Screen name='VerDados' component={VerDadosScreen} />
            <Stack.Screen name='EditarPerfil' component={EditarPerfilScreen} />
        </Stack.Navigator>
    );
}

const ConfigurationStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Configurações' component={ListaConfiguracoesScreen} />
            <Stack.Screen name='EditarEmail' component={EditarEmailScreen} />
            <Stack.Screen name='EditarUsername' component={EditarUsernameScreen} />
        </Stack.Navigator>
    )
}

export { MainStackNavigator, PerfilStackNavigator, ConfigurationStackNavigator }