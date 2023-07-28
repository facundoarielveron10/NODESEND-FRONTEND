// ---- IMPORTACIONES ---- //
import { useContext } from 'react';
import AuthContext from '@/context/auth/AuthContext';
// ----------------------- //

// ---- COMPONENTE (ALERTA) ---- //
export default function Alerta() {
	// ---- CONTEXTs ---- //
	const { mensaje, error } = useContext(AuthContext);
	// ------------------ //

	return (
		<div
			className={`${
				error ? 'bg-red-500' : 'bg-green-500'
			} py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto uppercase font-black rounded shadow`}
		>
			<p>{mensaje}</p>
		</div>
	);
}
// ----------------------------- //
