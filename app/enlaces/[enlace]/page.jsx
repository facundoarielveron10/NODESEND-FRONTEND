'use client';
// ---- IMPORTACIONES ---- //
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/app/AppContext';
import clienteAxios from '@/config/axios';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Alerta from '@/components/Alerta';
// ----------------------- //

// ---- COMPONENTE (ENLACE DE DESCARGA) ---- //
export default function Enlace({ params }) {
    // ---- ESTADOS ---- //
    const [archivo, setArchivo] = useState({});
    const [tienePassword, setTienePassword] = useState(false);
    const [password, setPassword] = useState('');
    // ----------------- //

    // ---- CONTEXTs ---- //
    const { mostrarAlerta, mensaje_archivo } = useContext(AppContext);
    // ------------------ //

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

    const verificarPassword = async (e) => {
        e.preventDefault();

        if ([password].includes('')) {
            mostrarAlerta('El Campo es Obligatorio');
            return;
        }

        try {
            // Peticion a la base de datos
            const { data } = await clienteAxios.post(
                `/api/enlaces/${archivo?.enlace}`,
                {
                    password,
                }
            );
            setTienePassword(data.password);
            setArchivo(data);
        } catch (error) {
            console.log(error);
            mostrarAlerta(error.response.data.msg);
        }
    };
    // ------------------- //

    // ---- EFECTOS ---- //
    useEffect(() => {
        obtenerArchivo();
    }, []);

    useEffect(() => {
        if (archivo?.password) {
            setTienePassword(archivo?.password);
        }
    }, [archivo]);

    // ----------------- //
    console.log(archivo);
    return (
        <Layout>
            {tienePassword ? (
                <div className="flex flex-col items-center w-full gap-4">
                    {/* Formulario de verificacion de password */}
                    <p className="font-black uppercase text-center">
                        Este enlace esta protegido por una contraseña, colocalo
                        a continuacion
                    </p>
                    {/* Alertas */}
                    {mensaje_archivo && <Alerta />}
                    {/* Formulario para la contraseña */}
                    <div className="w-full max-w-lg">
                        <form
                            onSubmit={(e) => verificarPassword(e)}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            {/* Password del Enlace */}
                            <div className="mb-4">
                                {/* Texto Ayuda y Errores */}
                                <div className="flex flex-col cel:flex-row justify-between cel:gap-10">
                                    <label
                                        className="block text-black text-sm font-bold mb-2 uppercase"
                                        htmlFor="password"
                                    >
                                        Contraseña
                                    </label>
                                </div>
                                {/* Entrada del Password*/}
                                <input
                                    className={`border-gray-200 border-[1.5px] shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña del Enlace"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            {/* Boton de Enviar */}
                            <button
                                className="w-full text-center bg-gradient-to-r bg-rose-500 rounded-lg text-white uppercase font-black py-2 cursor-pointer hover:bg-black transition-colors duration-300"
                                type="submit"
                            >
                                Validar Password
                            </button>
                        </form>
                    </div>
                </div>
            ) : mensaje_archivo ? (
                <Alerta />
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
