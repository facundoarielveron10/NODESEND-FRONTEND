// ---- IMPORTACIONES ---- //
import { REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA } from '@/types';
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
			return {
				...state,
				mensaje: action.payload,
				error: true,
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
