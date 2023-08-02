'use client';
// ---- IMPORTACIONES ---- //
import { useContext, useState } from 'react';
import AppContext from '@/context/app/AppContext';
// ----------------------- //

// ---- COMPONENTE (FORMULARIO) ---- //
export default function Formulario() {
    // ---- ESTADOS ---- //
    const [permitirPassword, setPermitirPassword] = useState(false);
    // ----------------- //

    // ---- CONTEXTs ---- //
    const { agregarPassword, agregarDescargas } = useContext(AppContext);
    // ------------------ //

    return (
        <div className="w-full mt-20 flex flex-col gap-4">
            {/* Selecion de las cantidad de descargas */}
            <div>
                {/* Informacion de ayuda */}
                <label className="text-lg text-gray-800" htmlFor="eliminar">
                    Cantidad de descargas:
                </label>
                {/* Seleccionador de cantidad de descargas */}
                <select
                    defaultValue="default"
                    id="eliminar"
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    onChange={(e) => agregarDescargas(e.target.value)}
                >
                    <option value="default" disabled>
                        -- Seleccione --
                    </option>
                    <option value="1">1 Descargas</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="20">20 Descargas</option>
                </select>
            </div>
            {/* Colocar Password */}
            <div>
                {/* Texto Ayuda y la habilitacion del password */}
                <div className="flex justify-between items-center">
                    {/* Informacion de ayuda */}
                    <label className="text-lg text-gray-800" htmlFor="password">
                        Proteger con Contraseña
                    </label>
                    {/* Habilitacion del password */}
                    <input
                        type="checkbox"
                        onChange={() => setPermitirPassword(!permitirPassword)}
                    />
                </div>
                {permitirPassword ? (
                    <>
                        {/* Ingresar Contraseña */}
                        <input
                            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                            type="password"
                            id="password"
                            onChange={(e) => agregarPassword(e.target.value)}
                        />
                    </>
                ) : null}
            </div>
        </div>
    );
}
// --------------------------------- //
