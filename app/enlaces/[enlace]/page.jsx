'use client';
// ---- IMPORTACIONES ---- //
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clienteAxios from '@/config/axios';
import Layout from '@/components/Layout';
import Link from 'next/link';
// ----------------------- //

// ---- COMPONENTE (ENLACE DE DESCARGA) ---- //
export default function Enlace({ params }) {
    // ---- ESTADOS ---- //
    const [archivo, setArchivo] = useState({});
    const [error, setError] = useState({ error: false, mensaje: '' });
    // ----------------- //

    // ---- NAVEGACION ---- //
    const router = useRouter();
    // -------------------- //

    // ---- FUNCIONES ---- //
    const obtenerArchivo = async () => {
        try {
            const { data } = await clienteAxios.get(
                `/api/enlaces/${params.enlace}`
            );
            setArchivo(data);
        } catch (error) {
            console.log(error);
            setError({
                error: true,
                mensaje: error.response.data.msg,
            });
        }
    };

    const redireccionar = () => {
        setTimeout(() => {
            router.push('/');
        }, 3000);
    };
    // ------------------- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        obtenerArchivo();
    }, []);
    // ----------------- //

    return (
        <Layout>
            {error?.error ? (
                <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto uppercase font-black rounded shadow">
                    {/* Mensaje de error */}
                    <p>{error?.mensaje}</p>
                </div>
            ) : (
                <>
                    {/* Titulo */}
                    <h1 className="text-3xl text-center text-gray-700 font-black uppercase">
                        Descarga tu archivo:
                    </h1>
                    {/* Archivo para descargar */}
                    <div className="flex items-center justify-center mt-10">
                        <Link
                            href={`${process.env.backendURL}/api/archivos/${archivo.archivo}`}
                            className="bg-rose-500 text-center px-10 py-3 rounded-lg uppercase font-bold text-white cursor-pointer"
                            onClick={() => redireccionar()}
                        >
                            Descargar Aqui
                        </Link>
                    </div>
                </>
            )}
        </Layout>
    );
}
// ----------------------------------------- //
