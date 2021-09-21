import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes'
import DrawerNavigator from '../routes/DrawerNavigator'

const Routes = () => {
    const { signed, loading } = useContext(AuthContext);

    return (
        signed ? <DrawerNavigator /> : <AuthRoutes />
    )
}

export default Routes;