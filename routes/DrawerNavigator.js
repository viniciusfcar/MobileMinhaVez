import React, { useContext } from 'react';
import { Icon, Container, Header, Content, Left, Right, Body } from 'native-base';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Image, Dimensions } from 'react-native';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";

import { AuthContext } from '../contexts/auth'

const Drawer = createDrawerNavigator()

import {
    MainStackNavigator, PerfilStackNavigator, ConfigurationStackNavigator, LogoutStackNavigator
} from './MainStackNavigator'

function CustomDrawerContent(props) {

    const { logOut } = useContext(AuthContext);

    return (
        <Container>
            <Header style={{ height: 200, backgroundColor: '#1E90FF' }}>
                <Body style={{ alignItems: 'center' }}>
                    <Image 
                        style={{width: 200,
                            height: 150,}}
                        source={require('../static/images/isotipo_branco.png')}
                    />
                </Body>
            </Header>
            <Content>
                <SafeAreaView style={{ flex: 1 }}>
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        <DrawerItem label="Sair" icon={(({focused}) => <Icon name='log-out'/>)} onPress={logOut} />
                    </DrawerContentScrollView>
                </SafeAreaView>
            </Content>
        </Container>
    );
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={props => <CustomDrawerContent {...props} />}
            
        >
            <Drawer.Screen 
                name='Home' 
                component={MainStackNavigator}
                options={{
                    drawerIcon: (({focused}) => <Icon name="home" color='red' />)
                }}
            />
            <Drawer.Screen 
                name='Perfil'
                component={PerfilStackNavigator}
                options={{
                    drawerIcon: (({focused}) => <Icon name='person' />)
                }}
            />
            <Drawer.Screen 
                name='Configurações'
                component={ConfigurationStackNavigator} 
                options={{
                    drawerIcon: (({focused}) => <Icon name='settings' />)
                }}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator