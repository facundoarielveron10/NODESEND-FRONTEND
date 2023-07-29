// ---- IMPORTACIONES ---- //
import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	AUTENTICACION_EXITO,
	AUTENTICACION_ERROR,
	USUARIO_AUTENTICADO,
	CERRAR_SESION,
	LIMPIAR_ALERTA,
} from '@/types';
// ----------------------- //

// ---- REDUCER DE AUTENTICACION ---- //
export default (state, action) => {
	switch (action.type) {
		case REGISTRO_EXITOSO:
			return {
				...state,
				mensaje: action.payload,
				error: false,
			};
		case REGISTRO_ERROR:
		case AUTENTICACION_ERROR:
			return {
				...state,
				mensaje: action.payload,
				error: true,
			};
		case AUTENTICACION_EXITO:
			localStorage.setItem('token', action.payload);
			return {
				...state,
				token: action.payload,
				autenticado: true,
			};
		case USUARIO_AUTENTICADO:
			return {
				...state,
				usuario: action.payload,
			};
		case CERRAR_SESION:
			localStorage.removeItem('token');
			return {
				...state,
				usuario: null,
				token: null,
				autenticado: null,
			};
		case LIMPIAR_ALERTA:
			return {
				...state,
				mensaje: null,
				error: null,
			};
		default:
			return state;
	}
};
// ---------------------------------- //
