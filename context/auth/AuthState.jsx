'use client';
// ---- IMPORTACIONES ---- //
import { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { USUARIO_AUTENTICADO } from '@/types';
// ----------------------- //

// ---- ESTADOS DE LA AUTENTICACION ---- //
const AuthState = ({ children }) => {
    // ---- ESTADOS ---- //
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null,
    };
    // ----------------- //

    // ---- REDUCER ---- //
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    // ----------------- //

    // ---- FUNCIONES ---- //
    const usuarioAutenticado = (nombre) => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre,
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
                usuarioAutenticado,
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