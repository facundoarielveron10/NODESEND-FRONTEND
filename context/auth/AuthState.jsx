'use client';
// ---- IMPORTACIONES ---- //
import { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA } from '@/types';
import { useRouter } from 'next/navigation';
import clienteAxios from '@/config/axios';
// ----------------------- //

// ---- ESTADOS DE LA AUTENTICACION ---- //
const AuthState = ({ children }) => {
	// ---- ESTADOS ---- //
	const initialState = {
		token: '',
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
			console.log(error);
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
