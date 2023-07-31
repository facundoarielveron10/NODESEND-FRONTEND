'use client';
// ---- IMPORTACIONES ---- //
import { useContext } from 'react';
import AppContext from '@/context/app/AppContext';
import Link from 'next/link';
import Image from 'next/image';
// ----------------------- //

// ---- COMPONENTE (HEADER) ---- //
export default function Header() {
    // ---- CONTEXTs ---- //
    const { cerrarSesion, usuario, limpiarState } = useContext(AppContext);
    // ------------------ //

    return (
        <header className="py-8 px-4 flex flex-col md:flex-row items-center justify-between">
            {/* Logotipo */}
            <Link href="/" onClick={() => limpiarState()}>
                <Image
                    className="w-64 mb-8 md:mb-0"
                    src="/img/logo.svg"
                    alt="NodeSend Logotipo"
                    width={200}
                    height={200}
                    priority={true}
                />
            </Link>
            {usuario ? (
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    {/* Saludo al usuario */}
                    <p className="text-rose-500 font-black uppercase">
                        Hola:{' '}
                        <span className="text-black">{usuario?.nombre}</span>
                    </p>
                    {/* Boton de Cerrar Sesion */}
                    <button
                        className="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 px-4 py-2 text-white rounded-lg uppercase font-black"
                        type="button"
                        onClick={() => cerrarSesion()}
                    >
                        Cerrar Sesion
                    </button>
                </div>
            ) : (
                <>
                    {/* Enlaces */}
                    <div className="flex flex-col cel:flex-row gap-4">
                        <Link
                            className="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 px-4 py-2 text-white rounded-lg uppercase font-black"
                            href="/login"
                        >
                            Iniciar Sesion
                        </Link>
                        <Link
                            className="bg-black hover:bg-gray-800 transition-colors duration-300 px-4 py-2 text-white rounded-lg uppercase font-black"
                            href="/crear-cuenta"
                        >
                            Crear Cuenta
                        </Link>
                    </div>
                </>
            )}
        </header>
    );
}
// ----------------------------- //
