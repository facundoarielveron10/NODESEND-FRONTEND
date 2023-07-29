// ---- IMPORTACIONES ---- //
import clienteAxios from './axios';
// ----------------------- //

// ---- TOKEN DE AUTENTICACION ---- //
const tokenAuth = token => {
	if (token) {
		clienteAxios.defaults.headers.common[
			'Authorization'
		] = `Bearer ${token}`;
	} else {
		delete clienteAxios.defaults.headers.common['Authorization'];
	}
};
// -------------------------------- //

// ---- EXPORTACIONES ---- //
export default tokenAuth;
// ----------------------- //
