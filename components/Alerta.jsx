// ---- IMPORTACIONES ---- //
import { useContext } from 'react';
import AppContext from '@/context/app/AppContext';
// ----------------------- //

// ---- COMPONENTE (ALERTA) ---- //
export default function Alerta() {
    // ---- CONTEXTs ---- //
    const { mensaje, error, mensaje_archivo } = useContext(AppContext);
    // ------------------ //

    return (
        <div
            className={`${
                error ? 'bg-red-500' : 'bg-green-500'
            } py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto uppercase font-black rounded shadow`}
        >
            <p>{mensaje || mensaje_archivo}</p>
        </div>
    );
}
// ----------------------------- //
