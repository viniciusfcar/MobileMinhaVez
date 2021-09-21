import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../contexts/auth';

export default function LoginScreen() {

	const navigation = useNavigation();

	const [username, setUsername] = useState();
	const [senha, setSenha] = useState();
	const [token, setToken] = useState();
	const [usuario, setUsuario] = useState();
	const [id_usuario, setIdUsuario] = useState();
	const [modalVisible, setModalVisible] = useState();
	const [spinner, setSpinner] = useState();

	const { signIn } = useContext(AuthContext)

	const handleLogin = async () => {
		await signIn(username, senha);
	}

	return (
		<View style={styles.container}>
			<View style={styles.boxContainer}>
				<Spinner
					visible={spinner}
					textContent={'Aguarde, coletando dados...'}
					textStyle={styles.spinnerTextStyle}
				/>
				<View style={styles.imagemContainer}>
					<Image
						style={styles.img}
						source={require('./../static/images/logo_branca.png')}
					/>
				</View>
				<TextInput
					style={styles.boxInput}
					autoFocus
					placeholder="Username"
					autoCapitalize='none'
					keyboardType='email-address'
					value={username}
					onChangeText={username => setUsername(username)}
				/>

				<TextInput
					style={styles.boxInput}
					placeholder="Senha"
					autoCapitalize='none'
					secureTextEntry={true}
					value={senha}
					onChangeText={senha => setSenha(senha)}
				/>

				<TouchableOpacity
					onPress={handleLogin}
					style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate('CadastroUser')}
					style={styles.buttonCadastro}
				>
					<Text style={{ color: 'white', fontSize: 20 }}>Cadastre-se</Text>
				</TouchableOpacity>


				<TouchableOpacity onPress={() => navigation.navigate('RecuperarSenhaScreen')}
					style={{ marginTop: 5 }}>
					<Text style={{ color: 'white' }}>Esqueceu sua senha ? clique aqui</Text>
				</TouchableOpacity>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E90FF',
		justifyContent: 'center',
	},
	imagemContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	},
	icon: {
		width: 24,
		height: 24,
	},
	boxInput: {
		backgroundColor: "white",
		alignSelf: "stretch",
		height: 40,
		margin: 5,
		width: '100%',
		borderRadius: 5,
        padding: 10
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		margin: 10,
		marginTop: 10,
		padding: 20,
		backgroundColor: 'white',
		height: 40,
	},
	buttonCadastro: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
		marginTop: 60,
		padding: 20,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 5,
	},
	buttonText: {
		fontWeight: 'bold',
		color: '#1E90FF',
		fontSize: 20,
	},
	boxContainer: {
		borderRadius: 10,
		justifyContent: 'center',
		margin: 20,
		marginTop: 10,
		alignItems: 'center',
	},
	img: {
		alignItems: 'center',
		width: 310,
		height: 160,
		marginTop: 25,
		marginLeft: 10,
	},
	logoText: {
		marginBottom: 20,
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white'
	},

	spinnerTextStyle: {
		color: 'white',
		marginTop: 200,
	}
});