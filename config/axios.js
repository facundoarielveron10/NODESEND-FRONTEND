// ---- IMPORTACIONES ---- //
import axios from 'axios';
// ----------------------- //

// ---- CLIENTE DE AXIOS ---- //
const clienteAxios = axios.create({
    baseURL: process.env.backendURL,
});
// -------------------------- //

// ---- EXPORTACIONES ---- //
export default clienteAxios;
// ----------------------- //
