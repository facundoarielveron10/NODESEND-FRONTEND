'use client';
// ---- IMPORTACIONES ---- //
import { useReducer } from 'react';
import AppContext from './AppContext';
import AppReducer from './AppReducer';
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
    LIMPIAR_STATE,
} from '@/types';
import { useRouter } from 'next/navigation';
import clienteAxios from '@/config/axios';
import tokenAuth from '@/config/tokenAuth';
// ----------------------- //

// ---- ESTADOS DE LA AUTENTICACION ---- //
const AppState = ({ children }) => {
    // ---- ESTADOS ---- //
    const initialState = {
        token:
            typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
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
    // ----------------- //

    // ---- NAVEGACION ---- //
    const router = useRouter();
    // -------------------- //

    // ---- REDUCER ---- //
    const [state, dispatch] = useReducer(AppReducer, initialState);
    // ----------------- //

    // ---- FUNCIONES ---- //
    const registrarUsuario = async (datos) => {
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
        }, 5000);
    };

    const iniciarSesion = async (datos) => {
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

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            });
        }, 5000);
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

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            });
        }, 5000);
    };

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION,
        });
    };

    const mostrarAlerta = (msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg,
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            });
        }, 5000);
    };

    const subirArchivo = async (formData, nombre) => {
        dispatch({
            type: SUBIR_ARCHIVO,
        });

        try {
            // Enviando los archivos al servidor
            const { data } = await clienteAxios.post('/api/archivos', formData);
            // Cambiamos los estados
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: data.archivo,
                    nombre_original: nombre,
                },
            });
        } catch (error) {
            // Mostramos en consola el error
            console.log(error);
            // Cambiamos los estados
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg,
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            });
        }, 5000);
    };

    const crearEnlace = async () => {
        // Objeto con los datos
        const datos = {
            nombre: state.archivo.nombre,
            nombre_original: state.archivo.nombre_original,
            descargas: state.archivo.descargas,
            password: state.archivo.password,
            autor: state.archivo.autor,
        };

        try {
            // Enviando los archivos al servidor
            const { data } = await clienteAxios.post('/api/enlaces', datos);
            // Cambiamos los estados
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: data.msg,
            });
        } catch (error) {
            // Mostramos en consola el error
            console.log(error);
            // Cambiamos los estados
            dispatch({
                type: CREAR_ENLACE_ERROR,
                payload: error.response.data.msg,
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            });
        }, 5000);
    };

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE,
        });
    };
    // ------------------- //

    return (
        <AppContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                error: state.error,
                mensaje_archivo: state.mensaje_archivo,
                archivo: state.archivo,
                cargando: state.cargando,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// ------------------------------------- //

// ---- EXPORTACIONES ---- //
export default AppState;
// ----------------------- //
