// ---- IMPORTACIONES ---- //
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    AUTENTICACION_EXITO,
    AUTENTICACION_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
    LIMPIAR_ALERTA,
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS,
    LIMPIAR_STATE,
} from '@/types';
// ----------------------- //

// ---- REDUCER DE AUTENTICACION ---- //
export default (state, action) => {
    switch (action.type) {
        // ---- AUTENTICACION ---- //
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
                autenticado: true,
            };
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                usuario: null,
                token: null,
                autenticado: null,
            };
        // ----------------------- //

        // ---- ALERTAS ----- //
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null,
                mensaje_archivo: null,
                error: null,
            };
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload,
                error: true,
            };
        // ------------------ //

        // ---- SUBIDA DE ARCHIVOS ---- //
        case SUBIR_ARCHIVO:
            return {
                ...state,
                cargando: true,
            };
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                archivo: {
                    ...state.archivo,
                    nombre: action.payload.nombre,
                    nombre_original: action.payload.nombre_original,
                },
                error: false,
                cargando: null,
            };
        case SUBIR_ARCHIVO_ERROR: {
            return {
                ...state,
                mensaje_archivo: action.payload,
                error: true,
                cargando: null,
            };
        }
        // ---------------------------- //

        // ---- CREACION DE ENLACES ---- //
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                archivo: {
                    ...state.archivo,
                    url: action.payload,
                },
                error: false,
            };
        case CREAR_ENLACE_ERROR:
            return {
                ...state,
                mensaje_archivo: action.payload,
                error: true,
            };
        case AGREGAR_PASSWORD:
            return {
                ...state,
                archivo: {
                    ...state.archivo,
                    password: action.payload,
                },
            };
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                archivo: {
                    ...state.archivo,
                    descargas: action.payload,
                },
            };
        // ----------------------------- //

        // ---- REINICIAR STATE ---- //
        case LIMPIAR_STATE:
            return {
                ...state,
                mensaje: null,
                error: null,
                mensaje_archivo: null,
                archivo: {
                    nombre: '',
                    nombre_original: '',
                    descargas: 1,
                    password: '',
                    autor: null,
                    url: '',
                },
                cargando: null,
            };
        // ------------------------- //
        default:
            return state;
    }
};
// ---------------------------------- //
