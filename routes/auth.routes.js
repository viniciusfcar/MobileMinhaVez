import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import CadastroUserScreen from '../screens/CadastroUserScreen';
import RecuperarSenhaScreen from '../screens/RecuperarSenhaScreen'

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
    return (
        <AuthStack.Navigator initialRouteName='LoginScreen'>
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <AuthStack.Screen
                name="CadastroUser"
                component={CadastroUserScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="RecuperarSenhaScreen"
                component={RecuperarSenhaScreen}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;
