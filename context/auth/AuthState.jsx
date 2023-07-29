'use client';
// ---- IMPORTACIONES ---- //
import { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	AUTENTICACION_EXITO,
	AUTENTICACION_ERROR,
	USUARIO_AUTENTICADO,
	CERRAR_SESION,
	LIMPIAR_ALERTA,
} from '@/types';
import { useRouter } from 'next/navigation';
import clienteAxios from '@/config/axios';
import tokenAuth from '@/config/tokenAuth';
// ----------------------- //

// ---- ESTADOS DE LA AUTENTICACION ---- //
const AuthState = ({ children }) => {
	// ---- ESTADOS ---- //
	const initialState = {
		token:
			typeof window !== 'undefined' ? localStorage.getItem('token') : '',
		autenticado: null,
		usuario: null,
		mensaje: null,
		error: null,
	};
	// ----------------- //

	// ---- REDUCER ---- //
	const [state, dispatch] = useReducer(AuthReducer, initialState);
	// ----------------- //

	// ---- ROUTER ---- //
	const router = useRouter();
	// ---------------- //

	// ---- FUNCIONES ---- //
	const registrarUsuario = async datos => {
		try {
			// Pedido a la base de datos
			const { data } = await clienteAxios.post('/api/usuarios', datos);
			// Cambiamos los estados si el registro es exitoso
			dispatch({
				type: REGISTRO_EXITOSO,
				payload: data.msg,
			});
			// Redireccionamos
			router.push('/login');
		} catch (error) {
			// Mostramos en consola el error
			console.log(error);
			// Cambiamos los estados si el registro es erroneo
			dispatch({
				type: REGISTRO_ERROR,
				payload: error.response.data.msg,
			});
		}

		// Limpia la alerta
		setTimeout(() => {
			dispatch({
				type: LIMPIAR_ALERTA,
			});
		}, 3000);
	};

	const iniciarSesion = async datos => {
		try {
			// Pedido a la base de datos
			const { data } = await clienteAxios.post('/api/auth', datos);
			// Cambiamos los estados si el registro es exitoso
			dispatch({
				type: AUTENTICACION_EXITO,
				payload: data.token,
			});
		} catch (error) {
			// Mostramos en consola el error
			console.log(error);
			// Cambiamos los estados si el registro es erroneo
			dispatch({
				type: AUTENTICACION_ERROR,
				payload: error.response.data.msg,
			});
		}
	};

	const usuarioAutenticado = async () => {
		// Obtener el token del localStorage
		const token = localStorage.getItem('token');
		// Validar el token del usuario
		if (token) {
			tokenAuth(token);
		} else {
			return;
		}

		try {
			// Enviar el Json Web Token
			const { data } = await clienteAxios.get('/api/auth');
			// Quitar atributos inecesarios al objeto
			delete data.usuario.exp;
			delete data.usuario.iat;
			// Cambiamos los estados
			dispatch({
				type: USUARIO_AUTENTICADO,
				payload: data.usuario,
			});
		} catch (error) {
			// Mostramos en consola el error
			console.log(error);
			// Cambiamos los estados si el registro es erroneo
			dispatch({
				type: AUTENTICACION_ERROR,
				payload: error.response.data.msg,
			});
		}
	};

	const cerrarSesion = () => {
		dispatch({
			type: CERRAR_SESION,
		});
	};
	// ------------------- //

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				error: state.error,
				registrarUsuario,
				usuarioAutenticado,
				iniciarSesion,
				cerrarSesion,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
// ------------------------------------- //

// ---- EXPORTACIONES ---- //
export default AuthState;
// ----------------------- //
